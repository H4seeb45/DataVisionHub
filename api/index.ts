// This file serves as the entry point for Vercel serverless functions
import express, { Request, Response } from 'express';
import { registerRoutes } from '../server/routes';
import { storage } from '../server/storage';

const app = express();
app.use(express.json());

// Create a handler for Vercel serverless functions
export default async function handler(req: Request, res: Response) {
  // Initialize routes
  const server = await registerRoutes(app);
  
  // Forward the request to the Express app
  return app(req, res);
}