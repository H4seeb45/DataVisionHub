# Server Management Dashboard

A comprehensive server management platform providing detailed analytics, monitoring, and administrative tools for cloud infrastructure.

## Key Features
- Detailed server monitoring and status tracking
- IP address management
- Cloud storage configuration
- Billing and payment integration
- Responsive and interactive dashboard interface

## Tech Stack
- React.js frontend
- Shadcn UI components
- TailwindCSS for styling
- Recharts for data visualization
- Mock data for easy testing and demo

## Project Structure
- `client/src/components`: UI components
- `client/src/pages`: Page components for different sections of the app
- `client/src/lib`: Utilities and mock data
- `client/src/hooks`: Custom React hooks

## Deployment
This project is configured for deployment on Vercel. The frontend-only build process is configured in `frontend-build.js` and `vercel.json`.

## Available Pages
- Dashboard: Overview of server status, traffic, and key metrics
- Servers: List of all servers with status and utilization details
- Server Details: Detailed information about a specific server
- IP Addresses: Management of IP address allocations
- Cloud Storage: Storage device management and monitoring
- Payments: Invoice tracking and payment management
- Settings: User account, payment methods, and preferences

## Running the Project
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Open `http://localhost:3000` in your browser