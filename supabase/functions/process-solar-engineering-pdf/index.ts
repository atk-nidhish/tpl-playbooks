
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SOLAR_ENGINEERING_PLAYBOOK_ID = "550e8400-e29b-41d4-a716-446655440001";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Solar Engineering PDF processing workflow...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Download the specific PDF file from documents bucket
    console.log('Downloading Digital_Solar_Engineering.pdf from documents bucket...');
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
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

    // Enhanced text extraction methods for better structure preservation
    let extractedText = '';
    
    // Method 1: Extract text between BT and ET markers with better formatting
    const btEtPattern = /BT\s+(.*?)\s+ET/gs;
    const matches = rawText.match(btEtPattern);
    if (matches) {
      let combinedText = '';
      matches.forEach(match => {
        const textCommands = match.match(/\((.*?)\)\s*Tj/g);
        if (textCommands) {
          textCommands.forEach(cmd => {
            const text = cmd.match(/\((.*?)\)/);
            if (text && text[1] && text[1].length > 2) {
              combinedText += text[1] + ' ';
            }
          });
        }
      });
      extractedText = combinedText.trim();
    }

    // Fallback: Look for readable patterns if primary method fails
    if (!extractedText || extractedText.length < 100) {
      const readablePattern = /[A-Z][a-z\s]{10,}[\w\s\.,!?:;\-]{20,}/g;
      const readableMatches = rawText.match(readablePattern);
      if (readableMatches && readableMatches.length > 5) {
        extractedText = readableMatches.slice(0, 50).join(' ');
      }
    }

    console.log('Extracted text sample:', extractedText.substring(0, 500));

    if (!extractedText || extractedText.length < 50) {
      throw new Error('Could not extract meaningful text from PDF');
    }

    // Process with AI to extract structured content
    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not configured');
    }

    console.log('Processing with AI to extract chapter structure...');
    
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
            content: `You are an expert at analyzing engineering documents and extracting structured content for solar engineering playbooks. 

Extract chapters, process steps, RACI matrices, and process maps from the document content. Focus on:
1. Identifying clear chapter headings and sections
2. Extracting process steps with activities, inputs, outputs, timelines, and responsible parties
3. Creating RACI matrices for each process
4. Preserving bullet points and numbered lists
5. Ignoring page numbers, headers, and footers

Return a JSON object with this EXACT structure:
{
  "chapters": {
    "chapter-2.1": {
      "name": "Chapter 2.1: Owner's Engineer Finalization",
      "description": "Description from document content"
    },
    "chapter-2.2a": {
      "name": "Chapter 2.2A: Site Survey Consultant Finalization", 
      "description": "Description from document content"
    }
  },
  "processSteps": [
    {
      "chapter_id": "chapter-2.1",
      "section_id": "section-2.1.1",
      "step_id": "P1",
      "activity": "Specific activity from document",
      "inputs": ["input1", "input2"],
      "outputs": ["output1", "output2"],
      "timeline": "timeline from document",
      "responsible": "role from document",
      "comments": "additional details from document"
    }
  ],
  "raciMatrix": [
    {
      "chapter_id": "chapter-2.1",
      "section_id": "section-2.1.2", 
      "step_id": "P1",
      "task": "task from document",
      "responsible": "role",
      "accountable": "role",
      "consulted": "role",
      "informed": "role"
    }
  ],
  "processMap": [
    {
      "chapter_id": "chapter-2.1",
      "section_id": "section-2.1.3",
      "step_id": "P1",
      "step_type": "process",
      "title": "Step title from document",
      "description": "Step description from document",
      "order_index": 1
    }
  ]
}`
          },
          {
            role: 'user',
            content: `Analyze this Solar Engineering document and extract structured playbook content:

Document content: ${extractedText.substring(0, 8000)}

Extract all chapters, process steps, RACI information, and process maps. Focus on engineering-specific content and maintain the structure and detail level shown in the document.`
          }
        ],
        temperature: 0.2,
        max_tokens: 4000
      })
    });

    if (!aiResponse.ok) {
      throw new Error(`AI processing failed: ${aiResponse.statusText}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    
    console.log('AI Response preview:', aiContent.substring(0, 500));
    
    // Parse AI response
    let parsedData;
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed AI response');
      }
    } catch (parseError) {
      throw new Error(`Failed to parse AI response: ${parseError.message}`);
    }

    if (!parsedData || !parsedData.chapters) {
      throw new Error('AI response does not contain valid chapter data');
    }

    console.log(`Found ${Object.keys(parsedData.chapters).length} chapters to process`);

    // Update playbook phases with new chapters
    const { data: currentPlaybook, error: fetchError } = await supabase
      .from('playbooks')
      .select('phases')
      .eq('id', SOLAR_ENGINEERING_PLAYBOOK_ID)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch current playbook: ${fetchError.message}`);
    }

    // Merge new chapters with existing phases, replacing chapters found in PDF
    const updatedPhases = { ...currentPlaybook.phases };
    
    // Add new chapters from PDF
    Object.entries(parsedData.chapters).forEach(([chapterId, chapterData]) => {
      updatedPhases[chapterId] = chapterData;
      
      // Add corresponding sections
      updatedPhases[`section-${chapterId.split('-')[1]}.1`] = {
        name: `Section ${chapterId.split('-')[1]}.1: Process Steps`,
        description: `Process steps for ${chapterData.name}`,
        parent: chapterId
      };
      updatedPhases[`section-${chapterId.split('-')[1]}.2`] = {
        name: `Section ${chapterId.split('-')[1]}.2: RACI Matrix`,
        description: `RACI matrix for ${chapterData.name}`,
        parent: chapterId
      };
      updatedPhases[`section-${chapterId.split('-')[1]}.3`] = {
        name: `Section ${chapterId.split('-')[1]}.3: Process Map`,
        description: `Process map for ${chapterData.name}`,
        parent: chapterId
      };
    });

    // Update playbook phases
    const { error: updateError } = await supabase
      .from('playbooks')
      .update({ 
        phases: updatedPhases,
        updated_at: new Date().toISOString()
      })
      .eq('id', SOLAR_ENGINEERING_PLAYBOOK_ID);

    if (updateError) {
      throw new Error(`Failed to update playbook phases: ${updateError.message}`);
    }

    // Clear existing data for chapters found in PDF
    const chapterIds = Object.keys(parsedData.chapters);
    for (const chapterId of chapterIds) {
      const sectionPattern = `section-${chapterId.split('-')[1]}.%`;
      
      await supabase.from('process_steps')
        .delete()
        .eq('playbook_id', SOLAR_ENGINEERING_PLAYBOOK_ID)
        .like('phase_id', sectionPattern);
        
      await supabase.from('raci_matrix')
        .delete()
        .eq('playbook_id', SOLAR_ENGINEERING_PLAYBOOK_ID)
        .like('phase_id', sectionPattern);
        
      await supabase.from('process_map')
        .delete()
        .eq('playbook_id', SOLAR_ENGINEERING_PLAYBOOK_ID)
        .like('phase_id', sectionPattern);
    }

    // Insert new process steps
    if (parsedData.processSteps && parsedData.processSteps.length > 0) {
      const processStepsWithPlaybookId = parsedData.processSteps.map(step => ({
        ...step,
        playbook_id: SOLAR_ENGINEERING_PLAYBOOK_ID,
        phase_id: step.section_id
      }));
      
      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(processStepsWithPlaybookId);

      if (stepsError) {
        console.error('Error inserting process steps:', stepsError);
      } else {
        console.log(`Inserted ${processStepsWithPlaybookId.length} process steps`);
      }
    }

    // Insert new RACI matrix
    if (parsedData.raciMatrix && parsedData.raciMatrix.length > 0) {
      const raciWithPlaybookId = parsedData.raciMatrix.map(raci => ({
        ...raci,
        playbook_id: SOLAR_ENGINEERING_PLAYBOOK_ID,
        phase_id: raci.section_id
      }));
      
      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(raciWithPlaybookId);

      if (raciError) {
        console.error('Error inserting RACI matrix:', raciError);
      } else {
        console.log(`Inserted ${raciWithPlaybookId.length} RACI entries`);
      }
    }

    // Insert new process map
    if (parsedData.processMap && parsedData.processMap.length > 0) {
      const processMapWithPlaybookId = parsedData.processMap.map(map => ({
        ...map,
        playbook_id: SOLAR_ENGINEERING_PLAYBOOK_ID,
        phase_id: map.section_id
      }));
      
      const { error: mapError } = await supabase
        .from('process_map')
        .insert(processMapWithPlaybookId);

      if (mapError) {
        console.error('Error inserting process map:', mapError);
      } else {
        console.log(`Inserted ${processMapWithPlaybookId.length} process map entries`);
      }
    }

    const summary = {
      success: true,
      message: 'Solar Engineering playbook updated successfully from PDF',
      chaptersProcessed: Object.keys(parsedData.chapters).length,
      processStepsAdded: parsedData.processSteps?.length || 0,
      raciEntriesAdded: parsedData.raciMatrix?.length || 0,
      processMapEntriesAdded: parsedData.processMap?.length || 0,
      extractedTextLength: extractedText.length
    };

    console.log('Processing completed:', summary);

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in Solar Engineering PDF processing:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        details: 'Failed to process Solar Engineering PDF and update playbook'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
