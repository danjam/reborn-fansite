// src/pages/MySettingsPage.tsx
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { useGameSettings } from '@/hooks/useGameSettings';
import { formatMultiplierName, HouseMultipliers } from '@/types/settings';
import { createStyles } from '@/utils/styles';

const MySettingsPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

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

  return (
    <div className={`max-w-4xl mx-auto p-6 min-h-screen ${styles.bg.primary}`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${styles.text.accent}`}>
          My Settings
        </h1>
        <p className={`mt-2 ${styles.text.secondary}`}>
          Keep your game progress and multipliers up to date
        </p>
      </div>

      {/* House Multipliers Section */}
      <div className={`${styles.card} mb-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${styles.text.primary}`}>
            House Multipliers
          </h2>
          <button
            onClick={resetHouseMultipliers}
            className={styles.button.secondary}
          >
            Reset Multipliers
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {multiplierKeys.map(key => (
            <div key={key}>
              <label
                className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}
              >
                {formatMultiplierName(key)}
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={settings.houseMultipliers[key]}
                onChange={e =>
                  updateHouseMultiplier(key, parseInt(e.target.value) || 1)
                }
                className={styles.input}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Player Status Section */}
      <div className={`${styles.card} mb-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${styles.text.primary}`}>
            Player Status
          </h2>
          <button
            onClick={resetPlayerStatus}
            className={styles.button.secondary}
          >
            Reset Status
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}
            >
              Reawakening Level
              <span className={`text-xs ${styles.text.muted} ml-2`}>(0-5)</span>
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="1"
              value={settings.playerStatus.reawakening}
              onChange={e => updateReawakening(parseInt(e.target.value) || 0)}
              className={styles.input}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${styles.text.secondary}`}
            >
              Rebirth Level
              {maxRebirth > 0 && (
                <span className={`text-xs ${styles.text.muted} ml-2`}>
                  (0-{maxRebirth})
                </span>
              )}
              {maxRebirth === 0 && (
                <span className={`text-xs ${styles.text.muted} ml-2`}>
                  (No rebirths available at this reawakening level)
                </span>
              )}
            </label>
            <input
              type="number"
              min="0"
              max={maxRebirth || undefined}
              step="1"
              value={settings.playerStatus.rebirth}
              onChange={e => updateRebirth(parseInt(e.target.value) || 0)}
              disabled={maxRebirth === 0}
              className={`${styles.input} ${maxRebirth === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>

        {/* Current Status Display */}
        <div
          className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        >
          <h3 className={`text-sm font-medium mb-2 ${styles.text.secondary}`}>
            Current Status
          </h3>
          <p className={`text-sm ${styles.text.primary}`}>
            Reawakening {settings.playerStatus.reawakening}, Rebirth{' '}
            {settings.playerStatus.rebirth}
            {maxRebirth > 0 && (
              <span className={styles.text.muted}>
                {' '}
                ({settings.playerStatus.rebirth} of {maxRebirth} rebirths)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Global Reset */}
      <div className="flex justify-center">
        <button
          onClick={resetSettings}
          className={`${styles.button.secondary} px-6 py-2 border-2 ${
            darkMode
              ? 'border-red-400 text-red-400 hover:bg-red-400 hover:text-gray-900'
              : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
          }`}
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
};

export default MySettingsPage;
