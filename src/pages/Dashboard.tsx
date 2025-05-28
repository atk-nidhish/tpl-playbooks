
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Sun, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Original 3 playbook dashboards
  const playbooks = [
    {
      id: "solar-execution",
      title: "Solar Project Execution Playbook",
      description: "Comprehensive playbook for solar project execution and management",
      route: "/legacy",
      phases: 3
    },
    {
      id: "wind-commissioning",
      title: "Wind Commissioning Playbook", 
      description: "Wind turbine commissioning processes and procedures",
      route: "/commissioning",
      phases: 4
    },
    {
      id: "wind-cp",
      title: "Wind - C&P (Contracting & Procurement)",
      description: "Wind contracting and procurement processes",
      route: "/wind-cp",
      phases: 10
    }
  ];

  const filteredPlaybooks = playbooks.filter(playbook =>
    playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playbook.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Playbook Dashboard</h1>
                <p className="text-sm text-gray-600">Access your interactive playbooks</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search playbooks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-white/90"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-8">
          {/* Playbooks Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Playbooks ({filteredPlaybooks.length})
              </h2>
            </div>

            {filteredPlaybooks.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No playbooks match your search
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaybooks.map((playbook) => (
                  <Link key={playbook.id} to={playbook.route}>
                    <Card className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                              {playbook.title}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {playbook.description}
                            </CardDescription>
                          </div>
                          <BookOpen className="h-5 w-5 text-orange-500 flex-shrink-0 ml-2" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {playbook.phases} phases
                          </span>
                          <span className="text-xs text-gray-500">
                            Interactive Playbook
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
