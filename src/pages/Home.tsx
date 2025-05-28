import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sun, BookOpen, FileText, RefreshCw, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useDataInit } from "@/hooks/useDataInit";
import { FileUpload } from "@/components/FileUpload";

interface Playbook {
  id: string;
  name: string;
  title: string;
  description: string;
  phases: any;
  file_path?: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const { isInitialized } = useDataInit();

  useEffect(() => {
    if (isInitialized) {
      fetchPlaybooks();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (searchQuery.trim()) {
      performGlobalSearch();
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const fetchPlaybooks = async () => {
    try {
      const { data, error } = await supabase
        .from('playbooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Remove duplicates based on title, keeping the first occurrence
      const uniquePlaybooks = data?.filter((playbook, index, self) => 
        index === self.findIndex(p => p.title === playbook.title)
      ) || [];
      
      setPlaybooks(uniquePlaybooks);
    } catch (error) {
      console.error('Error fetching playbooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const performGlobalSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const searchTerm = searchQuery.toLowerCase();
      
      // Search across all tables
      const [playbooksResult, processStepsResult, raciResult, processMapResult] = await Promise.all([
        supabase
          .from('playbooks')
          .select('*')
          .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`),
        
        supabase
          .from('process_steps')
          .select('*, playbooks!inner(title, name)')
          .or(`activity.ilike.%${searchTerm}%,responsible.ilike.%${searchTerm}%,comments.ilike.%${searchTerm}%`),
        
        supabase
          .from('raci_matrix')
          .select('*, playbooks!inner(title, name)')
          .or(`task.ilike.%${searchTerm}%,responsible.ilike.%${searchTerm}%,accountable.ilike.%${searchTerm}%,consulted.ilike.%${searchTerm}%,informed.ilike.%${searchTerm}%`),
        
        supabase
          .from('process_map')
          .select('*, playbooks!inner(title, name)')
          .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      ]);

      const results = [
        ...(playbooksResult.data || []).map(item => ({ ...item, type: 'playbook' })),
        ...(processStepsResult.data || []).map(item => ({ ...item, type: 'process_step' })),
        ...(raciResult.data || []).map(item => ({ ...item, type: 'raci' })),
        ...(processMapResult.data || []).map(item => ({ ...item, type: 'process_map' }))
      ];

      setSearchResults(results);
    } catch (error) {
      console.error('Error performing global search:', error);
    } finally {
      setIsSearching(false);
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

  const filteredPlaybooks = searchQuery.trim() ? [] : playbooks;

  const getResultTypeIcon = (type: string) => {
    switch (type) {
      case 'playbook':
        return <BookOpen className="h-4 w-4" />;
      case 'process_step':
        return <Zap className="h-4 w-4" />;
      case 'raci':
        return <FileText className="h-4 w-4" />;
      case 'process_map':
        return <ArrowRight className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getResultTypeName = (type: string) => {
    switch (type) {
      case 'playbook':
        return 'Playbook';
      case 'process_step':
        return 'Process Step';
      case 'raci':
        return 'RACI Matrix';
      case 'process_map':
        return 'Process Map';
      default:
        return 'Result';
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Solar Project Execution Tracker</h1>
                <p className="text-sm text-gray-600">Interactive Playbook Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search across all playbooks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-white/90"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <RefreshCw className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                )}
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

        {/* File Upload Section */}
        <div className="mb-8">
          <FileUpload onUploadComplete={fetchPlaybooks} />
        </div>

        {/* Search Results */}
        {searchQuery.trim() && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Search Results for "{searchQuery}" ({searchResults.length} found)
            </h3>
            {searchResults.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">No results found for your search.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((result, index) => (
                  <Card key={`${result.type}-${result.id || index}`} className="bg-white/90 backdrop-blur-sm border-orange-200 hover:border-orange-300 transition-all">
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        {getResultTypeIcon(result.type)}
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          {getResultTypeName(result.type)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {result.title || result.activity || result.task || result.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {result.description || result.comments || 'Found in playbook search'}
                      </CardDescription>
                      {result.playbooks && (
                        <div className="text-xs text-gray-500">
                          From: {result.playbooks.title}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      {result.type === 'playbook' ? (
                        <Link to={`/playbook/${result.id}`} className="text-orange-600 hover:text-orange-700 text-sm flex items-center gap-1">
                          Open Playbook <ArrowRight className="h-3 w-3" />
                        </Link>
                      ) : (
                        <div className="text-sm text-gray-600">
                          {result.phase_id && `Phase: ${result.phase_id}`}
                          {result.step_id && ` | Step: ${result.step_id}`}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

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
        {!searchQuery.trim() && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Playbooks</h3>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading playbooks...</p>
              </div>
            ) : filteredPlaybooks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No playbooks found. Upload documents above to create your first playbook.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaybooks.map((playbook) => (
                  <Card 
                    key={playbook.id}
                    className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-white/90 backdrop-blur-sm border-orange-200 hover:border-orange-300 group"
                  >
                    <Link to={`/playbook/${playbook.id}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                            {playbook.title}
                          </CardTitle>
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
                          <span className="flex items-center gap-1 group-hover:text-orange-600 transition-colors">
                            <FileText className="h-3 w-3" />
                            Interactive
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
