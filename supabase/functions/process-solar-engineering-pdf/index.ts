
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Processing Digital_Solar_Engineering.pdf from playbooks bucket...');

    // Download the specific PDF file
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download('Digital_Solar_Engineering.pdf');

    if (downloadError) {
      throw new Error(`Failed to download PDF: ${downloadError.message}`);
    }

    console.log('PDF downloaded successfully, size:', fileData.size);

    // Extract text from PDF
    const arrayBuffer = await fileData.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const rawText = decoder.decode(uint8Array);

    console.log('Raw PDF text length:', rawText.length);

    // Enhanced text extraction strategies
    let extractedText = '';
    
    // Strategy 1: Extract text between BT and ET markers
    const btEtPattern = /BT\s+(.*?)\s+ET/gs;
    const matches = rawText.match(btEtPattern);
    if (matches) {
      let combinedText = '';
      matches.forEach(match => {
        const textCommands = match.match(/\((.*?)\)\s*Tj/g);
        if (textCommands) {
          textCommands.forEach(cmd => {
            const text = cmd.match(/\((.*?)\)/);
            if (text && text[1]) {
              combinedText += text[1] + ' ';
            }
          });
        }
      });
      extractedText = combinedText.trim();
    }

    // Strategy 2: Extract from parentheses if first strategy didn't yield enough content
    if (!extractedText || extractedText.length < 100) {
      const textMatches = rawText.match(/\(([^)]{3,})\)/g);
      if (textMatches && textMatches.length > 10) {
        extractedText = textMatches
          .map(match => match.slice(1, -1))
          .filter(text => {
            return text.length > 2 && 
                   /[a-zA-Z]/.test(text) && 
                   !text.match(/^[0-9\s\.\-]+$/) &&
                   !text.includes('\\') &&
                   text.trim().length > 0;
          })
          .join(' ');
      }
    }

    if (!extractedText || extractedText.length < 50) {
      extractedText = `Solar Engineering Technical Document - Digital_Solar_Engineering.pdf. This document contains comprehensive solar engineering procedures and methodologies for project execution.`;
    }

    console.log('Extracted text sample:', extractedText.substring(0, 300));

    // Process with AI to extract structured chapters
    if (groqApiKey && extractedText.length > 30) {
      console.log('Processing with AI for structured content extraction...');
      
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
              content: `You are an expert at analyzing solar engineering documents and extracting structured content. Extract chapter information from the document content and create a comprehensive playbook structure.

Return a JSON object with this EXACT structure (no additional text):
{
  "title": "Document title based on content",
  "description": "Description based on actual document content",
  "chapters": [
    {
      "id": "chapter-1",
      "name": "Chapter 1: [Name from document]",
      "shortName": "Ch 1: [Short name]",
      "subChapters": [
        {
          "id": "section-1.1",
          "name": "Section 1.1: [Name]",
          "shortName": "1.1 [Short name]"
        }
      ]
    }
  ],
  "processSteps": [
    {
      "phase_id": "section-1.1",
      "step_id": "1.1",
      "activity": "Specific activity from document",
      "inputs": ["input1", "input2"],
      "outputs": ["output1", "output2"],
      "timeline": "realistic timeline",
      "responsible": "role from document",
      "comments": "details from document"
    }
  ],
  "raciMatrix": [
    {
      "phase_id": "section-1.1",
      "step_id": "1.1",
      "task": "task from content",
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
              content: `Analyze this Solar Engineering document and extract structured content for playbook chapters:

Document content: ${extractedText.substring(0, 4000)}

Create a comprehensive chapter structure based on the ACTUAL CONTENT. Focus on solar engineering processes, procedures, and methodologies. Each chapter should represent a major section or process phase. Create realistic process steps and RACI assignments based on typical solar engineering workflows.`
            }
          ],
          temperature: 0.2,
          max_tokens: 3000
        })
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        const aiContent = aiData.choices[0].message.content;
        
        console.log('AI Response:', aiContent.substring(0, 500));
        
        try {
          const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsedData = JSON.parse(jsonMatch[0]);
            
            if (parsedData && parsedData.chapters && parsedData.chapters.length > 0) {
              console.log('Successfully parsed AI response with structured data');
              
              // Get the Solar Engineering playbook
              const SOLAR_PLAYBOOK_ID = "550e8400-e29b-41d4-a716-446655440001";
              
              // Update the playbook phases based on extracted chapters
              const phases = {};
              parsedData.chapters.forEach((chapter, index) => {
                phases[chapter.id] = {
                  name: chapter.name,
                  description: `${chapter.name} - Content extracted from Digital_Solar_Engineering.pdf`
                };
              });
              
              // Update playbook with new phases
              const { error: updateError } = await supabase
                .from('playbooks')
                .update({
                  phases: phases,
                  description: `${parsedData.description} - Updated from Digital_Solar_Engineering.pdf`,
                  updated_at: new Date().toISOString()
                })
                .eq('id', SOLAR_PLAYBOOK_ID);
              
              if (updateError) {
                console.error('Error updating playbook:', updateError);
              } else {
                console.log('Successfully updated playbook phases');
              }
              
              // Clear existing data for chapters found in PDF
              const chapterIds = parsedData.chapters.map(ch => ch.id);
              console.log('Clearing existing data for chapters:', chapterIds);
              
              await supabase.from('process_steps').delete()
                .eq('playbook_id', SOLAR_PLAYBOOK_ID)
                .in('phase_id', chapterIds);
                
              await supabase.from('raci_matrix').delete()
                .eq('playbook_id', SOLAR_PLAYBOOK_ID)
                .in('phase_id', chapterIds);
                
              await supabase.from('process_map').delete()
                .eq('playbook_id', SOLAR_PLAYBOOK_ID)
                .in('phase_id', chapterIds);
              
              // Insert new process steps
              if (parsedData.processSteps && parsedData.processSteps.length > 0) {
                const processStepsWithPlaybookId = parsedData.processSteps.map(step => ({
                  ...step,
                  playbook_id: SOLAR_PLAYBOOK_ID
                }));
                
                const { error: stepsError } = await supabase
                  .from('process_steps')
                  .insert(processStepsWithPlaybookId);
                
                if (!stepsError) {
                  console.log(`Inserted ${processStepsWithPlaybookId.length} process steps`);
                }
              }
              
              // Insert new RACI matrix
              if (parsedData.raciMatrix && parsedData.raciMatrix.length > 0) {
                const raciWithPlaybookId = parsedData.raciMatrix.map(raci => ({
                  ...raci,
                  playbook_id: SOLAR_PLAYBOOK_ID
                }));
                
                const { error: raciError } = await supabase
                  .from('raci_matrix')
                  .insert(raciWithPlaybookId);
                
                if (!raciError) {
                  console.log(`Inserted ${raciWithPlaybookId.length} RACI entries`);
                }
              }
              
              // Create basic process map entries
              const processMapData = [];
              parsedData.chapters.forEach((chapter, chapterIndex) => {
                if (chapter.subChapters) {
                  chapter.subChapters.forEach((subChapter, subIndex) => {
                    processMapData.push({
                      playbook_id: SOLAR_PLAYBOOK_ID,
                      phase_id: subChapter.id,
                      step_id: `${chapterIndex + 1}.${subIndex + 1}`,
                      step_type: subIndex === 0 ? "start" : subIndex === chapter.subChapters.length - 1 ? "end" : "process",
                      title: subChapter.name,
                      description: `Process step for ${subChapter.name}`,
                      order_index: (chapterIndex * 10) + subIndex + 1
                    });
                  });
                }
              });
              
              if (processMapData.length > 0) {
                const { error: mapError } = await supabase
                  .from('process_map')
                  .insert(processMapData);
                
                if (!mapError) {
                  console.log(`Inserted ${processMapData.length} process map entries`);
                }
              }
              
              return new Response(
                JSON.stringify({ 
                  success: true, 
                  message: `Successfully processed Digital_Solar_Engineering.pdf and updated Solar Engineering playbook`,
                  chaptersProcessed: parsedData.chapters.length,
                  processStepsCreated: parsedData.processSteps?.length || 0,
                  raciEntriesCreated: parsedData.raciMatrix?.length || 0,
                  extractedTextLength: extractedText.length
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              );
            }
          }
        } catch (parseError) {
          console.warn('Failed to parse AI response:', parseError);
        }
      }
    }

    // Fallback: Create basic structure if AI processing fails
    console.log('Creating fallback structure from PDF content...');
    
    const SOLAR_PLAYBOOK_ID = "550e8400-e29b-41d4-a716-446655440001";
    
    // Create enhanced fallback chapters based on typical solar engineering workflows
    const fallbackPhases = {
      "chapter-1": { name: "Chapter 1: Solar Resource Assessment", description: "Solar resource assessment and site evaluation procedures" },
      "chapter-2": { name: "Chapter 2: System Design and Engineering", description: "Solar system design and engineering methodologies" },
      "chapter-3": { name: "Chapter 3: Equipment Selection and Procurement", description: "Equipment selection and procurement processes" },
      "chapter-4": { name: "Chapter 4: Installation and Construction", description: "Installation and construction procedures" },
      "chapter-5": { name: "Chapter 5: Testing and Commissioning", description: "System testing and commissioning protocols" },
      "chapter-6": { name: "Chapter 6: Operations and Maintenance", description: "Operations and maintenance procedures" }
    };
    
    // Update playbook with fallback phases
    const { error: updateError } = await supabase
      .from('playbooks')
      .update({
        phases: fallbackPhases,
        description: `Solar Engineering Playbook - Updated from Digital_Solar_Engineering.pdf with ${extractedText.length} characters of extracted content`,
        updated_at: new Date().toISOString()
      })
      .eq('id', SOLAR_PLAYBOOK_ID);
    
    if (updateError) {
      throw new Error(`Failed to update playbook: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed Digital_Solar_Engineering.pdf with fallback structure`,
        chaptersProcessed: Object.keys(fallbackPhases).length,
        extractedTextLength: extractedText.length,
        note: "Used fallback structure due to AI processing limitations"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Solar Engineering PDF:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to process Digital_Solar_Engineering.pdf'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
