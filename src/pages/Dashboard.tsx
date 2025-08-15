import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import StatsCards from "@/components/dashboard/StatsCards";
import SurveyList from "@/components/dashboard/SurveyList";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="flex w-full">
        <Navigation />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back! Here's an overview of your survey platform.
                </p>
              </div>
            </div>

            <StatsCards />

            <Tabs defaultValue="surveys" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="surveys">Surveys</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="surveys" className="space-y-6">
                <SurveyList />
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsChart />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;