
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";

interface GlossaryProps {
  searchQuery: string;
}

export const Glossary = ({ searchQuery }: GlossaryProps) => {
  const [localSearch, setLocalSearch] = useState("");
  
  const glossaryTerms = [
    { abbreviation: "BOP", expanded: "Balance of Plant", category: "Technical" },
    { abbreviation: "C&P", expanded: "Contracting and Procurement", category: "Commercial" },
    { abbreviation: "COC", expanded: "Commissioning Clearance Certificate", category: "Documentation" },
    { abbreviation: "CEA", expanded: "Central Energy Authority", category: "Regulatory" },
    { abbreviation: "CEIG", expanded: "Chief Electrical Inspector to the Government", category: "Regulatory" },
    { abbreviation: "COD", expanded: "Commercial Operation Date", category: "Commercial" },
    { abbreviation: "CTU", expanded: "Central Transmission Utility", category: "Technical" },
    { abbreviation: "EPC", expanded: "Engineering, Procurement, Construction", category: "Commercial" },
    { abbreviation: "ESA", expanded: "Electrical Safety Approval", category: "Regulatory" },
    { abbreviation: "FTC", expanded: "First-time Charging", category: "Technical" },
    { abbreviation: "HOTO", expanded: "Handover takeover", category: "Process" },
    { abbreviation: "KT", expanded: "Knowledge Transfer", category: "Process" },
    { abbreviation: "MCC", expanded: "Mechanical Clearance Certificate", category: "Documentation" },
    { abbreviation: "O&M", expanded: "Operations and Maintenance", category: "Technical" },
    { abbreviation: "OEM", expanded: "Original Equipment Manufacturer", category: "Commercial" },
    { abbreviation: "PM", expanded: "Project Manager", category: "Roles" },
    { abbreviation: "PPA", expanded: "Power Purchase Agreement", category: "Commercial" },
    { abbreviation: "PR", expanded: "Performance Ratio", category: "Technical" },
    { abbreviation: "PSS", expanded: "Pooling Sub-station", category: "Technical" },
    { abbreviation: "RAH", expanded: "Regulatory Approvals Head", category: "Roles" },
    { abbreviation: "RLDC", expanded: "Regional Load Dispatch Centre", category: "Technical" },
    { abbreviation: "SCADA", expanded: "Supervisory Control and Data Acquisition", category: "Technical" },
    { abbreviation: "SEL", expanded: "Site Electrical Lead", category: "Roles" },
    { abbreviation: "SPOC", expanded: "Single Point of Contact", category: "Roles" },
    { abbreviation: "SQH", expanded: "Site Quality Head", category: "Roles" },
    { abbreviation: "STU", expanded: "State Transmission Utility", category: "Technical" },
    { abbreviation: "TPT", expanded: "Third-Party Testing", category: "Process" },
    { abbreviation: "USS", expanded: "Unit Sub-station", category: "Technical" }
  ];

  const combinedSearch = searchQuery || localSearch;
  
  const filteredTerms = glossaryTerms.filter(term =>
    term.abbreviation.toLowerCase().includes(combinedSearch.toLowerCase()) ||
    term.expanded.toLowerCase().includes(combinedSearch.toLowerCase()) ||
    term.category.toLowerCase().includes(combinedSearch.toLowerCase())
  );

  const categories = [...new Set(glossaryTerms.map(term => term.category))];
  
  const getCategoryColor = (category: string) => {
    const colors = {
      "Technical": "bg-blue-100 text-blue-800 border-blue-300",
      "Commercial": "bg-green-100 text-green-800 border-green-300",
      "Documentation": "bg-purple-100 text-purple-800 border-purple-300",
      "Regulatory": "bg-orange-100 text-orange-800 border-orange-300",
      "Process": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "Roles": "bg-pink-100 text-pink-800 border-pink-300"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-500" />
            Solar Project Glossary
          </CardTitle>
          <CardDescription>
            Comprehensive list of abbreviations and terms used throughout the solar project execution process
          </CardDescription>
          {!searchQuery && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search glossary terms..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 bg-white/90"
              />
            </div>
          )}
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm font-medium text-gray-700">Categories:</span>
          {categories.map((category) => (
            <Badge key={category} className={getCategoryColor(category)}>
              {category}
            </Badge>
          ))}
        </div>

        {filteredTerms.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No terms found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {filteredTerms.map((term, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-md transition-all duration-300">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-orange-800 text-sm">{term.abbreviation}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{term.expanded}</h3>
                        <p className="text-sm text-gray-600">Abbreviation: {term.abbreviation}</p>
                      </div>
                    </div>
                    <Badge className={getCategoryColor(term.category)}>
                      {term.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-800">{glossaryTerms.length}</div>
              <div className="text-sm text-blue-600">Total Terms</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-800">{categories.length}</div>
              <div className="text-sm text-green-600">Categories</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-800">{filteredTerms.length}</div>
              <div className="text-sm text-orange-600">Filtered Results</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
