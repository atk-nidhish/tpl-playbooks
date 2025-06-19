
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const WindEngineeringDashboard = () => {
  const chapters = [
    {
      id: "engineering-process",
      name: "Wind Engineering Process",
      shortName: "Engineering"
    },
    {
      id: "technical-requirements",
      name: "Technical Requirements and Documentation",
      shortName: "Technical"
    },
    {
      id: "consultant-management",
      name: "Consultant Management and Coordination",
      shortName: "Consultant"
    },
    {
      id: "project-coordination",
      name: "Project Coordination and Communication",
      shortName: "Coordination"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </div>
        <PlaybookCertification
          playbookId="wind-engineering"
          playbookName="Engineering - Wind"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default WindEngineeringDashboard;
