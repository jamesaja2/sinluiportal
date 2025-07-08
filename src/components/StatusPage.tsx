import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface EndpointStatus {
  name: string;
  method: string;
  status: 'online' | 'offline';
  error?: string;
}

const StatusPage = () => {
  const [endpoints, setEndpoints] = useState<EndpointStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkEndpoints = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const endpointsToCheck = [
        { name: 'User Profile API', method: 'GET', path: '/api/private/user' },
        { name: 'User Links API', method: 'GET', path: '/api/private/links' },
        { name: 'OAuth 2.0', method: 'GET', path: '/oauth/status' },
        { name: 'Links Admin API', method: 'PUT', path: '/api/admin/links' },
      ];

      const statuses = await Promise.all(
        endpointsToCheck.map(async (endpoint) => {
          try {
            await axios({
              method: endpoint.method,
              url: `${baseUrl}${endpoint.path}`,
              withCredentials: true,
            });
            return {
              name: endpoint.name,
              method: endpoint.method,
              status: 'online' as const,
            };
          } catch (error) {
            return {
              name: endpoint.name,
              method: endpoint.method,
              status: 'offline' as const,
              error: error instanceof Error ? error.message : 'Unknown error',
            };
          }
        })
      );

      setEndpoints(statuses);
      setIsLoading(false);
    };

    checkEndpoints();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-[#2a2a2a] rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">API Status</h1>
        
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="bg-[#3a3a3a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">{endpoint.name}</span>
                  <span className="ml-2 text-sm text-gray-400">{endpoint.method}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    endpoint.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="capitalize">{endpoint.status}</span>
                </div>
              </div>
              {endpoint.error && (
                <div className="mt-2 text-sm text-red-400">
                  Error: {endpoint.error}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusPage;