
import { Button } from "@/components/ui/button";
import { Award, Star, Download } from "lucide-react";

interface UserInfo {
  fullName: string;
  employeeId: string;
}

interface CertificateActionsProps {
  userInfo: UserInfo;
  playbookName: string;
  playbookId: string;
  scorePercentage: number;
  playbookType?: string;
}

export const CertificateActions = ({ 
  userInfo, 
  playbookName, 
  playbookId, 
  scorePercentage,
  playbookType = "solar"
}: CertificateActionsProps) => {
  const isWindPlaybook = playbookType.toLowerCase().includes('wind');
  
  const backgroundClass = isWindPlaybook 
    ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200" 
    : "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200";
  
  const iconClass = isWindPlaybook 
    ? "text-blue-500" 
    : "text-yellow-500";
  
  const starClass = isWindPlaybook 
    ? "text-blue-400 fill-current" 
    : "text-yellow-400 fill-current";
  
  const gradientClass = isWindPlaybook 
    ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600" 
    : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600";

  const downloadCertificate = () => {
    // Create a simple certificate canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border - use appropriate color based on playbook type
    ctx.strokeStyle = isWindPlaybook ? '#3b82f6' : '#f59e0b';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 120);

    // Subtitle
    ctx.font = '24px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`${playbookName} Certification`, canvas.width / 2, 170);

    // Content
    ctx.font = '18px Arial';
    ctx.fillStyle = '#374151';
    ctx.fillText('This certifies that', canvas.width / 2, 230);
    ctx.font = 'bold 24px Arial';
    ctx.fillText(userInfo.fullName, canvas.width / 2, 270);
    ctx.font = '16px Arial';
    ctx.fillText(`Employee ID: ${userInfo.employeeId}`, canvas.width / 2, 300);
    ctx.font = '18px Arial';
    ctx.fillText('has successfully completed', canvas.width / 2, 340);
    ctx.fillText(`the ${playbookName}`, canvas.width / 2, 370);
    ctx.fillText(`with a score of ${scorePercentage}%`, canvas.width / 2, 400);

    // Date
    ctx.font = '16px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`Issued on: ${new Date().toLocaleDateString()}`, canvas.width / 2, 480);

    // Download
    const link = document.createElement('a');
    link.download = `${userInfo.fullName}-${playbookId}-certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={`${backgroundClass} rounded-lg p-6 mb-6`}>
      <div className="flex items-center justify-center gap-2 mb-4">
        <Award className={`h-8 w-8 ${iconClass}`} />
        <h4 className="text-xl font-bold text-gray-900">Certificate Earned!</h4>
      </div>
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${starClass}`} />
        ))}
      </div>
      <p className="text-gray-700 mb-4">{playbookName} Certified Professional</p>
      <Button
        onClick={downloadCertificate}
        className={gradientClass}
      >
        <Download className="h-4 w-4 mr-2" />
        Download Certificate
      </Button>
    </div>
  );
};
