
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { PlaybookCertification } from "@/components/PlaybookCertification";

const SolarCommissioningDashboard = () => {
  const chapters = [
    { id: "6.1", name: "Pre-Commissioning", shortName: "Pre-Comm" },
    { id: "6.2", name: "System Testing", shortName: "Testing" },
    { id: "6.3", name: "Performance Verification", shortName: "Performance" },
    { id: "6.4", name: "Documentation & Handover", shortName: "Handover" },
    { id: "6.5", name: "Operations Transition", shortName: "Transition" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Solar Commissioning Certification</h1>
              <p className="text-xl text-gray-600">Test your knowledge of solar project commissioning processes</p>
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
          playbookId="solar-commissioning"
          playbookName="Commissioning - Solar"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default SolarCommissioningDashboard;
