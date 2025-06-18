
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Wind, Sun, MapPin, Download } from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Solar Click Handling
  const handleSolarPlanningClick = () => {
    window.open('/solar-planning.pdf', '_blank');
  };  
  const handleSolarPredevClick = () => {
    window.open('/solar-predev.pdf', '_blank');
  };
  
  const handleSolarEngineeringClick = () => {
    window.open('/solar-engineering.pdf', '_blank');
  };

  // Wind Click Handling
  const handleWindPlanningClick = () => {
    window.open('/wind-planning.pdf', '_blank');
  };  



  
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
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h2>
          <p className="text-gray-600">Access Solar and Wind Project Execution playbooks </p>
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

            {/* Planning - Solar Playbook */}
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Sun className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-300">Available</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Planning - Solar</CardTitle>
                  <CardDescription className="text-gray-600">Solar Project Planning</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSolarPlanningClick}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Access Playbook
                    </Button>
                    <Link to="/solar-planning" className="flex-1">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Certification Quiz
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

            {/* Predev - Solar Playbook */}
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Sun className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-300">Available</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Predevelopment - Solar</CardTitle>
                  <CardDescription className="text-gray-600">Solar Project Predevelopment</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSolarPredevClick}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Access Playbook
                    </Button>
                    <Link to="/solar-predev" className="flex-1">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Certification Quiz
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
    
              {/* Engineering - Solar Playbook */}
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Sun className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-300">Available</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Engineering - Solar</CardTitle>
                  <CardDescription className="text-gray-600">Solar Project Engineering</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSolarEngineeringClick}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Access Playbook
                    </Button>
                    <Link to="/solar-engineering" className="flex-1">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Certification Quiz
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Wind Playbooks Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Wind Playbooks</h3>
            </div>
            
            <div className="space-y-4">
          {/* Wind - Planning Playbook */}
            <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <Wind className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-300">Available</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Planning - Wind</CardTitle>
                  <CardDescription className="text-gray-600">Wind Project Planning</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleWindPlanningClick}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Access Playbook
                    </Button>
                    <Link to="/wind-planning" className="flex-1">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Certification Quiz
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>


              {/* Wind - C&P Playbook */}
              {/* <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <Wind className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-300">Available</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Contracting & Procurement - Wind</CardTitle>
                  <CardDescription className="text-gray-600">Wind Project Contracting & Procurement</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link to="/wind-cp">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Access Playbook
                    </Button>
                  </Link>
                </CardContent>
              </Card> */}
             
            </div> 
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
