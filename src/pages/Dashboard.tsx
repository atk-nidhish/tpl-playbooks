import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Wind, Sun, Play, MapPin } from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Playbook Portal
                </h1>
                <p className="text-gray-600">Your Interactive Learning Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
                v2.0
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Playbook Portal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access comprehensive playbooks designed to guide you through complex processes with interactive learning experiences, step-by-step guidance, and certification opportunities.
          </p>
        </div>

        {/* Playbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Wind - C&P Playbook */}
          <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Wind className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">Available</Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                Wind - C&P
              </CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Contracting & Procurement Playbook
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Master the contracting and procurement processes for wind energy projects with comprehensive guidelines and best practices.
              </p>
              <Link to="/wind-cp" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Access Playbook
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Planning - Solar Playbook */}
          <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sun className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">Available</Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                Planning - Solar
              </CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Solar Project Planning
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Comprehensive planning framework for solar energy projects from conception to commissioning.
              </p>
              <Link to="/planning-solar" className="block">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Access Playbook
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Wind - Planning Playbook */}
          <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">Available</Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                Wind - Planning
              </CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Wind Project Planning
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Comprehensive wind project planning playbook covering all phases from integration management to risk management.
              </p>
              <Link to="/wind-planning" className="block">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Access Playbook
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Interactive Learning Modules */}
            <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Interactive Learning Modules
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Engaging content that adapts to your learning pace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                Explore interactive lessons, quizzes, and simulations designed to reinforce your understanding of key concepts and best practices.
              </CardContent>
            </Card>

            {/* Step-by-Step Guidance */}
            <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Step-by-Step Guidance
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Clear, actionable steps for every process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                Follow detailed, step-by-step instructions that guide you through each process, ensuring accuracy and efficiency in your project execution.
              </CardContent>
            </Card>

            {/* Certification Programs */}
            <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Certification Programs
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Validate your expertise with industry-recognized certifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                Earn certifications that demonstrate your proficiency and commitment to excellence in project management and execution.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 py-8 border-t border-blue-200">
          <p>&copy; 2024 Lovable. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
