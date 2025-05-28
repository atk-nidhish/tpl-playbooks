
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Project Playbooks</h1>
                <p className="text-gray-600">Enterprise process management platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Streamline Your Project Execution
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access comprehensive playbooks designed to guide your team through complex project workflows with clarity and efficiency.
            </p>
          </div>

          {/* Single Playbook Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wind className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Wind - C&P
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Contracting & Procurement Playbook
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-6">
                  Comprehensive framework for wind project contracting, vendor management, and procurement processes from bid submission to contractor management.
                </p>
                <Link to="/wind-cp">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg">
                    Explore Playbook
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
