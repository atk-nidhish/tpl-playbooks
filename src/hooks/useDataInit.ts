
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useDataInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Just mark as initialized since we're ready for image-based content
        console.log('System ready for image analysis and dashboard creation');
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing data:', error);
        setIsInitialized(true);
      }
    };

    initializeData();
  }, []);

  return { isInitialized };
};
