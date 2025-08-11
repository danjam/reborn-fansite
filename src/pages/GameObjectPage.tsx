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

  // Valid data types
  const validTypes = ['monsters', 'potions', 'vegetables', 'containers', 'drops'];

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
            <p>The type "{type}" is not valid. Valid types are: {validTypes.join(', ')}.</p>
            <Link to="/" className={`${styles.button.primary} inline-block mt-4`}>
              Go Home
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
            <p>The {type.slice(0, -1)} "{id}" could not be found.</p>
            <Link to="/" className={`${styles.button.primary} inline-block mt-4`}>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${styles.bg.primary}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className={`${styles.text.accent} hover:underline`}
            >
              Home
            </Link>
            <span className={styles.text.muted}>/</span>
            <span className={styles.text.secondary}>Data</span>
            <span className={styles.text.muted}>/</span>
            <span className={styles.text.secondary}>{formatTypeForDisplay(type)}</span>
            <span className={styles.text.muted}>/</span>
            <span className={styles.text.secondary}>{item.name}</span>
          </nav>
        </div>

        {/* Item Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-6 mb-4">
            <PixelArtImage
              src={item.icon}
              alt={item.name}
              className="w-24 h-24 object-contain"
            />
            <div>
              <h1 className={`text-4xl font-bold ${styles.text.accent}`}>
                {item.getDisplayName()}
              </h1>
              <p className={`text-lg ${styles.text.secondary} mt-2`}>
                {getItemType(item)}
              </p>
            </div>
          </div>
        </div>

        {/* Item Details */}
        <div className={styles.card}>
          <h2 className={`text-2xl font-semibold mb-6 ${styles.text.primary}`}>
            Item Details
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Basic Properties */}
            <div>
              <h3 className={`text-lg font-medium mb-4 ${styles.text.primary}`}>
                Basic Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={styles.text.secondary}>Name:</span>
                  <span className={styles.text.primary}>{item.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className={styles.text.secondary}>Type:</span>
                  <span className={styles.text.primary}>{getItemType(item)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameObjectPage;