
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface PlaybookCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  buttonColor: string;
  buttonHoverColor: string;
  linkTo: string;
  available?: boolean;
}

export const PlaybookCard = ({
  title,
  description,
  icon: Icon,
  iconBgColor,
  buttonColor,
  buttonHoverColor,
  linkTo,
  available = true
}: PlaybookCardProps) => {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`${iconBgColor} p-2 rounded-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <Badge className={available ? "bg-green-100 text-green-800 border-green-300" : "bg-gray-100 text-gray-800 border-gray-300"}>
              {available ? "Available" : "Coming Soon"}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link to={linkTo}>
          <Button className={`w-full ${buttonColor} ${buttonHoverColor} text-white`} disabled={!available}>
            Access Playbook
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
