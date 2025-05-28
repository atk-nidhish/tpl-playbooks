
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log('Raw request body:', requestBody);
    
    if (!requestBody) {
      throw new Error('No request body received');
    }

    const { fileName } = JSON.parse(requestBody);
    console.log(`Processing document: ${fileName}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if playbook already exists
    const playbookName = fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase();
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', playbookName)
      .maybeSingle();

    if (existingPlaybook) {
      console.log(`Playbook already exists, skipping: ${playbookName}`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Playbook ${playbookName} already exists`,
          playbookId: existingPlaybook.id
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Download the file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download(fileName);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw downloadError;
    }

    console.log('File downloaded successfully, size:', fileData.size);

    let extractedText = '';
    
    try {
      // Try to extract text using a simple PDF text extraction approach
      const arrayBuffer = await fileData.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Convert to string and try to extract readable text
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const rawText = decoder.decode(uint8Array);
      
      // Extract text between common PDF text markers
      const textMatches = rawText.match(/\(([^)]+)\)/g);
      if (textMatches) {
        extractedText = textMatches
          .map(match => match.slice(1, -1))
          .filter(text => text.length > 2 && /[a-zA-Z]/.test(text))
          .join(' ');
      }
      
      // Fallback: try to find readable text patterns
      if (!extractedText || extractedText.length < 100) {
        const readableTextPattern = /[A-Za-z][A-Za-z0-9\s\.,!?:;-]{10,}/g;
        const matches = rawText.match(readableTextPattern);
        if (matches) {
          extractedText = matches.slice(0, 20).join(' ');
        }
      }
      
      console.log('Extracted text length:', extractedText.length);
      console.log('Extracted text preview:', extractedText.substring(0, 500));
      
    } catch (textError) {
      console.warn('Text extraction failed:', textError);
      extractedText = 'Document content extraction failed - using basic structure';
    }

    // Process with AI if we have both extracted text and API key
    if (groqApiKey && extractedText && extractedText.length > 50) {
      try {
        console.log('Processing with AI...');
        
        const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
              {
                role: 'system',
                content: `You are an expert at analyzing technical documents and creating structured playbooks. Extract key information from the document and organize it into phases, process steps, and responsibilities.

Please analyze the document and return a JSON object with this structure:
{
  "title": "Document Title",
  "description": "Brief description",
  "phases": {
    "phase_1": {"name": "Phase Name", "description": "Phase description"},
    "phase_2": {"name": "Phase Name", "description": "Phase description"}
  },
  "processSteps": [
    {
      "phase_id": "phase_1",
      "step_id": "1.1",
      "activity": "Activity description",
      "inputs": ["input1", "input2"],
      "outputs": ["output1", "output2"],
      "timeline": "timeline",
      "responsible": "role",
      "comments": "additional info"
    }
  ],
  "raciMatrix": [
    {
      "phase_id": "phase_1",
      "step_id": "1.1",
      "task": "task description",
      "responsible": "role",
      "accountable": "role",
      "consulted": "role",
      "informed": "role"
    }
  ]
}`
              },
              {
                role: 'user',
                content: `Please analyze this document content and create a structured playbook:\n\n${extractedText.substring(0, 4000)}`
              }
            ],
            temperature: 0.3,
            max_tokens: 2000
          })
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          const aiContent = aiData.choices[0].message.content;
          
          console.log('AI Response:', aiContent);
          
          // Try to parse AI response as JSON
          let parsedData;
          try {
            // Extract JSON from the response
            const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              parsedData = JSON.parse(jsonMatch[0]);
            }
          } catch (parseError) {
            console.warn('Failed to parse AI response as JSON:', parseError);
          }
          
          if (parsedData && parsedData.phases) {
            console.log('Successfully parsed AI data, creating enhanced playbook');
            
            // Create playbook with AI-extracted data
            const { data: playbook, error: playbookError } = await supabase
              .from('playbooks')
              .insert({
                name: playbookName,
                title: parsedData.title || fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, ''),
                description: parsedData.description || `Playbook created from ${fileName}`,
                phases: parsedData.phases,
                file_path: fileName
              })
              .select()
              .single();

            if (playbookError) {
              console.error('Error inserting playbook:', playbookError);
              throw playbookError;
            }

            // Insert process steps if available
            if (parsedData.processSteps && Array.isArray(parsedData.processSteps)) {
              const processStepsWithPlaybookId = parsedData.processSteps.map(step => ({
                ...step,
                playbook_id: playbook.id
              }));
              
              const { error: stepsError } = await supabase
                .from('process_steps')
                .insert(processStepsWithPlaybookId);

              if (stepsError) {
                console.error('Error inserting process steps:', stepsError);
              } else {
                console.log(`Inserted ${processStepsWithPlaybookId.length} AI-generated process steps`);
              }
            }

            // Insert RACI matrix if available
            if (parsedData.raciMatrix && Array.isArray(parsedData.raciMatrix)) {
              const raciWithPlaybookId = parsedData.raciMatrix.map(raci => ({
                ...raci,
                playbook_id: playbook.id
              }));
              
              const { error: raciError } = await supabase
                .from('raci_matrix')
                .insert(raciWithPlaybookId);

              if (raciError) {
                console.error('Error inserting RACI matrix:', raciError);
              } else {
                console.log(`Inserted ${raciWithPlaybookId.length} AI-generated RACI entries`);
              }
            }

            return new Response(
              JSON.stringify({ 
                success: true, 
                message: `Successfully processed document with AI: ${fileName}`,
                playbookId: playbook.id,
                extractedTextLength: extractedText.length,
                aiProcessed: true
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (aiError) {
        console.warn('AI processing failed, falling back to basic structure:', aiError);
      }
    }

    // Fallback: Create enhanced basic playbook with extracted text context
    console.log('Creating enhanced basic playbook with extracted content context');
    
    // Analyze extracted text to create more relevant phases
    const phases = {};
    const processSteps = [];
    const raciMatrix = [];
    
    // Try to detect common document sections/chapters
    const lowerText = extractedText.toLowerCase();
    
    if (lowerText.includes('commissioning') || lowerText.includes('testing')) {
      phases['phase_1'] = { name: 'Pre-Commissioning', description: 'Preparation and setup phase' };
      phases['phase_2'] = { name: 'Testing & Commissioning', description: 'System testing and validation' };
      phases['phase_3'] = { name: 'Final Commissioning', description: 'Final validation and handover' };
    } else if (lowerText.includes('installation') || lowerText.includes('setup')) {
      phases['phase_1'] = { name: 'Planning & Design', description: 'Project planning and design phase' };
      phases['phase_2'] = { name: 'Installation', description: 'System installation and setup' };
      phases['phase_3'] = { name: 'Testing & Validation', description: 'System testing and validation' };
    } else {
      // Generic phases based on document type
      phases['phase_1'] = { name: 'Phase 1: Initiation', description: 'Project initiation and planning' };
      phases['phase_2'] = { name: 'Phase 2: Execution', description: 'Main execution phase' };
      phases['phase_3'] = { name: 'Phase 3: Completion', description: 'Project completion and handover' };
    }

    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: playbookName,
        title: fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, ''),
        description: `Playbook created from ${fileName}. Document contains ${extractedText.length} characters of content.`,
        phases: phases,
        file_path: fileName
      })
      .select()
      .single();

    if (playbookError) {
      console.error('Error inserting playbook:', playbookError);
      throw playbookError;
    }

    // Create sample data for each phase
    Object.keys(phases).forEach((phaseId, index) => {
      processSteps.push({
        playbook_id: playbook.id,
        phase_id: phaseId,
        step_id: `${index + 1}.1`,
        activity: `Key activity from ${phases[phaseId].name}`,
        inputs: ['Document requirements', 'Previous phase outputs'],
        outputs: ['Phase deliverables', 'Progress reports'],
        timeline: `${index + 1}-${index + 2} days`,
        responsible: 'Project Team',
        comments: `Based on document analysis: ${extractedText.substring(0, 100)}...`
      });

      raciMatrix.push({
        playbook_id: playbook.id,
        phase_id: phaseId,
        step_id: `${index + 1}.1`,
        task: phases[phaseId].name,
        responsible: 'Project Manager',
        accountable: 'Project Sponsor',
        consulted: 'Technical Team',
        informed: 'Stakeholders'
      });
    });

    // Insert process steps
    if (processSteps.length > 0) {
      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(processSteps);

      if (!stepsError) {
        console.log(`Inserted ${processSteps.length} enhanced process steps`);
      }
    }

    // Insert RACI matrix
    if (raciMatrix.length > 0) {
      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(raciMatrix);

      if (!raciError) {
        console.log(`Inserted ${raciMatrix.length} RACI entries`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed document: ${fileName}`,
        playbookId: playbook.id,
        extractedTextLength: extractedText.length,
        aiProcessed: false,
        note: "Enhanced basic structure created from document content analysis"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing document:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to process document'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
