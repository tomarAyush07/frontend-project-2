import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Train, 
  MapPin, 
  Clock, 
  Wrench, 
  CheckCircle, 
  AlertTriangle,
  Info
} from "lucide-react";

// Mock data for trainsets with status matching the design
const generateFleetData = () => {
  const statuses = ['Ready', 'In Service', 'Maintenance', 'Standby'];
  const locations = [
    'Line 1', 'Line 2', 'Cleaning Bay', 'Maintenance Bay', 
    'Depot A', 'Depot B', 'Standby Bay'
  ];
  const routes = ['Blue Line', 'Green Line'];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: `KMR-${String(i + 1).padStart(3, '0')}`,
    name: `Trainset ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    route: routes[Math.floor(Math.random() * routes.length)],
    lastUpdate: '2 min ago',
    confidence: Math.floor(Math.random() * 30) + 70,
    mileage: Math.floor(Math.random() * 50000) + 50000,
    performance: Math.floor(Math.random() * 40) + 60,
  }));
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ready': return 'bg-status-ready';
    case 'In Service': return 'bg-status-service'; 
    case 'Maintenance': return 'bg-status-maintenance';
    case 'Standby': return 'bg-status-standby';
    default: return 'bg-muted';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'Ready': return { text: 'Ready', color: 'text-white' };
    case 'In Service': return { text: 'In Service', color: 'text-white' };
    case 'Maintenance': return { text: 'Maintenance', color: 'text-white' };
    case 'Standby': return { text: 'Standby', color: 'text-yellow-900' };
    default: return { text: status, color: 'text-white' };
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Ready': return <CheckCircle className="h-4 w-4" />;
    case 'In Service': return <Train className="h-4 w-4" />;
    case 'Maintenance': return <Wrench className="h-4 w-4" />;
    case 'Standby': return <Clock className="h-4 w-4" />;
    case 'Cleaning': return <AlertTriangle className="h-4 w-4" />;
    default: return <Info className="h-4 w-4" />;
  }
};

interface FleetGridProps {
  detailed?: boolean;
}

const FleetGrid = ({ detailed = false }: FleetGridProps) => {
  const [fleetData] = useState(generateFleetData());
  const [selectedTrain, setSelectedTrain] = useState<typeof fleetData[0] | null>(null);

  if (detailed) {
    return (
      <div className="space-y-4">
        {fleetData.map((train) => (
          <Card key={train.id} className="hover:shadow-government-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Train className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{train.id}</h3>
                    <p className="text-sm text-muted-foreground">{train.name}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(train.status)}>
                  {getStatusIcon(train.status)}
                  <span className="ml-2">{train.status}</span>
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{train.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Route</p>
                  <p className="font-medium">{train.route}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Confidence</p>
                  <p className="font-medium">{train.confidence}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Performance</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={train.performance} className="flex-1" />
                    <span className="text-xs">{train.performance}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {fleetData.map((train) => {
        const statusInfo = getStatusText(train.status);
        return (
          <Card key={train.id} className="hover:shadow-government-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Train ID and Status */}
                <div className="flex items-start justify-between">
                  <div className="text-sm font-medium text-foreground">
                    {train.id}
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(train.status).replace('bg-', '') }}></div>
                </div>

                {/* Status Badge */}
                <div className="flex justify-start">
                  <Badge className={`${getStatusColor(train.status)} ${statusInfo.color} text-xs px-2 py-1`}>
                    {statusInfo.text}
                  </Badge>
                </div>

                {/* Location Info */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="text-xs text-muted-foreground">{train.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{train.lastUpdate}</span>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                  <span className="text-xs text-muted-foreground">{train.confidence}% confidence</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FleetGrid;