// src/components/ThemeSelector.tsx
import { useTheme } from '@/hooks/useTheme';
import { ThemeService } from '@/services/ThemeService';
import clsx from 'clsx';
import { useState } from 'react';

export const ThemeSelector = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const theme = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentThemeObj = ThemeService.getThemeByName(currentTheme);

  return (
    <div>
      <h3 className={clsx('text-md font-medium mb-3', theme.text.primary)}>
        Theme
      </h3>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={clsx(
            'w-full flex items-center justify-between p-3 rounded-lg border cursor-pointer text-left',
            theme.border.default,
            theme.background.elevated,
            'hover:' + theme.background.overlay,
            'focus:outline-none focus:ring-2',
            theme.border.accent.replace('border-', 'focus:ring-')
          )}
        >
          <div className="flex items-center flex-1">
            {/* Current Theme Swatches */}
            <div className="flex space-x-1 mr-3">
              {/* Background Preview */}
              <div
                className={clsx(
                  'w-4 h-4 rounded border',
                  currentThemeObj.colors.background.base,
                  theme.border.subtle
                )}
                title={`${currentTheme} background`}
              />

              {/* Text Preview */}
              <div
                className={clsx(
                  'w-4 h-4 rounded border flex items-center justify-center',
                  currentThemeObj.colors.background.base,
                  theme.border.subtle
                )}
                title={`${currentTheme} text`}
              >
                <div
                  className={clsx(
                    'w-2 h-0.5 rounded',
                    currentThemeObj.colors.text.primary.replace('text-', 'bg-')
                  )}
                />
              </div>

              {/* Accent Preview */}
              <div
                className={clsx(
                  'w-4 h-4 rounded border',
                  currentThemeObj.colors.background.accent,
                  theme.border.subtle
                )}
                title={`${currentTheme} accent`}
              />
            </div>

            {/* Theme Name */}
            <span
              className={clsx('font-medium capitalize', theme.text.primary)}
            >
              {currentTheme}
            </span>
          </div>

          {/* Dropdown Arrow */}
          <svg
            className={clsx(
              'w-4 h-4 transition-transform',
              theme.text.secondary,
              isDropdownOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Options */}
        {isDropdownOpen && (
          <div
            className={clsx(
              'absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10',
              theme.border.default,
              theme.background.elevated
            )}
          >
            {availableThemes.map(themeName => {
              const themeObj = ThemeService.getThemeByName(themeName);
              const isSelected = currentTheme === themeName;

              return (
                <button
                  key={themeName}
                  onClick={() => {
                    setTheme(themeName);
                    setIsDropdownOpen(false);
                  }}
                  className={clsx(
                    'w-full flex items-center p-3 text-left first:rounded-t-lg last:rounded-b-lg',
                    isSelected
                      ? theme.background.accent
                      : 'hover:' + theme.background.overlay,
                    'focus:outline-none focus:ring-2',
                    theme.border.accent.replace('border-', 'focus:ring-')
                  )}
                >
                  {/* Theme Swatches */}
                  <div className="flex space-x-1 mr-3">
                    {/* Background Preview */}
                    <div
                      className={clsx(
                        'w-5 h-5 rounded border',
                        themeObj.colors.background.base,
                        theme.border.subtle
                      )}
                      title={`${themeName} background`}
                    />

                    {/* Text Preview */}
                    <div
                      className={clsx(
                        'w-5 h-5 rounded border flex items-center justify-center',
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
                        'w-5 h-5 rounded border',
                        themeObj.colors.background.accent,
                        theme.border.subtle
                      )}
                      title={`${themeName} accent`}
                    />
                  </div>

                  {/* Theme Name */}
                  <span
                    className={clsx(
                      'font-medium capitalize flex-1',
                      theme.text.primary
                    )}
                  >
                    {themeName}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
