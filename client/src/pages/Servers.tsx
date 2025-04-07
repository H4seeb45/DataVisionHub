import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, 
  Plus,
  MoreHorizontal,
  Settings,
  FileText,
  CreditCard,
  Network,
  HardDrive,
  Power,
  RefreshCw 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { type Server } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";

export default function Servers() {
  const [searchValue, setSearchValue] = useState("");
  
  // Fetch servers data
  const { data: servers = [] } = useQuery({
    queryKey: ['/api/dashboard/servers'],
    queryFn: getQueryFn<Server[]>({ on401: "throw" }),
  });
  
  // Filter servers based on search
  const filteredServers = servers.filter(server => 
    server.ip.toLowerCase().includes(searchValue.toLowerCase()) ||
    server.type.toLowerCase().includes(searchValue.toLowerCase()) ||
    server.os.toLowerCase().includes(searchValue.toLowerCase()) ||
    server.location.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Servers</h1>
        
        {/* Search and Add Server Button */}
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search servers..."
              className="pl-8 bg-muted text-foreground"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Allocate Additional IPs
          </Button>
        </div>
      </header>
      
      {/* Servers Table */}
      <div className="bg-card rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-medium">Servers</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Location</TableHead>
                <TableHead className="font-medium">OS</TableHead>
                <TableHead className="font-medium">CPU Utilization</TableHead>
                <TableHead className="font-medium">Ram Utilization</TableHead>
                <TableHead className="font-medium">Disk Utilization</TableHead>
                <TableHead className="font-medium">Incoming Traffic</TableHead>
                <TableHead className="font-medium">Outgoing Traffic</TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServers.map((server) => (
                <TableRow key={server.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    <div>{server.ip}</div>
                    <div className="text-sm text-muted-foreground">{server.type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${
                        server.status === "on" ? "bg-green-500" : "bg-red-500"
                      }`}></span>
                      <span className="capitalize">{server.status === "on" ? "On" : "Off"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{server.location}</TableCell>
                  <TableCell>{server.os}</TableCell>
                  <TableCell>
                    <div className="w-28">
                      <Progress value={server.cpu} className="h-2 bg-gray-200" 
                        style={{ 
                          '--progress-value': `${server.cpu}%`,
                          backgroundColor: 'rgba(107, 114, 128, 0.2)'
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.cpu}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-28">
                      <Progress value={server.ram} className="h-2 bg-gray-200" 
                        style={{ 
                          '--progress-value': `${server.ram}%`,
                          backgroundColor: 'rgba(107, 114, 128, 0.2)'
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.ram}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-28">
                      <Progress value={server.disk} className="h-2 bg-gray-200" 
                        style={{ 
                          '--progress-value': `${server.disk}%`,
                          backgroundColor: 'rgba(107, 114, 128, 0.2)'
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.disk}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-28">
                      <Progress value={server.incomingTraffic} className="h-2 bg-gray-200" 
                        style={{ 
                          '--progress-value': `${server.incomingTraffic}%`,
                          backgroundColor: 'rgba(107, 114, 128, 0.2)'
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.incomingTraffic}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-28">
                      <Progress value={server.outgoingTraffic} className="h-2 bg-gray-200" 
                        style={{ 
                          '--progress-value': `${server.outgoingTraffic}%`,
                          backgroundColor: 'rgba(107, 114, 128, 0.2)'
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.outgoingTraffic}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Server Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Manage Server</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Change Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Network className="mr-2 h-4 w-4" />
                          <span>IP Addresses</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <HardDrive className="mr-2 h-4 w-4" />
                          <span>Cloud Storage</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Statements</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Power className="mr-2 h-4 w-4" />
                          <span>Power Cycle</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          <span>Reimage Server</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
