// src/pages/GameObjectPage.tsx
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import {
  VALID_GAME_OBJECT_TYPES,
  type GameObjectType,
} from '@/constants/gameObjectTypes';
import { formatTypeForDisplay, getItemType } from '@/utils/gameObjectHelpers';
import {
  getReferenceUrl,
  getTypeDisplayName,
  getTypeSingular,
} from '@/utils/linkHelpers';

import { gameData } from '@/gameData';
import { useStyles } from '@/hooks';
import type { GameObject } from '@/types/gameObject';

const GameObjectPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { styles } = useStyles();

  // Type guard function
  const isValidGameObjectType = (type: string): type is GameObjectType => {
    return VALID_GAME_OBJECT_TYPES.includes(type as GameObjectType);
  };

  // Look up the item using the service
  const item: GameObject | undefined = useMemo(() => {
    if (!id) return undefined;
    return gameData.getObjectById(id);
  }, [id]);

  if (!type || !id) {
    return (
      <div className={`min-h-screen ${styles.bg.primary}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`text-center ${styles.text.secondary}`}>
            <h1 className="text-2xl font-bold mb-4">Invalid URL</h1>
            <p>Both type and ID are required.</p>
            <Link
              to="/"
              className={`${styles.button.primary} inline-block mt-4`}
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidGameObjectType(type)) {
    return (
      <div className={`min-h-screen ${styles.bg.primary}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`text-center ${styles.text.secondary}`}>
            <h1 className="text-2xl font-bold mb-4">Invalid Type</h1>
            <p>
              The type &quot;{type}&quot; is not valid. Valid types are:{' '}
              {VALID_GAME_OBJECT_TYPES.join(', ')}
            </p>
            <Link
              to="/reference"
              className={`${styles.button.primary} inline-block mt-4`}
            >
              Go to Reference
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // After type guard validation, TypeScript knows type is GameObjectType
  const validatedType: GameObjectType = type;

  if (!item) {
    return (
      <div className={`min-h-screen ${styles.bg.primary}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`text-center ${styles.text.secondary}`}>
            <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
            <p>
              No {getTypeSingular(validatedType)} found with ID: {id}
            </p>
            <Link
              to={getReferenceUrl(validatedType)}
              className={`${styles.button.primary} inline-block mt-4`}
            >
              View All {getTypeDisplayName(validatedType)}
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
        {/* Item Details */}
        <div className={styles.card}>
          <div className="flex items-start space-x-6">
            {/* Item Icon - Fixed to use standard 64px size */}
            <div className="flex-shrink-0">
              <PixelArtImage
                src={item.icon}
                alt={item.name}
                className="w-16 h-16 object-contain"
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
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            to={getReferenceUrl(validatedType)}
            className={`${styles.button.secondary} inline-block`}
          >
            ← Back to {getTypeDisplayName(validatedType)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameObjectPage;
