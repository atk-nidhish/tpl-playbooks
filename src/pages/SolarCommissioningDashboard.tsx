
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const SolarCommissioningDashboard = () => {
  const chapters = [
    {
      id: "commissioning-process",
      name: "Commissioning Process",
      shortName: "Commissioning"
    },
    {
      id: "testing-procedures",
      name: "Testing and Procedures",
      shortName: "Testing"
    },
    {
      id: "regulatory-compliance",
      name: "Regulatory Compliance",
      shortName: "Compliance"
    },
    {
      id: "project-handover",
      name: "Project Handover",
      shortName: "Handover"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
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
          playbookId="solar-commissioning"
          playbookName="Commissioning - Solar"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default SolarCommissioningDashboard;
