import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/dashboard/Sidebar";
import Dashboard from "@/pages/Dashboard";
import Servers from "@/pages/Servers";
import IpAddresses from "@/pages/IpAddresses";
import CloudStorage from "@/pages/CloudStorage";
import Payments from "@/pages/Payments";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-6">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/servers" component={Servers} />
          <Route path="/ip-addresses" component={IpAddresses} />
          <Route path="/cloud-storage" component={CloudStorage} />
          <Route path="/payments" component={Payments} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
