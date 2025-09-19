import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Train, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  Zap
} from "lucide-react";

const KPICards = () => {
  const kpiData = [
    {
      title: "Fleet Availability",
      value: "92.4%",
      change: "+2.1% from last week",
      trend: "up",
      icon: CheckCircle,
      description: "currently operational",
      progress: 92.4,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "On-Time Performance", 
      value: "96.8%",
      change: "+1.2% from last month",
      trend: "up",
      icon: Clock,
      description: "punctuality score",
      progress: 96.8,
      color: "text-info",
      bgColor: "bg-info/10"
    },
    {
      title: "Active Trainsets",
      value: "23/25",
      change: "currently operational", 
      trend: "neutral",
      icon: Train,
      description: "fleet status",
      progress: 92,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Maintenance Due",
      value: "3",
      change: "↓ 25% from last week",
      trend: "down",
      icon: AlertTriangle,
      description: "scheduled maintenance",
      progress: 20,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Critical Alerts",
      value: "2", 
      change: "↓ 50% from yesterday",
      trend: "down",
      icon: AlertTriangle,
      description: "requiring attention",
      progress: 15,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      title: "AI Confidence",
      value: "87.3%",
      change: "↑ 3.5% prediction accuracy",
      trend: "up",
      icon: Zap,
      description: "optimization score",
      progress: 87.3,
      color: "text-success", 
      bgColor: "bg-success/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="hover:shadow-government-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-foreground">
              {kpi.value}
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-success">
                {kpi.change}
              </p>
              <p className="text-xs text-muted-foreground">
                {kpi.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;