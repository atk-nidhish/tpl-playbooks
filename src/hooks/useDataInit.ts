
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createWindCommissioningPlaybook } from '@/services/playbook-seeder';

export const useDataInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check if we already have the Wind Commissioning playbook
        const { data: existingPlaybooks } = await supabase
          .from('playbooks')
          .select('id')
          .eq('name', 'wind-commissioning-playbook');

        if (!existingPlaybooks || existingPlaybooks.length === 0) {
          await createWindCommissioningPlaybook();
        }
        
        console.log('System ready with Wind Commissioning Playbook');
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
