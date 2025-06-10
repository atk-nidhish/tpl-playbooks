
import { supabase } from '@/integrations/supabase/client';
import { createBasicPlaybook } from './playbook-creator';

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
      return existingPlaybook;
    }

    // Try to process with AI first, but fall back to basic playbook if it fails
    try {
      // Determine parser based on file type
      const isWordDoc = fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc');
      const functionName = isWordDoc ? 'parse-word-document' : 'parse-pdf-with-ai';
      
      console.log(`Attempting enhanced AI processing with ${functionName} for: ${fileName}`);
      
      // Call the appropriate edge function with timeout
      const result = await Promise.race([
        supabase.functions.invoke(functionName, {
          body: { fileName },
          headers: {
            'Content-Type': 'application/json',
          }
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Processing timeout after 45 seconds')), 45000)
        )
      ]);

      const { data, error } = result as { data: any; error: any };

      if (error) {
        console.warn(`AI processing failed for ${fileName}, creating enhanced basic playbook:`, error);
        return await createBasicPlaybook(fileName);
      }

      console.log(`Successfully processed with enhanced AI: ${fileName}`, data);
      return data;
      
    } catch (aiError) {
      console.warn(`AI processing failed for ${fileName}, creating enhanced basic playbook:`, aiError);
      return await createBasicPlaybook(fileName);
    }
    
  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};
