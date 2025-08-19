// src/components/PageCard.tsx
import clsx from 'clsx';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { useTheme } from '@/hooks/useTheme';

export type PageCardData = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export const PageCard = memo(({ item }: { item: PageCardData }) => {
  const theme = useTheme();

  // Extract the background color for hover effect
  const hoverBg = theme.background.overlay.replace('bg-', 'hover:bg-');

  return (
    <Link
      to={item.id}
      className={clsx(
        theme.card(),
        'block transition-colors duration-200',
        hoverBg,
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={item.icon}
            alt={item.title}
            className="w-16 h-16 object-contain"
          />
          <h3 className={clsx('text-xl font-semibold', theme.text.primary)}>
            {item.title}
          </h3>
        </div>
      </div>

      <p className={clsx('mb-0 text-sm', theme.text.secondary)}>
        {item.description}
      </p>
    </Link>
  );
});

// Add display name for better debugging
PageCard.displayName = 'PageCard';
