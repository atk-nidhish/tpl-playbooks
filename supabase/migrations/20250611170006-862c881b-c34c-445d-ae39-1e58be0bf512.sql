
-- Insert the Wind - Planning playbook
INSERT INTO public.playbooks (
  id,
  name,
  title,
  description,
  phases
) VALUES (
  gen_random_uuid(),
  'wind-planning',
  'Wind - Planning',
  'Comprehensive wind project planning playbook covering all phases from integration management to risk management',
  '{
    "chapter-1": {
      "name": "Chapter 1 - Plan Integration Management",
      "description": "Comprehensive plan integration management for wind projects"
    },
    "section-1-1": {
      "name": "Section 1.1 - Project Plan Preparation During Bidding",
      "description": "Process steps for project plan preparation during bidding phase",
      "parent": "chapter-1"
    },
    "section-1-2": {
      "name": "Section 1.2 - Project Schedule and Execution Approach",
      "description": "Project scheduling and execution methodology",
      "parent": "chapter-1"
    },
    "section-1-3": {
      "name": "Section 1.3 - Land Finalization Plan",
      "description": "Land acquisition and finalization procedures",
      "parent": "chapter-1"
    },
    "section-1-4": {
      "name": "Section 1.4 - Engineering Plan",
      "description": "Engineering planning and design processes",
      "parent": "chapter-1"
    },
    "section-1-5": {
      "name": "Section 1.5 - Procurement Plan",
      "description": "Procurement strategy and execution plan",
      "parent": "chapter-1"
    },
    "section-1-6": {
      "name": "Section 1.6 - Construction Plan",
      "description": "Construction planning and execution",
      "parent": "chapter-1"
    },
    "section-1-7": {
      "name": "Section 1.7 - Commissioning Plan",
      "description": "Commissioning procedures and testing",
      "parent": "chapter-1"
    },
    "section-1-8": {
      "name": "Section 1.8 - Plan Integration",
      "description": "Integration of all planning components",
      "parent": "chapter-1"
    },
    "section-1-9": {
      "name": "Section 1.9 - Plan Update",
      "description": "Plan update and revision procedures",
      "parent": "chapter-1"
    },
    "chapter-2": {
      "name": "Chapter 2 - Scope Management Plan",
      "description": "Scope definition and management procedures"
    },
    "chapter-3": {
      "name": "Chapter 3 - Cost Management Plan",
      "description": "Cost planning and budget management"
    },
    "chapter-4": {
      "name": "Chapter 4 - Quality Management Plan",
      "description": "Quality assurance and control procedures"
    },
    "chapter-5": {
      "name": "Chapter 5 - Statutory Approval Management Plan",
      "description": "Regulatory and statutory approval processes"
    },
    "chapter-6": {
      "name": "Chapter 6 - Risk Management Plan",
      "description": "Risk identification, assessment and mitigation"
    }
  }'
);

-- Insert sample process steps for Section 1.1
INSERT INTO public.process_steps (
  playbook_id,
  phase_id,
  step_id,
  activity,
  inputs,
  outputs,
  timeline,
  responsible,
  comments
) VALUES
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '1.1.1',
  'Review project requirements and specifications',
  ARRAY['Project RFP', 'Technical specifications', 'Site data'],
  ARRAY['Requirements analysis document', 'Technical review report'],
  '2-3 days',
  'Project Manager',
  'Initial assessment of project scope and technical requirements'
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '1.1.2',
  'Conduct preliminary site assessment',
  ARRAY['Site survey data', 'Environmental reports', 'Wind resource data'],
  ARRAY['Site assessment report', 'Feasibility analysis'],
  '5-7 days',
  'Engineering Team',
  'Evaluate site conditions and wind resource potential'
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '1.1.3',
  'Develop preliminary project plan',
  ARRAY['Requirements analysis', 'Site assessment', 'Resource allocation'],
  ARRAY['Preliminary project plan', 'Timeline estimates'],
  '3-5 days',
  'Project Manager',
  'Create initial project framework and timeline'
);

-- Insert sample RACI matrix for Section 1.1
INSERT INTO public.raci_matrix (
  playbook_id,
  phase_id,
  step_id,
  task,
  responsible,
  accountable,
  consulted,
  informed
) VALUES
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '1.1.1',
  'Project requirements review',
  'Project Manager',
  'Project Director',
  'Engineering Lead, Commercial Manager',
  'Development Team, Legal Team'
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '1.1.2',
  'Site assessment coordination',
  'Engineering Lead',
  'Project Manager',
  'Environmental Specialist, Survey Team',
  'Project Director, Commercial Manager'
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '1.1.3',
  'Preliminary planning',
  'Project Manager',
  'Project Director',
  'Engineering Team, Commercial Team',
  'Senior Management, Stakeholders'
);

-- Insert sample process map for Section 1.1
INSERT INTO public.process_map (
  playbook_id,
  phase_id,
  step_id,
  step_type,
  title,
  description,
  order_index
) VALUES
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '1',
  'start',
  'Project Initiation',
  'Begin project plan preparation process',
  1
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '2',
  'process',
  'Requirements Analysis',
  'Analyze project requirements and specifications',
  2
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '3',
  'process',
  'Site Assessment',
  'Conduct preliminary site evaluation',
  3
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '4',
  'decision',
  'Feasibility Check',
  'Determine project feasibility',
  4
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '5',
  'process',
  'Plan Development',
  'Create preliminary project plan',
  5
),
(
  (SELECT id FROM public.playbooks WHERE name = 'wind-planning'),
  'section-1-1',
  '6',
  'end',
  'Plan Approval',
  'Complete plan preparation phase',
  6
);
