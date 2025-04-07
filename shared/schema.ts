import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Server model
export const servers = pgTable("servers", {
  id: serial("id").primaryKey(),
  ip: text("ip").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(),
  location: text("location").notNull(),
  os: text("os").notNull(),
  cpu: integer("cpu").notNull(),
  ram: integer("ram").notNull(),
  disk: integer("disk").notNull(),
  bandwidth: integer("bandwidth").notNull(),
  incomingTraffic: integer("incoming_traffic").notNull().default(70),
  outgoingTraffic: integer("outgoing_traffic").notNull().default(70),
  // Additional fields for server details
  cpuModel: text("cpu_model").default(null),
  cpuCores: integer("cpu_cores").default(null),
  cpuThreads: integer("cpu_threads").default(null),
  cpuSpeed: text("cpu_speed").default(null),
  ramSize: text("ram_size").default(null),
  ramType: text("ram_type").default(null),
  diskSize: text("disk_size").default(null),
  diskType: text("disk_type").default(null),
  createdAt: text("created_at").default(null),
  daysActive: integer("days_active").default(null),
  incomingBandwidth: text("incoming_bandwidth").default(null),
  outgoingBandwidth: text("outgoing_bandwidth").default(null),
});

export const insertServerSchema = createInsertSchema(servers).omit({
  id: true,
});

// Traffic data model
export const trafficData = pgTable("traffic_data", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  traffic: integer("traffic").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const insertTrafficDataSchema = createInsertSchema(trafficData).omit({
  id: true,
});

// Payment model
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  billed: text("billed").notNull(),
  startDate: text("start_date").notNull(),
  dueDate: text("due_date").notNull(),
  servers: text("servers").notNull(),
  ipv4: text("ipv4").notNull(),
  bandwidth: text("bandwidth").notNull(),
  bandwidthOverage: text("bandwidth_overage").notNull(),
  total: text("total").notNull(),
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
});

// IP Summary model
export const ipSummary = pgTable("ip_summary", {
  id: serial("id").primaryKey(),
  assignedIps: integer("assigned_ips").notNull(),
  unassignedIps: integer("unassigned_ips").notNull(),
});

export const insertIpSummarySchema = createInsertSchema(ipSummary).omit({
  id: true,
});

// Bandwidth Commit model
export const bandwidthCommit = pgTable("bandwidth_commit", {
  id: serial("id").primaryKey(),
  globalCommit: text("global_commit").notNull(),
});

export const insertBandwidthCommitSchema = createInsertSchema(bandwidthCommit).omit({
  id: true,
});

// Types for export
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Server = typeof servers.$inferSelect;
export type InsertServer = z.infer<typeof insertServerSchema>;

export type TrafficData = typeof trafficData.$inferSelect;
export type InsertTrafficData = z.infer<typeof insertTrafficDataSchema>;

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

export type IpSummaryData = typeof ipSummary.$inferSelect;
export type InsertIpSummaryData = z.infer<typeof insertIpSummarySchema>;

export type BandwidthCommitData = typeof bandwidthCommit.$inferSelect;
export type InsertBandwidthCommitData = z.infer<typeof insertBandwidthCommitSchema>;
