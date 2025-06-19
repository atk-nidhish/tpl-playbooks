import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { UserInfoForm } from "./UserInfoForm";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizNavigation } from "./QuizNavigation";
import { QuizResults } from "./QuizResults";

interface CertificationQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  chapter: string;
}

interface Chapter {
  id: string;
  name: string;
  shortName: string;
  subChapters?: Chapter[];
}

interface UserInfo {
  fullName: string;
  employeeId: string;
}

interface PlaybookCertificationProps {
  playbookId: string;
  playbookName: string;
  chapters: Chapter[];
}

export const PlaybookCertification = ({ playbookId, playbookName, chapters }: PlaybookCertificationProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [certificateEarned, setCertificateEarned] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showUserForm, setShowUserForm] = useState(true);

  // Determine playbook type
  const isWindPlanning = playbookName.toLowerCase().includes('wind') && playbookName.toLowerCase().includes('planning');
  const isWindPredevelopment = playbookName.toLowerCase().includes('wind') && playbookName.toLowerCase().includes('predevelopment');
  const isWindEngineering = playbookName.toLowerCase().includes('wind') && playbookName.toLowerCase().includes('engineering');
  const isWindCP = playbookName.toLowerCase().includes('wind') && playbookName.toLowerCase().includes('contracting');
  const isWindConstruction = playbookName.toLowerCase().includes('wind') && playbookName.toLowerCase().includes('construction');
  const isWindCommissioning = playbookName.toLowerCase().includes('wind') && playbookName.toLowerCase().includes('commissioning');
  const isSolarPlanning = playbookName.toLowerCase().includes('planning') && playbookName.toLowerCase().includes('solar');
  const isSolarEngineering = playbookName.toLowerCase().includes('engineering') && playbookName.toLowerCase().includes('solar');
  const isSolarPredevelopment = playbookName.toLowerCase().includes('predevelopment') && playbookName.toLowerCase().includes('solar');
  const isSolarContracting = playbookName.toLowerCase().includes('contracting') && playbookName.toLowerCase().includes('solar');
  const isSolarConstruction = playbookName.toLowerCase().includes('construction') && playbookName.toLowerCase().includes('solar');
  const isSolarCommissioning = playbookName.toLowerCase().includes('commissioning') && playbookName.toLowerCase().includes('solar');

  const solarPlanningQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for appointing the Bid Planner (BP) and sharing the Bid Summary for Final L1 Plan development?",
      options: [
        "Bid Planner",
        "Bid Incharge",
        "Chief Projects"
      ],
      correctAnswer: 1,
      chapter: "Solar Planning Process"
    },
    {
      id: 2,
      question: "What document serves as the input for developing the Preliminary L1 Plan?",
      options: [
        "Final L1 Plan",
        "Project Schedule",
        "Solar Project Master Plan"
      ],
      correctAnswer: 2,
      chapter: "Solar Planning Process"
    },
    {
      id: 3,
      question: "Who is accountable for defining the Work Breakdown Structure (WBS) elements based on the approved control philosophy?",
      options: [
        "Schedule Head",
        "Project Planner",
        "Chief PMO"
      ],
      correctAnswer: 0,
      chapter: "Solar Planning Process"
    },
    {
      id: 4,
      question: "What document serves as the input for defining the elements of the WBS?",
      options: [
        "Project Execution Approach",
        "Project Procurement Plan",
        "Master WBS Solar"
      ],
      correctAnswer: 2,
      chapter: "Solar Planning Process"
    },
    {
      id: 5,
      question: "Who is responsible for assigning the budget cost to the CBS elements based on the project budget?",
      options: [
        "Chief PMO",
        "Cost Controller",
        "Project Planner"
      ],
      correctAnswer: 1,
      chapter: "Solar Planning Process"
    },
    {
      id: 6,
      question: "What document serves as the input for assigning the scope to all elements defined in CBS?",
      options: [
        "Project Schedule",
        "Project Quality Management Plan",
        "Scope Matrix"
      ],
      correctAnswer: 2,
      chapter: "Solar Planning Process"
    },
    {
      id: 7,
      question: "Who is responsible for reviewing the Project Schedule to establish an understanding of the project calendar for PQMP?",
      options: [
        "Chief QHSSE",
        "Project Manager",
        "Project Planner"
      ],
      correctAnswer: 0,
      chapter: "Solar Planning Process"
    },
    {
      id: 8,
      question: "Who is responsible for appointing the Regulatory Manager (RM) for the project?",
      options: [
        "Project Manager",
        "Chief Regulatory",
        "Chief PMO"
      ],
      correctAnswer: 1,
      chapter: "Solar Planning Process"
    },
    {
      id: 9,
      question: "Who is responsible for conducting the Risk Review Workshop where Functional Leads collectively identify the risks?",
      options: [
        "Project Planner",
        "Project Manager",
        "Risk Head"
      ],
      correctAnswer: 2,
      chapter: "Solar Planning Process"
    },
    {
      id: 10,
      question: "What document serves as the input for initiating the development of the Risk Management Plan?",
      options: [
        "Project Procurement Plan",
        "Project Quality Management Plan",
        "Project Execution Approach"
      ],
      correctAnswer: 2,
      chapter: "Solar Planning Process"
    }
  ];

  const solarEngineeringQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for sharing the approved Final L1 Plan with the Chief Engineering for engineering execution?",
      options: [
        "Project Manager",
        "Project Planner", 
        "Chief Projects"
      ],
      correctAnswer: 0,
      chapter: "Basic Engineering"
    },
    {
      id: 2,
      question: "What document serves as the input for developing the Basic Engineering Scope (BES)?",
      options: [
        "Project Schedule",
        "Final L1 Plan",
        "Engineering Execution Plans"
      ],
      correctAnswer: 1,
      chapter: "Basic Engineering"
    },
    {
      id: 3,
      question: "Who is accountable for preparing the Basic Engineering Scope (BES) by leveraging the Solar Project Master Plan?",
      options: [
        "Chief Engineering",
        "Project Engineering Managers (PEMs)",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Basic Engineering"
    },
    {
      id: 4,
      question: "What is the output when PEMs develop Engineering Execution Plans (EEPs) for their respective disciplines?",
      options: [
        "Basic Engineering Scope",
        "Engineering Execution Plans",
        "Final L1 Plan"
      ],
      correctAnswer: 1,
      chapter: "Basic Engineering"
    },
    {
      id: 5,
      question: "Who is responsible for conducting Civil Site Survey and sharing the survey report?",
      options: [
        "Civil PEM",
        "Survey Team",
        "Site Manager"
      ],
      correctAnswer: 0,
      chapter: "Detailed Engineering - Civil"
    },
    {
      id: 6,
      question: "What document serves as input for Civil Design activities?",
      options: [
        "Survey Report",
        "Geotechnical Investigation Report",
        "Both Survey Report and Geotechnical Investigation Report"
      ],
      correctAnswer: 2,
      chapter: "Detailed Engineering - Civil"
    },
    {
      id: 7,
      question: "Who is accountable for developing electrical design and drawings for solar projects?",
      options: [
        "Civil PEM",
        "Electrical PEM",
        "Chief Engineering"
      ],
      correctAnswer: 1,
      chapter: "Detailed Engineering - Electrical"
    },
    {
      id: 8,
      question: "What is the primary input document for electrical design activities?",
      options: [
        "Civil Design",
        "Basic Engineering Scope",
        "Project Schedule"
      ],
      correctAnswer: 1,
      chapter: "Detailed Engineering - Electrical"
    },
    {
      id: 9,
      question: "Who is responsible for reviewing and approving all engineering deliverables?",
      options: [
        "Project Manager",
        "Chief Engineering",
        "Quality Manager"
      ],
      correctAnswer: 1,
      chapter: "Engineering Review & Approval"
    },
    {
      id: 10,
      question: "What system is used for managing and controlling engineering drawings?",
      options: [
        "Document Management System",
        "Drawing Management System",
        "Project Management System"
      ],
      correctAnswer: 1,
      chapter: "Drawing Management"
    }
  ];

  const solarPredevelopmentQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for preparing the Pre-development Intelligence Report (PDIR)?",
      options: [
        "Chief Land & Connectivity",
        "Chief Land Officer",
        "Land Manager"
      ],
      correctAnswer: 0,
      chapter: "Predevelopment Intelligence Report"
    },
    {
      id: 2,
      question: "What document serves as an input for the Chief Land & Connectivity to prepare the PDIR?",
      options: [
        "Substation Shortlist",
        "Financial Feasibility Report",
        "Annual Growth Outlook"
      ],
      correctAnswer: 2,
      chapter: "Predevelopment Intelligence Report"
    },
    {
      id: 3,
      question: "Who is accountable to appoint a Land Manager to lead Land Leasing and Evacuation Capacity Reservation activities?",
      options: [
        "Chief Land & Connectivity",
        "Procurement Lead",
        "Chief Land Officer"
      ],
      correctAnswer: 2,
      chapter: "Land Leasing and Evacuation Capacity Reservation"
    },
    {
      id: 4,
      question: "Who is responsible for sharing the Substation Application List and Grid Study with the Procurement Lead?",
      options: [
        "Chief Land Officer",
        "Chief Business Development",
        "Land Manager"
      ],
      correctAnswer: 2,
      chapter: "Land Leasing and Evacuation Capacity Reservation"
    },
    {
      id: 5,
      question: "Who is responsible for preparing the Detailed Feasibility Report (DFR) for internal assessment of shortlisted land parcels?",
      options: [
        "Chief Land Officer",
        "Engineering Manager",
        "Land Manager"
      ],
      correctAnswer: 2,
      chapter: "Feasibility Assessment and Due Diligence"
    },
    {
      id: 6,
      question: "Who is responsible for preparing the Financial Feasibility Report (FFR) for each technically feasible land parcel?",
      options: [
        "Chief Land Officer",
        "Land Manager",
        "Commercial Manager"
      ],
      correctAnswer: 2,
      chapter: "Feasibility Assessment and Due Diligence"
    },
    {
      id: 7,
      question: "What document serves as an input for the Commercial Manager to prepare the Financial Feasibility Report (FFR)?",
      options: [
        "Annual Growth Outlook",
        "Substation Shortlist",
        "Detailed Feasibility Reports (DFRs)"
      ],
      correctAnswer: 2,
      chapter: "Feasibility Assessment and Due Diligence"
    },
    {
      id: 8,
      question: "What is the output of the process step where the Land Manager coordinates with the respective Land Aggregator to negotiate with landowners?",
      options: [
        "Substation Shortlist",
        "Final Sanitized FFRs",
        "List of Technically Feasible Land Parcels"
      ],
      correctAnswer: 1,
      chapter: "Land Leasing and Evacuation Capacity Reservation"
    },
    {
      id: 9,
      question: "Who is responsible for securing Evacuation Capacity in the shortlisted substations?",
      options: [
        "Chief Land Officer",
        "Land Manager",
        "Procurement Lead"
      ],
      correctAnswer: 2,
      chapter: "Land Leasing and Evacuation Capacity Reservation"
    },
    {
      id: 10,
      question: "Who is responsible for initiating the comprehensive Due Diligence process to verify land ownership?",
      options: [
        "Chief Land Officer",
        "Procurement Lead",
        "Land Manager"
      ],
      correctAnswer: 2,
      chapter: "Feasibility Assessment and Due Diligence"
    }
  ];

  const windPlanningQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for appointing the Bid Planner (BP) and sharing the Bid Summary for Final L1 Plan development?",
      options: [
        "Bid Planner",
        "Bid Incharge",
        "Land Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 2,
      question: "What document serves as the input for developing the Preliminary L1 Plan?",
      options: [
        "Final L1 Plan",
        "Wind Project Master Plan",
        "Preliminary Feasibility Report"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 3,
      question: "Who is accountable for analyzing the bid summary and developing delivery milestones and timeline for the project?",
      options: [
        "Land Manager",
        "Bid Planner",
        "Chief Projects"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 4,
      question: "Who is responsible for sharing the Final L1 Plan with functional leads for inputs?",
      options: [
        "Chief Projects",
        "Bid Planner",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 5,
      question: "What document is used as an input for the development of the Project Schedule (PS)?",
      options: [
        "Preliminary L1 Plan",
        "Final L1 Plan",
        "Land Finalization Plan"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 6,
      question: "Who is accountable for preparing the draft Project Schedule (PS) by leveraging the Wind Project Master Plan?",
      options: [
        "Chief Projects",
        "Project Planner",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 7,
      question: "What is the output of the process step where the Project Manager develops the Project Execution Approach (PEA)?",
      options: [
        "Project Schedule",
        "Scope Matrix",
        "Preliminary L1 Plan"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 8,
      question: "Who is responsible for preparing the Basic Engineering Scope (BES)?",
      options: [
        "Chief Engineering",
        "Project Engineering Managers (PEMs)",
        "Quality Managers"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 9,
      question: "What document serves as the input for the development of the Engineering Execution Plans (EEPs)?",
      options: [
        "Project Schedule",
        "Basic Engineering Scope",
        "Final L1 Plan"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 10,
      question: "Who is accountable for sharing the Project Schedule (PS) and Project Execution Approach (PEA) with the engineering team?",
      options: [
        "Chief Engineering",
        "Project Planner",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    }
  ];

  const windPredevelopmentQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for sharing the Annual Growth Outlook with the Chief Land & Connectivity?",
      options: [
        "BD Team",
        "Chief Land Officer",
        "Land Manager"
      ],
      correctAnswer: 0,
      chapter: "Predevelopment Intelligence Report"
    },
    {
      id: 2,
      question: "What document is prepared by the Chief Land & Connectivity based on the Annual Growth Outlook?",
      options: [
        "Grid Study",
        "Wind Resource Assessment Report",
        "Pre-development Intelligence Report (PDIR)"
      ],
      correctAnswer: 2,
      chapter: "Predevelopment Intelligence Report"
    },
    {
      id: 3,
      question: "Who appoints the Land Manager to lead Land Leasing and Evacuation Capacity Reservation related activities?",
      options: [
        "Chief Land Officer",
        "Procurement Lead",
        "Chief Business Development"
      ],
      correctAnswer: 0,
      chapter: "Land Leasing and Evacuation Capacity"
    },
    {
      id: 4,
      question: "Who is responsible for analyzing the Grid Study to shortlist substations for reserving evacuation capacity?",
      options: [
        "Chief Land Officer",
        "Land Manager",
        "Chief Procurement"
      ],
      correctAnswer: 1,
      chapter: "Land Leasing and Evacuation Capacity"
    },
    {
      id: 5,
      question: "Which document does the Chief Land & Connectivity prepare by reviewing the WRA Reports?",
      options: [
        "Substation Shortlist",
        "Land Parcel Shortlist",
        "Financial Feasibility Report"
      ],
      correctAnswer: 1,
      chapter: "Feasibility Assessment and Due Diligence"
    },
    {
      id: 6,
      question: "Who informs the Land Manager of the land parcels selected for detailed assessment?",
      options: [
        "Chief Land & Connectivity",
        "Chief Land Officer",
        "Procurement Lead"
      ],
      correctAnswer: 0,
      chapter: "Technical Evaluation"
    },
    {
      id: 7,
      question: "What document is shared by the Land Manager with the Wind Engineering Head for technical evaluation of the land parcel?",
      options: [
        "Pre-development Intelligence Report",
        "Financial Feasibility Report",
        "Wind Resource Assessment Reports"
      ],
      correctAnswer: 2,
      chapter: "Technical Evaluation"
    },
    {
      id: 8,
      question: "Who is responsible for preparing the Financial Feasibility Report for each technically feasible land parcel?",
      options: [
        "Land Manager",
        "Chief Land Officer",
        "Commercial Manager"
      ],
      correctAnswer: 2,
      chapter: "Feasibility Assessment and Due Diligence"
    },
    {
      id: 9,
      question: "What document is shared by the Commercial Manager with the Land Manager after redacting sensitive data?",
      options: [
        "Pre-development Intelligence Report",
        "Sanitized Financial Feasibility Reports",
        "Wind Resource Assessment Report"
      ],
      correctAnswer: 1,
      chapter: "Feasibility Assessment and Due Diligence"
    },
    {
      id: 10,
      question: "Who coordinates with the respective Land Aggregator to negotiate with landowners for parcels classified as 'Optimize Cost'?",
      options: [
        "Land Manager",
        "Chief Land Officer",
        "Procurement Lead"
      ],
      correctAnswer: 0,
      chapter: "Land Leasing and Evacuation Capacity"
    }
  ];

  const windEngineeringQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for sharing the Bid Summary with the Wind Engineering Head (WEH)?",
      options: [
        "Bid Incharge",
        "Engineering Manager",
        "Procurement Lead"
      ],
      correctAnswer: 0,
      chapter: "Wind Engineering Process"
    },
    {
      id: 2,
      question: "What document serves as the input for developing the Guaranteed Technical Particulars (GTP)?",
      options: [
        "Preliminary Works Requirement Document",
        "Basic Engineering Design",
        "Land Demarcation Summary"
      ],
      correctAnswer: 1,
      chapter: "Wind Engineering Process"
    },
    {
      id: 3,
      question: "Who is accountable for notifying the Wind Engineering Head (WEH) about bids won?",
      options: [
        "Chief Business Development",
        "Procurement Lead",
        "Project Manager"
      ],
      correctAnswer: 0,
      chapter: "Wind Engineering Process"
    },
    {
      id: 4,
      question: "What document serves as the input for preparing the Preliminary Works Requirement Document?",
      options: [
        "Detailed Feasibility Report",
        "Basic Engineering Design Library",
        "Land Demarcation Summary"
      ],
      correctAnswer: 2,
      chapter: "Technical Requirements and Documentation"
    },
    {
      id: 5,
      question: "Who is responsible for preparing the Preliminary Works Requirement Document?",
      options: [
        "Procurement Lead",
        "Lead PEM",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Technical Requirements and Documentation"
    },
    {
      id: 6,
      question: "Who must conduct a meeting with the hired Site Survey Consultant to discuss detailed requirements and share input for conducting Preliminary Works?",
      options: [
        "Project Manager",
        "WEH",
        "Procurement Lead"
      ],
      correctAnswer: 0,
      chapter: "Consultant Management and Coordination"
    },
    {
      id: 7,
      question: "Who is accountable for preparing the Technical Consultant Requirement Document?",
      options: [
        "Procurement Lead",
        "Lead PEM",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Consultant Management and Coordination"
    },
    {
      id: 8,
      question: "What document serves as the input for preparing the Technical Consultant Requirement Document?",
      options: [
        "Preliminary Works Requirement Document",
        "Detailed Feasibility Report",
        "Engineering Execution Plan"
      ],
      correctAnswer: 2,
      chapter: "Consultant Management and Coordination"
    },
    {
      id: 9,
      question: "Who must conduct a kick-off meeting with the Technical Consultant to align detailed requirements and timelines?",
      options: [
        "Procurement Lead",
        "PEM",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Consultant Management and Coordination"
    },
    {
      id: 10,
      question: "Who is responsible for notifying the Wind Engineering Head (WEH) about the finalized Land Parcels for the project?",
      options: [
        "Procurement Lead",
        "Lead PEM",
        "Project Manager"
      ],
      correctAnswer: 2,
      chapter: "Project Coordination and Communication"
    }
  ];

  const windCPQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for preparing the cost estimate report for bid submission?",
      options: [
        "Chief Business Development",
        "Wind Procurement Head",
        "Procurement Lead"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 2,
      question: "Who shares the Bill of Quantities (BoQ) and Bill of Services (BoS) with the Wind Procurement Head (WPH) for cost estimation?",
      options: [
        "Bid In-charge",
        "Chief Procurement",
        "Wind Engineering Head"
      ],
      correctAnswer: 2,
      chapter: "Wind C&P Process"
    },
    {
      id: 3,
      question: "Who is accountable for assigning procurement packages to the Procurement Leads?",
      options: [
        "Procurement Lead",
        "Chief Business Development",
        "Wind Procurement Head"
      ],
      correctAnswer: 2,
      chapter: "Wind C&P Process"
    },
    {
      id: 4,
      question: "What document is shared by the Chief BD with the Wind Procurement Head for evaluating the need for vendor empanelment?",
      options: [
        "Growth Outlook",
        "Market availability report",
        "Cost Estimate report"
      ],
      correctAnswer: 0,
      chapter: "Wind C&P Process"
    },
    {
      id: 5,
      question: "Who is responsible for creating a Gap Assessment Summary for each package?",
      options: [
        "Wind Procurement Head",
        "Procurement Lead",
        "Wind Engineering Head"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 6,
      question: "Who is responsible for performing the technical evaluation and preparing the list of feasible/shortlisted vendors?",
      options: [
        "Procurement Lead",
        "Chief Business Development",
        "Wind Engineering Head"
      ],
      correctAnswer: 2,
      chapter: "Wind C&P Process"
    },
    {
      id: 7,
      question: "Who is responsible for issuing a Purchase Order (PO) to the vendor?",
      options: [
        "Wind Procurement Head",
        "Procurement Lead",
        "Chief Procurement"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 8,
      question: "What document does Chief SCM issue to grant approval for all components under evaluation?",
      options: [
        "Quality Release Note",
        "No Deviation Certificate",
        "Goods Received Note"
      ],
      correctAnswer: 0,
      chapter: "Wind C&P Process"
    },
    {
      id: 9,
      question: "What document is prepared by the Wind Engineering Head to capture any technical deviation in contractor scope change process?",
      options: [
        "Engineering Clearance Form",
        "Technical Scope Change Note",
        "Design Change Estimate"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 10,
      question: "What document is issued by the Chief SCM to the Order Manager after receiving the delivery on-site?",
      options: [
        "Goods Received Note",
        "No Deviation Certificate",
        "Delivery Completion Form"
      ],
      correctAnswer: 0,
      chapter: "Wind C&P Process"
    }
  ];

  const solarContractingQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who requests the Solar Engineering Head (SEH) to share the Bill of Quantities (BoQ) and Bill of Services (BoS) with the Solar Procurement Head (SPH) for cost estimation?",
      options: [
        "Chief Business Development",
        "Solar Procurement Head",
        "Bid In-charge"
      ],
      correctAnswer: 2,
      chapter: "Procurement Planning"
    },
    {
      id: 2,
      question: "Who is accountable for sharing the BoQ and BoS with the Solar Procurement Head (SPH)?",
      options: [
        "Chief Business Development",
        "Solar Engineering Head",
        "Procurement Lead"
      ],
      correctAnswer: 1,
      chapter: "Procurement Planning"
    },
    {
      id: 3,
      question: "Who is responsible for aligning requirements based on market availability and finalizing the BoQ and BoS?",
      options: [
        "Solar Procurement Head",
        "Procurement Lead",
        "Chief Business Development"
      ],
      correctAnswer: 0,
      chapter: "Procurement Planning"
    },
    {
      id: 4,
      question: "What document serves as the input for the Procurement Lead to create a Gap Assessment Summary?",
      options: [
        "Market availability report",
        "List of Empaneled Vendors",
        "Cost Estimate"
      ],
      correctAnswer: 1,
      chapter: "Vendor Management"
    },
    {
      id: 5,
      question: "Who is responsible for floating the RFI document and collating responses from all the vendors?",
      options: [
        "Solar Engineering Head",
        "Procurement Lead",
        "Chief Business Development"
      ],
      correctAnswer: 1,
      chapter: "Vendor Management"
    },
    {
      id: 6,
      question: "What document serves as the input for the Procurement Lead to prepare the RFQ?",
      options: [
        "Market availability report",
        "Purchase Requisition (PR)",
        "Cost Estimate"
      ],
      correctAnswer: 1,
      chapter: "Vendor Management"
    },
    {
      id: 7,
      question: "Who is responsible for performing the technical evaluation and shortlisting vendor proposals?",
      options: [
        "Procurement Lead",
        "Solar Engineering Head",
        "Chief Business Development"
      ],
      correctAnswer: 1,
      chapter: "Vendor Management"
    },
    {
      id: 8,
      question: "Who is responsible for issuing a Purchase Order (PO) to the vendor based on requirements outlined in the contract?",
      options: [
        "Procurement Lead",
        "Solar Procurement Head",
        "Chief Business Development"
      ],
      correctAnswer: 0,
      chapter: "Contract Execution"
    },
    {
      id: 9,
      question: "What document does the Chief SCM provide to a third-party inspection agency sent to inspect goods at the manufacturing site?",
      options: [
        "Market availability report",
        "Cost Estimate",
        "Inspection Checklist"
      ],
      correctAnswer: 2,
      chapter: "Contract Execution"
    },
    {
      id: 10,
      question: "Who is responsible for receiving the delivery on-site and informing the Chief SCM?",
      options: [
        "Procurement Lead",
        "Chief Business Development",
        "Store Manager"
      ],
      correctAnswer: 2,
      chapter: "Contract Execution"
    }
  ];

  const solarConstructionQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for hiring a Third-Party Engineer to conduct Geo-tech activities?",
      options: [
        "Procurement Lead",
        "Project Manager",
        "Site Manager"
      ],
      correctAnswer: 1,
      chapter: "Site Mobilization"
    },
    {
      id: 2,
      question: "Who is responsible for applying for the BOCW license and sharing it with the Project Manager and Regulatory Approvals Head?",
      options: [
        "EPC SPOC",
        "Site Functional Head",
        "Site QHSSE Manager"
      ],
      correctAnswer: 0,
      chapter: "Site Mobilization"
    },
    {
      id: 3,
      question: "Who instructs the Site Admin Manager to set up the site office, guest house, and mobilize site vehicles?",
      options: [
        "Site Manager",
        "Site Functional Head",
        "Project Manager"
      ],
      correctAnswer: 2,
      chapter: "Site Mobilization"
    },
    {
      id: 4,
      question: "What document is required as an input for creating the manpower availability schedule?",
      options: [
        "Work Completion Plan",
        "Daily Progress Report",
        "Site Mobilization Plan"
      ],
      correctAnswer: 2,
      chapter: "Site Mobilization"
    },
    {
      id: 5,
      question: "Who provides the final sign-off on the site mobilization plan?",
      options: [
        "Project Manager",
        "Site Functional Heads",
        "Site Manager"
      ],
      correctAnswer: 0,
      chapter: "Site Mobilization"
    },
    {
      id: 6,
      question: "Who is responsible for conducting the safety induction of machinery and verifying the machinery documents?",
      options: [
        "Site Functional Head",
        "Site Manager",
        "Site QHSSE Manager"
      ],
      correctAnswer: 2,
      chapter: "Quality & Safety"
    },
    {
      id: 7,
      question: "Who is responsible for creating the work completion plan for a given job and sharing it with the respective Site Functional Head?",
      options: [
        "Site Manager",
        "Site Planner",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Construction Execution"
    },
    {
      id: 8,
      question: "Who is responsible for recording daily progress and unresolved issues and sharing them with the Site Functional Head?",
      options: [
        "Site Engineer",
        "Project Manager",
        "Site Manager"
      ],
      correctAnswer: 0,
      chapter: "Construction Execution"
    },
    {
      id: 9,
      question: "Who is responsible for conducting an inspection of the completed work and creating a list of deviations?",
      options: [
        "Site Manager",
        "Site QHSSE Lead",
        "Site Functional Head"
      ],
      correctAnswer: 1,
      chapter: "Quality & Safety"
    },
    {
      id: 10,
      question: "What document is issued by the Site QHSSE Lead to the EPC SPOC upon successful inspection of the completed work?",
      options: [
        "Job Completion Certificate",
        "Quality Deviation List",
        "Daily Progress Report"
      ],
      correctAnswer: 0,
      chapter: "Quality & Safety"
    }
  ];

  const solarCommissioningQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who ensures signatures on the punch point list from the EPC Engineer and respective Site Functional Head?",
      options: [
        "Site QHSSE",
        "EPC SPOC",
        "Site Manager"
      ],
      correctAnswer: 0,
      chapter: "Commissioning Process"
    },
    {
      id: 2,
      question: "What document is to be prepared after closing all the critical punch points during the Construction Inspection process?",
      options: [
        "Inspection Checklist",
        "Punch Point List",
        "Compliance Report"
      ],
      correctAnswer: 2,
      chapter: "Commissioning Process"
    },
    {
      id: 3,
      question: "Who is responsible for notifying the Site Electrical Lead (SEL) to initiate the pre-commissioning tests of the DC Block?",
      options: [
        "Site Manager",
        "Project Manager",
        "Chief O&M"
      ],
      correctAnswer: 0,
      chapter: "Testing and Procedures"
    },
    {
      id: 4,
      question: "Who prepares and shares the testing procedure and pre-commissioning checklist with the SEL?",
      options: [
        "Site Manager",
        "EPC SPOC",
        "Chief O&M"
      ],
      correctAnswer: 1,
      chapter: "Testing and Procedures"
    },
    {
      id: 5,
      question: "What document is required as an input for the RLDC User Registration process?",
      options: [
        "Inspection checklist",
        "Grid Code Compliance Report",
        "Pre-commissioning checklist"
      ],
      correctAnswer: 1,
      chapter: "Regulatory Compliance"
    },
    {
      id: 6,
      question: "Who is responsible for notifying the CEIG to approve the plant drawings and conduct an inspection for Electrical Safety Approval (ESA)?",
      options: [
        "Project Manager",
        "Chief Regulatory",
        "Regulatory Approvals Head (RAH)"
      ],
      correctAnswer: 2,
      chapter: "Regulatory Compliance"
    },
    {
      id: 7,
      question: "Who is responsible for sharing the Grid charge code for FTC with the Project Manager?",
      options: [
        "Site Manager",
        "Regulatory Approvals Head (RAH)",
        "Chief O&M"
      ],
      correctAnswer: 1,
      chapter: "Regulatory Compliance"
    },
    {
      id: 8,
      question: "Who is responsible for conducting the performance test?",
      options: [
        "Site Manager",
        "Chief O&M",
        "EPC SPOC"
      ],
      correctAnswer: 2,
      chapter: "Testing and Procedures"
    },
    {
      id: 9,
      question: "What document is required as an input for the Project Handover process to the O&M Team?",
      options: [
        "Project Handover Checklist",
        "Compliance Report",
        "Grid Code Compliance Report"
      ],
      correctAnswer: 0,
      chapter: "Project Handover"
    },
    {
      id: 10,
      question: "Who is responsible for conducting Knowledge Transfer (KT) sessions with the O&M team and providing the plant HOTO?",
      options: [
        "Project Manager",
        "Site Manager",
        "Chief O&M"
      ],
      correctAnswer: 1,
      chapter: "Project Handover"
    }
  ];

  const windConstructionQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "What document serves as the input for the Project Manager to physical control of land parcels?",
      options: [
        "BOCW Application Documents",
        "Signed Contractor PO and Scope of Work",
        "Final FMB of Land"
      ],
      correctAnswer: 2,
      chapter: "Wind Construction Process"
    },
    {
      id: 2,
      question: "Who is accountable for providing the Grant of Connectivity and Developer Permission to the PM?",
      options: [
        "Project Manager",
        "Regulatory Approvals Head",
        "Contractor SPOC"
      ],
      correctAnswer: 1,
      chapter: "Wind Construction Process"
    },
    {
      id: 3,
      question: "Who completes the set-up of the site office and mobilization of site vehicles?",
      options: [
        "Site Manager",
        "Project Manager",
        "Site Admin Manager"
      ],
      correctAnswer: 2,
      chapter: "Wind Construction Process"
    },
    {
      id: 4,
      question: "What document serves as the input for the site mobilization plan?",
      options: [
        "Health and Fitness Certificates",
        "Site Mobilization Checklist",
        "Daily Progress Report"
      ],
      correctAnswer: 1,
      chapter: "Wind Construction Process"
    },
    {
      id: 5,
      question: "Who is responsible for conducting the safety induction of all the site manpower and issuing ID cards to them?",
      options: [
        "Site QHSSE Manager",
        "Site Manager",
        "Contractor SPOC"
      ],
      correctAnswer: 0,
      chapter: "Wind Construction Process"
    },
    {
      id: 6,
      question: "Who directs Site Functional Heads to distribute jobs within their package to their engineers?",
      options: [
        "Site Manager",
        "Site Engineer",
        "Project Manager"
      ],
      correctAnswer: 0,
      chapter: "Wind Construction Process"
    },
    {
      id: 7,
      question: "What document serves as the input for the work completion plan?",
      options: [
        "Manpower Availability Schedule",
        "Site Mobilization Plan",
        "Construction Management Plan"
      ],
      correctAnswer: 2,
      chapter: "Wind Construction Process"
    },
    {
      id: 8,
      question: "What document does the Site Functional Head raise to the Site Quality Head?",
      options: [
        "Quality Deviation List",
        "Quality Inspection Notice",
        "Job Completion Certificate"
      ],
      correctAnswer: 1,
      chapter: "Wind Construction Process"
    },
    {
      id: 9,
      question: "Who reviews the status of action items from previous MoM and collects updates from Site Functional Heads?",
      options: [
        "Site Engineer",
        "Project Manager",
        "Site Manager"
      ],
      correctAnswer: 2,
      chapter: "Wind Construction Process"
    },
    {
      id: 10,
      question: "Who is responsible for recording the MoM and sharing it with all the attendees post the meeting?",
      options: [
        "Project Manager",
        "Site Planner",
        "Site Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Construction Process"
    }
  ];

  const windCommissioningQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who directs the Site Manager (SM) to conduct the inspection of the completed construction?",
      options: [
        "Chief O&M",
        "Site QHSSE",
        "Project Manager"
      ],
      correctAnswer: 2,
      chapter: "Construction Inspection and Compliance"
    },
    {
      id: 2,
      question: "What is the output document after the Site QHSSE leads the inspection and logs all the deviations?",
      options: [
        "Punch Point List",
        "Compliance Report",
        "Deviation Certificate"
      ],
      correctAnswer: 0,
      chapter: "Construction Inspection and Compliance"
    },
    {
      id: 3,
      question: "What document is prepared by the Contractor SPOC after closing all the critical punch points?",
      options: [
        "Notice for Inspection",
        "Compliance Report",
        "Job Completion Certificate"
      ],
      correctAnswer: 1,
      chapter: "Construction Inspection and Compliance"
    },
    {
      id: 4,
      question: "Who initiates the collection of documents required for RLDC User Registration?",
      options: [
        "Regulatory Approvals Head (RAH)",
        "Chief Regulatory",
        "OEM SPOC"
      ],
      correctAnswer: 0,
      chapter: "RLDC User Registration"
    },
    {
      id: 5,
      question: "What document is required for RLDC User Registration along with technical and modelling data?",
      options: [
        "Grid Code Compliance Report",
        "Inspection Results",
        "Mechanical Clearance Certificate"
      ],
      correctAnswer: 0,
      chapter: "RLDC User Registration"
    },
    {
      id: 6,
      question: "Who is responsible for notifying the CEIG to approve plant drawings and conduct an inspection for Electrical Safety Approval (ESA)?",
      options: [
        "Project Manager",
        "Chief Regulatory",
        "Regulatory Approvals Head (RAH)"
      ],
      correctAnswer: 2,
      chapter: "Electrical Safety and Testing"
    },
    {
      id: 7,
      question: "Who directs the OEM SPOC to initiate the reliability run test of WTG?",
      options: [
        "Site QHSSE",
        "Project Manager",
        "Chief O&M"
      ],
      correctAnswer: 1,
      chapter: "Electrical Safety and Testing"
    },
    {
      id: 8,
      question: "Who is responsible for conducting the PCVT (Power Curve Validation Test) in the presence of TP Consultant, PM, and CPOC?",
      options: [
        "OEM SPOC",
        "Site Manager",
        "Commissioning POC"
      ],
      correctAnswer: 0,
      chapter: "Electrical Safety and Testing"
    },
    {
      id: 9,
      question: "Who informs the Chief O&M to begin HOTO for Balance of Plant (BOP)?",
      options: [
        "Site Manager",
        "Project Manager",
        "Chief Wind"
      ],
      correctAnswer: 1,
      chapter: "Project Handover and Knowledge Transfer"
    },
    {
      id: 10,
      question: "Who conducts Knowledge Transfer (KT) sessions with the O&M team and provides the HOTO (including spares)?",
      options: [
        "Project Manager",
        "Regulatory Approvals Head (RAH)",
        "Site Manager"
      ],
      correctAnswer: 2,
      chapter: "Project Handover and Knowledge Transfer"
    }
  ];

  const defaultQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for taking physical control of land covering a minimum of 20 WTG sites and PSS?",
      options: [
        "Land Manager",
        "Site Manager",
        "Project Manager"
      ],
      correctAnswer: 2,
      chapter: "Wind C&P Process"
    },
    {
      id: 2,
      question: "What document does the Project Manager request from the Regulatory Approvals Head to proceed with the construction?",
      options: [
        "Building and Other Construction Works (BOCW) license",
        "Grant of Connectivity and Developer Permission",
        "Notice to Proceed (NTP)"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 3,
      question: "Who is accountable for providing the Grant of Connectivity and Developer Permission to the Project Manager?",
      options: [
        "Contractor SPOC",
        "Regulatory Approvals Head",
        "Site QHSSE Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 4,
      question: "What is the output document when the Project Manager issues the Notice to Proceed to the Contractor SPOC?",
      options: [
        "Compliance Documents Application",
        "Notice to Proceed",
        "BOCW License"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 5,
      question: "Who is responsible for applying for the BOCW license and sharing it with the Project Manager and Regulatory Approvals Head?",
      options: [
        "Site Functional Head",
        "Contractor SPOC",
        "Site Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 6,
      question: "What document does the Contractor SPOC need to apply for compliance documents outlined in the contractor mobilization checklist?",
      options: [
        "Construction Management Plan",
        "Health and Fitness Certificates",
        "Contractor Mobilization Checklist"
      ],
      correctAnswer: 2,
      chapter: "Wind C&P Process"
    },
    {
      id: 7,
      question: "Who verifies the health and fitness certificates of the contractor's manpower?",
      options: [
        "Site QHSSE Manager",
        "Project Manager",
        "Site Functional Head"
      ],
      correctAnswer: 0,
      chapter: "Wind C&P Process"
    },
    {
      id: 8,
      question: "What document does the Site Functional Head raise to the Site QHSSE Lead once a job is completed?",
      options: [
        "Quality Inspection Notice",
        "Job Completion Certificate",
        "Daily Progress Report (DPR)"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 9,
      question: "Who is responsible for conducting the safety induction of all the site manpower and issuing ID cards to them?",
      options: [
        "Site Manager",
        "Site QHSSE Manager",
        "Contractor SPOC"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 10,
      question: "What document does the Site QHSSE Lead issue to the Contractor SPOC upon successful inspection of the completed work?",
      options: [
        "Quality Deviation List",
        "Job Completion Certificate",
        "Notice to Proceed"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    }
  ];

  // Select appropriate questions based on playbook type
  const certificationQuestions = isSolarPlanning ? solarPlanningQuestions : 
                                isWindPlanning ? windPlanningQuestions : 
                                isWindPredevelopment ? windPredevelopmentQuestions :
                                isWindEngineering ? windEngineeringQuestions :
                                isWindCP ? windCPQuestions :
                                isWindConstruction ? windConstructionQuestions :
                                isWindCommissioning ? windCommissioningQuestions :
                                isSolarEngineering ? solarEngineeringQuestions :
                                isSolarPredevelopment ? solarPredevelopmentQuestions :
                                isSolarContracting ? solarContractingQuestions :
                                isSolarConstruction ? solarConstructionQuestions :
                                isSolarCommissioning ? solarCommissioningQuestions :
                                defaultQuestions;

  const handleUserInfoSubmit = (submittedUserInfo: UserInfo) => {
    setUserInfo(submittedUserInfo);
    setShowUserForm(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < certificationQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
      checkCertification();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
    setCertificateEarned(false);
    setShowUserForm(true);
    setUserInfo(null);
  };

  const calculateScore = () => {
    let correct = 0;
    certificationQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / certificationQuestions.length) * 100);
  };

  const checkCertification = () => {
    const percentage = getScorePercentage();
    if (percentage >= 75) {
      setCertificateEarned(true);
      saveCertificate();
    }
  };

  const saveCertificate = async () => {
    if (!userInfo) return;
    
    const score = getScorePercentage();
    
    // Save to localStorage for backwards compatibility
    const certificate = {
      title: `${playbookName} Certification`,
      score: score,
      date: new Date().toLocaleDateString(),
      playbookId: playbookId,
      fullName: userInfo.fullName,
      employeeId: userInfo.employeeId
    };

    const existingCertificates = JSON.parse(localStorage.getItem('user_certificates') || '[]');
    const updatedCertificates = [...existingCertificates.filter((cert: any) => cert.playbookId !== playbookId), certificate];
    localStorage.setItem('user_certificates', JSON.stringify(updatedCertificates));

    // Save to Supabase with real user information
    try {
      const { error } = await supabase
        .from('certification_scores')
        .insert({
          user_name: userInfo.fullName,
          employee_id: userInfo.employeeId,
          user_department: "Not specified", // Keep this field for now
          playbook_name: `${playbookName} Certification`,
          score: score,
        });

      if (error) {
        console.error('Error saving certification to database:', error);
      } else {
        console.log('Certification saved to database successfully');
      }
    } catch (error) {
      console.error('Error saving certification:', error);
    }
  };

  // Show user info form if user hasn't provided their information yet
  if (showUserForm) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-500" />
              Playbook Certification Exam
            </CardTitle>
            <CardDescription>
              Complete this comprehensive exam covering all chapters to earn your {playbookName} certification. 
              A score of 75% or higher is required to pass.
            </CardDescription>
          </CardHeader>
        </Card>

        <UserInfoForm 
          onUserInfoSubmit={handleUserInfoSubmit}
          playbookName={playbookName}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-500" />
            Playbook Certification Exam
          </CardTitle>
          <CardDescription>
            Welcome {userInfo?.fullName} (ID: {userInfo?.employeeId}). Complete this comprehensive exam covering all chapters to earn your {playbookName} certification. 
            A score of 75% or higher is required to pass.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-6">
          {!quizCompleted ? (
            <div className="space-y-6">
              <QuizProgress
                currentQuestion={currentQuestion}
                totalQuestions={certificationQuestions.length}
                chapter={certificationQuestions[currentQuestion].chapter}
                playbookType={playbookName}
              />

              <QuizQuestion
                question={certificationQuestions[currentQuestion].question}
                options={certificationQuestions[currentQuestion].options}
                selectedAnswer={selectedAnswers[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
                playbookType={playbookName}
              />

              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={certificationQuestions.length}
                hasSelectedAnswer={selectedAnswers[currentQuestion] !== undefined}
                onPrevious={handlePreviousQuestion}
                onNext={handleNextQuestion}
                playbookType={playbookName}
              />
            </div>
          ) : (
            <QuizResults
              scorePercentage={getScorePercentage()}
              certificateEarned={certificateEarned}
              userInfo={userInfo!}
              playbookName={playbookName}
              playbookId={playbookId}
              onResetQuiz={resetQuiz}
              playbookType={playbookName}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
