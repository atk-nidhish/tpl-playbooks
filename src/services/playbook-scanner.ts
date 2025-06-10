
import { supabase } from '@/integrations/supabase/client';
import { processUploadedPlaybook } from './playbook-processor';
import { createBasicPlaybook } from './playbook-creator';

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new playbooks to process...');
    
    // First ensure the storage bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return;
    }
    
    const playbookBucket = buckets?.find(bucket => bucket.name === 'playbooks');
    if (!playbookBucket) {
      console.log('Playbooks bucket not found, it may need to be created');
      return;
    }
    
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
        const result = await processUploadedPlaybook(file.name);
        if (result) {
          successCount++;
          console.log(`Successfully processed: ${file.name}`);
        }
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        // Create a basic playbook even if processing fails
        try {
          await createBasicPlaybook(file.name);
          successCount++;
          console.log(`Created basic playbook for: ${file.name}`);
        } catch (basicError) {
          console.error(`Failed to create basic playbook for ${file.name}:`, basicError);
        }
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
