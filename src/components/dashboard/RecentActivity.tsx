import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Train, 
  Wrench, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Users,
  Calendar
} from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "maintenance_completed",
      title: "Maintenance Completed",
      description: "Brake system inspection completed successfully",
      trainId: "KMR-012",
      time: "5 minutes ago",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 2,
      type: "weather_alert", 
      title: "Weather Alert",
      description: "Heavy rain forecast may affect tonight's induction schedule",
      time: "12 minutes ago",
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 3,
      type: "schedule_updated",
      title: "AI Schedule Updated", 
      description: "Induction plan optimized for 3 trainsets with 94% confidence",
      time: "18 minutes ago",
      icon: Calendar,
      color: "text-info",
      bgColor: "bg-info/10"
    }
  ];

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-6">
          <div className="space-y-4 pb-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 group">
                <div className={`p-2 rounded-lg ${activity.bgColor} group-hover:scale-110 transition-transform`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                  {activity.trainId && (
                    <div className="mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.trainId}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary-hover transition-colors">
            View All Activities
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;