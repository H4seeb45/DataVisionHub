import { useState } from "react";
import { Search, Plus, MoreHorizontal, AlertTriangle, Clock, Server, Computer, Trash } from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Storage status types
type StorageStatus = "Online" | "Offline" | "Provisioning" | "Error";

// Storage data structure
interface StorageDevice {
  id: number;
  name: string;
  diskUtilization: number;
  diskUsage: number;
  status: StorageStatus;
  usedBy: number;
}

export default function CloudStorage() {
  const [searchValue, setSearchValue] = useState("");
  
  // Sample storage data
  const storageDevices: StorageDevice[] = [
    { id: 1, name: "Extra Storage", diskUtilization: 70, diskUsage: 70, status: "Offline", usedBy: 0 },
    { id: 2, name: "Personal Files", diskUtilization: 80, diskUsage: 80, status: "Online", usedBy: 3 },
    { id: 3, name: "Movies", diskUtilization: 70, diskUsage: 70, status: "Provisioning", usedBy: 1 },
    { id: 4, name: "Documents", diskUtilization: 70, diskUsage: 70, status: "Error", usedBy: 0 },
    { id: 5, name: "Programs", diskUtilization: 70, diskUsage: 70, status: "Offline", usedBy: 0 },
    { id: 6, name: "ISOs", diskUtilization: 70, diskUsage: 70, status: "Offline", usedBy: 0 },
    { id: 7, name: "My Files", diskUtilization: 70, diskUsage: 70, status: "Offline", usedBy: 0 },
    { id: 8, name: "Configs", diskUtilization: 70, diskUsage: 70, status: "Offline", usedBy: 0 },
    { id: 9, name: "Cloud Storage 1", diskUtilization: 70, diskUsage: 70, status: "Offline", usedBy: 0 },
    { id: 10, name: "Pulsar Storage", diskUtilization: 70, diskUsage: 70, status: "Online", usedBy: 1 },
    { id: 11, name: "O\\", diskUtilization: 70, diskUsage: 70, status: "Offline", usedBy: 0 },
  ];
  
  // Filter storage devices based on search
  const filteredDevices = storageDevices.filter(device => 
    device.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  // Get status badge UI based on status
  const getStatusBadge = (status: StorageStatus) => {
    switch (status) {
      case "Online":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Online</span>
          </Badge>
        );
      case "Offline":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20 flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            <span>Offline</span>
          </Badge>
        );
      case "Provisioning":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Provisioning...</span>
          </Badge>
        );
      case "Error":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Error</span>
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Get server usage badge
  const getServerUsageBadge = (count: number) => {
    if (count === 0) {
      return (
        <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20">
          0 Servers
        </Badge>
      );
    } else if (count === 1) {
      return (
        <Badge className="bg-purple-500 text-white">
          1 Server
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-purple-500 text-white">
          {count} Servers
        </Badge>
      );
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Cloud Storage</h1>
        
        {/* Search and Add Storage Button */}
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search devices..."
              className="pl-8 bg-muted text-foreground"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Buy Storage
          </Button>
        </div>
      </header>
      
      {/* Cloud Storage Table */}
      <div className="bg-card rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-medium">Device Name</TableHead>
                <TableHead className="font-medium">Disk Utilization</TableHead>
                <TableHead className="font-medium">Disk Usage</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Used By</TableHead>
                <TableHead className="font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={device.diskUtilization} 
                        className="h-2 w-32"
                        style={{
                          backgroundColor: 'rgba(107, 114, 128, 0.2)',
                          '--progress-background': device.name === "Personal Files" ? '#EAB308' : '#A855F7'
                        } as React.CSSProperties}
                      />
                      <span className="text-sm">{device.diskUtilization}mb/s</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={device.diskUsage} 
                        className="h-2 w-32"
                        style={{
                          backgroundColor: 'rgba(107, 114, 128, 0.2)',
                          '--progress-background': device.name === "Personal Files" ? '#EAB308' : '#A855F7'
                        } as React.CSSProperties}
                      />
                      <span className="text-sm">{device.diskUsage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(device.status)}</TableCell>
                  <TableCell>{getServerUsageBadge(device.usedBy)}</TableCell>
                  <TableCell className="text-right">
                    {device.status !== "Offline" ? (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem className="cursor-pointer">
                            <Computer className="h-4 w-4 mr-2" />
                            Resize
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Server className="h-4 w-4 mr-2" />
                            Rename Drive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
