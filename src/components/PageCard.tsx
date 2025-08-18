// src/components/PageCard.tsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { PixelArtImage } from '@/components/PixelArtImage';
import { useTheme } from '@/hooks/useTheme';

export type PageCardData = {
  id: string;
  icon: string;
  title: string;
  description: string;
  linkLabel: string;
};

export const PageCard = memo(({ item }: { item: PageCardData }) => {
  const theme = useTheme();

  return (
    <div className={theme.card()}>
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

      <p className={clsx('mb-4', theme.text.secondary)}>{item.description}</p>

      <Link to={item.id} className={theme.button('primary', { className: 'inline-block' })}>
        {item.linkLabel}
      </Link>
    </div>
  );
});

// Add display name for better debugging
PageCard.displayName = 'PageCard';