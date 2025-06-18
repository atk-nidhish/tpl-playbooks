
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { PlaybookCertification } from "@/components/PlaybookCertification";

const SolarPredevelopmentDashboard = () => {
  const chapters = [
    { id: "3.1", name: "Site Identification & Assessment", shortName: "Site ID" },
    { id: "3.2", name: "Land Rights & Acquisition", shortName: "Land Rights" },
    { id: "3.3", name: "Environmental Studies", shortName: "Environmental" },
    { id: "3.4", name: "Grid Connection Studies", shortName: "Grid Studies" },
    { id: "3.5", name: "Permitting & Approvals", shortName: "Permitting" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Solar Predevelopment Certification</h1>
              <p className="text-xl text-gray-600">Test your knowledge of solar project predevelopment processes</p>
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
          playbookId="solar-predevelopment"
          playbookName="Predevelopment - Solar"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default SolarPredevelopmentDashboard;
