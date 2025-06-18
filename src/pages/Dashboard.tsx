
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Wind, Sun } from "lucide-react";
import { PlaybookCard } from "@/components/PlaybookCard";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const solarPlaybooks = [
    {
      title: "Planning - Solar",
      description: "Solar Project Planning",
      linkTo: "/planning-solar",
      available: true
    },
    {
      title: "Engineering - Solar",
      description: "Solar Engineering Execution",
      linkTo: "/engineering-solar",
      available: true
    },
    {
      title: "Contracting & Procurement - Solar",
      description: "Solar Project Contracting & Procurement",
      linkTo: "/planning-solar",
      available: true
    }
  ];

  const windPlaybooks = [
    {
      title: "Planning - Wind",
      description: "Wind Project Planning",
      linkTo: "/wind-planning",
      available: true
    },
    {
      title: "Contracting & Procurement - Wind",
      description: "Wind Project Contracting & Procurement",
      linkTo: "/wind-cp",
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">Playbook Portal</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h2>
          <p className="text-gray-600">Access Solar and Wind Project Execution playbooks</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Solar Playbooks Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Solar Playbooks</h3>
            </div>
            
            <div className="space-y-4">
              {solarPlaybooks.map((playbook, index) => (
                <PlaybookCard
                  key={index}
                  title={playbook.title}
                  description={playbook.description}
                  icon={Sun}
                  iconBgColor="bg-orange-500"
                  buttonColor="bg-orange-500"
                  buttonHoverColor="hover:bg-orange-600"
                  linkTo={playbook.linkTo}
                  available={playbook.available}
                />
              ))}
            </div>
          </div>

          {/* Wind Playbooks Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Wind Playbooks</h3>
            </div>
            
            <div className="space-y-4">
              {windPlaybooks.map((playbook, index) => (
                <PlaybookCard
                  key={index}
                  title={playbook.title}
                  description={playbook.description}
                  icon={Wind}
                  iconBgColor="bg-blue-600"
                  buttonColor="bg-blue-600"
                  buttonHoverColor="hover:bg-blue-700"
                  linkTo={playbook.linkTo}
                  available={playbook.available}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
