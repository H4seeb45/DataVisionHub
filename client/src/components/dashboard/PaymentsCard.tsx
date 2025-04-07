import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Payment data
const paymentData = {
  billed: "Monthly",
  startDate: "Sep 15, 2023",
  dueDate: "Nov 15, 2023",
  servers: "$1450",
  ipv4: "$35",
  bandwidth: "$385",
  bandwidthOverage: "$0.00",
  total: "$685.00"
};

export default function PaymentsCard() {
  return (
    <Card className="col-span-12 xl:col-span-4">
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Billed</div>
            <div className="text-right font-medium">{paymentData.billed}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Start Date</div>
            <div className="text-right font-medium">{paymentData.startDate}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Due Date</div>
            <div className="text-right font-medium">{paymentData.dueDate}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Server(s)</div>
            <div className="text-right font-medium">{paymentData.servers}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">IPv4</div>
            <div className="text-right font-medium">{paymentData.ipv4}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Bandwidth</div>
            <div className="text-right font-medium">{paymentData.bandwidth}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Bandwidth Overage</div>
            <div className="text-right font-medium">{paymentData.bandwidthOverage}</div>
          </div>
          
          <Separator className="my-2" />
          
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">Running total</div>
            <div className="text-right font-semibold">{paymentData.total}</div>
          </div>
          
          <Button className="w-full mt-4">
            <CreditCard className="h-5 w-5 mr-2" />
            Make Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
