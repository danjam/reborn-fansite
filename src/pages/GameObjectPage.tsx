// src/pages/GameObjectPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { createStyles } from '@/utils/styles';
import { getItemType, formatTypeForDisplay } from '@/utils/gameObjectHelpers';
import { VALID_GAME_OBJECT_TYPES } from '@/constants/gameObjectTypes';
import { getReferenceUrl, getTypeDisplayName, getTypeSingular, isSmithingType } from '@/utils/linkHelpers';

import { gameData } from '../gameData';
import type { GameObject } from '../types/GameObject';

const GameObjectPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  // Look up the item using the service
  const item: GameObject | undefined = useMemo(() => {
    if (!id) return undefined;
    return gameData.getObjectById(id);
  }, [id]);

  // Valid data types - now using centralized constants
  const validTypes = VALID_GAME_OBJECT_TYPES;

  if (!type || !id) {
    return (
      <div className={`min-h-screen ${styles.bg.primary}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`text-center ${styles.text.secondary}`}>
            <h1 className="text-2xl font-bold mb-4">Invalid URL</h1>
            <p>Both type and ID are required.</p>
            <Link to="/" className={`${styles.button.primary} inline-block mt-4`}>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!validTypes.includes(type)) {
    return (
      <div className={`min-h-screen ${styles.bg.primary}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`text-center ${styles.text.secondary}`}>
            <h1 className="text-2xl font-bold mb-4">Invalid Type</h1>
            <p>The type "{type}" is not valid. Valid types are: {validTypes.join(', ')}</p>
            <Link to="/reference" className={`${styles.button.primary} inline-block mt-4`}>
              Go to Reference
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className={`min-h-screen ${styles.bg.primary}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`text-center ${styles.text.secondary}`}>
            <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
            <p>No {getTypeSingular(type as any)} found with ID: {id}</p>
            <Link 
              to={getReferenceUrl(type as any)}
              className={`${styles.button.primary} inline-block mt-4`}
            >
              View All {getTypeDisplayName(type as any)}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const itemType = getItemType(item);
  const displayType = formatTypeForDisplay(itemType);

  return (
    <div className={`min-h-screen ${styles.bg.primary}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/reference"
              className={`${styles.text.accent} hover:underline`}
            >
              Reference
            </Link>
            <span className={styles.text.muted}>/</span>
            <Link
              to={getReferenceUrl(type as any)}
              className={`${styles.text.accent} hover:underline`}
            >
              {getTypeDisplayName(type as any)}
            </Link>
            <span className={styles.text.muted}>/</span>
            <span className={styles.text.secondary}>{item.name}</span>
          </nav>
        </div>

        {/* Item Details */}
        <div className={styles.card}>
          <div className="flex items-start space-x-6">
            {/* Item Icon */}
            <div className="flex-shrink-0">
              <PixelArtImage
                src={item.icon}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* Item Information */}
            <div className="flex-grow">
              <h1 className={`text-3xl font-bold mb-2 ${styles.text.accent}`}>
                {item.name}
              </h1>
              
              <div className={`text-sm ${styles.text.muted} mb-4`}>
                <span>Type: {displayType}</span>
                <span className="mx-2">•</span>
                <span>ID: {item.id}</span>
              </div>

              {/* Dynamic Properties based on item type */}
              <div className="space-y-3">
                {'sell_price' in item && (
                  <div className={styles.text.secondary}>
                    <span className="font-medium">Sell Price: </span>
                    {item.sell_price !== null ? `${item.sell_price} gold` : 'Cannot be sold'}
                  </div>
                )}

                {'effect' in item && (
                  <div className={styles.text.secondary}>
                    <span className="font-medium">Effect: </span>
                    {item.effect}
                  </div>
                )}

                {'hp' in item && (
                  <div className={styles.text.secondary}>
                    <span className="font-medium">HP: </span>
                    {item.hp}
                  </div>
                )}

                {'damage' in item && (
                  <div className={styles.text.secondary}>
                    <span className="font-medium">Damage: </span>
                    {item.damage}
                  </div>
                )}

                {'grow_time' in item && (
                  <div className={styles.text.secondary}>
                    <span className="font-medium">Grow Time: </span>
                    {item.grow_time} minutes
                  </div>
                )}

                {'materials' in item && item.materials.length > 0 && (
                  <div className={styles.text.secondary}>
                    <span className="font-medium">Materials Required: </span>
                    <ul className="mt-2 space-y-1">
                      {item.materials.map((material, index) => (
                        <li key={index} className="text-sm">
                          {material.quantity}x {material.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {'sources' in item && item.sources && item.sources.length > 0 && (
                  <div className={styles.text.secondary}>
                    <span className="font-medium">Sources: </span>
                    {item.sources.map(source => 
                      source.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                    ).join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link 
            to={getReferenceUrl(type as any)}
            className={`${styles.button.secondary} inline-block`}
          >
            ← Back to {getTypeDisplayName(type as any)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameObjectPage;