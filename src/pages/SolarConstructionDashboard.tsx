
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { PlaybookCertification } from "@/components/PlaybookCertification";

const SolarConstructionDashboard = () => {
  const chapters = [
    { id: "5.1", name: "Construction Planning", shortName: "Planning" },
    { id: "5.2", name: "Site Preparation", shortName: "Site Prep" },
    { id: "5.3", name: "Installation Management", shortName: "Installation" },
    { id: "5.4", name: "Quality Control", shortName: "Quality" },
    { id: "5.5", name: "Safety Management", shortName: "Safety" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Solar Construction Management Certification</h1>
              <p className="text-xl text-gray-600">Test your knowledge of solar project construction management processes</p>
            </div>
            <Link to="/">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-orange-200 hover:bg-orange-50"
              >
                <Home className="h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>

        <PlaybookCertification 
          playbookId="solar-construction"
          playbookName="Construction Management - Solar"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default SolarConstructionDashboard;
