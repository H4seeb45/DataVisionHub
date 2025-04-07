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
  getPaymentInfo(): Payment;
  getBandwidthCommit(): BandwidthCommitData;
  getIpSummary(): IpSummaryData;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private servers: Server[];
  private trafficData: TrafficData[];
  private payment: Payment;
  private bandwidthCommit: BandwidthCommitData;
  private ipSummary: IpSummaryData;
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
        bandwidth: 80
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
        disk: 60,
        bandwidth: 90
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
        bandwidth: 100
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
        bandwidth: 70
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

  getPaymentInfo(): Payment {
    return this.payment;
  }

  getBandwidthCommit(): BandwidthCommitData {
    return this.bandwidthCommit;
  }

  getIpSummary(): IpSummaryData {
    return this.ipSummary;
  }
}

// Export a singleton instance of the storage
export const storage = new MemStorage();
