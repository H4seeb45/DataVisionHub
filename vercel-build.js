// This script runs the build process for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

try {
  // Run the normal build process
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
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