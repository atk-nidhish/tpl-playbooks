// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search, Wind, ArrowLeft, Download } from "lucide-react";
// import { Link } from "react-router-dom";
// import { ProcessSteps } from "@/components/ProcessSteps";
// import { RACIMatrix } from "@/components/RACIMatrix";
// import { PlaybookCertification } from "@/components/PlaybookCertification";
// import { Leaderboard } from "@/components/Leaderboard";
// import { ModernNavigation } from "@/components/ModernNavigation";
// import { ModernTabs, TabsContent } from "@/components/ModernTabs";
// import { createWindCPPlaybook, seedWindCPChapter1Data, seedWindCPChapter2Data } from "@/services/wind-cp-playbook-seeder";
// import { addWindCommissioningAdditionalData } from "@/services/wind-commissioning-additional-data";
// import { addFrameworkChaptersData } from "@/services/wind-framework-chapters-data";
// import { addChapter4Data } from "@/services/wind-chapter4-data";

// const WindCPDashboard = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activePhase, setActivePhase] = useState("chapter-1");
//   const [playbookId, setPlaybookId] = useState<string>("");
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [activeTab, setActiveTab] = useState("processes");

//   useEffect(() => {
//     const initializePlaybook = async () => {
//       try {
//         console.log('Initializing Wind C&P playbook...');
//         const newPlaybookId = await createWindCPPlaybook();
//         await seedWindCPChapter1Data(newPlaybookId);
//         await seedWindCPChapter2Data(newPlaybookId);
//         await addWindCommissioningAdditionalData(newPlaybookId);
//         await addFrameworkChaptersData(newPlaybookId);
//         await addChapter4Data(newPlaybookId);
//         setPlaybookId(newPlaybookId);
//         setIsInitialized(true);
//         console.log('Wind C&P playbook initialized successfully');
//       } catch (error) {
//         console.error('Error initializing Wind C&P playbook:', error);
//         setIsInitialized(true);
//       }
//     };

//     initializePlaybook();
//   }, []);

//   const chapters = [
//     {
//       id: "chapter-1",
//       name: "Chapter 1: Cost Estimation for PPA Bid Submission",
//       shortName: "Chapter 1 - Cost Estimation"
//     },
//     {
//       id: "chapter-2", 
//       name: "Chapter 2: Vendor Empanelment",
//       shortName: "Chapter 2 - Vendor Empanelment"
//     },
//     {
//       id: "chapter-3",
//       name: "Chapter 3: Contract Award and PR Execution",
//       shortName: "Chapter 3 - Contract Award",
//       subChapters: [
//         {
//           id: "chapter-3a1",
//           name: "Chapter 3a.1: Contract Award for Project-specific Agreement",
//           shortName: "Chapter 3a.1: Contract Award for Project-specific Agreement"
//         },
//         {
//           id: "chapter-3a2",
//           name: "Chapter 3a.2: Purchase Requisition Execution under Project-specific Agreement",
//           shortName: "Chapter 3a.2: Purchase Requisition Execution under Project-specific Agreement"
//         },
//         {
//           id: "chapter-3b1",
//           name: "Chapter 3b.1: Contract Award for Framework Agreements",
//           shortName: "Chapter 3b.1: Contract Award for Framework Agreements"
//         },
//         {
//           id: "chapter-3b2",
//           name: "Chapter 3b.2: Purchase Requisition Execution under Framework Agreements",
//           shortName: "Chapter 3b.2: Purchase Requisition Execution under Framework Agreements"
//         }
//       ]
//     },
//     {
//       id: "chapter-4",
//       name: "Chapter 4: Contractor Management",
//       shortName: "Chapter 4 - Contractor Mgmt",
//       subChapters: [
//         {
//           id: "chapter-4.1",
//           name: "Chapter 4.1: Issue Escalation and Resolution",
//           shortName: "Chapter 4.1: Issue Escalation and Resolution"
//         },
//         {
//           id: "chapter-4.2",
//           name: "Chapter 4.2: Change of Scope Process",
//           shortName: "Chapter 4.2: Change of Scope Process"
//         }
//       ]
//     },
//     {
//       id: "certification",
//       name: "Playbook Certification",
//       shortName: "Certification"
//     },
//     {
//       id: "leaderboard",
//       name: "Certification Leaderboard",
//       shortName: "Leaderboard"
//     }
//   ];

//   const handleNavigateToRaci = () => {
//     setActiveTab("raci");
//   };

//   const getProcessMapImage = (phaseId: string) => {
//     switch (phaseId) {
//       case "chapter-1":
//         return "/lovable-uploads/cbd79a2a-4b4a-49e3-85a0-cdc01cf34da0.png";
//       case "chapter-2":
//         return "/lovable-uploads/95961d12-586b-4b67-aa1e-a53da8fed52e.png";
//       case "chapter-3a1":
//         return "/lovable-uploads/ba7bcb46-50f3-45af-b059-43ecec5d3bf4.png";
//       case "chapter-3a2":
//         return "/lovable-uploads/e3364575-a72a-4210-bd19-60a920fed4ac.png";
//       case "chapter-3b1":
//         return "/lovable-uploads/b93c0059-1f62-4468-924e-d11efd82d080.png";
//       case "chapter-3b2":
//         return "/lovable-uploads/3d9ebbef-27ff-4dc6-89d0-ec7cc752027e.png";
//       case "chapter-4.1":
//         return "/lovable-uploads/050162e5-0a3c-4691-847b-19b5cce63ca2.png";
//       case "chapter-4.2":
//         return "/lovable-uploads/8f6e6013-6885-4e46-89e7-f9a555395ef5.png";
//       default:
//         return "/lovable-uploads/02ea28df-7aa0-437b-8db2-15769af9665c.png";
//     }
//   };

//   const downloadProcessMap = (phaseId: string) => {
//     const imageUrl = getProcessMapImage(phaseId);
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = `Process-Map-${phaseId}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   if (!isInitialized) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-lg text-gray-600">Initializing Wind C&P Playbook...</p>
//         </div>
//       </div>
//     );
//   }

//   // Handle leaderboard section
//   if (activePhase === "leaderboard") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
//         <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
//           <div className="container mx-auto px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
//                   <ArrowLeft className="h-5 w-5 text-gray-600" />
//                 </Link>
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
//                   <Wind className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">Wind - C&P</h1>
//                   <p className="text-sm text-gray-600">Contracting & Procurement Playbook</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         <ModernNavigation 
//           chapters={chapters}
//           activePhase={activePhase}
//           onPhaseChange={setActivePhase}
//         />

//         <div className="container mx-auto px-6 py-8">
//           <Leaderboard />
//         </div>
//       </div>
//     );
//   }

//   // Handle certification section
//   if (activePhase === "certification") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
//         <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
//           <div className="container mx-auto px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
//                   <ArrowLeft className="h-5 w-5 text-gray-600" />
//                 </Link>
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
//                   <Wind className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">Wind - C&P</h1>
//                   <p className="text-sm text-gray-600">Contracting & Procurement Playbook</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         <ModernNavigation 
//           chapters={chapters}
//           activePhase={activePhase}
//           onPhaseChange={setActivePhase}
//         />

//         <div className="container mx-auto px-6 py-8">
//           <PlaybookCertification 
//             playbookId={playbookId}
//             playbookName="Wind - C&P"
//             chapters={chapters}
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
//       <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
//                 <ArrowLeft className="h-5 w-5 text-gray-600" />
//               </Link>
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
//                 <Wind className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Wind - C&P</h1>
//                 <p className="text-sm text-gray-600">Contracting & Procurement Playbook</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   placeholder="Search processes..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 w-80 bg-white/90"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <ModernNavigation 
//         chapters={chapters}
//         activePhase={activePhase}
//         onPhaseChange={setActivePhase}
//       />

//       <div className="container mx-auto px-6 py-8">
//         <ModernTabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsContent value="processes">
//             <ProcessSteps 
//               playbookId={playbookId} 
//               activePhase={activePhase} 
//               searchQuery={searchQuery}
//               onNavigateToRaci={handleNavigateToRaci}
//             />
//           </TabsContent>

//           <TabsContent value="raci">
//             <RACIMatrix 
//               playbookId={playbookId} 
//               activePhase={activePhase} 
//               searchQuery={searchQuery}
//             />
//           </TabsContent>

//           <TabsContent value="process-map">
//             <div className="space-y-6">
//               <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <CardTitle className="flex items-center gap-2">
//                         Process Map - {activePhase}
//                       </CardTitle>
//                       <CardDescription>
//                         Visual representation of the complete process flow
//                       </CardDescription>
//                     </div>
//                     <Button 
//                       onClick={() => downloadProcessMap(activePhase)}
//                       className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
//                     >
//                       <Download className="h-4 w-4 mr-2" />
//                       Download
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   <div className="flex justify-center">
//                     <img 
//                       src={getProcessMapImage(activePhase)}
//                       alt={`Process Map for ${activePhase}`}
//                       className="max-w-full h-auto rounded-lg shadow-lg border border-blue-200"
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </ModernTabs>
//       </div>
//     </div>
//   );
// };

// export default WindCPDashboard;
