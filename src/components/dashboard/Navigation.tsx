import { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  Settings, 
  Plus,
  TrendingUp,
  Users,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  active?: boolean;
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, active: true },
  { id: "surveys", label: "Surveys", icon: FileText },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "respondents", label: "Respondents", icon: Users },
  { id: "compliance", label: "Compliance", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

const Navigation = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <nav className="w-64 border-r bg-card/30 backdrop-blur-sm">
      <div className="p-6">
        <Button className="w-full gap-2 bg-gradient-primary shadow-glow hover:shadow-elegant"
          variant="gradient"
        >
          <Plus className="h-4 w-4" />
          Create Survey
        </Button>
      </div>
      
      <div className="px-3 pb-6">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
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