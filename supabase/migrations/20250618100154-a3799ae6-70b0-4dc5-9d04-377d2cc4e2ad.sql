
-- Insert the Solar Engineering playbook record
INSERT INTO public.playbooks (
  id,
  name,
  title,
  description,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'Engineering - Solar',
  'Engineering - Solar',
  'Comprehensive solar engineering execution methodology and framework',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;
