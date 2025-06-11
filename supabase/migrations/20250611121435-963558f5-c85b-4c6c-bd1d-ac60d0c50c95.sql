
-- Create the Planning - Wind playbook
INSERT INTO public.playbooks (id, name, title, description) 
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-123456789012',
  'planning-wind',
  'Planning - Wind', 
  'Wind Project Planning Playbook'
);

-- Insert process steps for Chapter 1.1: Project Plan Preparation During Bidding
INSERT INTO public.process_steps (playbook_id, phase_id, step_id, activity, inputs, outputs, timeline, responsible, comments) VALUES
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'S', 'Bid Incharge* appoints Bid Planner (BP) and shares the Bid Summary** with BP for the development of Final L1 Plan', '{}', '{}', '-', 'Bid Incharge', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P1', 'BP analyzes the Bid Summary and develops the delivery milestones and timeline for the project', '{"Bid Summary"}', '{}', '1', 'Bid Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P2', 'BP develops the Preliminary L1 Plan by updating the Wind Project Master Plan to meet the delivery milestones and timelines for the project', '{"Wind Project Master Plan"}', '{"Preliminary L1 Plan"}', '1', 'Bid Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P3', 'BP updates the Preliminary L1 Plan based on the Preliminary Feasibility Report* shared by the Land Team, to draft the Final L1 Plan', '{"PFR"}', '{}', '1', 'Bid Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P4', 'BP shares the Final L1 Plan with functional leads* for inputs', '{}', '{}', '-', 'Bid Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P5', 'BP evaluates feedback from the functional teams and incorporates necessary modifications to the Final L1 Plan', '{}', '{}', '2', 'Bid Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P6', 'BP shares the Final L1 Plan for sign off by the functional leads', '{}', '{}', '1', 'Bid Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P7', 'BP seeks review and approval on the Final L1 Plan from COO', '{"Final L1 Plan"}', '{}', '1', 'Bid Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P8', 'BP incorporates any changes recommended by COO in the final L1 Plan', '{}', '{"Final L1 Plan (Template Provided)"}', '1', 'Bid Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'E', 'BP shares the Final L1 Plan with Bid Incharge for bid submission', '{}', '{}', 'Total - 7 - 8 days', 'Bid Planner', '');

-- Insert RACI matrix for Chapter 1.1
INSERT INTO public.raci_matrix (playbook_id, phase_id, step_id, task, responsible, accountable, consulted, informed) VALUES
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'S', 'Appoint Bid Planner (BP) and share the Bid Summary for Final L1 Plan development', 'Bid Incharge', '', 'Bid Incharge', 'Bid Planner'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P1', 'Analyze bid summary and develop delivery milestones and timeline for the project', 'Bid Planner', '', 'Bid Incharge', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P2', 'Prepare Preliminary L1 Plan by updating the Wind Project Master Plan to meet the delivery milestones and timelines for the project', 'Bid Planner', '', 'Bid Incharge', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P3', 'Update the Preliminary L1 Plan, based on the Preliminary Feasibility Report to draft the Final L1 Plan', 'Bid Planner', '', '', 'Land Manager'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P4', 'Share the Final L1 Plan with functional leads* for inputs', 'Bid Planner', '', '', 'Functional Leads'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P5', 'Evaluate feedback from the functional leads and incorporate changes to the Final L1 Plan', 'Bid Planner', '', '', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P6', 'Seek sign-off for Final L1 Plan from functional leads', 'Bid Planner', '', 'Bid Incharge', 'Functional Leads'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P7', 'Seek review and approval on the Final L1 Plan from COO', 'Bid Planner', 'Bid Planner', 'COO', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P8', 'Incorporate COO''s recommendations in the final L1 Plan', 'Bid Planner', 'Bid Planner', '', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'E', 'Share the Final L1 Plan with Bid Incharge for bid submission', 'Bid Planner', '', '', 'Bid Incharge');

-- Insert process steps for Chapter 1.2: Project Schedule and Execution Approach
INSERT INTO public.process_steps (playbook_id, phase_id, step_id, activity, inputs, outputs, timeline, responsible, comments) VALUES
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'S', 'The Bid Incharge notifies the Chief Projects about any bid listing won', '{}', '{}', '-', 'Bid Incharge', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P1', 'Chief Projects appoints the Project Planner (PP) and Project Manager (PM) for the project', '{}', '{}', '1', 'Chief Projects', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P2', 'Bid Incharge shares the Final L1 Plan and Final Bid Report* (FBR) with Chief Projects', '{"Final L1 Plan", "FBR"}', '{}', '-', 'Bid Incharge', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P3', 'Chief Projects shares the Final L1 Plan and Final Bid Report with Project Planner to initiate the work. Project Manager is informed of the Project Schedule (PS) and Project Execution Approach (PEA) respectively', '{"Final L1 Plan", "FBR"}', '{}', '-', 'Chief Projects', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P4', 'Project Planner develops the initial Project Schedule by leveraging the Wind Project Master Plan and modifying it to align with project requirements: To understand project requirements, review the Final L1 Plan and FBR, to analyze key milestones, critical timelines, land availability, and other details by Project Planner and Project Manager', '{"Wind Project Master Plan"}', '{"Preliminary PS"}', '1', 'Project Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P4A', 'The project timeline is broken down into various phases, each with corresponding dates along with intermediate deadlines for key deliverables', '{}', '{}', '-', 'Project Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P4B', 'Project Manager develops the Final Bid Report to develop Project Execution Approach which provides a high-level roadmap of project schedule details: Scope of the project (scope matrix), Land availability and high-level requirements, Project deliverables with size, and amount of land needed, if land parcels already been identified for the project or requires additional exploration, also as a part of PEA, to decide the project timeline, Project Manager collaborates with Project Planner to ensure alignment of delivery requirements, compliance requirements, and safety regulations in compliance with Regulatory Team', '{"Scope Matrix (part of FBR)", "FBR as ancillary)"}', '{"Preliminary PEA"}', '1', 'Project Manager', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P5', 'Project Planner reviews Project Schedule with Project Manager to ensure alignment. The Project Planner and Project Manager review are incorporated. In case of any discrepancies between the PS and PEA created by the Project Planner, the Project Manager takes the final decision', '{}', '{}', '1', 'Project Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P6', 'Project Planner and Project Manager circulate the Project Schedule and Project Execution Approach respectively to functional leads* for review', '{}', '{}', '2', 'Project Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P7A', 'Project Planner, in consultation with Project Manager, assesses the feedback received from functional leads and update the Project Schedule & Project Execution Approach', '{}', '{"Project Schedule & Project Execution Approach respectively"}', '2', 'Project Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P7B', 'Project Manager incorporates necessary changes in Project Execution Approach', '{}', '{"PEA & PS (once feedback)"}', '1', 'Project Manager', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P8', 'Project Planner seeks sign-off on Project Schedule from functional leads', '{"PS (Template Provided)"}', '{}', '1', 'Project Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P9', 'Project Planner retains finalized Project Schedule, and', '{}', '{}', 'Total - 7 - 8 days', 'Project Planner', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'E', 'Project Manager shares Project Execution Approach with Project Planner for future cross-functional coordination', '{}', '{}', '', 'Project Manager', '');

-- Insert RACI matrix for Chapter 1.2
INSERT INTO public.raci_matrix (playbook_id, phase_id, step_id, task, responsible, accountable, consulted, informed) VALUES
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'S', 'Notify Chief Projects about any bid listing won', 'Bid Incharge', '', '', 'Chief Projects'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P1', 'Designate Project Planner (PP) and Project Manager (PM) for the project', 'Chief Projects', 'Chief Projects', '', 'Project Planner & Project Manager'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P2', 'Share Final L1 Plan and Final Bid Report with Chief Projects', 'Bid Incharge', '', '', 'Chief Projects'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P3', 'Share Final L1 Plan and Final Bid Report with Project Planner and Project Manager for project details', 'Chief Projects', '', '', 'Project Planner & Project Manager'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P4A', 'Prepare the draft Project Schedule (PS), leveraging the Wind Project Master Plan and insights from Final L1 Plan and Final Bid Report', 'Project Planner', '', '', 'Chief Projects'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P4B', 'Develop Project Execution Approach (PEA) leveraging Final Bid Report', 'Project Manager', '', 'Chief Land Officer, Chief Engineering Officer, Chief Procurement & Chief Regulatory', 'Chief Projects'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P5', 'Review Project Schedule with Project Manager for alignment', 'Project Planner', 'Project Planner', '', 'Project Manager'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P6', 'Circulate Project Schedule and Project Execution Approach with functional leads* for review', 'Project Planner & Project Manager', '', '', 'Functional Leads'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P7A', 'Assess feedback from functional leads and adjust Project Schedule', 'Project Planner', '', '', 'Project Manager'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P7B', 'Assess feedback from functional leads and finalize Project Execution Approach', 'Project Manager', 'Chief Projects', '', ''),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P8', 'Seek sign-off on Project Schedule from functional leads to finalize it', 'Project Planner', '', 'Chief Projects', 'Functional Leads'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P9', 'Retain finalized Project Schedule', 'Project Planner', '', '', 'Project Manager'),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'E', 'Share Project Execution Approach with Project Planner for future cross-functional coordination', 'Project Manager', '', '', 'Project Planner');

-- Insert process map for Chapter 1.1
INSERT INTO public.process_map (playbook_id, phase_id, step_id, step_type, title, description, order_index) VALUES
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'S', 'start', 'Bid Incharge Appointment', 'Bid Incharge appoints Bid Planner and shares Bid Summary', 1),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P1', 'process', 'Analyze Bid Summary', 'Develop delivery milestones and timeline', 2),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P2', 'process', 'Preliminary L1 Plan', 'Update Wind Project Master Plan for project needs', 3),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P3', 'process', 'Update with PFR', 'Incorporate Preliminary Feasibility Report', 4),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P4', 'process', 'Share with Functional Leads', 'Get input from functional teams', 5),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P5', 'process', 'Incorporate Feedback', 'Evaluate and modify based on feedback', 6),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P6', 'process', 'Seek Sign-off', 'Get functional leads approval', 7),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P7', 'decision', 'COO Review', 'Seek review and approval from COO', 8),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'P8', 'process', 'Incorporate COO Changes', 'Apply COO recommendations', 9),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.1', 'E', 'end', 'Final L1 Plan Submission', 'Share Final L1 Plan for bid submission', 10);

-- Insert process map for Chapter 1.2
INSERT INTO public.process_map (playbook_id, phase_id, step_id, step_type, title, description, order_index) VALUES
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'S', 'start', 'Bid Listing Won', 'Chief Projects notified of won bid', 1),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P1', 'process', 'Appoint Project Team', 'Assign Project Planner and Project Manager', 2),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P2', 'process', 'Share Final Plans', 'Transfer Final L1 Plan and FBR to Chief Projects', 3),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P3', 'process', 'Initiate Project Work', 'Share plans with Project Planner and Manager', 4),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P4', 'process', 'Develop Project Schedule', 'Create initial PS using Wind Project Master Plan', 5),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P4A', 'process', 'Break Down Timeline', 'Define phases and intermediate deadlines', 6),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P4B', 'process', 'Develop PEA', 'Create Project Execution Approach', 7),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P5', 'process', 'Review Alignment', 'Ensure PS and PEA alignment', 8),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P6', 'process', 'Circulate for Review', 'Get functional leads feedback', 9),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P7A', 'process', 'Assess PS Feedback', 'Update Project Schedule based on feedback', 10),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P7B', 'process', 'Assess PEA Feedback', 'Update Project Execution Approach', 11),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P8', 'milestone', 'Project Schedule Sign-off', 'Get final approval from functional leads', 12),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'P9', 'process', 'Retain Final PS', 'Project Planner keeps finalized schedule', 13),
('a1b2c3d4-e5f6-7890-abcd-123456789012', 'section-1.2', 'E', 'end', 'Share PEA', 'Coordinate final approach with Project Planner', 14);
