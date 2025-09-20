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
  
  return Array.from({ length: 25 }, (_, i) => ({
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
    case 'Ready': return 'bg-green-100 text-green-800 border-green-200';
    case 'In Service': return 'bg-blue-100 text-blue-800 border-blue-200'; 
    case 'Maintenance': return 'bg-red-100 text-red-800 border-red-200';
    case 'Standby': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'Ready': return { text: 'Ready', color: 'text-green-800' };
    case 'In Service': return { text: 'In Service', color: 'text-blue-800' };
    case 'Maintenance': return { text: 'Maintenance', color: 'text-red-800' };
    case 'Standby': return { text: 'Standby', color: 'text-yellow-800' };
    default: return { text: status, color: 'text-gray-800' };
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
      <div className="space-y-3 sm:space-y-4">
        {fleetData.map((train) => (
          <Card key={train.id} className="hover:shadow-government-md transition-shadow">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg">
                    <Train className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{train.id}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{train.name}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(train.status)} text-xs sm:text-sm px-2 py-1`}>
                  {getStatusIcon(train.status)}
                  <span className="ml-1 sm:ml-2">{train.status}</span>
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Location</p>
                  <p className="font-medium truncate">{train.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Route</p>
                  <p className="font-medium truncate">{train.route}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Confidence</p>
                  <p className="font-medium">{train.confidence}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Performance</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={train.performance} className="flex-1 h-2" />
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
      {fleetData.map((train) => {
        const statusInfo = getStatusText(train.status);
        return (
          <Card key={train.id} className="hover:shadow-government-md transition-shadow">
            <CardContent className="p-2 sm:p-3">
              <div className="space-y-2 sm:space-y-3">
                {/* Train ID and Status */}
                <div className="flex items-start justify-between">
                  <div className="text-xs sm:text-sm font-medium text-foreground truncate min-w-0 flex-1">
                    {train.id}
                  </div>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 ml-1" style={{ backgroundColor: getStatusColor(train.status).replace('bg-', '') }}></div>
                </div>

                {/* Status Badge */}
                <div className="flex justify-start">
                  <Badge className={`${getStatusColor(train.status)} ${statusInfo.color} text-xs px-1.5 sm:px-2 py-0.5 sm:py-1`}>
                    <span className="truncate">{statusInfo.text}</span>
                  </Badge>
                </div>

                {/* Location Info */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1 min-w-0">
                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground truncate">{train.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{train.lastUpdate}</span>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/60 flex-shrink-0"></div>
                  <span className="text-xs text-muted-foreground truncate">{train.confidence}%</span>
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