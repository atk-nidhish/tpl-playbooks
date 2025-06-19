
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const WindConstructionCertificationDashboard = () => {
  const chapters = [
    {
      id: "1",
      name: "Site Setup and Mobilization",
      shortName: "Setup"
    },
    {
      id: "2", 
      name: "Construction Management",
      shortName: "Management"
    },
    {
      id: "3",
      name: "Quality Control and Safety",
      shortName: "Quality"
    },
    {
      id: "4",
      name: "Progress Monitoring",
      shortName: "Monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Construction Management - Wind
              </h1>
              <p className="text-xl text-gray-600">
                Certification Quiz
              </p>
            </div>
            <Link to="/">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:bg-blue-50 border-blue-200"
              >
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>
          
          <PlaybookCertification
            playbookId="wind-construction"
            playbookName="Construction Management - Wind"
            chapters={chapters}
          />
        </div>
      </div>
    </div>
  );
};

export default WindConstructionCertificationDashboard;
