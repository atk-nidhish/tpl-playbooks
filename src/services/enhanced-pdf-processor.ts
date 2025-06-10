
import { supabase } from '@/integrations/supabase/client';

export const processDigitalWindPlanningPDF = async (pdfUrl: string) => {
  try {
    console.log('Processing Digital Wind Planning PDF:', pdfUrl);
    
    const { data, error } = await supabase.functions.invoke('parse-pdf-enhanced', {
      body: { pdfUrl },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (error) {
      console.error('Error calling enhanced PDF parser:', error);
      throw error;
    }

    console.log('Enhanced PDF processing result:', data);
    return data;
    
  } catch (error) {
    console.error('Error in enhanced PDF processing:', error);
    throw error;
  }
};
