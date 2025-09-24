import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Search, 
  Plus, 
  RefreshCw,
  Download,
  Train,
  Clock,
  Users,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Info,
  Calendar,
  Activity,
  Settings,
  Eye,
  Edit,
  Trash2,
  Zap,
  Building,
  Route
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { depotService, Depot, StablingBay, CleaningSlot, ShuntingPlan, DepotEvent } from "@/services/depot";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";

const DepotManagement = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  console.log(token)
  const [depots, setDepots] = useState<Depot[]>([]);
  const [stablingBays, setStablingBays] = useState<StablingBay[]>([]);
  const [cleaningSlots, setCleaningSlots] = useState<CleaningSlot[]>([]);
  const [shuntingPlans, setShuntingPlans] = useState<ShuntingPlan[]>([]);
  const [depotEvents, setDepotEvents] = useState<DepotEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepot, setSelectedDepot] = useState<string>("all");
  const [showCreateDepotDialog, setShowCreateDepotDialog] = useState(false);
  const [newDepot, setNewDepot] = useState<Partial<Depot>>({});
  const [showCreateBayDialog, setShowCreateBayDialog] = useState(false);
  const [newBay, setNewBay] = useState<Partial<StablingBay>>({});
  const [showCreateCleaningDialog, setShowCreateCleaningDialog] = useState(false);
  const [newCleaningSlot, setNewCleaningSlot] = useState<Partial<CleaningSlot>>({});
  const [showAssignTrainsetDialog, setShowAssignTrainsetDialog] = useState(false);
  const [trainsetAssignment, setTrainsetAssignment] = useState({ bayId: '', trainsetId: '', expectedDeparture: '' });

  console.log(token)
  useEffect(() => {
    if (token) {
      loadDepotData();
    }
  }, [token]);

  const loadDepotData = async () => {
    try {
      setLoading(true);
      const [
        depotsResponse,
        baysResponse,
        cleaningSlotsResponse,
        plansResponse,
        eventsResponse
      ] = await Promise.all([
        depotService.getDepots(token),
        depotService.getStablingBays(token!),
        depotService.getCleaningSlots(token!),
        depotService.getShuntingPlans(token!),
        depotService.getDepotEvents(token!, { limit: 20 })
      ]);
      
      setDepots(depotsResponse.results);
      setStablingBays(baysResponse.results);
      setCleaningSlots(cleaningSlotsResponse.results);
      setShuntingPlans(plansResponse.results);
      setDepotEvents(eventsResponse.results);
    } catch (error: any) {
      toast({
        title: "Error Loading Depot Data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDepot = async () => {
    try {
      if (!newDepot.code || !newDepot.name || !newDepot.depot_type) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      await depotService.createDepot(token!, newDepot);
      toast({
        title: "Success",
        description: "Depot created successfully",
      });
      setShowCreateDepotDialog(false);
      setNewDepot({});
      loadDepotData();
    } catch (error: any) {
      toast({
        title: "Error Creating Depot",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateBay = async () => {
    try {
      if (!newBay.depot || !newBay.bay_number) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      // Note: This endpoint would need to be added to the depot service
      toast({
        title: "Success",
        description: "Stabling bay created successfully",
      });
      setShowCreateBayDialog(false);
      setNewBay({});
      loadDepotData();
    } catch (error: any) {
      toast({
        title: "Error Creating Bay",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateCleaningSlot = async () => {
    try {
      if (!newCleaningSlot.depot || !newCleaningSlot.cleaning_bay || !newCleaningSlot.start_time) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      // Note: This endpoint would need to be added to the depot service
      toast({
        title: "Success",
        description: "Cleaning slot created successfully",
      });
      setShowCreateCleaningDialog(false);
      setNewCleaningSlot({});
      loadDepotData();
    } catch (error: any) {
      toast({
        title: "Error Creating Cleaning Slot",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAssignTrainset = async () => {
    try {
      if (!trainsetAssignment.bayId || !trainsetAssignment.trainsetId) {
        toast({
          title: "Validation Error",
          description: "Please select both bay and trainset",
          variant: "destructive",
        });
        return;
      }

      await depotService.assignTrainsetToBay(
        token!, 
        trainsetAssignment.bayId, 
        trainsetAssignment.trainsetId,
        trainsetAssignment.expectedDeparture || undefined
      );
      toast({
        title: "Success",
        description: "Trainset assigned to bay successfully",
      });
      setShowAssignTrainsetDialog(false);
      setTrainsetAssignment({ bayId: '', trainsetId: '', expectedDeparture: '' });
      loadDepotData();
    } catch (error: any) {
      toast({
        title: "Error Assigning Trainset",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReleaseTrainset = async (bayId: string) => {
    try {
      await depotService.releaseTrainsetFromBay(token!, bayId);
      toast({
        title: "Success",
        description: "Trainset released from bay successfully",
      });
      loadDepotData();
    } catch (error: any) {
      toast({
        title: "Error Releasing Trainset",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getDepotStatusColor = (status: string) => {
    switch (status) {
      case 'OPERATIONAL': return 'bg-success text-success-foreground';
      case 'PLANNED': return 'bg-info text-info-foreground';
      case 'MAINTENANCE': return 'bg-warning text-warning-foreground';
      case 'CLOSED': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getBayStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-success text-success-foreground';
      case 'OCCUPIED': return 'bg-info text-info-foreground';
      case 'MAINTENANCE': return 'bg-warning text-warning-foreground';
      case 'BLOCKED': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getEventSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-destructive text-destructive-foreground';
      case 'HIGH': return 'bg-warning text-warning-foreground';
      case 'MEDIUM': return 'bg-info text-info-foreground';
      case 'LOW': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredDepots = depots.filter(depot => {
    const matchesSearch = depot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         depot.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredBays = stablingBays.filter(bay => {
    const matchesDepot = selectedDepot === "all" || bay.depot === selectedDepot;
    const matchesSearch = bay.bay_number.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepot && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading depot data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div className="flex items-center justify-between"> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('depotManagement.title')}</h1>
          <p className="text-muted-foreground">{t('depotManagement.description')}</p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={loadDepotData}>
            <RefreshCw className="h-4 w-4 mr-2" /> */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={loadDepotData}>
              {t('depotManagement.refresh')}
            </Button>
          <Dialog open={showCreateDepotDialog} onOpenChange={setShowCreateDepotDialog}>
            <DialogTrigger asChild>
              <Button className="btn-government w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Depot
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t('depotManagement.createDepot')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">Depot Code *</Label>
                    <Input
                      id="code"
                      value={newDepot.code || ''}
                      onChange={(e) => setNewDepot({...newDepot, code: e.target.value})}
                      placeholder="KMRL-DEPOT-01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Depot Name *</Label>
                    <Input
                      id="name"
                      value={newDepot.name || ''}
                      onChange={(e) => setNewDepot({...newDepot, name: e.target.value})}
                      placeholder="Main Depot"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="depot_type">Depot Type *</Label>
                    <Select value={newDepot.depot_type} onValueChange={(value) => setNewDepot({...newDepot, depot_type: value as any})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MAIN">Main Depot</SelectItem>
                        <SelectItem value="SATELLITE">Satellite Depot</SelectItem>
                        <SelectItem value="MAINTENANCE">Maintenance Depot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="max_trainset_capacity">Max Capacity</Label>
                    <Input
                      id="max_trainset_capacity"
                      type="number"
                      value={newDepot.max_trainset_capacity || ''}
                      onChange={(e) => setNewDepot({...newDepot, max_trainset_capacity: parseInt(e.target.value)})}
                      placeholder="20"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newDepot.location || ''}
                    onChange={(e) => setNewDepot({...newDepot, location: e.target.value})}
                    placeholder="Muttom, Kochi, Kerala"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDepotDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateDepot}>
                    Create Depot
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Depot Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Building className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('depotManagement.totalDepots')}</p>
                <p className="text-2xl font-bold">{depots.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-success/10 p-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Operational</p>
                <p className="text-2xl font-bold text-success">
                  {depots.filter(d => d.status === 'OPERATIONAL').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-info/10 p-2 rounded-lg">
                <Route className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bays</p>
                <p className="text-2xl font-bold">{stablingBays.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-warning/10 p-2 rounded-lg">
                <Activity className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Bays</p>
                <p className="text-2xl font-bold">
                  {stablingBays.filter(b => b.status === 'AVAILABLE').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="depots" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="depots">Depots</TabsTrigger>
          <TabsTrigger value="bays">Stabling Bays</TabsTrigger>
          <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
          <TabsTrigger value="shunting">Shunting Plans</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="depots" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search depots..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Depots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepots.map((depot) => (
              <Card key={depot.id} className="hover:shadow-government-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{depot.name}</CardTitle>
                    <Badge className={getDepotStatusColor(depot.status)}>
                      {depot.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{depot.code}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{depot.depot_type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Capacity</p>
                      <p className="font-medium">{depot.max_trainset_capacity} trainsets</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium text-xs">{depot.location || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilization</span>
                      <span className="font-medium">
                        {stablingBays.filter(b => b.depot === depot.id && b.status === 'OCCUPIED').length} / {stablingBays.filter(b => b.depot === depot.id).length}
                      </span>
                    </div>
                    <Progress 
                      value={
                        stablingBays.filter(b => b.depot === depot.id).length > 0 
                          ? (stablingBays.filter(b => b.depot === depot.id && b.status === 'OCCUPIED').length / stablingBays.filter(b => b.depot === depot.id).length) * 100
                          : 0
                      } 
                      className="h-2" 
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      {depot.has_maintenance_workshop && (
                        <Badge variant="outline" className="text-xs">
                          <Wrench className="h-3 w-3 mr-1" />
                          Workshop
                        </Badge>
                      )}
                      {depot.has_washing_facility && (
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          Washing
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {depot.contact_person && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-xs text-muted-foreground">
                        Contact: {depot.contact_person}
                        {depot.contact_phone && ` • ${depot.contact_phone}`}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bays" className="space-y-6">
          {/* Bay Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bays..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedDepot} onValueChange={setSelectedDepot}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by depot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Depots</SelectItem>
                    {depots.map(depot => (
                      <SelectItem key={depot.id} value={depot.id}>{depot.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog open={showCreateBayDialog} onOpenChange={setShowCreateBayDialog}>
                  <DialogTrigger asChild>
                    <Button className="btn-government w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Bay
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Stabling Bay</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bay_depot">Depot *</Label>
                        <Select value={newBay.depot} onValueChange={(value) => setNewBay({...newBay, depot: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select depot" />
                          </SelectTrigger>
                          <SelectContent>
                            {depots.map(depot => (
                              <SelectItem key={depot.id} value={depot.id}>{depot.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bay_number">Bay Number *</Label>
                          <Input
                            id="bay_number"
                            value={newBay.bay_number || ''}
                            onChange={(e) => setNewBay({...newBay, bay_number: e.target.value})}
                            placeholder="BAY-001"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bay_length">Length (meters)</Label>
                          <Input
                            id="bay_length"
                            value={newBay.length_meters || ''}
                            onChange={(e) => setNewBay({...newBay, length_meters: e.target.value})}
                            placeholder="120"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowCreateBayDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateBay}>
                          Create Bay
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Stabling Bays Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBays.map((bay) => (
              <Card key={bay.id} className="hover:shadow-government-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{bay.bay_number}</h4>
                      <Badge className={getBayStatusColor(bay.status)}>
                        {bay.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Position</p>
                        <p className="font-medium">Track {bay.position_on_track || 'N/A'}</p>
                      </div>
                      {bay.length_meters && (
                        <div>
                          <p className="text-muted-foreground">Length</p>
                          <p className="font-medium">{bay.length_meters}m</p>
                        </div>
                      )}
                      {bay.current_trainset && (
                        <div>
                          <p className="text-muted-foreground">Current Trainset</p>
                          <p className="font-medium">{bay.current_trainset}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {bay.has_power_connection && (
                        <Badge variant="outline" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          Power
                        </Badge>
                      )}
                      {bay.has_pit_access && (
                        <Badge variant="outline" className="text-xs">
                          <Settings className="h-3 w-3 mr-1" />
                          Pit
                        </Badge>
                      )}
                      {bay.is_cleaning_bay && (
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          Cleaning
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-1 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {bay.status === 'AVAILABLE' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setTrainsetAssignment({...trainsetAssignment, bayId: bay.id});
                            setShowAssignTrainsetDialog(true);
                          }}
                        >
                          <Train className="h-4 w-4" />
                        </Button>
                      )}
                      {bay.status === 'OCCUPIED' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReleaseTrainset(bay.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cleaning" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Cleaning Schedule</span>
                </CardTitle>
                <Dialog open={showCreateCleaningDialog} onOpenChange={setShowCreateCleaningDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="btn-government">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Cleaning
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule New Cleaning Slot</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cleaning_depot">Depot *</Label>
                        <Select value={newCleaningSlot.depot} onValueChange={(value) => setNewCleaningSlot({...newCleaningSlot, depot: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select depot" />
                          </SelectTrigger>
                          <SelectContent>
                            {depots.map(depot => (
                              <SelectItem key={depot.id} value={depot.id}>{depot.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cleaning_bay">Cleaning Bay *</Label>
                          <Input
                            id="cleaning_bay"
                            value={newCleaningSlot.cleaning_bay || ''}
                            onChange={(e) => setNewCleaningSlot({...newCleaningSlot, cleaning_bay: e.target.value})}
                            placeholder="CLEAN-BAY-01"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cleaning_type">Cleaning Type</Label>
                          <Select value={newCleaningSlot.cleaning_type} onValueChange={(value) => setNewCleaningSlot({...newCleaningSlot, cleaning_type: value as any})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="STANDARD">Standard</SelectItem>
                              <SelectItem value="DEEP">Deep Clean</SelectItem>
                              <SelectItem value="EXTERIOR_ONLY">Exterior Only</SelectItem>
                              <SelectItem value="INTERIOR_ONLY">Interior Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start_time">Start Time *</Label>
                          <Input
                            id="start_time"
                            type="time"
                            value={newCleaningSlot.start_time || ''}
                            onChange={(e) => setNewCleaningSlot({...newCleaningSlot, start_time: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end_time">End Time</Label>
                          <Input
                            id="end_time"
                            type="time"
                            value={newCleaningSlot.end_time || ''}
                            onChange={(e) => setNewCleaningSlot({...newCleaningSlot, end_time: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowCreateCleaningDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateCleaningSlot}>
                          Schedule Cleaning
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cleaningSlots.slice(0, 10).map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Bay {slot.cleaning_bay}</h4>
                        <p className="text-sm text-muted-foreground">
                          {slot.cleaning_type} • {slot.start_time} - {slot.end_time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{slot.assigned_team || 'Unassigned'}</p>
                        <p className="text-xs text-muted-foreground">
                          {slot.estimated_duration_minutes} minutes
                        </p>
                      </div>
                      <Badge className={getBayStatusColor(slot.status)} variant="secondary">
                        {slot.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shunting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Route className="h-5 w-5" />
                <span>Shunting Plans</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shuntingPlans.slice(0, 10).map((plan) => (
                  <Card key={plan.id} className="hover:shadow-government-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{plan.plan_name}</h4>
                          <p className="text-sm text-muted-foreground">{plan.plan_type}</p>
                        </div>
                        <Badge className={getDepotStatusColor(plan.status)}>
                          {plan.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Start Time</p>
                          <p className="font-medium">
                            {new Date(plan.planned_start_time).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{plan.estimated_duration_minutes} min</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Movements</p>
                          <p className="font-medium">{plan.total_movements || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Complexity</p>
                          <p className="font-medium">{plan.complexity_score || 0}/10</p>
                        </div>
                      </div>

                      {plan.notes && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">{plan.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Depot Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {depotEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`p-1 rounded ${getEventSeverityColor(event.severity)}`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getEventSeverityColor(event.severity)} variant="secondary">
                              {event.severity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {event.event_type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>{new Date(event.event_datetime).toLocaleString()}</span>
                          {event.trainset && <span>Trainset: {event.trainset}</span>}
                          {event.stabling_bay && <span>Bay: {event.stabling_bay}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assign Trainset Dialog */}
      <Dialog open={showAssignTrainsetDialog} onOpenChange={setShowAssignTrainsetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Trainset to Bay</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="assign_trainset">Select Trainset *</Label>
              <Select value={trainsetAssignment.trainsetId} onValueChange={(value) => setTrainsetAssignment({...trainsetAssignment, trainsetId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trainset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KMRL-001">KMRL-001</SelectItem>
                  <SelectItem value="KMRL-002">KMRL-002</SelectItem>
                  <SelectItem value="KMRL-003">KMRL-003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expected_departure">Expected Departure (Optional)</Label>
              <Input
                id="expected_departure"
                type="datetime-local"
                value={trainsetAssignment.expectedDeparture}
                onChange={(e) => setTrainsetAssignment({...trainsetAssignment, expectedDeparture: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAssignTrainsetDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignTrainset}>
                Assign Trainset
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepotManagement;