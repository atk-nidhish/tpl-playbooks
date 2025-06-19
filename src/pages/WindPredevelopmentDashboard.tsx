
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const WindPredevelopmentDashboard = () => {
  const chapters = [
    {
      id: "predevelopment-intelligence",
      name: "Predevelopment Intelligence Report",
      shortName: "Intelligence"
    },
    {
      id: "land-leasing",
      name: "Land Leasing and Evacuation Capacity",
      shortName: "Land Leasing"
    },
    {
      id: "feasibility-assessment",
      name: "Feasibility Assessment and Due Diligence",
      shortName: "Feasibility"
    },
    {
      id: "technical-evaluation",
      name: "Technical Evaluation",
      shortName: "Technical"
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
          playbookId="wind-predevelopment"
          playbookName="Predevelopment - Wind"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default WindPredevelopmentDashboard;
