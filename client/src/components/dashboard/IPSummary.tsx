import { Button } from "@/components/ui/button";
import { Network } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IPSummary() {
  return (
    <Card className="col-span-12 md:col-span-6 xl:col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Network className="h-5 w-5 mr-2 text-primary" />
          IP Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-muted-foreground">Assigned IPs</span>
          <span className="font-medium">54</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-muted-foreground">Unassigned IPs</span>
          <span className="font-medium">6</span>
        </div>
        
        <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/10">
          Manage IP Addresses
        </Button>
      </CardContent>
    </Card>
  );
};
