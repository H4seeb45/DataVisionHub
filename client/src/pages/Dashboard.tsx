import { Bell, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import TrafficChart from "@/components/dashboard/TrafficChart";
import PaymentsCard from "@/components/dashboard/PaymentsCard";
import BandwidthCommit from "@/components/dashboard/BandwidthCommit";
import IPSummary from "@/components/dashboard/IPSummary";
import ServersTable from "@/components/dashboard/ServersTable";

export default function Dashboard() {
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-6 w-6" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground mx-2">
            <HelpCircle className="h-6 w-6" />
          </Button>
          
          <Avatar className="ml-2 border-2 border-primary">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>
      
      {/* Dashboard Content */}
      <div className="grid grid-cols-12 gap-6">
        <ServersTable />
        <div className="col-span-12 xl:col-span-4 grid grid-cols-1 gap-6">
          <BandwidthCommit />
          <IPSummary />
        </div>
        <TrafficChart />
        <PaymentsCard />
      </div>
    </>
  );
};
