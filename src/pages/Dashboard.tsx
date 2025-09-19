import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FleetGrid from "@/components/dashboard/FleetGrid";
import KPICards from "@/components/dashboard/KPICards";
import InductionPlanner from "@/components/dashboard/InductionPlanner";
import MaintenanceHub from "@/components/dashboard/MaintenanceHub";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Sidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("kmrl-auth");
    if (!auth) {
      navigate("/");
      return;
    }

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("kmrl-auth");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Fleet Management Dashboard</h1>
                <p className="text-muted-foreground">Real-time monitoring and AI-powered operations for Kochi Metro Rail</p>
              </div>
            </div>
            
            <KPICards />
            
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground mb-2">Fleet Status Overview</h2>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-status-standby"></div>
                      <span>Standby: 8</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-status-ready"></div>
                      <span>Ready: 4</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-status-maintenance"></div>
                      <span>Maintenance: 6</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-status-service"></div>
                      <span>In Service: 7</span>
                    </div>
                  </div>
                </div>
                <FleetGrid />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
        );
      case "fleet":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Fleet Management</h1>
              <p className="text-muted-foreground">Detailed trainset information and status management</p>
            </div>
            <FleetGrid detailed />
          </div>
        );
      case "scheduling":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">AI Induction Planner</h1>
              <p className="text-muted-foreground">Intelligent scheduling and conflict resolution</p>
            </div>
            <InductionPlanner />
          </div>
        );
      case "maintenance":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Maintenance Hub</h1>
              <p className="text-muted-foreground">Job cards, cleaning schedules, and predictive maintenance</p>
            </div>
            <MaintenanceHub />
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Analytics & Reports</h1>
              <p className="text-muted-foreground">Performance insights and predictive analytics</p>
            </div>
            <AnalyticsDashboard />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isMobile ? sidebarCollapsed : sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader 
          currentTime={currentTime}
          onLogout={handleLogout}
          onToggleSidebar={toggleSidebar}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;