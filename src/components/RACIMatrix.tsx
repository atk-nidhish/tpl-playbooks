
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";

interface RACIMatrixProps {
  activePhase: string;
  searchQuery: string;
}

export const RACIMatrix = ({ activePhase, searchQuery }: RACIMatrixProps) => {
  const constructionRACIData = [
    {
      id: "S",
      task: "Inform Project Manager (PM) that construction and erection of WTGs and BOP is complete",
      responsible: "OEM SPOC",
      accountable: "",
      consulted: "",
      informed: "Project Manager"
    },
    {
      id: "P1",
      task: "Inform Chief O&M about construction and erection completion and request for Commissioning POC appointment",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Chief O&M"
    },
    {
      id: "P2",
      task: "Direct Site Quality Head (SQH) and Commissioning POC to conduct an inspection of the WTG and BOP",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Site Quality Head, Commissioning POC"
    },
    {
      id: "P3",
      task: "Request OEM SPOC to appoint OEM engineers for the inspection",
      responsible: "Site Quality Head",
      accountable: "",
      consulted: "",
      informed: "OEM SPOC"
    },
    {
      id: "P4",
      task: "Appoint Mechanical, Civil and Electrical OEM engineers for the inspection",
      responsible: "OEM SPOC",
      accountable: "",
      consulted: "",
      informed: "OEM Engineers"
    },
    {
      id: "P5",
      task: "Request Site Mechanical, Civil and Electrical Leads and CPOC to attend the respective inspection",
      responsible: "Site Quality Head",
      accountable: "",
      consulted: "",
      informed: "Site Mechanical, Civil, Electrical Lead, CPOC"
    },
    {
      id: "P6",
      task: "Lead the inspection of the block, and log all the deviations in a punch point list",
      responsible: "Site Quality Head",
      accountable: "",
      consulted: "OEM Engineers, Site Mechanical, Civil, Electrical Lead, CPOC",
      informed: ""
    },
    {
      id: "P7",
      task: "Ensure signatures on the punch point list from the OEM Engineer and respective Site Functional Head",
      responsible: "Site Quality Head",
      accountable: "Site Quality Head",
      consulted: "",
      informed: "OEM Engineers, Site Mechanical, Civil, Electrical Lead, CPOC"
    },
    {
      id: "P8",
      task: "Close all the critical punch points and prepare the compliance report",
      responsible: "OEM SPOC",
      accountable: "",
      consulted: "",
      informed: "Commissioning POC"
    }
  ];

  const precommissioningRACIData = [
    {
      id: "S",
      task: "Notify the Project Manager (PM) that MCC has been issued",
      responsible: "Site Quality Head",
      accountable: "",
      consulted: "",
      informed: "Project Manager"
    },
    {
      id: "P1",
      task: "Notify the OEM SPOC and Commissioning POC (CPOC) to initiate the pre-commissioning tests",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "OEM SPOC, Commissioning POC"
    },
    {
      id: "P2",
      task: "Prepare the Pre-commissioning checklist and share it with Site Electrical Lead (SEL) for approval",
      responsible: "OEM SPOC",
      accountable: "",
      consulted: "",
      informed: "Site Electrical Lead"
    },
    {
      id: "P3",
      task: "Recommend changes, if required, and provide sign-off on the checklist",
      responsible: "Site Electrical Lead",
      accountable: "",
      consulted: "",
      informed: "OEM SPOC"
    },
    {
      id: "P4",
      task: "Share the documents with CPOC for approval",
      responsible: "Site Electrical Lead",
      accountable: "",
      consulted: "",
      informed: "Commissioning POC"
    },
    {
      id: "P5",
      task: "Recommend changes, if required, and provide sign-off on the checklist",
      responsible: "Commissioning POC",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      id: "P6",
      task: "Share the approved checklist with the OEM SPOC",
      responsible: "Commissioning POC",
      accountable: "",
      consulted: "",
      informed: "OEM SPOC"
    },
    {
      id: "P7",
      task: "Conduct the requisite tests and document the results in the checklist",
      responsible: "OEM Engineers",
      accountable: "",
      consulted: "OEM SPOC, Site Electrical Lead, Commissioning POC",
      informed: ""
    },
    {
      id: "P8",
      task: "Sign the checklist containing the test results and share it with the CPOC",
      responsible: "OEM SPOC",
      accountable: "",
      consulted: "",
      informed: "Commissioning POC"
    },
    {
      id: "P9",
      task: "Seek clarifications if any, and sign-off on the checklist",
      responsible: "Commissioning POC",
      accountable: "",
      consulted: "",
      informed: "OEM SPOC"
    }
  ];

  const currentRACIData = activePhase === "construction" ? constructionRACIData : precommissioningRACIData;

  const filteredData = currentRACIData.filter(item =>
    item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.responsible.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.accountable.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.consulted.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.informed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (text: string, role: string) => {
    if (!text) return null;
    
    const colorMap = {
      R: "bg-blue-100 text-blue-800",
      A: "bg-green-100 text-green-800",
      C: "bg-orange-100 text-orange-800",
      I: "bg-purple-100 text-purple-800"
    };

    return (
      <div className="flex items-center gap-1">
        <Badge className={`${colorMap[role as keyof typeof colorMap]} text-xs`}>
          {role}
        </Badge>
        <span className="text-sm">{text}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            RACI Matrix - {activePhase === "construction" ? "Construction & Erection" : "Pre-commissioning Testing"}
          </CardTitle>
          <CardDescription>
            Clear RACI matrices that define roles and responsibilities for each step of the process
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">R</Badge>
              <span className="text-sm">Responsible</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">A</Badge>
              <span className="text-sm">Accountable</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-800">C</Badge>
              <span className="text-sm">Consulted</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800">I</Badge>
              <span className="text-sm">Informed</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Step</TableHead>
                <TableHead className="min-w-[300px]">Task</TableHead>
                <TableHead className="w-[200px]">Responsible</TableHead>
                <TableHead className="w-[200px]">Accountable</TableHead>
                <TableHead className="w-[200px]">Consulted</TableHead>
                <TableHead className="w-[200px]">Informed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm">
                      {item.id}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.task}</TableCell>
                  <TableCell>{getRoleBadge(item.responsible, "R")}</TableCell>
                  <TableCell>{getRoleBadge(item.accountable, "A")}</TableCell>
                  <TableCell>{getRoleBadge(item.consulted, "C")}</TableCell>
                  <TableCell>{getRoleBadge(item.informed, "I")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
