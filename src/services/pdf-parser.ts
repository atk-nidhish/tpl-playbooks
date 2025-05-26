
import { supabase } from '@/integrations/supabase/client';

export interface ParsedPlaybookData {
  title: string;
  description: string;
  phases: any;
  processSteps: any[];
  raciMatrix: any[];
  processMap: any[];
}

export const processUploadedPlaybook = async (fileName: string) => {
  try {
    console.log(`Processing uploaded playbook with Groq AI: ${fileName}`);
    
    // Check if playbook already exists
    const { data: existingPlaybook, error: checkError } = await supabase
      .from('playbooks')
      .select('id, name')
      .eq('name', fileName.replace('.pdf', ''))
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing playbook:', checkError);
      throw checkError;
    }

    if (existingPlaybook) {
      console.log('Playbook already exists, skipping:', existingPlaybook.name);
      return existingPlaybook;
    }

    console.log(`Calling Groq AI parser for: ${fileName}`);
    
    // Use Groq AI to parse the PDF content
    const { data, error } = await supabase.functions.invoke('parse-pdf-with-ai', {
      body: { fileName }
    });

    if (error) {
      console.error('Error calling Groq AI parser:', error);
      throw error;
    }

    if (!data.success) {
      console.error('AI parsing failed:', data.error);
      throw new Error(data.error || 'AI parsing failed');
    }

    console.log(`Successfully processed playbook with Groq AI: ${fileName}`);
    console.log('Processing stats:', data.stats);
    
    return data.playbook;

  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new playbooks to process with Groq AI...');
    
    // List all files in the playbooks bucket
    const { data: files, error } = await supabase.storage
      .from('playbooks')
      .list();

    if (error) {
      console.error('Error listing storage files:', error);
      throw error;
    }

    const pdfFiles = files?.filter(file => file.name.endsWith('.pdf')) || [];
    console.log(`Found ${pdfFiles.length} PDF files to process:`, pdfFiles.map(f => f.name));
    
    let processedCount = 0;
    
    for (const file of pdfFiles) {
      try {
        console.log(`Processing file with Groq AI: ${file.name}`);
        const result = await processUploadedPlaybook(file.name);
        if (result) {
          processedCount++;
          console.log(`Successfully processed: ${file.name}`);
        }
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        // Continue with other files even if one fails
      }
    }

    console.log(`Completed Groq AI processing: ${processedCount}/${pdfFiles.length} files processed successfully`);
    
  } catch (error) {
    console.error('Error scanning playbooks:', error);
    throw error;
  }
};
