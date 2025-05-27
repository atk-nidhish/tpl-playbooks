
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createWindCommissioningPlaybook } from '@/services/playbook-seeder';
import { addWindCommissioningAdditionalData } from '@/services/wind-commissioning-additional-data';
import { addWindCommissioningCompleteData } from '@/services/wind-commissioning-complete-data';

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

        // Check if additional data has already been added
        const { data: existingAdditionalSteps } = await supabase
          .from('process_steps')
          .select('id')
          .eq('playbook_id', playbookId)
          .eq('phase_id', 'Chapter 4')
          .eq('step_id', 'P13');

        if (!existingAdditionalSteps || existingAdditionalSteps.length === 0) {
          await addWindCommissioningAdditionalData(playbookId);
        }

        // Add complete data for chapters 3.1, 3.2, and 5
        await addWindCommissioningCompleteData(playbookId);
        
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
