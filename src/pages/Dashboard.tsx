import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, GraduationCap, Award, Sun, Wind, HardHat, Construction, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const playbooks = [
    {
      title: "Solar Planning",
      description: "A complete guide to solar planning process",
      icon: Sun,
      playbookPath: "/playbook/solar-planning",
      certificationPath: "/solar-planning",
      iconBg: "bg-gradient-to-r from-yellow-500 to-orange-500",
      cardBg: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-50",
      type: "solar"
    },
    {
      title: "Solar Predevelopment",
      description: "A complete guide to solar predevelopment process",
      icon: Sun,
      playbookPath: "/playbook/solar-predevelopment",
      certificationPath: "/solar-predevelopment",
      iconBg: "bg-gradient-to-r from-yellow-500 to-orange-500",
      cardBg: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-50",
      type: "solar"
    },
    {
      title: "Solar Engineering",
      description: "A complete guide to solar engineering process",
      icon: Sun,
      playbookPath: "/playbook/solar-engineering",
      certificationPath: "/solar-engineering",
      iconBg: "bg-gradient-to-r from-yellow-500 to-orange-500",
      cardBg: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-50",
      type: "solar"
    },
    {
      title: "Solar Contracting",
      description: "A complete guide to solar contracting process",
      icon: Sun,
      playbookPath: "/playbook/solar-contracting",
      certificationPath: "/solar-contracting",
      iconBg: "bg-gradient-to-r from-yellow-500 to-orange-500",
      cardBg: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-50",
      type: "solar"
    },
    {
      title: "Solar Construction",
      description: "A complete guide to solar construction process",
      icon: Sun,
      playbookPath: "/playbook/solar-construction",
      certificationPath: "/solar-construction",
      iconBg: "bg-gradient-to-r from-yellow-500 to-orange-500",
      cardBg: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-50",
      type: "solar"
    },
    {
      title: "Solar Commissioning",
      description: "A complete guide to solar commissioning process",
      icon: Sun,
      playbookPath: "/playbook/solar-commissioning",
      certificationPath: "/solar-commissioning",
      iconBg: "bg-gradient-to-r from-yellow-500 to-orange-500",
      cardBg: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-50",
      type: "solar"
    },
    {
      title: "Wind Planning",
      description: "A complete guide to wind planning process",
      icon: Wind,
      playbookPath: "/playbook/wind-planning",
      certificationPath: "/wind-planning",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-50",
      type: "wind"
    },
    {
      title: "Wind Predevelopment",
      description: "A complete guide to wind predevelopment process",
      icon: Wind,
      playbookPath: "/playbook/wind-predevelopment",
      certificationPath: "/wind-predevelopment",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-50",
      type: "wind"
    },
    {
      title: "Wind Engineering",
      description: "A complete guide to wind engineering process",
      icon: Wind,
      playbookPath: "/playbook/wind-engineering",
      certificationPath: "/wind-engineering",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-50",
      type: "wind"
    },
    // {
    //   title: "Wind C&P",
    //   description: "A complete guide to wind contracting and procurement process",
    //   icon: Wind,
    //   playbookPath: "/playbook/wind-cp-dashboard",
    //   certificationPath: "/wind-cp-dashboard",
    //   iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
    //   cardBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    //   borderColor: "border-blue-200",
    //   hoverBg: "hover:bg-blue-50",
    //   type: "wind"
    // },
    {
      title: "Wind - C&P Certification",
      description: "A complete guide to wind contracting and procurement certification",
      icon: Award,
      playbookPath: "/playbook/wind-cp",
      certificationPath: "/wind-cp",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-50",
      type: "wind"
    },
    {
      title: "Construction Management - Wind",
      description: "Complete guide for Wind construction project management, site mobilization, and quality control",
      icon: HardHat,
      playbookPath: "/wind-construction",
      certificationPath: "/wind-construction",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-50",
      type: "wind"
    },
    {
      title: "Commissioning",
      description: "A complete guide to commissioning process",
      icon: PackageCheck,
      playbookPath: "/playbook/commissioning",
      certificationPath: "/commissioning",
      iconBg: "bg-gradient-to-r from-green-500 to-green-600",
      cardBg: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      hoverBg: "hover:bg-green-50",
      type: "general"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-500">
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playbooks.map((playbook, index) => (
            <Link to={playbook.certificationPath} key={index}>
              <Card className={`transition-all duration-300 ${playbook.cardBg} ${playbook.borderColor} ${playbook.hoverBg} hover:shadow-md`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`${playbook.iconBg} p-2 rounded-lg`}>
                      <playbook.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-zinc-900">{playbook.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-600">{playbook.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
