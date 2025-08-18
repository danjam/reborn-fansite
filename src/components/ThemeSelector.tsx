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
            <label
              key={themeName}
              className={clsx(
                'flex items-center p-3 rounded-lg border cursor-pointer transition-colors',
                theme.border.default,
                isSelected
                  ? theme.background.accent
                  : theme.background.elevated,
                'hover:' + theme.background.overlay
              )}
            >
              {/* Radio Input */}
              <input
                type="radio"
                name="theme"
                value={themeName}
                checked={isSelected}
                onChange={() => setTheme(themeName)}
                className={clsx(
                  'w-4 h-4 mr-3',
                  theme.interactive.primary.includes('green')
                    ? 'text-green-600 focus:ring-green-500'
                    : 'text-blue-600 focus:ring-blue-500'
                )}
              />

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
            </label>
          );
        })}
      </div>
    </div>
  );
};
