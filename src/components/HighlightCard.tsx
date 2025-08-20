// src/components/HighlightCard.tsx
import clsx from 'clsx';
import { memo, useMemo } from 'react';

import { PixelArtImage } from '@/components/PixelArtImage';
import { useTheme } from '@/hooks/useTheme';

interface HighlightCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  content: string;
}

const HighlightCard = memo(
  ({ icon, iconAlt, title, content }: HighlightCardProps) => {
    const theme = useTheme();

    // Memoize content parsing to prevent recalculation on unchanged content
    const parsedContent = useMemo(() => {
      // Parse content to handle **bold** markdown-style formatting
      const parts = content.split(/(\*\*.*?\*\*)/g);

      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return <strong key={index}>{boldText}</strong>;
        }
        return part;
      });
    }, [content]);

    return (
      <div
        className={clsx(
          theme.card(`border-l-4 ${theme.border.accent} mb-4`),
          theme.background.accent
        )}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <PixelArtImage
              src={icon}
              alt={iconAlt}
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex-1">
            <h3
              className={clsx('text-lg font-semibold mb-2', theme.text.primary)}
            >
              {title}
            </h3>
            <p className={theme.text.secondary}>{parsedContent}</p>
          </div>
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
HighlightCard.displayName = 'HighlightCard';

export default HighlightCard;
