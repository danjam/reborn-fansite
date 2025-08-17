// src/components/LoadingScreen.tsx
import { useMemo } from 'react';

import { katie } from '@/assets/img';
import { PixelArtImage } from '@/components/PixelArtImage';

interface LoadingScreenProps {
  loadedCount: number;
  totalCount: number;
}

export const LoadingScreen = ({
  loadedCount,
  totalCount,
}: LoadingScreenProps) => {
  // Calculate progress percentage
  const progressPercent = useMemo(() => {
    if (totalCount === 0) return 0;
    return Math.round((loadedCount / totalCount) * 100);
  }, [loadedCount, totalCount]);

  // Progress bar width for smooth animation
  const progressWidth = useMemo(() => {
    return `${progressPercent}%`;
  }, [progressPercent]);

  // Determine loading phase text
  const loadingText = useMemo(() => {
    if (totalCount === 0) return 'Initializing...';
    if (progressPercent < 30) return 'Awakening...';
    if (progressPercent < 70) return 'Loading assets...';
    if (progressPercent < 100) return 'Almost ready...';
    return 'Loading complete...';
  }, [progressPercent, totalCount]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Game Logo/Mascot */}
        <div className="flex justify-center">
          <div className="relative">
            <PixelArtImage
              src={katie}
              alt="Katie"
              className="w-16 h-16 object-contain"
              lazy={false}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.3))',
              }}
            />
          </div>
        </div>

        {/* Game Title */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
            Reborn Fan Site
          </h1>
          <p className="text-green-300 text-sm opacity-90">
            An Idle Roguelike RPG Resource
          </p>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4">
          {/* Progress Bar Container - Game UI Style */}
          <div className="relative">
            {/* Outer border with game-like styling */}
            <div className="w-full h-6 bg-gray-800 border-2 border-gray-600 rounded-sm relative overflow-hidden">
              {/* Inner shadow for depth */}
              <div className="absolute inset-1 bg-gray-900 rounded-sm">
                {/* Progress fill with gradient */}
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300 ease-out relative overflow-hidden"
                  style={{ width: progressWidth }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-50 animate-pulse"></div>
                  {/* Pixelated pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Progress percentage display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold drop-shadow-lg">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Loading status text */}
          <div className="text-center">
            <p className="text-green-300 text-lg font-medium mb-1">
              {loadingText}
            </p>
            <p className="text-gray-400 text-sm">
              {loadedCount} / {totalCount} assets loaded
            </p>
          </div>

          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-75"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-75"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-75"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>

        {/* Subtle version info */}
        <div className="text-gray-500 text-xs pt-4">
          Loading game assets for optimal experience...
        </div>
      </div>
    </div>
  );
};
