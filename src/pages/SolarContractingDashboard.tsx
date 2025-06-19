
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { FileText, Sun, Home } from "lucide-react";

const SolarContractingDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Define chapters for Solar Contracting and Procurement
  const chapters = [
    {
      id: "procurement-planning",
      name: "Procurement Planning",
      shortName: "Planning"
    },
    {
      id: "vendor-management",
      name: "Vendor Management and Evaluation",
      shortName: "Vendor Management"
    },
    {
      id: "contract-execution",
      name: "Contract Execution and Delivery",
      shortName: "Contract Execution"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Solar Contracting and Procurement Certification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Solar Contracting and Procurement</h1>
                <p className="text-sm text-gray-600">Certification Exam</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <PlaybookCertification
            playbookId="solar-contracting"
            playbookName="Solar Contracting and Procurement"
            chapters={chapters}
          />
        </div>
      </main>
    </div>
  );
};

export default SolarContractingDashboard;
