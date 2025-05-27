
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sun, BookOpen, FileText, RefreshCw, Zap, ArrowRight, Wind, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useDataInit } from "@/hooks/useDataInit";

interface Playbook {
  id: string;
  name: string;
  title: string;
  description: string;
  phases: any;
  file_path?: string;
}

const Home = () => {
  const dashboards = [
    {
      id: "commissioning",
      title: "Wind Commissioning",
      description: "Complete commissioning playbook for wind power projects including RLDC registration, CEIG approval, and performance testing procedures.",
      icon: Wind,
      route: "/commissioning",
      gradient: "from-orange-400 to-yellow-400",
      bgGradient: "from-orange-50 via-yellow-50 to-blue-50"
    },
    {
      id: "wind-cp",
      title: "Wind - C&P",
      description: "Contracting & Procurement playbook covering cost estimation, vendor empanelment, contract awards, and contractor management processes.",
      icon: Settings,
      route: "/wind-cp",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50"
    },
    {
      id: "legacy",
      title: "Solar Project Execution",
      description: "Legacy interactive playbook edition for solar project execution with comprehensive process mapping and team coordination.",
      icon: Sun,
      route: "/legacy",
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-50 via-orange-50 to-red-50"
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);
  const { isInitialized } = useDataInit();

  useEffect(() => {
    if (isInitialized) {
      fetchPlaybooks();
    }
  }, [isInitialized]);

  const fetchPlaybooks = async () => {
    try {
      const { data, error } = await supabase
        .from('playbooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlaybooks(data || []);
    } catch (error) {
      console.error('Error fetching playbooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllPlaybooks = async () => {
    try {
      // Delete all data from related tables first
      await supabase.from('process_steps').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('raci_matrix').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('process_map').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('playbooks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('All playbooks and related data deleted');
      fetchPlaybooks();
    } catch (error) {
      console.error('Error deleting playbooks:', error);
    }
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Solar Project Execution Tracker</h1>
                <p className="text-sm text-gray-600">Interactive Playbook Management System</p>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Playbook Library</h2>
          <p className="text-lg text-gray-600 mb-6">
            Access and manage all your solar project execution playbooks in one centralized location. 
            Each playbook contains detailed process steps, RACI matrices, and process maps to guide your project execution.
          </p>
        </div>

        {/* Dashboard Cards Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Dashboards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((dashboard) => {
              const IconComponent = dashboard.icon;
              return (
                <Link key={dashboard.id} to={dashboard.route}>
                  <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-white/90 backdrop-blur-sm border-orange-200 hover:border-orange-300 group">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`bg-gradient-to-r ${dashboard.gradient} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{dashboard.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {dashboard.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Interactive Dashboard
                        </span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Playbooks</CardTitle>
              <BookOpen className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{playbooks.length}</div>
              <p className="text-xs text-muted-foreground">Available for execution</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Project Phases</CardTitle>
              <FileText className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {playbooks.reduce((total, pb) => total + (pb.phases ? Object.keys(pb.phases).length : 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all playbooks</p>
            </CardContent>
          </Card>
        </div>

        {/* Playbooks Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Playbooks</h3>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading playbooks...</p>
            </div>
          ) : filteredPlaybooks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No playbooks found. Upload images to create your first playbook.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaybooks.map((playbook) => (
                <Card 
                  key={playbook.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-white/90 backdrop-blur-sm border-orange-200 hover:border-orange-300"
                >
                  <Link to={`/playbook/${playbook.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{playbook.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            {playbook.phases ? Object.keys(playbook.phases).length : 0} phases
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {playbook.description || "Detailed process execution playbook"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>ID: {playbook.name}</span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Interactive
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
