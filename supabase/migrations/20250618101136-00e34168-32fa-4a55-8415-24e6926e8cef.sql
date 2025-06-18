
-- Update the Solar Engineering playbook record with proper structure
UPDATE public.playbooks 
SET 
  phases = jsonb_build_object(
    'chapter-1', jsonb_build_object(
      'name', 'Chapter 1: Basic Engineering Design Preparation',
      'description', 'Complete basic engineering design preparation process'
    ),
    'section-1.1', jsonb_build_object(
      'name', 'Section 1.1: Process Steps',
      'description', 'Detailed process steps for basic engineering design preparation',
      'parent', 'chapter-1'
    ),
    'section-1.2', jsonb_build_object(
      'name', 'Section 1.2: RACI Matrix',
      'description', 'RACI matrix for basic engineering design preparation',
      'parent', 'chapter-1'
    ),
    'section-1.3', jsonb_build_object(
      'name', 'Section 1.3: Process Map',
      'description', 'Process map for basic engineering design preparation',
      'parent', 'chapter-1'
    )
  ),
  updated_at = now()
WHERE id = '550e8400-e29b-41d4-a716-446655440001';

-- Ensure the playbook exists if the update didn't affect any rows
INSERT INTO public.playbooks (
  id,
  name,
  title,
  description,
  phases,
  created_at,
  updated_at
) 
SELECT 
  '550e8400-e29b-41d4-a716-446655440001',
  'Engineering - Solar',
  'Engineering - Solar',
  'Comprehensive solar engineering execution methodology and framework',
  jsonb_build_object(
    'chapter-1', jsonb_build_object(
      'name', 'Chapter 1: Basic Engineering Design Preparation',
      'description', 'Complete basic engineering design preparation process'
    ),
    'section-1.1', jsonb_build_object(
      'name', 'Section 1.1: Process Steps',
      'description', 'Detailed process steps for basic engineering design preparation',
      'parent', 'chapter-1'
    ),
    'section-1.2', jsonb_build_object(
      'name', 'Section 1.2: RACI Matrix',
      'description', 'RACI matrix for basic engineering design preparation',
      'parent', 'chapter-1'
    ),
    'section-1.3', jsonb_build_object(
      'name', 'Section 1.3: Process Map',
      'description', 'Process map for basic engineering design preparation',
      'parent', 'chapter-1'
    )
  ),
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM public.playbooks WHERE id = '550e8400-e29b-41d4-a716-446655440001'
);
