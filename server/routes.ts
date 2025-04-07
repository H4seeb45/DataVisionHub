import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// API Routes
export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard API routes
  app.get("/api/dashboard/traffic", (req, res) => {
    const trafficData = storage.getTrafficData();
    res.json(trafficData);
  });

  app.get("/api/dashboard/servers", (req, res) => {
    const servers = storage.getServers();
    res.json(servers);
  });
  
  app.get("/api/dashboard/payment", (req, res) => {
    const paymentInfo = storage.getPaymentInfo();
    res.json(paymentInfo);
  });
  
  app.get("/api/dashboard/bandwidth-commit", (req, res) => {
    const bandwidthCommit = storage.getBandwidthCommit();
    res.json(bandwidthCommit);
  });
  
  app.get("/api/dashboard/ip-summary", (req, res) => {
    const ipSummary = storage.getIpSummary();
    res.json(ipSummary);
  });

  const httpServer = createServer(app);
  return httpServer;
}
