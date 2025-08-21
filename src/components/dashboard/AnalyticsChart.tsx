import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const responseData = [
  { name: "WhatsApp", responses: 1850, completion: 78 },
  { name: "IVR", responses: 1247, completion: 65 },
  { name: "Web", responses: 892, completion: 82 },
  { name: "Avatar", responses: 762, completion: 71 },
];

const timelineData = [
  { day: "Mon", responses: 245 },
  { day: "Tue", responses: 312 },
  { day: "Wed", responses: 198 },
  { day: "Thu", responses: 428 },
  { day: "Fri", responses: 386 },
  { day: "Sat", responses: 289 },
  { day: "Sun", responses: 167 },
];

const languageData = [
  { name: "English", value: 40, color: "hsl(var(--primary))" },
  { name: "Hindi", value: 25, color: "hsl(var(--success))" },
  { name: "Bengali", value: 15, color: "hsl(var(--warning))" },
  { name: "Tamil", value: 12, color: "hsl(var(--accent-foreground))" },
  { name: "Others", value: 8, color: "hsl(var(--muted-foreground))" },
];

const AnalyticsChart = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Channel Performance</CardTitle>
            <CardDescription>Response volume by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  fontSize={12}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis 
                  fontSize={12}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar 
                  dataKey="responses" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Language Distribution</CardTitle>
            <CardDescription>Response distribution by language</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                  fontSize={12}
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Response Timeline</CardTitle>
          <CardDescription>Daily response volume for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day"
                fontSize={12}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar 
                dataKey="responses" 
                fill="hsl(var(--success))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsChart;