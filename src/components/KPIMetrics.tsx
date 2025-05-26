
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, TrendingDown, Target, Calendar, CheckCircle } from "lucide-react";

export const KPIMetrics = () => {
  const kpis = [
    {
      metric: "Commissioning Schedule Variance",
      definition: "Variance in the actual commissioning schedule, with respect to the planned commissioning schedule.",
      calculation: "Calculated as the difference in the actual number of days and the planned number of days for commissioning, divided by the number of planned days, taken as a percentage.",
      currentValue: 5,
      targetValue: 10,
      unit: "%",
      status: "good",
      trend: "improving",
      icon: Calendar
    },
    {
      metric: "Test Pass Rate",
      definition: "Ratio of tests passed in the first attempt vs total tests conducted.",
      calculation: "Calculated as the number of tests passed divided by the number of tests conducted, taken as a percentage.",
      currentValue: 92,
      targetValue: 85,
      unit: "%",
      status: "excellent",
      trend: "stable",
      icon: CheckCircle
    },
    {
      metric: "Issues per WTG",
      definition: "Count of quality or safety issues raised during inspections and tests.",
      calculation: "Calculated as the number of quality issues across all WTGs, divided by the number of WTGs.",
      currentValue: 2.3,
      targetValue: 3.0,
      unit: "issues",
      status: "good",
      trend: "improving",
      icon: Target
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-300";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "warning":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "critical":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getProgressValue = (current: number, target: number, isLowerBetter: boolean = false) => {
    if (isLowerBetter) {
      return Math.max(0, Math.min(100, (target / current) * 100));
    }
    return Math.max(0, Math.min(100, (current / target) * 100));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            Key Performance Indicators
          </CardTitle>
          <CardDescription>
            Defined metrics to track performance throughout the pre-commissioning process, covering areas such as commissioning testing, approval success rates, timelines, and performance ratios
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          const isLowerBetter = kpi.metric.includes("Variance") || kpi.metric.includes("Issues");
          const progressValue = getProgressValue(kpi.currentValue, kpi.targetValue, isLowerBetter);
          
          return (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{kpi.metric}</CardTitle>
                      <CardDescription>{kpi.definition}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(kpi.trend)}
                    <Badge className={getStatusColor(kpi.status)}>
                      {kpi.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {kpi.currentValue}{kpi.unit}
                      </div>
                      <div className="text-sm text-gray-600">Current Value</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {kpi.targetValue}{kpi.unit}
                      </div>
                      <div className="text-sm text-gray-600">Target Value</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(progressValue)}%
                      </div>
                      <div className="text-sm text-gray-600">Performance</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Target</span>
                      <span>{Math.round(progressValue)}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Calculation Method</h4>
                    <p className="text-sm text-gray-600">{kpi.calculation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-800">2</div>
              <div className="text-sm text-green-600">KPIs Above Target</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-800">1</div>
              <div className="text-sm text-blue-600">KPIs On Track</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-800">0</div>
              <div className="text-sm text-orange-600">KPIs Requiring Attention</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
