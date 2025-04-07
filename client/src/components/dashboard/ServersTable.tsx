import { useState } from "react";
import { 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight 
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

// Server data
const servers = [
  {
    id: 1,
    ip: "192.168.1.24",
    type: "d1.c1.large",
    status: "on",
    location: "Phoenix",
    os: "Ubuntu",
    cpu: 10,
    ram: 40,
    disk: 70,
    bandwidth: 80
  },
  {
    id: 2,
    ip: "192.168.1.23",
    type: "d1.c2.medium",
    status: "on",
    location: "Phoenix",
    os: "Debian",
    cpu: 20,
    ram: 50,
    disk: 60,
    bandwidth: 90
  },
  {
    id: 3,
    ip: "192.168.1.22",
    type: "d1.c2.medium",
    status: "on",
    location: "Phoenix",
    os: "CentOS",
    cpu: 30,
    ram: 60,
    disk: 70,
    bandwidth: 100
  },
  {
    id: 4,
    ip: "192.168.1.21",
    type: "d2.d2.large",
    status: "off",
    location: "Ashburn",
    os: "AlmaLinux",
    cpu: 70,
    ram: 70,
    disk: 70,
    bandwidth: 70
  }
];

export default function ServersTable() {
  const [rowsPerPage, setRowsPerPage] = useState("100");
  
  return (
    <Card className="bg-card rounded-lg overflow-hidden">
      <CardContent className="p-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <h3 className="font-semibold">Servers</h3>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-muted-foreground hover:text-primary"
            >
              →
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm font-medium">Status</div>
            <div className="text-sm font-medium">Location</div>
            <div className="text-sm font-medium">OS</div>
            <div className="text-sm font-medium">CPU</div>
            <div className="text-sm font-medium">RAM</div>
            <div className="text-sm font-medium">Disk</div>
            <div className="text-sm font-medium">Bandwidth</div>
            <div className="text-sm font-medium">Actions</div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableBody>
              {servers.map((server) => (
                <TableRow key={server.id} className="border-b border-border/50">
                  <TableCell className="py-3 pl-0">
                    <div className="font-medium">{server.ip}</div>
                    <div className="text-sm text-muted-foreground">{server.type}</div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center">
                      <span className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        server.status === "on" ? "bg-green-500" : "bg-red-500"
                      }`}></span>
                      <span className="text-sm">
                        {server.status === "on" ? "On" : "Off"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm">{server.location}</TableCell>
                  <TableCell className="py-3 text-sm">{server.os}</TableCell>
                  <TableCell className="py-3">
                    <div className="w-20">
                      <Progress 
                        value={server.cpu} 
                        className="h-2 rounded-sm bg-gray-200" 
                        style={{
                          '--progress-background': server.status === "on" ? 
                            '#8554e5' : '#a1a1aa'  // Primary color for "on", gray for "off"
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.cpu}%</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="w-20">
                      <Progress 
                        value={server.ram} 
                        className="h-2 rounded-sm bg-gray-200" 
                        style={{
                          '--progress-background': server.status === "on" ? 
                            '#ab54e5' : '#a1a1aa'  // Secondary purple for "on"
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.ram}%</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="w-20">
                      <Progress 
                        value={server.disk} 
                        className="h-2 rounded-sm bg-gray-200" 
                        style={{
                          '--progress-background': server.status === "on" ? 
                            '#d154e5' : '#a1a1aa'  // Darker purple for "on"
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.disk}%</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="w-20">
                      <Progress 
                        value={server.bandwidth} 
                        className="h-2 rounded-sm bg-gray-200" 
                        style={{
                          '--progress-background': server.status === "off" ? 
                            '#a1a1aa' : server.bandwidth >= 90 ? 
                              '#f43f5e' : '#eab308'  // Gray for "off", red for high usage, yellow for medium
                        } as React.CSSProperties}
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.bandwidth}%</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 pr-0 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-muted-foreground flex items-center">
            Rows per page: 
            <Select 
              value={rowsPerPage} 
              onValueChange={setRowsPerPage}
            >
              <SelectTrigger className="w-[70px] h-8 ml-2 border-muted">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-muted-foreground">
            1-4 of 4
          </div>
          
          <div className="flex">
            <Button variant="ghost" size="icon" disabled className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" disabled className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
