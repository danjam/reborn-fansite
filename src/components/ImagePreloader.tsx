// src/components/ImagePreloader.tsx
import { ReactNode, useCallback, useEffect, useState } from 'react';

import * as allImages from '@/assets/img';
import { LoadingScreen } from '@/components/LoadingScreen';

interface ImagePreloaderProps {
  children: ReactNode;
}

export const ImagePreloader = ({ children }: ImagePreloaderProps) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const preloadImages = useCallback(async () => {
    // Get all image URLs from the index
    const imageUrls = Object.values(allImages);
    setTotalCount(imageUrls.length);

    // Prioritize Katie image - load it first
    const katieUrl = allImages.katie;
    const otherImageUrls = imageUrls.filter(url => url !== katieUrl);

    // Load Katie first
    try {
      await new Promise<void>(resolve => {
        const img = new Image();
        img.onload = () => {
          setLoadedCount(prev => prev + 1);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load Katie image: ${katieUrl}`);
          setLoadedCount(prev => prev + 1);
          resolve();
        };
        img.src = katieUrl;
      });
    } catch (error) {
      console.warn('Error loading Katie image:', error);
    }

    // Then load all other images
    const imagePromises = otherImageUrls.map(url => {
      return new Promise<void>(resolve => {
        const img = new Image();

        img.onload = () => {
          setLoadedCount(prev => prev + 1);
          resolve();
        };

        img.onerror = () => {
          console.warn(`Failed to load image: ${url}`);
          setLoadedCount(prev => prev + 1); // Still count as "processed"
          resolve(); // Don't reject to avoid blocking other images
        };

        img.src = url;
      });
    });

    // Wait for all remaining images to load
    try {
      await Promise.all(imagePromises);
      // Small delay to show completion state briefly
      setTimeout(() => {
        setIsComplete(true);
      }, 200);
    } catch (error) {
      console.error('Error preloading images:', error);
      // Still proceed to show the app
      setIsComplete(true);
    }
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Show loading screen until all images are loaded - now with theme support!
  if (!isComplete) {
    return <LoadingScreen loadedCount={loadedCount} totalCount={totalCount} />;
  }

  // All images loaded, render the main app
  return <>{children}</>;
};
