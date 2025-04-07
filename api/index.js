// This file serves as the entry point for Vercel serverless functions
const express = require('express');
const { registerRoutes } = require('../server/routes');
const { storage } = require('../server/storage');

const app = express();
app.use(express.json());

// Register all routes
registerRoutes(app);

// Handle all requests
module.exports = app;