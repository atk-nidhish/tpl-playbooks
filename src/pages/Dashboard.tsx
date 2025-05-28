
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Sun, BookOpen, Plus, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { FileUpload } from "@/components/FileUpload";
import { PlaybookReprocessor } from "@/components/PlaybookReprocessor";

interface Playbook {
  id: string;
  name: string;
  title: string;
  description: string;
  created_at: string;
  phases: any;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaybooks();
  }, []);

  const fetchPlaybooks = async () => {
    try {
      console.log('Fetching all playbooks...');
      
      const { data, error } = await supabase
        .from('playbooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching playbooks:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} playbooks:`, data);
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

  const getPhaseCount = (phases: any) => {
    return phases ? Object.keys(phases).length : 0;
  };

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
                <p className="text-sm text-gray-600">Manage and access your interactive playbooks</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={fetchPlaybooks} 
                variant="outline"
                size="sm"
                className="bg-white/90"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
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
          {/* File Upload Section */}
          <FileUpload onUploadComplete={fetchPlaybooks} />
          
          {/* Playbook Reprocessor */}
          <PlaybookReprocessor />

          {/* Playbooks Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Playbooks ({filteredPlaybooks.length})
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading playbooks...</p>
              </div>
            ) : filteredPlaybooks.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {playbooks.length === 0 ? 'No playbooks yet' : 'No playbooks match your search'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {playbooks.length === 0 
                      ? 'Upload your first document to create an interactive playbook'
                      : 'Try adjusting your search terms'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaybooks.map((playbook) => (
                  <Link key={playbook.id} to={`/playbook/${playbook.id}`}>
                    <Card className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                              {playbook.title}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {playbook.description || "Interactive playbook"}
                            </CardDescription>
                          </div>
                          <BookOpen className="h-5 w-5 text-orange-500 flex-shrink-0 ml-2" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            {getPhaseCount(playbook.phases)} phases
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(playbook.created_at).toLocaleDateString()}
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
