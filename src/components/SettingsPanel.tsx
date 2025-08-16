// src/components/SettingsPanel.tsx
import { useStyles } from '@/hooks';
import { useGameSettings } from '@/hooks/useGameSettings';
import { formatMultiplierName, HouseMultipliers } from '@/types/settings';
import { useCallback, useEffect, useRef, useState } from 'react';

// Custom debounce hook
const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

// Fancy animated toggle switch component
const ToggleSwitch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => {
  const { styles } = useStyles();

  return (
    <div className="flex items-center justify-between">
      <label className={`text-sm font-medium ${styles.text.secondary}`}>
        {label}
      </label>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
          checked ? 'bg-green-600' : 'bg-gray-400 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

// Auto-save indicator component
const SaveIndicator = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="flex items-center space-x-1 text-xs text-green-500 animate-in fade-in duration-300">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span>Saved</span>
    </div>
  );
};

const SettingsPanel = ({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
}: SettingsPanelProps) => {
  const { styles } = useStyles();
  const panelRef = useRef<HTMLDivElement>(null);
  const [saveIndicators, setSaveIndicators] = useState<Record<string, boolean>>(
    {}
  );
  const saveTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  // Local editing state for inputs (allows temporary invalid states)
  const [editingValues, setEditingValues] = useState<Record<string, string>>(
    {}
  );

  const {
    settings,
    maxRebirth,
    updateHouseMultiplier,
    updateReawakening,
    updateRebirth,
    resetSettings,
    resetHouseMultipliers,
    resetPlayerStatus,
  } = useGameSettings();

  // House multiplier keys for rendering
  const multiplierKeys: (keyof HouseMultipliers)[] = [
    'bed',
    'forge',
    'cauldron',
    'anvil',
    'hammer',
    'pillow',
    'orcs',
    'diogo',
    'wishingWell',
  ];

  // Debounced save indicator function
  const showSaveIndicator = useCallback((key: string) => {
    // Clear any existing timeout for this key
    if (saveTimeouts.current[key]) {
      clearTimeout(saveTimeouts.current[key]);
    }

    // Set the indicator immediately
    setSaveIndicators(prev => ({ ...prev, [key]: true }));

    // Set a new timeout to hide it after delay
    saveTimeouts.current[key] = setTimeout(() => {
      setSaveIndicators(prev => ({ ...prev, [key]: false }));
      delete saveTimeouts.current[key];
    }, 1500);
  }, []);

  // Debounced save indicator trigger (prevents rapid flashing)
  const debouncedShowSaveIndicator = useDebounce(showSaveIndicator, 300);

  // Helper function to get display value (editing value or actual value)
  const getDisplayValue = useCallback(
    (key: string, actualValue: number | undefined) => {
      if (editingValues[key] !== undefined) {
        return editingValues[key];
      }
      return actualValue !== undefined ? actualValue.toString() : '0';
    },
    [editingValues]
  );

  // Handle input change (allows temporary invalid states)
  const handleInputChange = useCallback((key: string, value: string) => {
    setEditingValues(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handle input blur (finalize the value)
  const handleInputBlur = useCallback(
    (
      key: string,
      value: string,
      updateFn: (val: number) => void,
      min = 0,
      max?: number
    ) => {
      const numValue = parseInt(value) || min;
      const clampedValue =
        max !== undefined
          ? Math.min(Math.max(numValue, min), max)
          : Math.max(numValue, min);

      updateFn(clampedValue);
      debouncedShowSaveIndicator(key);

      // Clear editing state
      setEditingValues(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    },
    [debouncedShowSaveIndicator]
  );

  // Cleanup timeouts on unmount
  useEffect(() => {
    // Copy ref value locally to avoid stale closure
    const timeoutsRef = saveTimeouts;
    return () => {
      const timeouts = timeoutsRef.current;
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Clear editing values when panel closes
  useEffect(() => {
    if (!isOpen) {
      setEditingValues({});
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }

    return; // Explicitly return undefined when isOpen is false
  }, [isOpen, onClose]);

  // Handle prevent page scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop with fade animation */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-200 ease-out z-40 ${
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
              <h3 className={`text-md font-medium mb-3 ${styles.text.primary}`}>
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
                    <SaveIndicator show={saveIndicators.reawakening ?? false} />
                  </div>
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
                    max={maxRebirth}
                    step="1"
                    value={getDisplayValue(
                      'rebirth',
                      settings.playerStatus.rebirth
                    )}
                    onChange={e => handleInputChange('rebirth', e.target.value)}
                    onBlur={e =>
                      handleInputBlur(
                        'rebirth',
                        e.target.value,
                        updateRebirth,
                        0,
                        maxRebirth !== undefined ? maxRebirth : undefined
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
                <button
                  onClick={resetHouseMultipliers}
                  className={`px-2 py-1 text-xs rounded transition-colors ${styles.button.secondary}`}
                >
                  Reset All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {multiplierKeys.map(key => (
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
              <h3 className={`text-md font-medium mb-3 ${styles.text.primary}`}>
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
};

export default SettingsPanel;
