// src/components/SettingsPanel.tsx
import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { ThemeSelector } from '@/components/ThemeSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { useGameSettings } from '@/hooks/useGameSettings';
import { useTheme } from '@/hooks/useTheme';
import { HouseMultipliers } from '@/types/settings';
import { formatMultiplierName } from '@/utils/settingsHelpers';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel = memo(({ isOpen, onClose }: SettingsPanelProps) => {
  const theme = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);

  const {
    settings,
    maxRebirth,
    updateHouseMultiplier,
    updateReawakening,
    updateRebirth,
    resetSettings,
  } = useGameSettings();

  // Local editing state for inputs
  const [editingValues, setEditingValues] = useState<Record<string, string>>(
    {}
  );

  // Save indicators state
  const [saveIndicators, setSaveIndicators] = useState<Record<string, boolean>>(
    {}
  );

  // Debounced save indicator reset
  const debouncedResetIndicator = useDebounce((key: string) => {
    setSaveIndicators(prev => ({ ...prev, [key]: false }));
  }, 1500);

  // Show save indicator
  const showSaveIndicator = useCallback(
    (key: string) => {
      setSaveIndicators(prev => ({ ...prev, [key]: true }));
      debouncedResetIndicator(key);
    },
    [debouncedResetIndicator]
  );

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Get display value for inputs (show editing value or actual value)
  const getDisplayValue = useCallback(
    (key: string, actualValue: number) => {
      return editingValues[key] !== undefined
        ? editingValues[key]
        : String(actualValue);
    },
    [editingValues]
  );

  // Handle input change (just update local state)
  const handleInputChange = useCallback((key: string, value: string) => {
    setEditingValues(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handle input blur (save the value)
  const handleInputBlur = useCallback(
    (
      key: string,
      value: string,
      updateFunction: (val: number) => void,
      minValue: number = 0
    ) => {
      const numValue = Math.max(minValue, parseInt(value) || minValue);
      updateFunction(numValue);
      showSaveIndicator(key);
      setEditingValues(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    },
    [showSaveIndicator]
  );

  // Save indicator component
  const SaveIndicator = memo(({ show }: { show: boolean }) => (
    <span
      className={clsx(
        'text-xs transition-opacity duration-300',
        show ? 'opacity-100 text-green-400' : 'opacity-0'
      )}
    >
      ✓
    </span>
  ));

  // Set display name for SaveIndicator
  SaveIndicator.displayName = 'SaveIndicator';

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black duration-200 z-40',
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel with slide animation */}
      <div
        ref={panelRef}
        className={clsx(
          'fixed top-0 right-0 h-full w-[420px] max-w-full shadow-xl z-50 transform transition-transform duration-200 ease-out',
          theme.background.elevated,
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Panel Header */}
        <div
          className={clsx(
            'p-4 border-b flex justify-between items-center',
            theme.border.default
          )}
        >
          <h2 className={clsx('text-lg font-semibold', theme.text.primary)}>
            Settings
          </h2>
          <div className="flex items-center space-x-3">
            <span className={clsx('text-xs', theme.text.muted)}>
              Press Esc to close
            </span>

            <button
              onClick={onClose}
              className={clsx(
                'p-2 rounded-md',
                theme.text.muted,
                theme.interactive.ghost
              )}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Panel Content */}
        <div className="p-4 h-full overflow-y-auto">
          <div className={theme.spacing('loose')}>
            {/* Theme Section */}
            <div>
              <ThemeSelector />
            </div>

            {/* Section Divider */}
            <div className={clsx('border-t', theme.border.default)}></div>

            {/* Player Status Section */}
            <div>
              <h3
                className={clsx('text-md font-medium mb-3', theme.text.primary)}
              >
                Player Status
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="reawakening"
                    className={clsx(
                      'block text-sm font-medium mb-1',
                      theme.text.secondary
                    )}
                  >
                    Reawakening{' '}
                    <SaveIndicator show={saveIndicators.reawakening ?? false} />
                  </label>
                  <input
                    type="number"
                    id="reawakening"
                    min="0"
                    step="1"
                    value={getDisplayValue(
                      'reawakening',
                      settings.playerStatus.reawakening
                    )}
                    onChange={e =>
                      handleInputChange('reawakening', e.target.value)
                    }
                    onBlur={e =>
                      handleInputBlur(
                        'reawakening',
                        e.target.value,
                        updateReawakening
                      )
                    }
                    className={theme.input({ className: 'text-sm' })}
                  />
                </div>

                <div>
                  <label
                    htmlFor="rebirth"
                    className={clsx(
                      'block text-sm font-medium mb-1',
                      theme.text.secondary
                    )}
                  >
                    Rebirth{' '}
                    <SaveIndicator show={saveIndicators.rebirth ?? false} />
                  </label>
                  <input
                    type="number"
                    id="rebirth"
                    min="0"
                    max={maxRebirth}
                    step="1"
                    value={getDisplayValue(
                      'rebirth',
                      settings.playerStatus.rebirth
                    )}
                    onChange={e => handleInputChange('rebirth', e.target.value)}
                    onBlur={e =>
                      handleInputBlur('rebirth', e.target.value, updateRebirth)
                    }
                    className={theme.input({ className: 'text-sm' })}
                  />
                  {maxRebirth > 0 && (
                    <p className={clsx('text-xs mt-1', theme.text.muted)}>
                      Max: {maxRebirth}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section Divider */}
            <div className={clsx('border-t', theme.border.default)}></div>

            {/* House Multipliers Section */}
            <div>
              <h3
                className={clsx('text-md font-medium mb-3', theme.text.primary)}
              >
                House Multipliers
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(settings.houseMultipliers).map(key => (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className={clsx(
                        'block text-sm font-medium mb-1',
                        theme.text.secondary
                      )}
                    >
                      {formatMultiplierName(key as keyof HouseMultipliers)}{' '}
                      <SaveIndicator show={saveIndicators[key] ?? false} />
                    </label>
                    <input
                      type="number"
                      id={key}
                      min="1"
                      step="1"
                      value={getDisplayValue(
                        key,
                        settings.houseMultipliers[key as keyof HouseMultipliers]
                      )}
                      onChange={e => handleInputChange(key, e.target.value)}
                      onBlur={e =>
                        handleInputBlur(
                          key,
                          e.target.value,
                          val =>
                            updateHouseMultiplier(
                              key as keyof HouseMultipliers,
                              val
                            ),
                          1
                        )
                      }
                      className={theme.input({ className: 'text-sm' })}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section Divider */}
            <div className={clsx('border-t', theme.border.default)}></div>

            {/* Reset All Section */}
            <div>
              <h3
                className={clsx('text-md font-medium mb-3', theme.text.primary)}
              >
                Reset All Settings
              </h3>
              <button
                onClick={resetSettings}
                className={clsx(
                  'w-full px-3 py-2 text-sm font-medium rounded',
                  'bg-red-600 hover:bg-red-700 text-white'
                )}
              >
                Reset All Settings
              </button>
              <p className={clsx('text-xs mt-2 text-center', theme.text.muted)}>
                This will reset all your settings to default values
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

// Add display name for better debugging
SettingsPanel.displayName = 'SettingsPanel';

export default SettingsPanel;
