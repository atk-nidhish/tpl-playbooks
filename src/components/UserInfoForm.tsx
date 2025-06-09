
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, IdCard } from "lucide-react";

interface UserInfoFormProps {
  onUserInfoSubmit: (userInfo: { fullName: string; employeeId: string }) => void;
  playbookName: string;
}

export const UserInfoForm = ({ onUserInfoSubmit, playbookName }: UserInfoFormProps) => {
  const [fullName, setFullName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; employeeId?: string }>({});

  const validateForm = () => {
    const newErrors: { fullName?: string; employeeId?: string } = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onUserInfoSubmit({
        fullName: fullName.trim(),
        employeeId: employeeId.trim()
      });
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-orange-500" />
          User Information Required
        </CardTitle>
        <CardDescription>
          Please provide your information before starting the {playbookName} certification exam.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="employeeId"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter your employee ID"
                className={`pl-10 ${errors.employeeId ? "border-red-500" : ""}`}
              />
            </div>
            {errors.employeeId && (
              <p className="text-sm text-red-500">{errors.employeeId}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            Start Certification Exam
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
