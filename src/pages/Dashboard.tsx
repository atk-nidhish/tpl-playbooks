
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, ArrowRight, BookOpen, Award, Star, Download, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    // Load certificates from localStorage
    const savedCertificates = localStorage.getItem('user_certificates');
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    }
  }, []);

  const downloadCertificate = (cert: any) => {
    // Create a simple certificate download
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    if (ctx) {
      // Background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Border
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 10;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      
      // Title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Certificate of Achievement', canvas.width / 2, 120);
      
      // Subtitle
      ctx.font = '20px Arial';
      ctx.fillText('This certifies that', canvas.width / 2, 180);
      
      // Name (placeholder)
      ctx.font = 'bold 28px Arial';
      ctx.fillStyle = '#d97706';
      ctx.fillText('Certificate Holder', canvas.width / 2, 230);
      
      // Achievement
      ctx.font = '18px Arial';
      ctx.fillStyle = '#1f2937';
      ctx.fillText('has successfully completed', canvas.width / 2, 280);
      
      // Course name
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#059669';
      ctx.fillText(cert.title, canvas.width / 2, 330);
      
      // Score
      ctx.font = '16px Arial';
      ctx.fillStyle = '#1f2937';
      ctx.fillText(`with a score of ${cert.score}%`, canvas.width / 2, 380);
      
      // Date
      ctx.fillText(`Date: ${cert.date}`, canvas.width / 2, 450);
      
      // Download
      const link = document.createElement('a');
      link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-blue-200 shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Project Playbooks
                </h1>
                <p className="text-lg text-gray-600 mt-1">Your pathway to project excellence</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Certificates Section */}
          {certificates.length > 0 && (
            <section className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-8 border border-amber-200 shadow-lg">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg mb-4">
                  <Award className="h-6 w-6" />
                  Your Achievements
                </div>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                  Congratulations on your certified expertise! Download your certificates below.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificates.map((cert, index) => (
                  <Card key={index} className="bg-white/90 backdrop-blur-sm border-2 border-amber-300 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Award className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{cert.title}</CardTitle>
                      <CardDescription className="text-gray-600 font-medium">
                        Score: {cert.score}% • Earned: {cert.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                        ))}
                      </div>
                      <Button 
                        onClick={() => downloadCertificate(cert)}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Playbooks Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 border border-blue-200 shadow-lg">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg mb-4">
                <TrendingUp className="h-6 w-6" />
                Available Playbooks
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Wind - Contracting & Procurement
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master the complete wind project contracting and procurement lifecycle with our comprehensive playbook.
              </p>
            </div>

            {/* Playbook Card */}
            <div className="flex justify-center">
              <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm border-2 border-blue-300 hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="text-center pb-6 relative z-10">
                  <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Wind className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    Wind - C&P
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Contracting & Procurement Playbook
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center relative z-10 pb-8">
                  <Link to="/wind-cp">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 group-hover:shadow-lg transform group-hover:-translate-y-1">
                      Explore Playbook
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
