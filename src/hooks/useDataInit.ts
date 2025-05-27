
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createWindCommissioningPlaybook } from '@/services/playbook-seeder';
import { resetAndRecreateChapters } from '@/services/chapter-data-reset';

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

        let playbookId: string;
        
        if (!existingPlaybooks || existingPlaybooks.length === 0) {
          const newPlaybookId = await createWindCommissioningPlaybook();
          playbookId = newPlaybookId;
        } else {
          playbookId = existingPlaybooks[0].id;
        }

        // Reset and recreate chapters 3.1, 3.2, and 5 with fresh data
        await resetAndRecreateChapters(playbookId);
        
        console.log('System ready with complete Wind Commissioning Playbook');
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
