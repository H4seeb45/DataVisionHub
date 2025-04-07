import { useState } from "react";
import { 
  MoreHorizontal, 
  Plus, 
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Server data
const servers = [
  {
    id: 1,
    ip: "192.168.1.24",
    type: "d1.xlarge",
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
    type: "d1.medium",
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
    type: "d2.medium",
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
    type: "d2.large",
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
    <Card className="col-span-12">
      <CardHeader className="px-5 py-4">
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Servers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>CPU</TableHead>
                <TableHead>RAM</TableHead>
                <TableHead>Disk</TableHead>
                <TableHead>Bandwidth</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servers.map((server) => (
                <TableRow key={server.id}>
                  <TableCell>
                    <div className="font-medium">{server.ip}</div>
                    <div className="text-sm text-muted-foreground">{server.type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        server.status === "on" ? "bg-green-500" : "bg-red-500"
                      }`}></span>
                      <span>{server.status === "on" ? "On" : "Off"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{server.location}</TableCell>
                  <TableCell>{server.os}</TableCell>
                  <TableCell>
                    <div className="w-24">
                      <Progress 
                        value={server.cpu} 
                        indicatorColor={server.status === "on" ? "bg-primary" : "bg-gray-500"} 
                        className="bg-muted/50" 
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.cpu}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-24">
                      <Progress 
                        value={server.ram} 
                        indicatorColor={server.status === "on" ? "bg-secondary" : "bg-gray-500"} 
                        className="bg-muted/50" 
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.ram}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-24">
                      <Progress 
                        value={server.disk} 
                        indicatorColor={server.status === "on" ? "bg-purple-500" : "bg-gray-500"} 
                        className="bg-muted/50" 
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.disk}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-24">
                      <Progress 
                        value={server.bandwidth} 
                        indicatorColor={
                          server.status === "off" 
                            ? "bg-gray-500" 
                            : server.bandwidth >= 90 
                              ? "bg-red-500" 
                              : server.bandwidth >= 80 
                                ? "bg-yellow-500" 
                                : "bg-orange-500"
                        } 
                        className="bg-muted/50" 
                      />
                      <div className="text-xs text-muted-foreground mt-1">{server.bandwidth}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
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
            <Button variant="ghost" size="icon" disabled>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" disabled>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
