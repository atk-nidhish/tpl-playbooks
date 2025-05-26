
import { useEffect, useState } from 'react';
import { seedOriginalPlaybook } from '@/services/playbook-seeder';
import { supabase } from '@/integrations/supabase/client';

export const useDataInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check if we already have playbooks
        const { data: existingPlaybooks } = await supabase
          .from('playbooks')
          .select('id')
          .eq('name', 'solar-execution-original');

        if (!existingPlaybooks || existingPlaybooks.length === 0) {
          await seedOriginalPlaybook();
        }
        
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
