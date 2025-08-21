import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format, subDays, isWithinInterval } from "date-fns";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const responseData = [
  { name: "WhatsApp", responses: 1850, completion: 78 },
  { name: "IVR", responses: 1247, completion: 65 },
  { name: "Web", responses: 892, completion: 82 },
  { name: "Avatar", responses: 762, completion: 71 },
];

const allTimelineData = [
  { day: "Mon", responses: 245, date: new Date(2024, 7, 19) }, // Aug 19
  { day: "Tue", responses: 312, date: new Date(2024, 7, 20) }, // Aug 20
  { day: "Wed", responses: 198, date: new Date(2024, 7, 21) }, // Aug 21
  { day: "Thu", responses: 428, date: new Date(2024, 7, 22) }, // Aug 22
  { day: "Fri", responses: 386, date: new Date(2024, 7, 23) }, // Aug 23
  { day: "Sat", responses: 289, date: new Date(2024, 7, 17) }, // Aug 17
  { day: "Sun", responses: 167, date: new Date(2024, 7, 18) }, // Aug 18
  { day: "Mon", responses: 189, date: new Date(2024, 7, 12) }, // Aug 12
  { day: "Tue", responses: 278, date: new Date(2024, 7, 13) }, // Aug 13
  { day: "Wed", responses: 234, date: new Date(2024, 7, 14) }, // Aug 14
  { day: "Thu", responses: 356, date: new Date(2024, 7, 15) }, // Aug 15
  { day: "Fri", responses: 298, date: new Date(2024, 7, 16) }, // Aug 16
];

const allChannelData = [
  { name: "WhatsApp", responses: 1850, completion: 78, date: new Date(2024, 7, 20) },
  { name: "IVR", responses: 1247, completion: 65, date: new Date(2024, 7, 20) },
  { name: "Web", responses: 892, completion: 82, date: new Date(2024, 7, 20) },
  { name: "Avatar", responses: 762, completion: 71, date: new Date(2024, 7, 20) },
  { name: "WhatsApp", responses: 1654, completion: 75, date: new Date(2024, 7, 15) },
  { name: "IVR", responses: 1089, completion: 62, date: new Date(2024, 7, 15) },
  { name: "Web", responses: 734, completion: 79, date: new Date(2024, 7, 15) },
  { name: "Avatar", responses: 623, date: new Date(2024, 7, 15) },
];

const languageData = [
  { name: "English", value: 40, color: "hsl(var(--primary))" },
  { name: "Hindi", value: 25, color: "hsl(var(--success))" },
  { name: "Bengali", value: 15, color: "hsl(var(--warning))" },
  { name: "Tamil", value: 12, color: "hsl(var(--accent-foreground))" },
  { name: "Others", value: 8, color: "hsl(var(--muted-foreground))" },
];

const AnalyticsChart = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  // Filter data based on selected date range
  const filterDataByDateRange = (data: any[], dataDate: Date) => {
    if (!dateRange?.from || !dateRange?.to) return true;
    return isWithinInterval(dataDate, { start: dateRange.from, end: dateRange.to });
  };

  const filteredTimelineData = allTimelineData.filter(item => 
    filterDataByDateRange([item], item.date)
  );

  const filteredChannelData = allChannelData
    .filter(item => filterDataByDateRange([item], item.date))
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.name);
      if (existing) {
        existing.responses += curr.responses;
        existing.completion = Math.round((existing.completion + curr.completion) / 2);
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, [] as typeof allChannelData);

  return (
    <div className="space-y-6">
      {/* Date Range Picker */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analytics Filter</CardTitle>
          <CardDescription>Select date range to filter analytics data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDateRange({
                  from: subDays(new Date(), 7),
                  to: new Date()
                })}
              >
                Last 7 days
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setDateRange({
                  from: subDays(new Date(), 30),
                  to: new Date()
                })}
              >
                Last 30 days
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Channel Performance</CardTitle>
            <CardDescription>Response volume by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredChannelData}>
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
          <CardTitle className="text-lg">Response Timeline</CardTitle>
          <CardDescription>
            Daily response volume for selected period 
            ({filteredTimelineData.length} days showing)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredTimelineData}>
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