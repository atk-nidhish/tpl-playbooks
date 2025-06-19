
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PlaybookCertification } from "@/components/PlaybookCertification";

const WindConstructionCertificationDashboard = () => {
  const chapters = [
    {
      id: "chapter-1",
      name: "Chapter 1: Site Mobilization",
      shortName: "Chapter 1 - Site Mobilization"
    },
    {
      id: "chapter-2", 
      name: "Chapter 2: Construction Management",
      shortName: "Chapter 2 - Construction Mgmt"
    },
    {
      id: "chapter-3",
      name: "Chapter 3: Quality Control",
      shortName: "Chapter 3 - Quality Control"
    },
    {
      id: "chapter-4",
      name: "Chapter 4: Safety Management",
      shortName: "Chapter 4 - Safety Management"
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
                <HardHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wind - Construction Management Certification</h1>
                <p className="text-sm text-gray-600">Construction Management Certification Quiz</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <PlaybookCertification 
          playbookId="wind-construction"
          playbookName="Construction Management - Wind"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default WindConstructionCertificationDashboard;
