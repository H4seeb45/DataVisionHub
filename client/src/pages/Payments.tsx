import { useState } from "react";
import { Search, Plus, MoreHorizontal, Download, FileText, CreditCard, ExternalLink, AlertTriangle } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";

// Invoice status types
type InvoiceStatus = "Paid" | "Unpaid" | "Overdue";

// Invoice data structure
interface Invoice {
  id: string;
  date: string;
  amount: string;
  paidWith: string;
  status: InvoiceStatus;
}

export default function Payments() {
  // Sample invoice data
  const invoices: Invoice[] = [
    { id: "#25413", date: "17 Oct, 2022", amount: "$2485", paidWith: "Visa ending in 1526", status: "Paid" },
    { id: "#25413", date: "17 Oct, 2022", amount: "$2485", paidWith: "Visa ending in 1526", status: "Unpaid" },
    { id: "#25413", date: "17 Oct, 2022", amount: "$2485", paidWith: "Visa ending in 1526", status: "Overdue" },
    { id: "#25413", date: "17 Oct, 2022", amount: "$2485", paidWith: "Visa ending in 1526", status: "Paid" },
    { id: "#25413", date: "17 Oct, 2022", amount: "$2485", paidWith: "Visa ending in 1526", status: "Paid" },
    { id: "#25413", date: "17 Oct, 2022", amount: "$2485", paidWith: "Visa ending in 1526", status: "Paid" },
    { id: "#25413", date: "17 Oct, 2022", amount: "$2485", paidWith: "Visa ending in 1526", status: "Paid" },
  ];
  
  // Get status badge UI based on status
  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Paid
          </Badge>
        );
      case "Unpaid":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Unpaid
          </Badge>
        );
      case "Overdue":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Overdue
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
        <h1 className="text-2xl font-semibold">Payments</h1>
      </header>
      
      {/* Amount Due Card */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Amount Due</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This is an estimate of the amount you will owe based on your current month-to-date usage after all credits and charges.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="bg-primary/5 border-primary/10 col-span-1">
            <CardContent className="p-6">
              <div className="text-3xl font-bold">$1025.57</div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 md:grid-cols-4 col-span-1 lg:col-span-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">January 1, 2023</span>
              <span className="text-sm font-medium">Payment due</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">$0.00</span>
              <span className="text-sm font-medium">Credits</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">$1005.57</span>
              <span className="text-sm font-medium">Total usage</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">$15.30</span>
              <span className="text-sm font-medium">Total overages</span>
            </div>
            
            <div className="flex flex-col md:col-span-4 mt-2">
              <span className="text-sm text-muted-foreground mb-1">$1030.87</span>
              <span className="text-sm font-medium">Amount due</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button className="bg-primary">
            Make Payment
          </Button>
        </div>
      </div>
      
      {/* Invoices Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Invoices</h2>
        
        {/* Invoices Table */}
        <div className="bg-card rounded-md border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-medium">Invoice ID</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Amount</TableHead>
                  <TableHead className="font-medium">Paid With</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img 
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA5VjZhMiAyIDAgMCAxIDItMmgxNmEyIDIgMCAwIDEgMiAydjEyYTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0ydi0xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCAtMSkiIHN0cm9rZT0iIzc4NzE5NSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=" 
                          alt="Visa"
                          className="h-4 w-4"
                        />
                        <span>{invoice.paidWith}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuItem className="cursor-pointer flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Make Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Cloud Storage
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Dispute
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
      </div>
    </>
  );
}
