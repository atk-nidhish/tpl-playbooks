import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wind, FileText, Award, Download, LogOut, User, Building, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface CertificationData {
  id: string;
  user_name: string;
  user_department: string;
  playbook_name: string;
  score: number;
  completed_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [downloadingCert, setDownloadingCert] = useState(false);
  const [userCertifications, setUserCertifications] = useState<CertificationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserCertifications();
  }, [user]);

  const fetchUserCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('certification_scores')
        .select('*')
        .order('completed_at', { ascending: false });

      if (error) throw error;
      
      // For now, we'll show all certifications since we don't have user-specific filtering
      // In a real app, you'd filter by user_id or user_name
      setUserCertifications(data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = (userName: string, department: string) => {
    // Create a canvas to generate the certificate image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Background
    ctx!.fillStyle = '#f8fafc';
    ctx!.fillRect(0, 0, 800, 600);
    
    // Border
    ctx!.strokeStyle = '#fb923c';
    ctx!.lineWidth = 8;
    ctx!.strokeRect(20, 20, 760, 560);
    
    // Title
    ctx!.fillStyle = '#1f2937';
    ctx!.font = 'bold 48px Arial';
    ctx!.textAlign = 'center';
    ctx!.fillText('Certificate of Completion', 400, 120);
    
    // Subtitle
    ctx!.font = 'bold 24px Arial';
    ctx!.fillStyle = '#fb923c';
    ctx!.fillText('Wind C&P Playbook', 400, 160);
    
    // User name
    ctx!.font = 'bold 36px Arial';
    ctx!.fillStyle = '#1f2937';
    ctx!.fillText(`${userName}`, 400, 280);
    
    // Department
    ctx!.font = '20px Arial';
    ctx!.fillStyle = '#6b7280';
    ctx!.fillText(`Department: ${department}`, 400, 320);
    
    // Completion text
    ctx!.font = '18px Arial';
    ctx!.fillText('has successfully completed the', 400, 380);
    ctx!.fillText('Wind Contracting & Procurement Playbook', 400, 410);
    
    // Date
    const currentDate = new Date().toLocaleDateString();
    ctx!.fillText(`Date: ${currentDate}`, 400, 480);
    
    return canvas.toDataURL('image/png');
  };

  const handleDownloadCertificate = async () => {
    setDownloadingCert(true);
    
    setTimeout(() => {
      const userName = user?.user_metadata?.full_name || user?.email || 'Participant';
      const department = user?.user_metadata?.department || 'Wind Energy';
      
      // Generate certificate
      const certificateDataUrl = generateCertificate(userName, department);
      
      // Create a download link
      const link = document.createElement('a');
      link.href = certificateDataUrl;
      link.download = 'Wind-CP-Certificate.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadingCert(false);
    }, 1000);
  };

  const playbooks = [
    {
      id: "wind-cp",
      title: "Wind - C&P",
      description: "Contracting & Procurement",
      icon: Wind,
      color: "from-orange-400 to-yellow-500",
      status: "Available",
      route: "/wind-cp"
    },
    {
      id: "planning-solar",
      title: "Planning - Solar",
      description: "Solar Project Planning",
      icon: Sun,
      color: "from-yellow-400 to-orange-500",
      status: "Available",
      route: "/planning-solar"
    },
    {
      id: "wind-planning",
      title: "Wind - Planning",
      description: "Wind Project Planning",
      icon: Wind,
      color: "from-blue-400 to-cyan-500",
      status: "Available",
      route: "/wind-planning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Playbook Portal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{user.user_metadata?.full_name || user.email}</span>
                  </div>
                  {user.user_metadata?.department && (
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{user.user_metadata.department}</span>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={signOut}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Access your playbooks and track your certifications</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Playbooks Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Playbooks</h3>
            </div>
            
            <div className="grid gap-6">
              {playbooks.map((playbook) => {
                const IconComponent = playbook.icon;
                return (
                  <Card key={playbook.id} className="group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-blue-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`bg-gradient-to-r ${playbook.color} p-3 rounded-lg shadow-lg`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-gray-900">{playbook.title}</CardTitle>
                            <CardDescription className="text-gray-600">{playbook.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {playbook.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link to={playbook.route}>
                        <Button className={`w-full bg-gradient-to-r ${playbook.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                          Access Playbook
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Certificates Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
            </div>
            
            <div className="grid gap-6">
              {loading ? (
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">Loading certifications...</p>
                  </CardContent>
                </Card>
              ) : userCertifications.length === 0 ? (
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">No certifications earned yet. Complete a playbook to earn your first certification!</p>
                  </CardContent>
                </Card>
              ) : (
                userCertifications.slice(0, 3).map((cert) => (
                  <Card key={cert.id} className="group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-green-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-lg shadow-lg">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-gray-900">{cert.playbook_name}</CardTitle>
                            <CardDescription className="text-gray-600">
                              Score: {cert.score}% - {cert.user_name}
                            </CardDescription>
                            <p className="text-sm text-green-600 mt-1">
                              Completed: {new Date(cert.completed_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Earned
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={handleDownloadCertificate}
                        disabled={downloadingCert}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {downloadingCert ? "Generating..." : "Download Certificate"}
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
