
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PlaybookCertification } from "@/components/PlaybookCertification";

const WindCPCertificationDashboard = () => {
  const chapters = [
    {
      id: "chapter-1",
      name: "Chapter 1: Cost Estimation for PPA Bid Submission",
      shortName: "Chapter 1 - Cost Estimation"
    },
    {
      id: "chapter-2", 
      name: "Chapter 2: Vendor Empanelment",
      shortName: "Chapter 2 - Vendor Empanelment"
    },
    {
      id: "chapter-3",
      name: "Chapter 3: Contract Award and PR Execution",
      shortName: "Chapter 3 - Contract Award"
    },
    {
      id: "chapter-4",
      name: "Chapter 4: Contractor Management",
      shortName: "Chapter 4 - Contractor Mgmt"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wind - C&P Certification</h1>
                <p className="text-sm text-gray-600">Contracting & Procurement Certification Quiz</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <PlaybookCertification 
          playbookId="wind-cp"
          playbookName="Contracting and Procurement - Wind"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default WindCPCertificationDashboard;
