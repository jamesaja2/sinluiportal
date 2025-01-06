import { useState, useEffect } from 'react';
import axios from 'axios';
import { LinkCategories } from '../types/links';
import { staticLinks } from '../data/staticLinks';
import { useAuth } from '../contexts/useAuth';

export const useLinks = () => {
  const [links, setLinks] = useState<LinkCategories>(staticLinks);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
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
        
        if (response.data && response.data.length > 0) {
          setLinks(response.data);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch links:', err);
        setError('Using offline data');
        // Fallback to static links (already set as initial state)
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [user]);

  return { links, isLoading, error };
};