import { QueryClient, QueryFunction } from "@tanstack/react-query";
import {
  trafficData,
  servers,
  paymentInfo,
  bandwidthCommitData,
  ipSummaryData,
  ipAddresses,
  storageDevices,
  invoices,
  creditCards,
  wallets
} from "./mockData";

// This is a mock implementation that returns static data instead of making API requests
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Create a mock response based on the URL
  let responseData: any = {};
  
  console.log(`Mock API request: ${method} ${url}`);
  
  // Simulate a delay to mimic network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return appropriate mock data based on the endpoint
  if (url.includes('/api/dashboard/traffic')) {
    responseData = trafficData;
  } else if (url.includes('/api/dashboard/servers')) {
    responseData = servers;
  } else if (url.includes('/api/dashboard/payment')) {
    responseData = paymentInfo;
  } else if (url.includes('/api/dashboard/bandwidth-commit')) {
    responseData = bandwidthCommitData;
  } else if (url.includes('/api/dashboard/ip-summary')) {
    responseData = ipSummaryData;
  } else if (url.includes('/api/servers')) {
    responseData = servers;
  } else if (url.includes('/api/ip-addresses')) {
    responseData = ipAddresses;
  } else if (url.includes('/api/cloud-storage')) {
    responseData = storageDevices;
  } else if (url.includes('/api/payments')) {
    responseData = invoices;
  } else if (url.includes('/api/settings/cards')) {
    responseData = creditCards;
  } else if (url.includes('/api/settings/wallets')) {
    responseData = wallets;
  }
  
  // Create a mock response object
  const mockResponse = {
    ok: true,
    status: 200,
    json: async () => responseData,
    text: async () => JSON.stringify(responseData),
    statusText: "OK",
    headers: new Headers({ 'Content-Type': 'application/json' }),
  };
  
  return mockResponse as unknown as Response;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export function getQueryFn<T>({ on401: unauthorizedBehavior }: { on401: UnauthorizedBehavior }): QueryFunction<T> {
  return async ({ queryKey }) => {
    const url = queryKey[0] as string;
    console.log(`Mock query: ${url}`);
    
    // Simulate a delay to mimic network request
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let result: any = null;
    
    // Return appropriate mock data based on the endpoint
    if (url.includes('/api/dashboard/traffic')) {
      result = trafficData;
    } else if (url.includes('/api/dashboard/servers')) {
      result = servers;
    } else if (url.includes('/api/dashboard/payment')) {
      result = paymentInfo;
    } else if (url.includes('/api/dashboard/bandwidth-commit')) {
      result = bandwidthCommitData;
    } else if (url.includes('/api/dashboard/ip-summary')) {
      result = ipSummaryData;
    } else if (url.includes('/api/servers')) {
      result = servers;
    } else if (url.includes('/api/ip-addresses')) {
      result = ipAddresses;
    } else if (url.includes('/api/cloud-storage')) {
      result = storageDevices;
    } else if (url.includes('/api/payments')) {
      result = invoices;
    } else if (url.includes('/api/settings/cards')) {
      result = creditCards;
    } else if (url.includes('/api/settings/wallets')) {
      result = wallets;
    }
    
    return result as T;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
