
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
              <span className="text-gray-600">👤 A</span>
              <span className="text-gray-600">📊 X</span>
              <Button variant="ghost" className="text-gray-600">
                ↗️ Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Access your playbooks and track your certifications</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wind Playbooks Section */}
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
                  <Link to="/planning-solar">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Access Playbook
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              
            </div>
          </div>

          {/* Wind Playbooks Section */}
          <div>
            {/* <div className="flex items-center space-x-2 mb-6">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Certifications</h3>
            </div> */}
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Wind Playbooks</h3>
            </div>
            
            <div className="space-y-4">
            {/* Wind - Planning Playbook */}
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
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
                  <Link to="/wind-planning">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Access Playbook
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Wind - C&P Playbook */}
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
                  <CardTitle className="text-xl font-semibold text-gray-900">C&P - Wind</CardTitle>
                  <CardDescription className="text-gray-600">Wind Project Planning Contracting & Procurement</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link to="/wind-cp">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Access Playbook
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              {/* First Certification */}
               {/* <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <span className="text-white text-sm">🏆</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-300">Earned</Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Wind - C&P Certification</CardTitle>
                  <div className="text-sm text-gray-600">
                    <div>Score: 90% - NP1</div>
                    <div className="text-green-600">Completed: 6/11/2025</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card> */}

              {/* Second Certification */}
              {/* <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <span className="text-white text-sm">🏆</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-300">Earned</Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Wind - C&P Certification</CardTitle>
                  <div className="text-sm text-gray-600">
                    <div>Score: 100% - NP</div>
                    <div className="text-green-600">Completed: 6/10/2025</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
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
