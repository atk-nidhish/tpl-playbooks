
import { supabase } from '@/integrations/supabase/client';

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new playbooks to process with Groq AI...');
    
    // List all files in the storage bucket
    const { data: files, error: listError } = await supabase.storage
      .from('playbooks')
      .list();

    if (listError) {
      console.error('Error listing files:', listError);
      return;
    }

    if (!files || files.length === 0) {
      console.log('No files found in storage bucket');
      return;
    }

    // Filter for PDF and Word files
    const supportedFiles = files.filter(file => 
      file.name.toLowerCase().endsWith('.pdf') || 
      file.name.toLowerCase().endsWith('.docx') ||
      file.name.toLowerCase().endsWith('.doc')
    );

    console.log(`Found ${supportedFiles.length} supported files to process:`, supportedFiles.map(f => f.name));

    let successCount = 0;
    const totalFiles = supportedFiles.length;

    for (const file of supportedFiles) {
      try {
        console.log(`Processing file with Groq AI: ${file.name}`);
        await processUploadedPlaybook(file.name);
        successCount++;
        console.log(`Successfully processed: ${file.name}`);
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
      }
    }

    console.log(`Completed Groq AI processing: ${successCount}/${totalFiles} files processed successfully`);
  } catch (error) {
    console.error('Error in scanAndProcessPlaybooks:', error);
  }
};

export const processUploadedPlaybook = async (fileName: string) => {
  try {
    console.log(`Processing uploaded playbook with Groq AI: ${fileName}`);
    
    // Extract playbook name from filename (remove extension)
    const playbookName = fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase();
    
    // Check if playbook already exists
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', playbookName)
      .single();

    if (existingPlaybook) {
      console.log(`Playbook already exists, skipping: ${playbookName}`);
      return;
    }

    console.log(`Calling Groq AI parser for: ${fileName}`);
    
    // Call the Groq AI edge function
    const { data, error } = await supabase.functions.invoke('parse-pdf-with-ai', {
      body: { fileName }
    });

    if (error) {
      console.error('Error calling Groq AI parser:', error);
      throw error;
    }

    console.log(`Groq AI parsing completed for: ${fileName}`, data);
    
  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};
