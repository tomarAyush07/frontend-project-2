import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Bell, 
  User, 
  LogOut,
  Menu,
  Wifi
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TopHeaderProps {
  currentTime: Date;
  onLogout: () => void;
  onToggleSidebar: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ currentTime, onLogout, onToggleSidebar }) => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-border shadow-sm h-16 flex items-center px-4 lg:px-6">
      <div className="flex items-center flex-1 space-x-4">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trains, schedules, maintenance..."
              className="pl-10 h-9"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Operations Center Info */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Operations Center</span>
              <div className="flex items-center space-x-1">
                <Wifi className="h-3 w-3 text-success" />
                <span className="text-xs text-success font-medium">Live Updates Active</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-destructive">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <Button variant="ghost" size="sm">
          <User className="h-4 w-4" />
        </Button>

        {/* Logout */}
        <Button variant="ghost" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default TopHeader;