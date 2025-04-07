import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, 
  Server, 
  Network, 
  HardDrive, 
  CreditCard, 
  Settings,
  PlusIcon,
  Zap
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem = ({ href, icon, label, active }: NavItemProps) => {
  return (
    <li>
      <Link href={href}>
        <a className={cn(
          "flex items-center px-4 py-3 rounded-lg mx-2 mb-1 transition-colors",
          active 
            ? "bg-primary text-white" 
            : "text-muted-foreground hover:bg-secondary hover:text-white"
        )}>
          <span className="mr-3">{icon}</span>
          {label}
        </a>
      </Link>
    </li>
  );
};

export default function Sidebar() {
  const [location] = useLocation();
  
  return (
    <aside className="sidebar bg-background w-64 flex-shrink-0 border-r border-border h-screen overflow-y-auto fixed hidden md:block">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center">
          <Zap className="w-8 h-8 text-primary" />
          <span className="ml-2 text-xl font-semibold text-white">Pulsar <span className="text-primary">Network</span></span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-4">
        <ul>
          <NavItem 
            href="/" 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Dashboard" 
            active={location === "/"} 
          />
          <NavItem 
            href="/servers" 
            icon={<Server className="h-5 w-5" />} 
            label="Servers" 
            active={location === "/servers"} 
          />
          <NavItem 
            href="/ip-addresses" 
            icon={<Network className="h-5 w-5" />} 
            label="IP Addresses" 
            active={location === "/ip-addresses"} 
          />
          <NavItem 
            href="/cloud-storage" 
            icon={<HardDrive className="h-5 w-5" />} 
            label="Cloud Storage" 
            active={location === "/cloud-storage"} 
          />
          <NavItem 
            href="/payments" 
            icon={<CreditCard className="h-5 w-5" />} 
            label="Payments" 
            active={location === "/payments"} 
          />
          <NavItem 
            href="/settings" 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            active={location === "/settings"} 
          />
        </ul>
      </nav>
      
      {/* Pro Upgrade Card */}
      <div className="mx-4 mt-6 bg-primary/20 rounded-lg p-4 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-medium text-white text-lg">Go to Pro</h4>
          <p className="text-white/80 text-sm mt-1">Get access to all features on Pro account.</p>
          
          <button className="mt-4 bg-white text-primary py-2 px-4 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
            Upgrade Now
          </button>
        </div>
        <div className="absolute bottom-0 right-0">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.3">
            <circle cx="40" cy="40" r="40" fill="white"/>
          </svg>
        </div>
      </div>
      
      {/* Support Card */}
      <div className="mx-4 mt-6 bg-secondary rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-12 h-12 text-primary" viewBox="0 0 64 64" fill="currentColor">
            <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 42c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm4-12c0 1.1-.9 2-2 2s-2-.9-2-2v-12c0-1.1.9-2 2-2s2 .9 2 2v12z"/>
          </svg>
          <div className="ml-3">
            <h4 className="font-medium text-white">Need help managing your servers?</h4>
            <p className="text-muted-foreground text-sm">Add the Support Plan now!</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
