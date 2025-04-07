import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { type Server } from "@shared/schema";
import { 
  ArrowLeft, 
  Server as ServerIcon,
  Power,
  Info,
  Clock,
  Terminal,
  Settings,
  BarChart4
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Chart component for utilization graphs
const UtilizationChart = ({ 
  title, 
  data = [], 
  color = "#6366f1"
}: { 
  title: string;
  data?: number[];
  color?: string;
}) => {
  const maxValue = Math.max(...data, 100);
  const normalizedData = data.map(value => (value / maxValue) * 100);
  
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Activity</h3>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="h-[150px] w-full relative">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => (
            <line 
              key={value}
              x1="0" 
              y1={150 - (value / 100) * 150} 
              x2="100%" 
              y2={150 - (value / 100) * 150}
              stroke="#333"
              strokeDasharray="2,2"
              strokeWidth="1"
            />
          ))}
          
          {/* Graph line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={normalizedData.map((value, index) => 
              `${(index / (normalizedData.length - 1)) * 100}% ${150 - (value / 100) * 150}`
            ).join(' ')}
          />
          
          {/* Fill area under the graph */}
          <path
            fill={color}
            fillOpacity="0.1"
            d={`
              M0,150 
              ${normalizedData.map((value, index) => 
                `L ${(index / (normalizedData.length - 1)) * 100}% ${150 - (value / 100) * 150}`
              ).join(' ')} 
              L 100% 150 Z
            `}
          />
          
          {/* Data points */}
          {normalizedData.map((value, index) => (
            <circle
              key={index}
              cx={`${(index / (normalizedData.length - 1)) * 100}%`}
              cy={150 - (value / 100) * 150}
              r="3"
              fill={color}
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>Jul {index + 1}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bandwidth chart component with separate incoming/outgoing data
const BandwidthChart = () => {
  // Sample data for bandwidth chart
  const incomingData = [20, 30, 25, 65, 35, 15, 45, 55, 35, 45, 60, 30, 20, 50];
  const outgoingData = [15, 20, 35, 25, 40, 30, 50, 20, 30, 40, 25, 10, 30, 20];
  
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Activity</h3>
        <h3 className="text-sm font-medium">Bandwidth</h3>
      </div>
      <div className="flex justify-end gap-4 mb-1">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full inline-block bg-rose-500"></span>
          <span className="text-xs text-muted-foreground">Incoming: 50G</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full inline-block bg-blue-500"></span>
          <span className="text-xs text-muted-foreground">Outgoing: 20G</span>
        </div>
      </div>
      <div className="h-[150px] w-full relative">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => (
            <line 
              key={value}
              x1="0" 
              y1={150 - (value / 100) * 150} 
              x2="100%" 
              y2={150 - (value / 100) * 150}
              stroke="#333"
              strokeDasharray="2,2"
              strokeWidth="1"
            />
          ))}
          
          {/* Incoming graph line */}
          <polyline
            fill="none"
            stroke="#e11d48" // rose-600
            strokeWidth="2"
            points={incomingData.map((value, index) => 
              `${(index / (incomingData.length - 1)) * 100}% ${150 - (value / 100) * 150}`
            ).join(' ')}
          />
          
          {/* Incoming fill area */}
          <path
            fill="#e11d48"
            fillOpacity="0.1"
            d={`
              M0,150 
              ${incomingData.map((value, index) => 
                `L ${(index / (incomingData.length - 1)) * 100}% ${150 - (value / 100) * 150}`
              ).join(' ')} 
              L 100% 150 Z
            `}
          />
          
          {/* Outgoing graph line */}
          <polyline
            fill="none"
            stroke="#0ea5e9" // blue-500
            strokeWidth="2"
            points={outgoingData.map((value, index) => 
              `${(index / (outgoingData.length - 1)) * 100}% ${150 - (value / 100) * 150}`
            ).join(' ')}
          />
          
          {/* Outgoing fill area */}
          <path
            fill="#0ea5e9"
            fillOpacity="0.1"
            d={`
              M0,150 
              ${outgoingData.map((value, index) => 
                `L ${(index / (outgoingData.length - 1)) * 100}% ${150 - (value / 100) * 150}`
              ).join(' ')} 
              L 100% 150 Z
            `}
          />
          
          {/* Incoming data points */}
          {incomingData.map((value, index) => (
            <circle
              key={`in-${index}`}
              cx={`${(index / (incomingData.length - 1)) * 100}%`}
              cy={150 - (value / 100) * 150}
              r="3"
              fill="#e11d48"
            />
          ))}
          
          {/* Outgoing data points */}
          {outgoingData.map((value, index) => (
            <circle
              key={`out-${index}`}
              cx={`${(index / (outgoingData.length - 1)) * 100}%`}
              cy={150 - (value / 100) * 150}
              r="3"
              fill="#0ea5e9"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>Jul {index + 1}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ServerDetails() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const numericId = parseInt(id);
  const [activeTab, setActiveTab] = useState("1 Month");
  
  // Fetch server data
  const { data: server, isLoading } = useQuery({
    queryKey: ['/api/dashboard/servers'],
    queryFn: getQueryFn<Server[]>({ on401: "throw" }),
    select: (data) => data.find(s => s.id === numericId)
  });
  
  // Sample data for utilization charts
  const cpuData = [20, 40, 30, 70, 25, 50, 35, 45, 30, 60, 40, 25, 35, 30];
  const ramData = [30, 45, 35, 60, 40, 35, 65, 30, 50, 45, 25, 35, 55, 35];
  const diskData = [15, 25, 40, 30, 50, 60, 45, 25, 35, 40, 30, 45, 50, 35];
  
  // Sample data for IP addresses
  const ipAddresses = [
    { ip: "192.168.1.9", active: true },
    { ip: "192.168.1.10", active: true },
    { ip: "192.168.1.11", active: true },
    { ip: "192.168.1.12", active: true },
  ];
  
  // Sample data for cloud storage
  const cloudStorage = [
    { name: "Config", path: "/etc/nginx/configs" },
    { name: "Movies", path: "/storage/movies" },
    { name: "My Files", path: "/home/user/shared" },
    { name: "Documents", path: "/home/user/documents" },
  ];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <p>Loading server details...</p>
      </div>
    );
  }
  
  if (!server) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
        <h1 className="text-2xl font-semibold mb-4">Server Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The server you're looking for does not exist or has been removed.
        </p>
        <Button onClick={() => navigate("/servers")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Servers
        </Button>
      </div>
    );
  }
  
  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/servers" className="hover:text-primary transition-colors">
            Servers
          </Link>
          <span>/</span>
          <span>{server.ip}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <ServerIcon className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-2xl font-semibold">{server.ip}</h1>
        </div>
        
        <div className="text-sm text-muted-foreground mt-1">
          Location: {server.location}, US-EAST
        </div>
      </div>
      
      {/* Server Details Card */}
      <Card className="mb-6">
        <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <ServerIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Server Details</CardTitle>
            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">
              Powered On
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Open Console
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Power Actions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">CPU</div>
              <div className="font-medium">{server.cpuModel || "24x 2.80GHz"}</div>
              <div className="text-xs text-muted-foreground">Dual Xeon Gold 5317</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">RAM</div>
              <div className="font-medium">{server.ramSize || "256GB DDR4"}</div>
              <div className="text-xs text-muted-foreground">ECC</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Storage</div>
              <div className="font-medium">{server.diskSize || "2x 2TB NVMe"}</div>
              <div className="text-xs text-muted-foreground">SSD</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Type</div>
              <div className="font-medium">{server.type}</div>
              <div className="text-xs text-muted-foreground">d2.c2.Large</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Created</div>
              <div className="font-medium">{server.createdAt || "Sep 15, 2023"}</div>
              <div className="text-xs text-muted-foreground">{server.daysActive || 385} days</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Server Utilization Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart4 className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Server Utilization</h2>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid grid-cols-6 h-8">
              <TabsTrigger value="15 Min" className="text-xs px-2">15 Min</TabsTrigger>
              <TabsTrigger value="1 Hour" className="text-xs px-2">1 Hour</TabsTrigger>
              <TabsTrigger value="1 Day" className="text-xs px-2">1 Day</TabsTrigger>
              <TabsTrigger value="1 Month" className="text-xs px-2">1 Month</TabsTrigger>
              <TabsTrigger value="1 Year" className="text-xs px-2">1 Year</TabsTrigger>
              <TabsTrigger value="All Time" className="text-xs px-2">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Chart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <UtilizationChart title="CPU" data={cpuData} color="#6366f1" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <UtilizationChart title="RAM" data={ramData} color="#10b981" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <UtilizationChart title="Disk" data={diskData} color="#f59e0b" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <BandwidthChart />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* IP Addresses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">IP Addresses</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                Configure
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ipAddresses.map((ip, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="font-medium">{ip.ip}</div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Cloud Storage Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Cloud Storage</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                Configure
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {cloudStorage.map((item, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground text-xs">{item.path}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Billing Section */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Billing</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              Change Billing Model
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Billing Model</div>
            <div className="font-medium">Monthly</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Start Date</div>
            <div className="font-medium">Sep 15, 2023</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Unit Price</div>
            <div className="font-medium">$386 / Month</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// Need to add this component to satisfy type requirements for charts
const Network = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="6" height="6" rx="1" />
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="16" y="2" width="6" height="6" rx="1" />
    <path d="M5 8v8" />
    <path d="M19 8v8" />
    <path d="M8 5h8" />
    <path d="M8 19h8" />
  </svg>
);

const HardDrive = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12h20" />
    <path d="M10 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4" />
    <circle cx="10" cy="20" r="2" />
    <circle cx="18" cy="16" r="2" />
    <path d="M18 12v2" />
    <path d="M18 8v1" />
  </svg>
);

const CreditCard = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);