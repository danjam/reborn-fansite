// src/pages/MySettingsPage.tsx
import PageHeader from '@/components/PageHeader';
import { useStyles } from '@/hooks';
import { useGameSettings } from '@/hooks/useGameSettings';
import { formatMultiplierName, HouseMultipliers } from '@/types/settings';

const MySettingsPage = () => {
  const { styles } = useStyles();

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
      <PageHeader
        title="My Settings"
        description="Keep your game progress and multipliers up to date"
      />

      {/* House Multipliers Section */}
      <div className={`${styles.card} mb-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${styles.text.primary}`}>
            House Multipliers
          </h2>
          <button
            onClick={resetHouseMultipliers}
            className={`${styles.button.secondary} text-sm`}
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {multiplierKeys.map(key => (
            <div key={key} className="space-y-2">
              <label
                htmlFor={key}
                className={`block text-sm font-medium ${styles.text.secondary}`}
              >
                {formatMultiplierName(key)}
              </label>
              <input
                type="number"
                id={key}
                min="1"
                step="1"
                value={settings.houseMultipliers[key]}
                onChange={e =>
                  updateHouseMultiplier(key, parseInt(e.target.value) || 1)
                }
                className={`w-full px-3 py-2 border rounded-md ${styles.input}`}
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
            className={`${styles.button.secondary} text-sm`}
          >
            Reset Status
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reawakening Level */}
          <div className="space-y-2">
            <label
              htmlFor="reawakening"
              className={`block text-sm font-medium ${styles.text.secondary}`}
            >
              Reawakening Level
            </label>
            <input
              type="number"
              id="reawakening"
              min="0"
              step="1"
              value={settings.playerStatus.reawakening}
              onChange={e => updateReawakening(parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-md ${styles.input}`}
            />
            <p className={`text-xs ${styles.text.muted}`}>
              Your current reawakening level
            </p>
          </div>

          {/* Rebirth Level */}
          <div className="space-y-2">
            <label
              htmlFor="rebirth"
              className={`block text-sm font-medium ${styles.text.secondary}`}
            >
              Rebirth Level
            </label>
            <input
              type="number"
              id="rebirth"
              min="0"
              max={maxRebirth}
              step="1"
              value={settings.playerStatus.rebirth}
              onChange={e => updateRebirth(parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-md ${styles.input}`}
            />
            <p className={`text-xs ${styles.text.muted}`}>
              Current rebirth level (max: {maxRebirth})
            </p>
          </div>
        </div>
      </div>

      {/* Reset All Section */}
      <div className={`${styles.card}`}>
        <h2 className={`text-xl font-semibold mb-4 ${styles.text.primary}`}>
          Reset All Settings
        </h2>
        <p className={`mb-4 ${styles.text.secondary}`}>
          This will reset all your settings to their default values. This action
          cannot be undone.
        </p>
        <button
          onClick={resetSettings}
          className={`${styles.button.secondary} font-medium bg-red-600 hover:bg-red-700 text-white border-red-600`}
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
};

export default MySettingsPage;
