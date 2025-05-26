import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Sun, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useDataInit } from "@/hooks/useDataInit";

interface Playbook {
  id: string;
  name: string;
  title: string;
  description: string;
  phases: any;
}

const Home = () => {
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Search Results</CardTitle>
              <Search className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredPlaybooks.length}</div>
              <p className="text-xs text-muted-foreground">Matching your search</p>
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
              <p className="text-gray-600">No playbooks found. Upload your first playbook to get started.</p>
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
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          {playbook.phases ? Object.keys(playbook.phases).length : 0} phases
                        </Badge>
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
