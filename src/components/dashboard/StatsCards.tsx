import { TrendingUp, Users, MessageSquare, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCard {
  title: string;
  value: string;
  description: string;
  trend: string;
  icon: React.ComponentType<any>;
  trendUp: boolean;
}

const statsData: StatCard[] = [
  {
    title: "Total Surveys",
    value: "5",
    description: "Active surveys",
    trend: "+2 this month",
    icon: Target,
    trendUp: true,
  },
  {
    title: "Total Responses",
    value: "4,751",
    description: "Across all channels",
    trend: "+12.5% from last month",
    icon: MessageSquare,
    trendUp: true,
  },
  {
    title: "Active Respondents",
    value: "3,247",
    description: "Verified users",
    trend: "+18.2% from last month",
    icon: Users,
    trendUp: true,
  },
  {
    title: "Avg. Completion Rate",
    value: "74.8%",
    description: "Across all surveys",
    trend: "+5.1% from last month",
    icon: TrendingUp,
    trendUp: true,
  },
];

const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className={`text-xs mt-1 flex items-center gap-1 ${
                stat.trendUp ? "text-success" : "text-destructive"
              }`}>
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;