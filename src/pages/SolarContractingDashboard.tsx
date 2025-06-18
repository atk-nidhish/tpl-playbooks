
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { PlaybookCertification } from "@/components/PlaybookCertification";

const SolarContractingDashboard = () => {
  const chapters = [
    { id: "4.1", name: "Procurement Strategy", shortName: "Strategy" },
    { id: "4.2", name: "Vendor Selection", shortName: "Vendors" },
    { id: "4.3", name: "Contract Negotiation", shortName: "Negotiation" },
    { id: "4.4", name: "Contract Management", shortName: "Management" },
    { id: "4.5", name: "Supply Chain Management", shortName: "Supply Chain" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Solar Contracting & Procurement Certification</h1>
              <p className="text-xl text-gray-600">Test your knowledge of solar project contracting and procurement processes</p>
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
          playbookId="solar-contracting"
          playbookName="Contracting & Procurement - Solar"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default SolarContractingDashboard;
