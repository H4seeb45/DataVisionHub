// This script adds a static build hook to help Vercel handle SPA routing
// It will be executed during build

const fs = require('fs');
const path = require('path');

// Main function to execute
(async () => {
  try {
    // Create a _redirects file for SPA routing
    const redirectsPath = path.join(__dirname, 'dist', '_redirects');
    fs.writeFileSync(redirectsPath, '/* /index.html 200\n');
    console.log('Added _redirects file for SPA routing');
    
    // Create a serverless function for API routes
    console.log('Vercel deployment setup complete');
  } catch (error) {
    console.error('Error setting up Vercel deployment:', error);
    process.exit(1);
  }
})();