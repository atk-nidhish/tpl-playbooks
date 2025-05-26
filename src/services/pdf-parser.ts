
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
    console.log(`Processing uploaded playbook with AI: ${fileName}`);
    
    // Check if playbook already exists
    const { data: existingPlaybook, error: checkError } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', fileName.replace('.pdf', ''))
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing playbook:', checkError);
      throw checkError;
    }

    if (existingPlaybook) {
      console.log('Playbook already exists, returning existing:', existingPlaybook.id);
      return existingPlaybook;
    }

    // Use AI to parse the PDF content
    const { data, error } = await supabase.functions.invoke('parse-pdf-with-ai', {
      body: { fileName }
    });

    if (error) {
      console.error('Error calling AI parser:', error);
      throw error;
    }

    console.log(`Successfully processed playbook with AI: ${fileName}`);
    return data.playbook;

  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new playbooks to process with AI...');
    
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
    
    for (const file of pdfFiles) {
      console.log(`Processing file with AI: ${file.name}`);
      await processUploadedPlaybook(file.name);
    }

    console.log(`Completed AI processing of ${pdfFiles.length} PDF files`);
    
  } catch (error) {
    console.error('Error scanning playbooks:', error);
    throw error;
  }
};
