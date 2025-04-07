import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BandwidthCommit() {
  return (
    <Card className="col-span-12 md:col-span-6 xl:col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-primary" />
          Bandwidth Commit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Global Commit</span>
          <span className="font-medium">50Gbps</span>
        </div>
        
        <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/10">
          Adjust Commit
        </Button>
      </CardContent>
    </Card>
  );
};
