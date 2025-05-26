
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, User } from "lucide-react";

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

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "R":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "A":
        return "bg-green-100 text-green-800 border-green-300";
      case "C":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "I":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
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
              <Badge className={getRoleBadgeColor("R")}>R</Badge>
              <span className="text-sm">Responsible</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getRoleBadgeColor("A")}>A</Badge>
              <span className="text-sm">Accountable</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getRoleBadgeColor("C")}>C</Badge>
              <span className="text-sm">Consulted</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getRoleBadgeColor("I")}>I</Badge>
              <span className="text-sm">Informed</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {filteredData.map((item) => (
          <Card key={item.id} className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-md transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm">
                  {item.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3">{item.task}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getRoleBadgeColor("R")}>R</Badge>
                        <span className="text-sm font-medium">Responsible</span>
                      </div>
                      {item.responsible && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-600">{item.responsible}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getRoleBadgeColor("A")}>A</Badge>
                        <span className="text-sm font-medium">Accountable</span>
                      </div>
                      {item.accountable && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-600">{item.accountable}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getRoleBadgeColor("C")}>C</Badge>
                        <span className="text-sm font-medium">Consulted</span>
                      </div>
                      {item.consulted && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-600">{item.consulted}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getRoleBadgeColor("I")}>I</Badge>
                        <span className="text-sm font-medium">Informed</span>
                      </div>
                      {item.informed && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-600">{item.informed}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
