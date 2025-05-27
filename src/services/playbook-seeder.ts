
import { supabase } from '@/integrations/supabase/client';

export const createPlaybookFromImages = async (title: string, description: string, phases: any) => {
  try {
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: title.toLowerCase().replace(/\s+/g, '-'),
        title: title,
        description: description,
        phases: phases
      })
      .select()
      .single();

    if (playbookError) throw playbookError;

    console.log(`Playbook ${title} created successfully`);
    return playbook;

  } catch (error) {
    console.error('Error creating playbook from images:', error);
    throw error;
  }
};

export const addProcessSteps = async (playbookId: string, steps: any[]) => {
  try {
    const { error } = await supabase
      .from('process_steps')
      .insert(steps.map(step => ({ ...step, playbook_id: playbookId })));

    if (error) throw error;
    console.log('Process steps added successfully');
  } catch (error) {
    console.error('Error adding process steps:', error);
    throw error;
  }
};

export const addRACIMatrix = async (playbookId: string, raciData: any[]) => {
  try {
    const { error } = await supabase
      .from('raci_matrix')
      .insert(raciData.map(item => ({ ...item, playbook_id: playbookId })));

    if (error) throw error;
    console.log('RACI matrix added successfully');
  } catch (error) {
    console.error('Error adding RACI matrix:', error);
    throw error;
  }
};

export const addProcessMap = async (playbookId: string, processMapData: any[]) => {
  try {
    const { error } = await supabase
      .from('process_map')
      .insert(processMapData.map(item => ({ ...item, playbook_id: playbookId })));

    if (error) throw error;
    console.log('Process map added successfully');
  } catch (error) {
    console.error('Error adding process map:', error);
    throw error;
  }
};
