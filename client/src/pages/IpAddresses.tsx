import { useState } from "react";
import { Search, Plus, MoreHorizontal, Check, AlertTriangle, Clock } from "lucide-react";
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

// IP address status types
type IPStatus = "Assigned" | "Unassigned" | "Provisioning" | "Error";

// IP address data structure
interface IPAddress {
  id: number;
  ip: string;
  location: string;
  dateAllocated: string;
  status: IPStatus;
  assignedTo: string;
}

export default function IpAddresses() {
  const [searchValue, setSearchValue] = useState("");
  
  // Sample IP address data
  const ipAddresses: IPAddress[] = [
    { id: 1, ip: "192.168.1.24", location: "Phoenix", dateAllocated: "17 Oct, 2022", status: "Unassigned", assignedTo: "d1.c1.large" },
    { id: 2, ip: "192.168.1.23", location: "Phoenix", dateAllocated: "17 Oct, 2022", status: "Assigned", assignedTo: "d1.c2.medium" },
    { id: 3, ip: "192.168.1.22", location: "Phoenix", dateAllocated: "17 Oct, 2022", status: "Provisioning", assignedTo: "d2.c1.medium" },
    { id: 4, ip: "192.168.1.21", location: "Ashburn", dateAllocated: "17 Oct, 2022", status: "Error", assignedTo: "d2.d2.large" },
    { id: 5, ip: "192.168.1.19", location: "Phoenix", dateAllocated: "17 Oct, 2022", status: "Unassigned", assignedTo: "s1.c1.small" },
    { id: 6, ip: "192.168.1.17", location: "Ashburn", dateAllocated: "17 Oct, 2022", status: "Unassigned", assignedTo: "s2.c2.small" },
    { id: 7, ip: "192.168.1.18", location: "Phoenix", dateAllocated: "17 Oct, 2022", status: "Unassigned", assignedTo: "s1.s2.small" },
    { id: 8, ip: "192.168.1.18", location: "Ashburn", dateAllocated: "17 Oct, 2022", status: "Unassigned", assignedTo: "s1.s2.small" },
    { id: 9, ip: "192.168.1.18", location: "Phoenix", dateAllocated: "17 Oct, 2022", status: "Assigned", assignedTo: "s1.s2.small" },
    { id: 10, ip: "192.168.1.18", location: "Ashburn", dateAllocated: "17 Oct, 2022", status: "Unassigned", assignedTo: "s1.s2.small" },
    { id: 11, ip: "192.168.1.18", location: "Phoenix", dateAllocated: "17 Oct, 2022", status: "Unassigned", assignedTo: "s1.s2.small" },
  ];
  
  // Filter IPs based on search
  const filteredIps = ipAddresses.filter(ip => 
    ip.ip.toLowerCase().includes(searchValue.toLowerCase()) ||
    ip.location.toLowerCase().includes(searchValue.toLowerCase()) ||
    ip.assignedTo.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  // Get status badge UI based on status
  const getStatusBadge = (status: IPStatus) => {
    switch (status) {
      case "Assigned":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
            <Check className="h-3 w-3" />
            <span>Assigned</span>
          </Badge>
        );
      case "Unassigned":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20 flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            <span>Unassigned</span>
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

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">IP Addresses</h1>
        
        {/* Search and Add IP Button */}
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search IP addresses..."
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
      
      {/* IP Addresses Table */}
      <div className="bg-card rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-medium">IP Address</TableHead>
                <TableHead className="font-medium">Location</TableHead>
                <TableHead className="font-medium">Date Allocated</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Assigned To</TableHead>
                <TableHead className="font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIps.map((ip) => (
                <TableRow key={ip.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{ip.ip}</TableCell>
                  <TableCell>{ip.location}</TableCell>
                  <TableCell>{ip.dateAllocated}</TableCell>
                  <TableCell>{getStatusBadge(ip.status)}</TableCell>
                  <TableCell>{ip.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem className="cursor-pointer">
                          Assign
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          Remove
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
