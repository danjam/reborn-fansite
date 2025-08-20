// src/components/ThemeSelector.tsx
import { useTheme } from '@/hooks/useTheme';
import { ThemeService } from '@/services/ThemeService';
import clsx from 'clsx';

export const ThemeSelector = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const theme = useTheme();

  return (
    <div className="space-y-3">
      <h3 className={clsx('text-sm font-medium', theme.text.primary)}>Theme</h3>

      <div className="space-y-2">
        {availableThemes.map(themeName => {
          const themeObj = ThemeService.getThemeByName(themeName);
          const isSelected = currentTheme === themeName;

          return (
            <button
              key={themeName}
              onClick={() => setTheme(themeName)}
              className={clsx(
                'w-full flex items-center p-3 rounded-lg border cursor-pointer text-left',
                theme.border.default,
                isSelected
                  ? theme.background.accent
                  : theme.background.elevated,
                'hover:' + theme.background.overlay,
                'focus:outline-none focus:ring-2',
                theme.border.accent.replace('border-', 'focus:ring-')
              )}
            >
              {/* Custom Selection Indicator - REMOVED transition-opacity */}
              <div className="flex items-center justify-center w-4 h-4 mr-3 rounded-full border-2">
                <div
                  className={clsx(
                    'w-2 h-2 rounded-full',
                    isSelected ? 'opacity-100' : 'opacity-0',
                    themeObj.colors.border.accent.replace('border-', 'bg-')
                  )}
                />
              </div>

              {/* Theme Info */}
              <div className="flex-1">
                <div
                  className={clsx('font-medium capitalize', theme.text.primary)}
                >
                  {themeName}
                </div>
              </div>

              {/* Theme Preview */}
              <div className="flex space-x-1 ml-3">
                {/* Background Preview */}
                <div
                  className={clsx(
                    'w-6 h-6 rounded border',
                    themeObj.colors.background.base,
                    theme.border.subtle
                  )}
                  title={`${themeName} background`}
                />

                {/* Text Preview */}
                <div
                  className={clsx(
                    'w-6 h-6 rounded border flex items-center justify-center',
                    themeObj.colors.background.base,
                    theme.border.subtle
                  )}
                  title={`${themeName} text`}
                >
                  <div
                    className={clsx(
                      'w-3 h-0.5 rounded',
                      themeObj.colors.text.primary.replace('text-', 'bg-')
                    )}
                  />
                </div>

                {/* Accent Preview */}
                <div
                  className={clsx(
                    'w-6 h-6 rounded border',
                    themeObj.colors.background.accent,
                    theme.border.subtle
                  )}
                  title={`${themeName} accent`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
