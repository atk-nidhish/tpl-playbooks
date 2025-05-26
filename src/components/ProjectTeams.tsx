
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Mail, Phone, MapPin } from "lucide-react";

interface ProjectTeamsProps {
  searchQuery: string;
}

export const ProjectTeams = ({ searchQuery }: ProjectTeamsProps) => {
  const teams = [
    {
      name: "Project Team",
      description: "Coordinates overall execution, defines testing procedures, and ensures compliance with project timelines and technical requirements",
      color: "bg-green-100 text-green-800",
      members: [
        { name: "Project Manager", role: "PM", responsibilities: "Overall coordination and timeline management", email: "pm@solarproject.com" },
        { name: "Chief O&M", role: "O&M Lead", responsibilities: "Operations and maintenance oversight", email: "om@solarproject.com" }
      ]
    },
    {
      name: "Regulatory Team",
      description: "Ensures all regulatory, safety, and contractual obligations are met during commissioning",
      color: "bg-blue-100 text-blue-800",
      members: [
        { name: "Compliance Manager", role: "Regulatory", responsibilities: "Regulatory compliance and documentation", email: "compliance@solarproject.com" },
        { name: "Safety Officer", role: "Safety", responsibilities: "Safety protocols and risk management", email: "safety@solarproject.com" }
      ]
    },
    {
      name: "OEM Team",
      description: "Oversees infrastructure completion, engages third-party testers, and resolves commissioning issues",
      color: "bg-purple-100 text-purple-800",
      members: [
        { name: "OEM SPOC", role: "OEM Lead", responsibilities: "Single point of contact for OEM activities", email: "oemlead@solarproject.com" },
        { name: "OEM Engineers", role: "Technical", responsibilities: "Equipment testing and commissioning", email: "engineers@solarproject.com" }
      ]
    },
    {
      name: "O&M Team",
      description: "Assumes responsibility for plant operation post-commissioning, participates in testing, and reviews equipment handover",
      color: "bg-orange-100 text-orange-800",
      members: [
        { name: "Site Quality Head", role: "SQH", responsibilities: "Quality assurance and inspection oversight", email: "sqh@solarproject.com" },
        { name: "Site Electrical Lead", role: "SEL", responsibilities: "Electrical systems and testing", email: "electrical@solarproject.com" },
        { name: "Commissioning POC", role: "CPOC", responsibilities: "Commissioning coordination", email: "cpoc@solarproject.com" }
      ]
    },
    {
      name: "Commercial Team",
      description: "Tracks COD milestones, and ensures commercial terms align with project progress",
      color: "bg-yellow-100 text-yellow-800",
      members: [
        { name: "Commercial Manager", role: "Commercial", responsibilities: "Commercial milestones and financial tracking", email: "commercial@solarproject.com" },
        { name: "Contract Manager", role: "Contracts", responsibilities: "Contract compliance and management", email: "contracts@solarproject.com" }
      ]
    }
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.members.some(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.responsibilities.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            Project Teams Overview
          </CardTitle>
          <CardDescription>
            Key stakeholders and their roles in the solar project execution process
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {filteredTeams.map((team, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={team.color}>{team.name}</Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    {team.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <h4 className="font-semibold text-gray-900 mb-3">Team Members</h4>
                <div className="grid gap-3">
                  {team.members.map((member, memberIndex) => (
                    <div key={memberIndex} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-orange-100 text-orange-800">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-900">{member.name}</h5>
                          <Badge variant="outline" className="text-xs">{member.role}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{member.responsibilities}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
