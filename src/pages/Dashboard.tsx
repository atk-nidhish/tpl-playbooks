
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, ArrowRight, BookOpen, Award, Star } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Project Playbooks
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Streamline Your Project Execution
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access comprehensive playbooks designed to guide your team through complex project workflows with clarity and efficiency.
            </p>
          </div>

          {/* Certificates Section */}
          {certificates.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-500" />
                Your Certificates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                  <Card key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-3 p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-16 h-16 flex items-center justify-center">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg text-gray-900">{cert.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        Score: {cert.score}% | Earned: {cert.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex justify-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">Certified Professional</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Single Playbook Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Wind className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Wind - C&P
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Contracting & Procurement Playbook
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <p className="text-sm text-gray-600 mb-6">
                  Comprehensive framework for wind project contracting, vendor management, and procurement processes from bid submission to contractor management.
                </p>
                <Link to="/wind-cp">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg transform group-hover:-translate-y-1">
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
