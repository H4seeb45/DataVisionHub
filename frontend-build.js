// This script builds just the frontend React application for Vercel deployment
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting frontend-only build process...');

try {
  // Run the Vite build process for the frontend
  console.log('Building frontend application...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Create the _redirects file for SPA routing
  console.log('Setting up SPA routing...');
  const distDir = path.join(__dirname, 'dist');
  const publicDir = path.join(distDir, 'public');
  
  // If the build outputs to dist/public, move everything up to dist
  if (fs.existsSync(publicDir)) {
    console.log('Moving files from dist/public to dist...');
    const files = fs.readdirSync(publicDir);
    
    files.forEach(file => {
      const srcPath = path.join(publicDir, file);
      const destPath = path.join(distDir, file);
      
      if (fs.lstatSync(srcPath).isDirectory()) {
        // For directories, copy recursively
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        // For files, just copy
        fs.copyFileSync(srcPath, destPath);
      }
    });
    
    // Remove the public directory
    fs.rmSync(publicDir, { recursive: true, force: true });
  }
  
  // Create _redirects file for SPA routing
  const redirectsPath = path.join(distDir, '_redirects');
  fs.writeFileSync(redirectsPath, '/* /index.html 200\n');
  
  console.log('Frontend build completed successfully!');
} catch (error) {
  console.error('Error during frontend build process:', error);
  process.exit(1);
}