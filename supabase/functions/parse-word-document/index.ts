
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
    console.log(`Processing Word document: ${fileName}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create playbook name from filename
    const playbookName = fileName.replace(/\.(docx?|PDF|pdf)$/i, '')
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    // Check if playbook exists
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', playbookName)
      .maybeSingle();

    if (existingPlaybook) {
      console.log(`Playbook ${playbookName} already exists, skipping`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Playbook ${playbookName} already exists`,
          playbookId: existingPlaybook.id
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Download the file
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download(fileName);

    if (downloadError) {
      throw new Error(`Download failed: ${downloadError.message}`);
    }

    console.log('Word document downloaded successfully, size:', fileData.size);

    let extractedText = '';
    
    try {
      // Try to extract text from Word document
      const arrayBuffer = await fileData.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Convert to string and try to extract readable text
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const rawText = decoder.decode(uint8Array);
      
      // Look for XML content in DOCX files
      if (fileName.toLowerCase().endsWith('.docx')) {
        // Extract text from XML content
        const xmlMatches = rawText.match(/<w:t[^>]*>([^<]+)<\/w:t>/g);
        if (xmlMatches) {
          extractedText = xmlMatches
            .map(match => match.replace(/<[^>]+>/g, ''))
            .filter(text => text.length > 1 && /[a-zA-Z]/.test(text))
            .join(' ');
        }
      }
      
      // Fallback: try to find readable text patterns
      if (!extractedText || extractedText.length < 100) {
        const readableTextPattern = /[A-Za-z][A-Za-z0-9\s\.,!?:;-]{10,}/g;
        const matches = rawText.match(readableTextPattern);
        if (matches) {
          extractedText = matches.slice(0, 30).join(' ');
        }
      }
      
      console.log('Extracted text length:', extractedText.length);
      console.log('Extracted text preview:', extractedText.substring(0, 500));
      
    } catch (textError) {
      console.warn('Text extraction failed:', textError);
      extractedText = 'Word document content extraction failed - using basic structure';
    }

    // Process with AI if we have both extracted text and API key
    if (groqApiKey && extractedText && extractedText.length > 50) {
      try {
        console.log('Processing Word document with AI...');
        
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
                content: `You are an expert at analyzing Word documents and creating structured playbooks. Extract key information and organize it into chapters, process steps, and responsibilities.

Please analyze the document and return a JSON object with this structure:
{
  "title": "Document Title",
  "description": "Brief description",
  "phases": {
    "chapter_1": {"name": "Chapter Name", "description": "Chapter description"},
    "chapter_2": {"name": "Chapter Name", "description": "Chapter description"}
  },
  "processSteps": [
    {
      "phase_id": "chapter_1",
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
      "phase_id": "chapter_1",
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
                content: `Please analyze this Word document content and create a structured playbook:\n\n${extractedText.substring(0, 4000)}`
              }
            ],
            temperature: 0.3,
            max_tokens: 2000
          })
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          const aiContent = aiData.choices[0].message.content;
          
          console.log('AI Response for Word doc:', aiContent);
          
          // Try to parse AI response as JSON
          let parsedData;
          try {
            const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              parsedData = JSON.parse(jsonMatch[0]);
            }
          } catch (parseError) {
            console.warn('Failed to parse AI response as JSON:', parseError);
          }
          
          if (parsedData && parsedData.phases) {
            console.log('Successfully parsed AI data for Word document');
            
            // Create playbook with AI-extracted data
            const { data: playbook, error: playbookError } = await supabase
              .from('playbooks')
              .insert({
                name: playbookName,
                title: parsedData.title || fileName.replace(/\.(docx?|PDF|pdf)$/i, ''),
                description: parsedData.description || `Generated from Word document: ${fileName}`,
                phases: parsedData.phases,
                file_path: fileName
              })
              .select()
              .single();

            if (playbookError) {
              throw new Error(`Failed to create playbook: ${playbookError.message}`);
            }

            // Insert AI-generated process steps
            if (parsedData.processSteps && Array.isArray(parsedData.processSteps)) {
              const processStepsWithPlaybookId = parsedData.processSteps.map(step => ({
                ...step,
                playbook_id: playbook.id
              }));
              
              const { error: stepsError } = await supabase
                .from('process_steps')
                .insert(processStepsWithPlaybookId);

              if (!stepsError) {
                console.log(`Inserted ${processStepsWithPlaybookId.length} AI-generated process steps`);
              }
            }

            // Insert AI-generated RACI matrix
            if (parsedData.raciMatrix && Array.isArray(parsedData.raciMatrix)) {
              const raciWithPlaybookId = parsedData.raciMatrix.map(raci => ({
                ...raci,
                playbook_id: playbook.id
              }));
              
              const { error: raciError } = await supabase
                .from('raci_matrix')
                .insert(raciWithPlaybookId);

              if (!raciError) {
                console.log(`Inserted ${raciWithPlaybookId.length} AI-generated RACI entries`);
              }
            }

            return new Response(
              JSON.stringify({ 
                success: true, 
                message: `Successfully processed Word document with AI: ${fileName}`,
                playbookId: playbook.id,
                extractedTextLength: extractedText.length,
                aiProcessed: true
              }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (aiError) {
        console.warn('AI processing failed for Word document, falling back:', aiError);
      }
    }

    console.log('Creating enhanced basic playbook structure for Word document:', fileName);

    // Analyze extracted text to create more relevant chapters
    const phases = {};
    const lowerText = extractedText.toLowerCase();
    
    if (lowerText.includes('procedure') || lowerText.includes('process')) {
      phases['chapter_1'] = { name: 'Chapter 1: Overview & Procedures', description: 'Document overview and main procedures' };
      phases['chapter_2'] = { name: 'Chapter 2: Implementation', description: 'Step-by-step implementation guide' };
      phases['chapter_3'] = { name: 'Chapter 3: Validation & Completion', description: 'Validation and completion procedures' };
    } else if (lowerText.includes('guideline') || lowerText.includes('standard')) {
      phases['chapter_1'] = { name: 'Chapter 1: Guidelines & Standards', description: 'Key guidelines and standards' };
      phases['chapter_2'] = { name: 'Chapter 2: Application', description: 'Practical application of guidelines' };
      phases['chapter_3'] = { name: 'Chapter 3: Compliance', description: 'Compliance and verification' };
    } else {
      phases['chapter_1'] = { name: 'Chapter 1: Introduction', description: 'Introduction and overview' };
      phases['chapter_2'] = { name: 'Chapter 2: Main Content', description: 'Core document content' };
      phases['chapter_3'] = { name: 'Chapter 3: Conclusion', description: 'Summary and next steps' };
    }

    // Insert playbook
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: playbookName,
        title: fileName.replace(/\.(docx?|PDF|pdf)$/i, ''),
        description: `Generated from Word document: ${fileName}. Contains ${extractedText.length} characters of analyzed content.`,
        phases: phases,
        file_path: fileName
      })
      .select()
      .single();

    if (playbookError) {
      throw new Error(`Failed to create playbook: ${playbookError.message}`);
    }

    console.log('Created playbook:', playbook);

    // Insert enhanced process steps for each chapter
    const processStepsData = [];
    const raciData = [];
    
    Object.keys(phases).forEach((phaseId, index) => {
      processStepsData.push({
        playbook_id: playbook.id,
        phase_id: phaseId,
        step_id: `${index + 1}.1`,
        activity: `Key activity from ${phases[phaseId].name}`,
        inputs: ['Document section content', 'Previous chapter outputs'],
        outputs: ['Chapter deliverables', 'Progress documentation'],
        timeline: `${index + 2} hours`,
        responsible: 'Document Owner',
        comments: `Based on document analysis: ${extractedText.substring(index * 100, (index + 1) * 100)}...`
      });

      raciData.push({
        playbook_id: playbook.id,
        phase_id: phaseId,
        step_id: `${index + 1}.1`,
        task: phases[phaseId].name,
        responsible: 'Content Owner',
        accountable: 'Document Manager',
        consulted: 'Subject Matter Expert',
        informed: 'Stakeholders'
      });
    });

    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processStepsData);

    if (!stepsError) {
      console.log(`Inserted ${processStepsData.length} enhanced process steps`);
    }

    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciData);

    if (!raciError) {
      console.log(`Inserted ${raciData.length} enhanced RACI entries`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed Word document: ${fileName}`,
        playbookId: playbook.id,
        extractedTextLength: extractedText.length,
        aiProcessed: false,
        note: "Enhanced basic structure created from document content analysis"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Word document:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Word document processing failed'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
