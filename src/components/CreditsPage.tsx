import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
}

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}

const CreditsPage = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check API status
        const apiCheck = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/public/links`);
        if (apiCheck.status === 200) {
          setApiStatus('online');
        }
      } catch (error) {
        setApiStatus('offline');
      }

      try {
        // Fetch GitHub contributors
        const contributorsResponse = await axios.get(
          'https://api.github.com/repos/jamesaja2/sinluiportal/contributors'
        );
        setContributors(contributorsResponse.data);

        // Fetch GitHub commits
        const commitsResponse = await axios.get(
          'https://api.github.com/repos/jamesaja2/sinluiportal/commits'
        );
        setCommits(commitsResponse.data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }

      setIsLoading(false);
    };

    fetchData();
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
        <h1 className="text-2xl font-semibold mb-6 text-center">Site Credits</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">API Status</h2>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              apiStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="capitalize">{apiStatus}</span>
          </div>
        </div>

        {contributors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Contributors</h2>
            <div className="grid grid-cols-2 gap-4">
              {contributors.map((contributor) => (
                <a
                  key={contributor.login}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{contributor.login}</div>
                    <div className="text-sm text-gray-400">
                      {contributor.contributions} commits
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {commits.length > 0 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Recent Commits</h2>
            <div className="space-y-4">
              {commits.map((commit) => (
                <a
                  key={commit.sha}
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg hover:bg-[#3a3a3a] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={commit.author?.avatar_url}
                      alt={commit.author?.login}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">{commit.author?.login}</span>
                    <span className="text-sm text-gray-400">
                      {new Date(commit.commit.author.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{commit.commit.message}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditsPage;