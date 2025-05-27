
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Upload } from "lucide-react";

export const CommissioningDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-3 rounded-lg w-fit mx-auto mb-4">
            <Sun className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard Ready for New Content</h1>
          <p className="text-lg text-gray-600">
            Upload your images to create a new dashboard based on your content.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader className="text-center">
            <div className="bg-orange-100 p-4 rounded-lg w-fit mx-auto mb-4">
              <Upload className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle>Ready for Image Analysis</CardTitle>
            <CardDescription>
              All previous dashboard content has been cleared. Upload your new images to create a customized dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">
              The system is now ready to analyze your uploaded images and create a new dashboard accordingly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
