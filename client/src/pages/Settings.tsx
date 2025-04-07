import { useState } from "react";
import { 
  Plus, 
  Check, 
  X, 
  Pencil, 
  ChevronDown,
  Mail
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// Interface for credit card data
interface CreditCard {
  id: number;
  type: "visa" | "mastercard" | "amex" | "paypal" | "apple" | "google";
  cardNumber: string; // Last 4 digits
  account: string;
  balance: string;
  blocked: string;
  valid: string;
  color: string;
}

// Interface for wallet data
interface Wallet {
  id: string;
  name: string;
  icon: JSX.Element;
}

export default function Settings() {
  // Credit card sample data
  const creditCards: CreditCard[] = [
    { 
      id: 1, 
      type: "visa", 
      cardNumber: "1234", 
      account: "$72,889", 
      balance: "$56,533",
      blocked: "$250",
      valid: "06/24",
      color: "blue"
    },
    { 
      id: 2, 
      type: "mastercard", 
      cardNumber: "5678", 
      account: "$72,889", 
      balance: "$56,533",
      blocked: "$250",
      valid: "06/24",
      color: "orange"
    },
    { 
      id: 3, 
      type: "amex", 
      cardNumber: "9101", 
      account: "$72,889", 
      balance: "$56,533",
      blocked: "$250",
      valid: "06/24",
      color: "green"
    },
    { 
      id: 4, 
      type: "paypal", 
      cardNumber: "1213", 
      account: "$72,889", 
      balance: "$56,533",
      blocked: "$250",
      valid: "06/24",
      color: "pink"
    },
    { 
      id: 5, 
      type: "apple", 
      cardNumber: "1415", 
      account: "$72,889", 
      balance: "$56,533",
      blocked: "$250",
      valid: "06/24",
      color: "blue"
    },
  ];

  // Available wallet types
  const wallets: Wallet[] = [
    {
      id: "ethereum",
      name: "Ethereum",
      icon: (
        <div className="bg-blue-500/30 text-blue-500 p-3 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 12l10 10 10-10L12 2z"/>
          </svg>
        </div>
      )
    },
    {
      id: "polygon",
      name: "Polygon",
      icon: (
        <div className="bg-purple-500/30 text-purple-500 p-3 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 18.5L3.5 12.5L10.5 6.5"/>
            <path d="M13.5 6.5L20.5 12.5L13.5 18.5"/>
          </svg>
        </div>
      )
    },
    {
      id: "crypto",
      name: "Crypto",
      icon: (
        <div className="bg-indigo-500/30 text-indigo-500 p-3 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
            <path d="M12 8v4"/>
            <path d="M12 16h.01"/>
          </svg>
        </div>
      )
    },
    {
      id: "huobi",
      name: "Huobi",
      icon: (
        <div className="bg-blue-400/30 text-blue-400 p-3 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 12a6 6 0 0 0 12 0a6 6 0 0 0-12 0"/>
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
          </svg>
        </div>
      )
    }
  ];

  // Billing information form state
  const [billingInfo, setBillingInfo] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });

  // Contact information form state
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "+1 (555) 000-0000",
    email: "customer@gmail.com"
  });

  // Get card background color based on card type
  const getCardBackground = (type: string, color: string) => {
    switch (color) {
      case "blue":
        return "bg-gradient-to-br from-blue-500 to-blue-700";
      case "orange":
        return "bg-gradient-to-br from-orange-400 to-orange-600";
      case "green":
        return "bg-gradient-to-br from-green-500 to-green-700";
      case "pink":
        return "bg-gradient-to-br from-pink-400 to-pink-600";
      default:
        return "bg-gradient-to-br from-purple-500 to-purple-700";
    }
  };
  
  // Get card logo based on card type
  const getCardLogo = (type: string) => {
    switch (type) {
      case "visa":
        return (
          <div className="text-white font-bold text-xl">VISA</div>
        );
      case "mastercard":
        return (
          <div className="text-white font-bold text-xl">MASTERCARD</div>
        );
      case "amex":
        return (
          <div className="text-white font-bold text-xl">AMEX</div>
        );
      case "paypal":
        return (
          <div className="text-white font-bold text-xl">PAYPAL</div>
        );
      case "apple":
        return (
          <div className="text-white font-bold text-xl">APPLE</div>
        );
      case "google":
        return (
          <div className="text-white font-bold text-xl">GOOGLE</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      
      {/* Saved Payment Methods */}
      <Card className="bg-card/70">
        <CardHeader>
          <CardTitle className="text-2xl">Saved Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Credit Cards */}
            <div>
              <h3 className="text-lg font-medium mb-4">Your cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creditCards.map((card) => (
                  <div 
                    key={card.id} 
                    className={`${getCardBackground(card.type, card.color)} rounded-xl p-4 text-white relative overflow-hidden h-[140px]`}
                  >
                    {/* Card details */}
                    <div className="flex justify-between items-start">
                      {getCardLogo(card.type)}
                      <button className="text-white opacity-80 hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/>
                          <circle cx="19" cy="12" r="1"/>
                          <circle cx="5" cy="12" r="1"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-2 text-sm opacity-80">Card Number</div>
                    <div className="text-sm">**** **** **** {card.cardNumber}</div>
                    
                    <div className="grid grid-cols-4 mt-4 text-xs">
                      <div>
                        <div className="opacity-80">Account</div>
                        <div>{card.account}</div>
                      </div>
                      <div>
                        <div className="opacity-80">Balance</div>
                        <div>{card.balance}</div>
                      </div>
                      <div>
                        <div className="opacity-80">Blocked</div>
                        <div>{card.blocked}</div>
                      </div>
                      <div>
                        <div className="opacity-80">Valid</div>
                        <div>{card.valid}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Card
                </Button>
              </div>
            </div>
            
            {/* Wallets */}
            <div>
              <h3 className="text-lg font-medium mb-4">Your Wallets</h3>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span className="font-bold">WalletConnect</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-muted-foreground hover:text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </button>
                    <button className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h4 className="font-medium mb-3">Select network</h4>
                <div className="grid grid-cols-4 gap-3">
                  {wallets.map((wallet) => (
                    <div key={wallet.id} className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-border hover:border-primary cursor-pointer transition-colors">
                      {wallet.icon}
                      <span className="mt-2 text-sm">{wallet.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Billing Information */}
      <Card className="bg-card/70">
        <CardHeader>
          <CardTitle className="text-2xl">Billing Information</CardTitle>
          <CardDescription>The following information it used for billing services.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Company Name"
                value={billingInfo.companyName}
                onChange={(e) => setBillingInfo({...billingInfo, companyName: e.target.value})}
                className="bg-card/70"
              />
            </div>
            <div>
              <Input
                placeholder="Address"
                value={billingInfo.address}
                onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                className="bg-card/70"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="City"
                  value={billingInfo.city}
                  onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                  className="bg-card/70"
                />
              </div>
              <div>
                <Select onValueChange={(value) => setBillingInfo({...billingInfo, state: value})}>
                  <SelectTrigger className="bg-card/70">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="al">Alabama</SelectItem>
                    <SelectItem value="ak">Alaska</SelectItem>
                    <SelectItem value="az">Arizona</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="co">Colorado</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  placeholder="Postal Code"
                  value={billingInfo.postalCode}
                  onChange={(e) => setBillingInfo({...billingInfo, postalCode: e.target.value})}
                  className="bg-card/70"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-primary">
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Contacts */}
      <Card className="bg-card/70">
        <CardHeader>
          <CardTitle className="text-2xl">Contacts</CardTitle>
          <CardDescription>Contacts to send billing information to if the primary is unavailable.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Input
                placeholder="First Name"
                value={contactInfo.firstName}
                onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                className="bg-card/70"
              />
            </div>
            <div>
              <Input
                placeholder="Last Name"
                value={contactInfo.lastName}
                onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                className="bg-card/70"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
                <span>US</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <Input
                placeholder="Phone Number"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                className="pl-16 bg-card/70"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                placeholder="Email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                className="pl-10 bg-card/70"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Additional Contacts
            </Button>
            
            <div className="flex-grow"></div>
            
            <Button className="bg-primary">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Support Plan */}
      <Card className="bg-card/70">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Support Plan</CardTitle>
            <Button variant="outline" className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Edit Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-muted-foreground">Current Plan</div>
              <div className="font-medium">None</div>
            </div>
            <div>
              <div className="text-muted-foreground">Additional Cost</div>
              <div className="font-medium">$ 0</div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <h3 className="font-medium">Billing Alerts</h3>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="email-alerts" />
              <div className="grid gap-1.5">
                <label
                  htmlFor="email-alerts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email Alerts
                </label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when your bill is due
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="phone-alerts" />
              <div className="grid gap-1.5">
                <label
                  htmlFor="phone-alerts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Phone Alerts
                </label>
                <p className="text-sm text-muted-foreground">
                  Receive a text message when your bill is due
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
