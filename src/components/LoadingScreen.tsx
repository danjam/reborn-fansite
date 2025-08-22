// src/components/LoadingScreen.tsx
import clsx from 'clsx';
import { useMemo } from 'react';

import { katie } from '@/assets/img';
import { PixelArtImage } from '@/components/PixelArtImage';
import { useTheme } from '@/hooks/useTheme';

interface LoadingScreenProps {
  loadedCount: number;
  totalCount: number;
}

export const LoadingScreen = ({
  loadedCount,
  totalCount,
}: LoadingScreenProps) => {
  const theme = useTheme();

  // Calculate progress percentage
  const progressPercent = useMemo(() => {
    if (totalCount === 0) return 0;
    return Math.round((loadedCount / totalCount) * 100);
  }, [loadedCount, totalCount]);

  // Progress bar width for smooth animation
  const progressWidth = useMemo(() => {
    return `${progressPercent}%`;
  }, [progressPercent]);

  return (
    <div
      className={clsx(
        'fixed inset-0 bg-fixed flex items-center justify-center',
        theme.background.gradient
      )}
    >
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
                filter: 'drop-shadow(0 0 8px rgba(128, 128, 128, 0.3))',
              }}
            />
          </div>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4">
          {/* Progress Bar Container */}
          <div className="relative w-80 mx-auto">
            <div
              className={clsx(
                'w-full h-4 rounded-full overflow-hidden border',
                theme.background.elevated,
                theme.border.default
              )}
            >
              {/* Progress fill - Now theme agnostic! */}
              <div
                className={clsx(
                  'h-full bg-gradient-to-r transition-all duration-300 ease-out',
                  theme.feedback.progressGradient
                )}
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
