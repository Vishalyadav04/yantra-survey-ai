import { 
  BarChart3, 
  FileText, 
  Settings, 
  Plus,
  TrendingUp,
  Users,
  Shield,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
}

const navigationItems: NavigationItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/surveys", label: "Surveys", icon: FileText },
  { path: "/analytics", label: "Analytics", icon: TrendingUp },
  { path: "/respondents", label: "Respondents", icon: Users },
  { path: "/compliance", label: "Compliance", icon: Shield },
  { path: "/settings", label: "Settings", icon: Settings },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-64 border-r bg-card/30 backdrop-blur-sm">
      <div className="p-6">
        <Button 
          className="w-full gap-2 bg-gradient-primary shadow-glow hover:shadow-elegant"
          variant="gradient"
          onClick={() => navigate('/surveys')}
        >
          <Plus className="h-4 w-4" />
          Create Survey
        </Button>
      </div>
      
      <div className="px-3 pb-6">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;