// src/components/SteamNews.tsx
import { useTheme } from '@/hooks/useTheme';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface NewsItem {
  title: string;
  link: string;
  description: string;
}

export const SteamNews = () => {
  const theme = useTheme();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use different endpoints for development vs production
        const isDev = import.meta.env.DEV;
        const apiUrl = isDev
          ? 'https://api.allorigins.win/raw?url=' +
            encodeURIComponent('https://steamcommunity.com/games/2850000/rss/')
          : '/api/steam-news';

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch Steam news: ${response.status}`);
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const parserError = xmlDoc.getElementsByTagName('parsererror');
        if (parserError.length > 0) {
          throw new Error('Failed to parse RSS feed');
        }

        const items = xmlDoc.getElementsByTagName('item');
        const firstItem = items[0];

        if (!firstItem) {
          throw new Error('No news items found');
        }

        const title =
          firstItem.getElementsByTagName('title')[0]?.textContent || 'No title';
        const link =
          firstItem.getElementsByTagName('link')[0]?.textContent || '';
        const description =
          firstItem.getElementsByTagName('description')[0]?.textContent || '';

        // Process description: convert divs to headers, preserve line breaks
        const processedDescription = description
          .replace(/<div[^>]*>(.*?)<\/div>/gi, '\n##HEADER##$1##/HEADER##\n')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]*>/g, '')
          .trim();

        setNewsItem({
          title,
          link,
          description: processedDescription,
        });
      } catch (err) {
        console.error('Error fetching Steam news:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <>
        <h3 className={clsx('text-xl font-bold mb-4', theme.text.primary)}>
          Latest Reborn Update
        </h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
          <span className={clsx('ml-3', theme.text.secondary)}>
            Loading news...
          </span>
        </div>
      </>
    );
  }

  if (error || !newsItem) {
    return (
      <>
        <h3 className={clsx('text-xl font-bold mb-4', theme.text.primary)}>
          Latest Reborn Update
        </h3>
        <div className={clsx('text-center py-8', theme.text.secondary)}>
          <p>Unable to load Steam news at the moment.</p>
          {error && <p className="text-sm mt-2">Error: {error}</p>}
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className={clsx('text-xl font-bold mb-4', theme.text.primary)}>
        Latest Reborn Update
      </h3>

      <div className="mb-3">
        <h4 className={clsx('font-semibold text-lg mb-2', theme.text.primary)}>
          {newsItem.link ? (
            <a
              href={newsItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx('hover:underline', theme.text.accent)}
            >
              {newsItem.title}
            </a>
          ) : (
            newsItem.title
          )}
        </h4>
      </div>

      <div
        className={clsx('whitespace-pre-line text-sm', theme.text.secondary)}
      >
        {newsItem.description
          .split(/##HEADER##(.*?)##\/HEADER##/)
          .map((part, index) => {
            if (index % 2 === 1) {
              return (
                <h5
                  key={index}
                  className={clsx(
                    'font-semibold text-base mt-4 mb-2',
                    theme.text.primary
                  )}
                >
                  {part.trim()}
                </h5>
              );
            } else if (part.trim()) {
              return (
                <div key={index} className="whitespace-pre-line">
                  {part.trim()}
                </div>
              );
            }
            return null;
          })}
      </div>
    </>
  );
};
