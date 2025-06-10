
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
      throw bucketsError;
    }
    
    const playbookBucket = buckets?.find(bucket => bucket.name === 'playbooks');
    if (!playbookBucket) {
      console.log('Playbooks bucket not found, it may need to be created');
      return;
    }
    
    // List all files in the storage bucket
    const { data: files, error: listError } = await supabase.storage
      .from('playbooks')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (listError) {
      console.error('Error listing files:', listError);
      throw listError;
    }

    if (!files || files.length === 0) {
      console.log('No files found in storage bucket');
      return [];
    }

    console.log('Found files in storage:', files.map(f => f.name));

    // Filter for supported files
    const supportedFiles = files.filter(file => 
      file.name.toLowerCase().endsWith('.pdf') || 
      file.name.toLowerCase().endsWith('.docx') ||
      file.name.toLowerCase().endsWith('.doc')
    );

    console.log(`Found ${supportedFiles.length} supported files to process:`, supportedFiles.map(f => f.name));

    // Get existing playbooks to avoid duplicates
    const { data: existingPlaybooks } = await supabase
      .from('playbooks')
      .select('file_path, name');

    const existingFilePaths = new Set(existingPlaybooks?.map(p => p.file_path) || []);
    const existingNames = new Set(existingPlaybooks?.map(p => p.name) || []);

    let successCount = 0;
    const processedPlaybooks = [];

    for (const file of supportedFiles) {
      try {
        // Check if this file has already been processed
        const playbookName = file.name.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase();
        
        if (existingFilePaths.has(file.name) || existingNames.has(playbookName)) {
          console.log(`Skipping already processed file: ${file.name}`);
          continue;
        }

        console.log(`Processing new file: ${file.name}`);
        const result = await processUploadedPlaybook(file.name);
        
        if (result) {
          successCount++;
          processedPlaybooks.push(result);
          console.log(`Successfully processed: ${file.name}`);
        }
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        // Create a basic playbook even if processing fails
        try {
          const basicResult = await createBasicPlaybook(file.name);
          if (basicResult) {
            successCount++;
            processedPlaybooks.push(basicResult);
            console.log(`Created basic playbook for: ${file.name}`);
          }
        } catch (basicError) {
          console.error(`Failed to create basic playbook for ${file.name}:`, basicError);
        }
      }
    }

    console.log(`Completed processing: ${successCount}/${supportedFiles.length} files processed successfully`);
    
    return processedPlaybooks;
    
  } catch (error) {
    console.error('Error in scanAndProcessPlaybooks:', error);
    throw error;
  }
};

// Function to manually trigger scanning for a specific file
export const scanSpecificFile = async (fileName: string) => {
  try {
    console.log(`Scanning for specific file: ${fileName}`);
    
    // Check if file exists in storage
    const { data: files, error: listError } = await supabase.storage
      .from('playbooks')
      .list('', {
        search: fileName
      });

    if (listError) {
      console.error('Error checking for file:', listError);
      throw listError;
    }

    const targetFile = files?.find(f => f.name === fileName);
    if (!targetFile) {
      throw new Error(`File ${fileName} not found in storage`);
    }

    // Check if already processed
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id, name')
      .or(`file_path.eq.${fileName},name.eq.${fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase()}`)
      .maybeSingle();

    if (existingPlaybook) {
      console.log(`File ${fileName} already processed as playbook:`, existingPlaybook);
      return existingPlaybook;
    }

    // Process the file
    console.log(`Processing file: ${fileName}`);
    const result = await processUploadedPlaybook(fileName);
    
    return result;
  } catch (error) {
    console.error(`Error scanning specific file ${fileName}:`, error);
    throw error;
  }
};
