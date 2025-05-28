
import { supabase } from '@/integrations/supabase/client';

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new playbooks to process...');
    
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

    // Filter for supported files
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
        console.log(`Processing file: ${file.name}`);
        await processUploadedPlaybook(file.name);
        successCount++;
        console.log(`Successfully processed: ${file.name}`);
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        // Continue processing other files even if one fails
      }
    }

    console.log(`Completed processing: ${successCount}/${totalFiles} files processed successfully`);
    
    if (successCount === 0 && totalFiles > 0) {
      throw new Error('No files were processed successfully');
    }
    
  } catch (error) {
    console.error('Error in scanAndProcessPlaybooks:', error);
    throw error;
  }
};

export const processUploadedPlaybook = async (fileName: string) => {
  try {
    console.log(`Processing uploaded playbook: ${fileName}`);
    
    // Extract playbook name from filename
    const playbookName = fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase();
    
    // Check if playbook already exists
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', playbookName)
      .maybeSingle();

    if (existingPlaybook) {
      console.log(`Playbook already exists, skipping: ${playbookName}`);
      return;
    }

    // Determine parser based on file type
    const isWordDoc = fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc');
    const functionName = isWordDoc ? 'parse-word-document' : 'parse-pdf-with-ai';
    
    console.log(`Using ${functionName} for: ${fileName}`);
    
    // Call the appropriate edge function
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: { fileName },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (error) {
      console.error(`Error calling ${functionName}:`, error);
      throw error;
    }

    console.log(`Successfully processed: ${fileName}`, data);
    
  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};
