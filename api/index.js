// This file serves as the entry point for Vercel serverless functions
import express from 'express';
import { registerRoutes } from '../server/routes.js';
import { storage } from '../server/storage.js';

const app = express();
app.use(express.json());

// Register all routes
await registerRoutes(app);

// Export for Vercel serverless function
export default app;