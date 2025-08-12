// src/pages/GameObjectPage.tsx
import { useMemo } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import { createStyles } from '@/utils/styles';

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

  // Helper function to get item type from constructor name
  const getItemType = (item: GameObject): string => {
    return item.constructor.name;
  };

  // Helper function to format type for display
  const formatTypeForDisplay = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Valid data types - updated to include bars and ores
  const validTypes = ['monsters', 'potions', 'vegetables', 'containers', 'drops', 'bars', 'ores'];

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
            <p>No {type.slice(0, -1)} found with ID: {id}</p>
            <Link 
              to={type === 'bars' || type === 'ores' ? '/reference/smithing' : `/reference/${type}`}
              className={`${styles.button.primary} inline-block mt-4`}
            >
              View All {type === 'bars' || type === 'ores' ? 'Smithing' : formatTypeForDisplay(type)}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const itemType = getItemType(item);

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
              to={type === 'bars' || type === 'ores' ? '/reference/smithing' : `/reference/${type}`}
              className={`${styles.text.accent} hover:underline`}
            >
              {type === 'bars' || type === 'ores' ? 'Smithing' : formatTypeForDisplay(type)}
            </Link>
            <span className={styles.text.muted}>/</span>
            <span className={styles.text.secondary}>{item.name}</span>
          </nav>
        </div>

        {/* Item Header */}
        <div className={styles.card}>
          <div className="flex items-start space-x-6">
            <PixelArtImage
              src={item.icon}
              alt={item.name}
              className="w-16 h-16 flex-shrink-0"
            />
            <div className="flex-1">
              <h1 className={`text-3xl font-bold mb-2 ${styles.text.primary}`}>
                {item.name}
              </h1>
              <p className={`text-sm ${styles.text.muted} mb-4`}>
                {itemType} • ID: {item.id}
              </p>
              {/* Basic properties that all items have */}
              <div className="space-y-2">
                {/* Add specific property rendering based on item type */}
                {'sell_price' in item && item.sell_price !== null && (
                  <p className={styles.text.secondary}>
                    <span className="font-medium">Sell Price:</span> {item.sell_price} gold
                  </p>
                )}
                {'effect' in item && (
                  <p className={styles.text.secondary}>
                    <span className="font-medium">Effect:</span> {item.effect}
                  </p>
                )}
                {'materials' in item && item.materials && (
                  <div>
                    <span className="font-medium">Materials Required:</span>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {item.materials.map((material: any, index: number) => (
                        <li key={index} className={styles.text.secondary}>
                          {material.quantity}x {material.id.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {'sources' in item && item.sources && (
                  <div>
                    <span className="font-medium">Sources:</span>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {item.sources.map((source: any, index: number) => (
                        <li key={index} className={styles.text.secondary}>
                          {source.type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link 
            to={type === 'bars' || type === 'ores' ? '/reference/smithing' : `/reference/${type}`}
            className={`${styles.button.secondary} inline-flex items-center`}
          >
            ← Back to {type === 'bars' || type === 'ores' ? 'Smithing' : formatTypeForDisplay(type)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameObjectPage;