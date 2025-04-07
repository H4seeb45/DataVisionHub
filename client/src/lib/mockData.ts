// Mock data for the frontend application
// This replaces the need for backend API calls

// Traffic data for the dashboard
export const trafficData = [
  { id: 1, timestamp: "2023-01-01T00:00:00", inbound: 25, outbound: 18 },
  { id: 2, timestamp: "2023-01-01T01:00:00", inbound: 32, outbound: 22 },
  { id: 3, timestamp: "2023-01-01T02:00:00", inbound: 18, outbound: 15 },
  { id: 4, timestamp: "2023-01-01T03:00:00", inbound: 15, outbound: 12 },
  { id: 5, timestamp: "2023-01-01T04:00:00", inbound: 12, outbound: 8 },
  { id: 6, timestamp: "2023-01-01T05:00:00", inbound: 10, outbound: 7 },
  { id: 7, timestamp: "2023-01-01T06:00:00", inbound: 14, outbound: 10 },
  { id: 8, timestamp: "2023-01-01T07:00:00", inbound: 27, outbound: 18 },
  { id: 9, timestamp: "2023-01-01T08:00:00", inbound: 42, outbound: 28 },
  { id: 10, timestamp: "2023-01-01T09:00:00", inbound: 52, outbound: 35 },
  { id: 11, timestamp: "2023-01-01T10:00:00", inbound: 45, outbound: 30 },
  { id: 12, timestamp: "2023-01-01T11:00:00", inbound: 55, outbound: 40 },
  { id: 13, timestamp: "2023-01-01T12:00:00", inbound: 58, outbound: 42 },
  { id: 14, timestamp: "2023-01-01T13:00:00", inbound: 62, outbound: 45 },
  { id: 15, timestamp: "2023-01-01T14:00:00", inbound: 68, outbound: 48 },
  { id: 16, timestamp: "2023-01-01T15:00:00", inbound: 70, outbound: 50 },
  { id: 17, timestamp: "2023-01-01T16:00:00", inbound: 72, outbound: 55 },
  { id: 18, timestamp: "2023-01-01T17:00:00", inbound: 68, outbound: 52 },
  { id: 19, timestamp: "2023-01-01T18:00:00", inbound: 60, outbound: 45 },
  { id: 20, timestamp: "2023-01-01T19:00:00", inbound: 55, outbound: 40 },
  { id: 21, timestamp: "2023-01-01T20:00:00", inbound: 50, outbound: 38 },
  { id: 22, timestamp: "2023-01-01T21:00:00", inbound: 42, outbound: 32 },
  { id: 23, timestamp: "2023-01-01T22:00:00", inbound: 35, outbound: 25 },
  { id: 24, timestamp: "2023-01-01T23:00:00", inbound: 28, outbound: 20 },
];

// Server data for the dashboard
export const servers = [
  {
    id: 1,
    ip: "192.168.1.24",
    type: "dedicated",
    location: "New York",
    status: "Online",
    cpuUtilization: 78,
    ramUtilization: 65,
    storageUtilization: 42,
    cpuCores: 8,
    ramGB: 32,
    storageGB: 1000,
    pricePerHour: 0.7,
    poweredOn: true,
  },
  {
    id: 2,
    ip: "192.168.5.67",
    type: "shared",
    location: "Amsterdam",
    status: "Online",
    cpuUtilization: 45,
    ramUtilization: 30,
    storageUtilization: 25,
    cpuCores: 4,
    ramGB: 16,
    storageGB: 500,
    pricePerHour: 0.4,
    poweredOn: true,
  },
  {
    id: 3,
    ip: "192.168.8.92",
    type: "dedicated",
    location: "Singapore",
    status: "Offline",
    cpuUtilization: 0,
    ramUtilization: 0,
    storageUtilization: 18,
    cpuCores: 16,
    ramGB: 64,
    storageGB: 2000,
    pricePerHour: 1.2,
    poweredOn: false,
  },
  {
    id: 4,
    ip: "192.168.3.41",
    type: "shared",
    location: "London",
    status: "Online",
    cpuUtilization: 92,
    ramUtilization: 88,
    storageUtilization: 72,
    cpuCores: 8,
    ramGB: 32,
    storageGB: 750,
    pricePerHour: 0.55,
    poweredOn: true,
  },
  {
    id: 5,
    ip: "192.168.7.15",
    type: "dedicated",
    location: "Tokyo",
    status: "Maintenance",
    cpuUtilization: 5,
    ramUtilization: 8,
    storageUtilization: 32,
    cpuCores: 12,
    ramGB: 48,
    storageGB: 1500,
    pricePerHour: 0.9,
    poweredOn: true,
  },
];

// Payment information for the dashboard
export const paymentInfo = {
  id: 1,
  currentBalance: "$1,245.50",
  dueDate: "2023-04-15",
  lastPayment: "$980.25",
  lastPaymentDate: "2023-03-15",
  paymentStatus: "Paid",
};

// Bandwidth commit data for dashboard
export const bandwidthCommitData = {
  id: 1,
  used: 2.4,
  total: 5,
  percentUsed: 48,
  costPerGB: "$0.08",
  overageCostPerGB: "$0.12",
};

// IP summary data for dashboard
export const ipSummaryData = {
  id: 1,
  assigned: 28,
  total: 32,
  availablePublic: 4,
  availablePrivate: 16,
};

// IP address data for the IP Addresses page
export const ipAddresses = [
  {
    id: 1,
    ip: "203.0.113.10",
    location: "New York",
    dateAllocated: "2023-01-15",
    status: "Assigned",
    assignedTo: "Web Server #1",
  },
  {
    id: 2,
    ip: "203.0.113.11",
    location: "New York",
    dateAllocated: "2023-01-20",
    status: "Assigned",
    assignedTo: "Web Server #2",
  },
  {
    id: 3,
    ip: "203.0.113.12",
    location: "Amsterdam",
    dateAllocated: "2023-02-10",
    status: "Assigned",
    assignedTo: "Database Server #1",
  },
  {
    id: 4,
    ip: "203.0.113.13",
    location: "Singapore",
    dateAllocated: "2023-03-05",
    status: "Unassigned",
    assignedTo: "",
  },
  {
    id: 5,
    ip: "203.0.113.14",
    location: "London",
    dateAllocated: "2023-03-15",
    status: "Provisioning",
    assignedTo: "Load Balancer #1",
  },
  {
    id: 6,
    ip: "203.0.113.15",
    location: "Tokyo",
    dateAllocated: "2023-03-20",
    status: "Error",
    assignedTo: "Backup Server #1",
  },
];

// Storage device data for the Cloud Storage page
export const storageDevices = [
  {
    id: 1,
    name: "Block Storage (SSD)",
    diskUtilization: 65,
    diskUsage: 650,
    status: "Online",
    usedBy: 4,
  },
  {
    id: 2,
    name: "Object Storage",
    diskUtilization: 42,
    diskUsage: 4200,
    status: "Online",
    usedBy: 8,
  },
  {
    id: 3,
    name: "Network Storage (NAS)",
    diskUtilization: 78,
    diskUsage: 780,
    status: "Online",
    usedBy: 6,
  },
  {
    id: 4,
    name: "Cold Storage",
    diskUtilization: 22,
    diskUsage: 2200,
    status: "Online",
    usedBy: 2,
  },
  {
    id: 5,
    name: "Backup Volume",
    diskUtilization: 51,
    diskUsage: 510,
    status: "Provisioning",
    usedBy: 0,
  },
];

// Invoice data for the Payments page
export const invoices = [
  {
    id: "INV-001",
    date: "2023-01-01",
    amount: "$982.50",
    paidWith: "Credit Card (Visa ****4242)",
    status: "Paid",
  },
  {
    id: "INV-002",
    date: "2023-02-01",
    amount: "$1,045.75",
    paidWith: "Credit Card (Visa ****4242)",
    status: "Paid",
  },
  {
    id: "INV-003",
    date: "2023-03-01",
    amount: "$980.25",
    paidWith: "Credit Card (Visa ****4242)",
    status: "Paid",
  },
  {
    id: "INV-004",
    date: "2023-04-01",
    amount: "$1,245.50",
    paidWith: "Pending",
    status: "Unpaid",
  },
  {
    id: "INV-005",
    date: "2023-05-01",
    amount: "$1,100.00",
    paidWith: "Pending",
    status: "Unpaid",
  },
];

// Credit card data for the Settings page
export const creditCards = [
  {
    id: 1,
    type: "visa",
    cardNumber: "4242",
    account: "Timothy Morton",
    balance: "$5,500.00",
    blocked: "$0.00",
    valid: "09/2026",
    color: "bg-gradient-to-r from-blue-500 to-blue-700",
  },
  {
    id: 2,
    type: "mastercard",
    cardNumber: "5555",
    account: "Timothy Morton",
    balance: "$3,200.00",
    blocked: "$150.00",
    valid: "12/2024",
    color: "bg-gradient-to-r from-red-500 to-orange-500",
  },
];

// Wallet data for the Settings page
export const wallets = [
  {
    id: "wallet-1",
    name: "Billing Account",
    icon: "💳",
  },
  {
    id: "wallet-2",
    name: "Business Account",
    icon: "💼",
  },
];