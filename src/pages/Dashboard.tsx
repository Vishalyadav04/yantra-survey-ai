import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import StatsCards from "@/components/dashboard/StatsCards";
import SurveyList from "@/components/dashboard/SurveyList";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { WhatsAppIntegration, IVRIntegration } from "@/components/WhatsAppIntegration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  
  const getPageContent = () => {
    switch (location.pathname) {
      case '/surveys':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Surveys</h1>
              <p className="text-muted-foreground mt-1">Create and manage your surveys</p>
            </div>
            <SurveyList />
            <div className="grid md:grid-cols-2 gap-6">
              <WhatsAppIntegration />
              <IVRIntegration />
            </div>
          </div>
        );
      case '/analytics':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground mt-1">Insights and performance metrics</p>
            </div>
            <StatsCards />
            <AnalyticsChart />
          </div>
        );
      case '/respondents':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Respondents</h1>
              <p className="text-muted-foreground mt-1">Manage survey participants and responses</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Active Respondents</h3>
                <div className="text-3xl font-bold text-primary">1,247</div>
                <p className="text-sm text-muted-foreground">Across all surveys</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Response Rate</h3>
                <div className="text-3xl font-bold text-success">78.3%</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
            </div>
          </div>
        );
      case '/compliance':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Compliance</h1>
              <p className="text-muted-foreground mt-1">Privacy, security, and regulatory compliance</p>
            </div>
            <div className="grid gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Aadhaar Verification</h3>
                <p className="text-muted-foreground mb-4">Secure identity verification for survey respondents</p>
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <p className="text-sm text-success-foreground">✓ GDPR & DPDP Compliant</p>
                  <p className="text-sm text-success-foreground">✓ End-to-end Encryption</p>
                  <p className="text-sm text-success-foreground">✓ Data Anonymization</p>
                </div>
              </div>
            </div>
          </div>
        );
      case '/settings':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Configure your survey platform</p>
            </div>
            <div className="grid gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <p className="text-muted-foreground">Manage your account preferences and security settings</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Survey Defaults</h3>
                <p className="text-muted-foreground">Set default languages, templates, and configurations</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
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
        );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-yantra">
      <Header />
      <div className="flex w-full">
        <Navigation />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {getPageContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;