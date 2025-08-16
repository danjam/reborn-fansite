// src/components/PageCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { Styles } from '@/types';

export type PageCardData = {
  id: string;
  icon: string;
  title: string;
  description: string;
  linkLabel: string;
};

export const PageCard = React.memo(
  ({ item, styles }: { item: PageCardData; styles: Styles }) => (
    <div className={styles.card}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={item.icon}
            alt={item.title}
            className="w-16 h-16 object-contain"
          />
          <h3 className={`text-xl font-semibold ${styles.text.primary}`}>
            {item.title}
          </h3>
        </div>
      </div>

      <p className={`${styles.text.secondary} mb-4`}>{item.description}</p>

      <Link to={item.id} className={`${styles.button.primary} inline-block`}>
        {item.linkLabel}
      </Link>
    </div>
  )
);

// Add display name for better debugging
PageCard.displayName = 'PageCard';
