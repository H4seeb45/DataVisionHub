// ESM version of the Vercel API handler (Modern JavaScript)
import express from 'express';
import { createServer } from 'http';

// Create express app
const app = express();
app.use(express.json());

// Import routes dynamically
const registerRoutes = async () => {
  try {
    // Dynamic import for ESM compatibility
    const { registerRoutes } = await import('../server/routes.js');
    await registerRoutes(app);
  } catch (err) {
    console.error('Failed to register routes:', err);
  }
};

// Initialize routes
await registerRoutes();

// Create a handler for serverless functions
const handler = (req, res) => {
  // Forward the request to Express
  return app(req, res);
};

// For local testing
if (process.env.NODE_ENV !== 'production') {
  const httpServer = createServer(app);
  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

// Export the serverless function handler
export default handler;