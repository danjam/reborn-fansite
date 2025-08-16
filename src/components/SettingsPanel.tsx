// src/components/SettingsPanel.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';

import ToggleSwitch from '@/components/ToggleSwitch';
import { useDebounce, useStyles } from '@/hooks';
import { useGameSettings } from '@/hooks/useGameSettings';
import { HouseMultipliers } from '@/types/settings';
import { formatMultiplierName } from '@/utils/settingsHelpers';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const SettingsPanel = React.memo(
  ({ isOpen, onClose, darkMode, onToggleDarkMode }: SettingsPanelProps) => {
    const { styles } = useStyles();
    const panelRef = useRef<HTMLDivElement>(null);

    const {
      settings,
      maxRebirth,
      updateHouseMultiplier,
      updateReawakening,
      updateRebirth,
      resetPlayerStatus,
      resetSettings,
    } = useGameSettings();

    // Local editing state for inputs
    const [editingValues, setEditingValues] = useState<Record<string, string>>(
      {}
    );

    // Save indicators state
    const [saveIndicators, setSaveIndicators] = useState<
      Record<string, boolean>
    >({});

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
    const SaveIndicator = React.memo(({ show }: { show: boolean }) => (
      <span
        className={`text-xs transition-opacity duration-300 ${
          show ? 'opacity-100 text-green-400' : 'opacity-0'
        }`}
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
          className={`fixed inset-0 bg-black transition-opacity duration-200 z-40 ${
            isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
        />

        {/* Panel with slide animation */}
        <div
          ref={panelRef}
          className={`fixed top-0 right-0 h-full w-[420px] max-w-full ${styles.bg.secondary} shadow-xl z-50 transform transition-transform duration-200 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Panel Header */}
          <div
            className={`p-4 border-b ${styles.border} flex justify-between items-center`}
          >
            <h2 className={`text-lg font-semibold ${styles.text.primary}`}>
              Settings
            </h2>
            <div className="flex items-center space-x-3">
              <span className={`text-xs ${styles.text.muted}`}>
                Press Esc to close
              </span>

              <button
                onClick={onClose}
                className={`p-2 rounded-md transition-colors ${styles.text.muted} hover:${styles.text.primary}`}
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

          {/* Panel Content - Scrollable */}
          <div className="overflow-y-auto h-full pb-16">
            <div className="p-5 space-y-6">
              {/* Theme Section */}
              <div>
                <h3
                  className={`text-md font-medium mb-3 ${styles.text.primary}`}
                >
                  Appearance
                </h3>
                <div className={`p-3 rounded-md ${styles.bg.accent}`}>
                  <ToggleSwitch
                    checked={darkMode}
                    onChange={onToggleDarkMode}
                    label="Dark Mode"
                  />
                </div>
              </div>

              {/* Section Divider */}
              <div className={`border-t ${styles.border}`}></div>

              {/* Player Status Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`text-md font-medium ${styles.text.primary}`}>
                    Player Status
                  </h3>
                  <button
                    onClick={resetPlayerStatus}
                    className={`px-2 py-1 text-xs rounded transition-colors ${styles.button.secondary}`}
                  >
                    Reset
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* Reawakening Level */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor="reawakening"
                        className={`block text-sm font-medium ${styles.text.secondary}`}
                      >
                        Reawakening
                      </label>
                      <SaveIndicator
                        show={saveIndicators.reawakening ?? false}
                      />
                    </div>
                    <input
                      type="number"
                      id="reawakening"
                      min="0"
                      max="5"
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
                          updateReawakening,
                          0
                        )
                      }
                      className={`w-full px-2 py-1.5 text-sm border rounded ${styles.input}`}
                    />
                  </div>

                  {/* Rebirth Level */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        htmlFor="rebirth"
                        className={`block text-sm font-medium ${styles.text.secondary}`}
                      >
                        Rebirth
                      </label>
                      <SaveIndicator show={saveIndicators.rebirth ?? false} />
                    </div>
                    <input
                      type="number"
                      id="rebirth"
                      min="0"
                      max={maxRebirth > 0 ? maxRebirth : undefined}
                      step="1"
                      value={getDisplayValue(
                        'rebirth',
                        settings.playerStatus.rebirth
                      )}
                      onChange={e =>
                        handleInputChange('rebirth', e.target.value)
                      }
                      onBlur={e =>
                        handleInputBlur(
                          'rebirth',
                          e.target.value,
                          updateRebirth,
                          0
                        )
                      }
                      className={`w-full px-2 py-1.5 text-sm border rounded ${styles.input}`}
                    />
                  </div>
                </div>
              </div>

              {/* Section Divider */}
              <div className={`border-t ${styles.border}`}></div>

              {/* House Multipliers Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`text-md font-medium ${styles.text.primary}`}>
                    House Multipliers
                  </h3>
                  <span className={`text-xs ${styles.text.muted}`}>
                    Affects calculations
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    Object.keys(
                      settings.houseMultipliers
                    ) as (keyof HouseMultipliers)[]
                  ).map(key => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-1">
                        <label
                          htmlFor={key}
                          className={`block text-sm font-medium ${styles.text.secondary}`}
                        >
                          {formatMultiplierName(key)}
                        </label>
                        <SaveIndicator show={saveIndicators[key] ?? false} />
                      </div>
                      <input
                        type="number"
                        id={key}
                        min="1"
                        step="1"
                        value={getDisplayValue(
                          key,
                          settings.houseMultipliers[key]
                        )}
                        onChange={e => handleInputChange(key, e.target.value)}
                        onBlur={e =>
                          handleInputBlur(
                            key,
                            e.target.value,
                            val => updateHouseMultiplier(key, val),
                            1
                          )
                        }
                        className={`w-full px-2 py-1.5 text-sm border rounded ${styles.input}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Divider */}
              <div className={`border-t ${styles.border}`}></div>

              {/* Reset All Section */}
              <div>
                <h3
                  className={`text-md font-medium mb-3 ${styles.text.primary}`}
                >
                  Reset All Settings
                </h3>
                <button
                  onClick={resetSettings}
                  className={`w-full px-3 py-2 text-sm font-medium rounded transition-colors bg-red-600 hover:bg-red-700 text-white`}
                >
                  Reset All Settings
                </button>
                <p className={`text-xs mt-2 ${styles.text.muted} text-center`}>
                  This will reset all your settings to default values
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

// Add display name for better debugging
SettingsPanel.displayName = 'SettingsPanel';

export default SettingsPanel;
