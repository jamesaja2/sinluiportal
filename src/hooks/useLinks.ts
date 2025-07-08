import { useState, useEffect } from 'react';
import axios from 'axios';
import { LinkCategories } from '../types/links';
import { getStaticLinks } from '../data/staticLinks';
import { useAuth } from '../contexts/useAuth';

export const useLinks = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState<LinkCategories>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
    try {
      const endpoint = user 
        ? `${import.meta.env.VITE_BACKEND_URL}/api/private/links`
        : `${import.meta.env.VITE_BACKEND_URL}/api/public/links`;
      
      const response = await axios.get(endpoint, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        // Ensure we have proper structure and fallback to static data if needed
        const backendData = response.data;
        if (backendData.length > 0 && backendData[0].links && backendData[0].links.length > 0) {
          setLinks(backendData);
        } else {
          // Backend data is empty or malformed, use static data
          setLinks(getStaticLinks(user?.sub));
          setError('Using offline data - backend data incomplete');
        }
      } else {
        // No valid data from backend, use static data
        setLinks(getStaticLinks(user?.sub));
        setError('Using offline data - invalid backend response');
      }
      
    } catch (err) {
      console.error('Failed to fetch links:', err);
      setLinks(getStaticLinks(user?.sub));
      setError('Using offline data - backend unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize with static data immediately
  useEffect(() => {
    setLinks(getStaticLinks(user?.sub));
  }, [user?.sub]);

  const updateLinks = async (newLinks: LinkCategories): Promise<void> => {
    if (!user?.isAdmin) {
      throw new Error('Unauthorized');
    }

    try {
      // First, get the current data
      const currentData = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/private/links`,
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      // Merge the current data with new changes
      const mergedLinks = newLinks.map(category => {
        const existingCategory = currentData.data.find((c: any) => c.id === category.id);
        return {
          id: category.id || existingCategory?.id,
          name: category.name,
          lexorank: category.lexorank,
          createdAt: existingCategory?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          links: category.links.map(link => {
            const existingLink = existingCategory?.links.find((l: any) => l.id === link.id);
            return {
              id: link.id || existingLink?.id,
              title: link.title,
              description: link.description,
              url: link.url,
              iconUrl: link.iconUrl,
              lexorank: link.lexorank || existingLink?.lexorank || 'a'
            };
          }),
          tags: Array.isArray(category.tags) ? category.tags : []
        };
      });

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/links`,
        mergedLinks,
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setLinks(response.data);
        setError(null);
      } else {
        throw new Error('Empty response from server');
      }
    } catch (err) {
      console.error('Failed to update links:', err);
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        throw new Error(err.response.data.error.message || 'Unknown error');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('Failed to save changes');
      }
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [user]);

  return { links, isLoading, error, updateLinks };
};