// This script runs the build process for Vercel deployment
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Vercel build process...');

try {
  // Run the frontend-only build process
  console.log('Building frontend application...');
  execSync('node frontend-build.js', { stdio: 'inherit' });
  
  // Create a _redirects file for SPA routing
  console.log('Setting up SPA routing...');
  const redirectsPath = path.join(__dirname, 'dist', '_redirects');
  fs.writeFileSync(redirectsPath, '/* /index.html 200\n');
  
  // Create a vercel.html file to ensure proper SPA routing
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  const vercelHtmlPath = path.join(__dirname, 'dist', 'vercel.html');
  
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, vercelHtmlPath);
    console.log('Created vercel.html for SPA routing');
  }
  
  console.log('Vercel build process completed successfully!');
} catch (error) {
  console.error('Error during Vercel build process:', error);
  process.exit(1);
}