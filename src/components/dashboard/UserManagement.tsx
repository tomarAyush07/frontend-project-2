import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Settings,
  Eye,
  Download
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock user data for KMRL operations
  const users = [
    {
      id: "EMP001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@kmrl.gov.in",
      phone: "+91 98765 43210",
      role: "Operations Manager",
      department: "Operations Control Center",
      status: "Active",
      lastLogin: "2 hours ago",
      joinDate: "2022-03-15",
      location: "Aluva Depot",
      avatar: "",
      permissions: ["fleet_management", "scheduling", "analytics"],
      shift: "Day Shift (06:00-18:00)",
      employeeId: "KMRL-EMP-001",
      accessLevel: "Level 3"
    },
    {
      id: "EMP002",
      name: "Priya Menon",
      email: "priya.menon@kmrl.gov.in",
      phone: "+91 98765 43211",
      role: "Fleet Supervisor",
      department: "Fleet Operations",
      status: "Active",
      lastLogin: "1 hour ago",
      joinDate: "2021-08-22",
      location: "Pettah Depot",
      avatar: "",
      permissions: ["fleet_management", "maintenance"],
      shift: "Night Shift (18:00-06:00)",
      employeeId: "KMRL-EMP-002",
      accessLevel: "Level 2"
    },
    {
      id: "EMP003",
      name: "Suresh Nair",
      email: "suresh.nair@kmrl.gov.in",
      phone: "+91 98765 43212",
      role: "Maintenance Engineer",
      department: "Maintenance & Engineering",
      status: "Active",
      lastLogin: "30 minutes ago",
      joinDate: "2020-11-10",
      location: "Kalamassery Depot",
      avatar: "",
      permissions: ["maintenance", "analytics"],
      shift: "Day Shift (06:00-18:00)",
      employeeId: "KMRL-EMP-003",
      accessLevel: "Level 2"
    },
    {
      id: "EMP004",
      name: "Anita Thomas",
      email: "anita.thomas@kmrl.gov.in",
      phone: "+91 98765 43213",
      role: "System Administrator",
      department: "IT & Digital Systems",
      status: "Active",
      lastLogin: "15 minutes ago",
      joinDate: "2023-01-05",
      location: "Head Office",
      avatar: "",
      permissions: ["user_management", "system_settings", "analytics"],
      shift: "Day Shift (09:00-18:00)",
      employeeId: "KMRL-EMP-004",
      accessLevel: "Level 4"
    },
    {
      id: "EMP005",
      name: "Vikram Singh",
      email: "vikram.singh@kmrl.gov.in",
      phone: "+91 98765 43214",
      role: "Operations Analyst",
      department: "Operations Control Center",
      status: "Inactive",
      lastLogin: "3 days ago",
      joinDate: "2022-07-18",
      location: "Aluva Depot",
      avatar: "",
      permissions: ["analytics", "scheduling"],
      shift: "Day Shift (06:00-18:00)",
      employeeId: "KMRL-EMP-005",
      accessLevel: "Level 1"
    },
    {
      id: "EMP006",
      name: "Deepa Rajan",
      email: "deepa.rajan@kmrl.gov.in",
      phone: "+91 98765 43215",
      role: "Fleet Coordinator",
      department: "Fleet Operations",
      status: "Active",
      lastLogin: "45 minutes ago",
      joinDate: "2021-12-03",
      location: "Pettah Depot",
      avatar: "",
      permissions: ["fleet_management", "scheduling"],
      shift: "Evening Shift (14:00-22:00)",
      employeeId: "KMRL-EMP-006",
      accessLevel: "Level 2"
    }
  ];

  const roles = [
    "Operations Manager",
    "Fleet Supervisor", 
    "Maintenance Engineer",
    "System Administrator",
    "Operations Analyst",
    "Fleet Coordinator"
  ];

  const departments = [
    "Operations Control Center",
    "Fleet Operations",
    "Maintenance & Engineering",
    "IT & Digital Systems"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Inactive': return 'bg-muted text-muted-foreground';
      case 'Suspended': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'Level 4': return 'bg-destructive text-destructive-foreground';
      case 'Level 3': return 'bg-warning text-warning-foreground';
      case 'Level 2': return 'bg-info text-info-foreground';
      case 'Level 1': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Operations Manager': return <Shield className="h-4 w-4" />;
      case 'Fleet Supervisor': return <Users className="h-4 w-4" />;
      case 'Maintenance Engineer': return <Settings className="h-4 w-4" />;
      case 'System Administrator': return <Activity className="h-4 w-4" />;
      case 'Operations Analyst': return <Eye className="h-4 w-4" />;
      case 'Fleet Coordinator': return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    inactive: users.filter(u => u.status === 'Inactive').length,
    online: users.filter(u => u.lastLogin.includes('hour') || u.lastLogin.includes('minutes')).length
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage KMRL staff access and permissions for fleet operations</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export Users</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-government w-full sm:w-auto">
                <UserPlus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" className="h-10" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">Email Address</Label>
                    <Input id="email" type="email" placeholder="user@kmrl.gov.in" className="h-10" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" className="h-10" />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-sm">Role</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department" className="text-sm">Department</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm">Location</Label>
                    <Select>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aluva Depot">Aluva Depot</SelectItem>
                        <SelectItem value="Pettah Depot">Pettah Depot</SelectItem>
                        <SelectItem value="Kalamassery Depot">Kalamassery Depot</SelectItem>
                        <SelectItem value="Head Office">Head Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                  <Button className="btn-government w-full sm:w-auto">Add User</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Users</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{userStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-success/10 p-1.5 sm:p-2 rounded-lg">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Active Users</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{userStats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-warning/10 p-1.5 sm:p-2 rounded-lg">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-warning" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Online Now</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{userStats.online}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center space-x-2">
              <div className="bg-muted/10 p-1.5 sm:p-2 rounded-lg">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Inactive Users</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{userStats.inactive}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 sm:pl-10 h-9 sm:h-10 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-32 h-9 sm:h-10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>KMRL Staff Directory ({filteredUsers.length} users)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredUsers.map((user, index) => (
              <div key={user.id} className={`p-3 sm:p-4 lg:p-6 border-b border-border hover:bg-muted/30 transition-colors ${index === filteredUsers.length - 1 ? 'border-b-0' : ''}`}>
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground text-sm truncate">{user.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge className={`${getStatusColor(user.status)} text-xs px-1.5 py-0.5`} variant="secondary">
                            {user.status}
                          </Badge>
                          <Badge className={`${getAccessLevelColor(user.accessLevel)} text-xs px-1.5 py-0.5`} variant="outline">
                            {user.accessLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Deactivate User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Last login: {user.lastLogin}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Permissions</p>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 2).map(permission => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission.replace('_', ' ')}
                            </Badge>
                          ))}
                          {user.permissions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.permissions.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Shift: {user.shift}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          <Badge className={getStatusColor(user.status)} variant="secondary">
                            {user.status}
                          </Badge>
                          <Badge className={getAccessLevelColor(user.accessLevel)} variant="outline">
                            {user.accessLevel}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{user.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role)}
                          <span className="text-sm font-medium">{user.role}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{user.department}</p>
                        <p className="text-xs text-muted-foreground">ID: {user.employeeId}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Last login: {user.lastLogin}</span>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Deactivate User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Permissions and Shift Info */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Permissions</p>
                        <div className="flex space-x-1">
                          {user.permissions.map(permission => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Shift Schedule</p>
                      <p className="text-sm font-medium">{user.shift}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;

