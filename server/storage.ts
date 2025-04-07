import { 
  type User, 
  type InsertUser, 
  type Server, 
  type TrafficData, 
  type Payment, 
  type IpSummaryData, 
  type BandwidthCommitData 
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dashboard methods
  getTrafficData(): TrafficData[];
  getServers(): Server[];
  getPaymentInfo(): Payment | null;
  getBandwidthCommit(): BandwidthCommitData | null;
  getIpSummary(): IpSummaryData | null;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private servers: Server[] = [];
  private trafficData: TrafficData[] = [];
  private payment: Payment | null = null;
  private bandwidthCommit: BandwidthCommitData | null = null;
  private ipSummary: IpSummaryData | null = null;
  private currentUserId: number;

  constructor() {
    this.users = new Map();
    this.currentUserId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // Initialize in-memory data
  private initializeData() {
    // Sample traffic data
    this.trafficData = [
      { id: 1, name: "JAN", traffic: 10, timestamp: new Date() },
      { id: 2, name: "FEB", traffic: 25, timestamp: new Date() },
      { id: 3, name: "MAR", traffic: 30, timestamp: new Date() },
      { id: 4, name: "APR", traffic: 22, timestamp: new Date() },
      { id: 5, name: "MAY", traffic: 28, timestamp: new Date() },
      { id: 6, name: "JUN", traffic: 35, timestamp: new Date() },
      { id: 7, name: "JUL", traffic: 25, timestamp: new Date() },
      { id: 8, name: "AUG", traffic: 38, timestamp: new Date() },
      { id: 9, name: "SEP", traffic: 30, timestamp: new Date() },
      { id: 10, name: "OCT", traffic: 15, timestamp: new Date() },
      { id: 11, name: "NOV", traffic: 25, timestamp: new Date() },
      { id: 12, name: "DEC", traffic: 35, timestamp: new Date() }
    ];
    
    // Sample servers data
    this.servers = [
      {
        id: 1,
        ip: "192.168.1.24",
        type: "d1.xlarge",
        status: "on",
        location: "Phoenix",
        os: "Ubuntu",
        cpu: 10,
        ram: 40,
        disk: 70,
        bandwidth: 80,
        incomingTraffic: 70,
        outgoingTraffic: 80,
        cpuModel: "Dual Xeon Gold 5317",
        cpuCores: 24,
        cpuThreads: 48,
        cpuSpeed: "2.80GHz",
        ramSize: "256GB DDR4",
        ramType: "ECC",
        diskSize: "2x 2TB NVMe",
        diskType: "SSD",
        createdAt: "Sep 15, 2023",
        daysActive: 385,
        incomingBandwidth: "50G",
        outgoingBandwidth: "20G"
      },
      {
        id: 2,
        ip: "192.168.1.23",
        type: "d1.medium",
        status: "on",
        location: "Phoenix",
        os: "Debian",
        cpu: 20,
        ram: 50,
        disk: 80,
        bandwidth: 90,
        incomingTraffic: 70,
        outgoingTraffic: 70,
        cpuModel: null,
        cpuCores: null,
        cpuThreads: null,
        cpuSpeed: null,
        ramSize: null,
        ramType: null,
        diskSize: null,
        diskType: null,
        createdAt: null,
        daysActive: null,
        incomingBandwidth: null,
        outgoingBandwidth: null
      },
      {
        id: 3,
        ip: "192.168.1.22",
        type: "d2.medium",
        status: "on",
        location: "Phoenix",
        os: "CentOS",
        cpu: 30,
        ram: 60,
        disk: 70,
        bandwidth: 100,
        incomingTraffic: 70,
        outgoingTraffic: 70
      },
      {
        id: 4,
        ip: "192.168.1.21",
        type: "d2.large",
        status: "off",
        location: "Ashburn",
        os: "AlmaLinux",
        cpu: 70,
        ram: 70,
        disk: 70,
        bandwidth: 70,
        incomingTraffic: 70,
        outgoingTraffic: 70
      },
      {
        id: 5,
        ip: "192.168.1.19",
        type: "s1.small",
        status: "on",
        location: "Phoenix", 
        os: "RockyLinux",
        cpu: 70,
        ram: 70,
        disk: 70,
        bandwidth: 70,
        incomingTraffic: 70,
        outgoingTraffic: 70
      },
      {
        id: 6,
        ip: "192.168.1.17",
        type: "s2.small",
        status: "on",
        location: "Ashburn",
        os: "Ubuntu",
        cpu: 70,
        ram: 70,
        disk: 70,
        bandwidth: 70,
        incomingTraffic: 70,
        outgoingTraffic: 70
      },
      {
        id: 7,
        ip: "192.168.1.16",
        type: "s1.small",
        status: "on",
        location: "Phoenix",
        os: "Ubuntu",
        cpu: 70,
        ram: 70,
        disk: 70,
        bandwidth: 70,
        incomingTraffic: 70,
        outgoingTraffic: 70
      },
      {
        id: 8,
        ip: "192.168.1.18",
        type: "s1.small",
        status: "off",
        location: "Phoenix",
        os: "Ubuntu",
        cpu: 70,
        ram: 70,
        disk: 70,
        bandwidth: 70,
        incomingTraffic: 70,
        outgoingTraffic: 70
      },
      {
        id: 9,
        ip: "192.168.1.15",
        type: "s1.small",
        status: "on",
        location: "Ashburn",
        os: "Ubuntu",
        cpu: 70,
        ram: 70,
        disk: 70,
        bandwidth: 70,
        incomingTraffic: 70,
        outgoingTraffic: 70
      },
      {
        id: 10,
        ip: "192.168.1.14",
        type: "s1.small",
        status: "on",
        location: "Phoenix",
        os: "Ubuntu",
        cpu: 70,
        ram: 70,
        disk: 70,
        bandwidth: 70,
        incomingTraffic: 70,
        outgoingTraffic: 70
      }
    ];
    
    // Sample payment info
    this.payment = {
      id: 1,
      billed: "Monthly",
      startDate: "Sep 15, 2023",
      dueDate: "Nov 15, 2023",
      servers: "$1450",
      ipv4: "$35",
      bandwidth: "$385",
      bandwidthOverage: "$0.00",
      total: "$685.00"
    };
    
    // Sample bandwidth commit
    this.bandwidthCommit = {
      id: 1,
      globalCommit: "50Gbps"
    };
    
    // Sample IP summary
    this.ipSummary = {
      id: 1,
      assignedIps: 54,
      unassignedIps: 6
    };
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Dashboard methods
  getTrafficData(): TrafficData[] {
    return this.trafficData;
  }

  getServers(): Server[] {
    return this.servers;
  }

  getPaymentInfo(): Payment | null {
    return this.payment;
  }

  getBandwidthCommit(): BandwidthCommitData | null {
    return this.bandwidthCommit;
  }

  getIpSummary(): IpSummaryData | null {
    return this.ipSummary;
  }
}

// Export a singleton instance of the storage
export const storage = new MemStorage();
