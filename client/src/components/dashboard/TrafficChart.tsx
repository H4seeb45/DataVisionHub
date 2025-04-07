import { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Sample data for the traffic chart
const trafficData = [
  { name: "JAN", incoming: 10, outgoing: 8 },
  { name: "FEB", incoming: 25, outgoing: 15 },
  { name: "MAR", incoming: 30, outgoing: 20 },
  { name: "APR", incoming: 22, outgoing: 14 },
  { name: "MAY", incoming: 28, outgoing: 22 },
  { name: "JUN", incoming: 35, outgoing: 25 },
  { name: "JUL", incoming: 25, outgoing: 18 },
  { name: "AUG", incoming: 38, outgoing: 28 },
  { name: "SEP", incoming: 30, outgoing: 22 },
  { name: "OCT", incoming: 15, outgoing: 12 },
  { name: "NOV", incoming: 25, outgoing: 18 },
  { name: "DEC", incoming: 35, outgoing: 24 }
];

type TimeFilter = "15min" | "1hour" | "1day" | "1month" | "1year" | "all";

export default function TrafficChart() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("1month");

  return (
    <Card className="bg-card rounded-lg overflow-hidden">
      <CardContent className="p-4 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-1">Activity</h2>
            <h3 className="text-lg font-semibold text-foreground">Total Traffic</h3>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3 md:mt-0">
            <TimeFilterButton 
              label="15 Min" 
              value="15min"
              active={activeFilter === "15min"} 
              onClick={() => setActiveFilter("15min")} 
            />
            <TimeFilterButton 
              label="1 Hour" 
              value="1hour"
              active={activeFilter === "1hour"} 
              onClick={() => setActiveFilter("1hour")} 
            />
            <TimeFilterButton 
              label="1 Day" 
              value="1day"
              active={activeFilter === "1day"} 
              onClick={() => setActiveFilter("1day")} 
            />
            <TimeFilterButton 
              label="1 Month" 
              value="1month"
              active={activeFilter === "1month"} 
              onClick={() => setActiveFilter("1month")} 
            />
            <TimeFilterButton 
              label="1 Year" 
              value="1year"
              active={activeFilter === "1year"} 
              onClick={() => setActiveFilter("1year")} 
            />
            <TimeFilterButton 
              label="All Time" 
              value="all"
              active={activeFilter === "all"} 
              onClick={() => setActiveFilter("all")} 
            />
          </div>
          
          <Button variant="outline" size="sm" className="px-3 py-1 h-8 hidden md:flex text-foreground items-center">
            January 2023
          </Button>
        </div>
        
        <div className="mt-4 h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trafficData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9800" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF9800" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196F3" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="hsl(var(--muted))" 
              />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 60]} // Set max to 60 to show reference line clearly
                ticks={[0, 10, 20, 30, 40, 50, 60]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <ReferenceLine 
                y={40} 
                stroke="#c84e44" 
                strokeDasharray="3 3" 
                label={{ 
                  value: "Capped (300)", 
                  position: "insideTopLeft",
                  fill: "#c84e44",
                  fontSize: 12
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="incoming" 
                name="Incoming"
                stroke="#FF9800" 
                fillOpacity={1}
                fill="url(#colorIncoming)" 
              />
              <Area 
                type="monotone" 
                dataKey="outgoing" 
                name="Outgoing"
                stroke="#2196F3" 
                fillOpacity={1}
                fill="url(#colorOutgoing)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-start mt-6 text-sm">
          <div className="mr-8">
            <div className="text-muted-foreground">Incoming</div>
            <div className="text-xl font-semibold text-foreground">30G</div>
          </div>
          <div>
            <div className="text-muted-foreground">Outgoing</div>
            <div className="text-xl font-semibold text-foreground">20G</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TimeFilterButtonProps {
  label: string;
  value: TimeFilter;
  active: boolean;
  onClick: () => void;
}

function TimeFilterButton({ label, active, onClick }: TimeFilterButtonProps) {
  return (
    <Button 
      variant={active ? "default" : "secondary"}
      size="sm"
      className={cn(
        "px-3 py-1 text-xs rounded-sm h-7",
        active ? "bg-primary/90 text-white" : "bg-muted text-muted-foreground"
      )}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
