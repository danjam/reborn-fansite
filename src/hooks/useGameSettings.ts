// src/hooks/useGameSettings.ts
import { useCallback, useEffect, useState } from 'react';

import {
  DEFAULT_SETTINGS,
  GameSettings,
  HouseMultipliers,
  getMaxRebirth,
} from '../types/settings';

const STORAGE_KEY = 'reborn-game-settings';

const loadSettingsFromStorage = (): GameSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new settings that might be added
      return {
        houseMultipliers: {
          ...DEFAULT_SETTINGS.houseMultipliers,
          ...parsed.houseMultipliers,
        },
        playerStatus: {
          ...DEFAULT_SETTINGS.playerStatus,
          ...parsed.playerStatus,
        },
      };
    }
  } catch (error) {
    console.warn('Failed to load settings from localStorage:', error);
  }
  return DEFAULT_SETTINGS;
};

const saveSettingsToStorage = (settings: GameSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to localStorage:', error);
  }
};

export const useGameSettings = () => {
  const [settings, setSettings] = useState<GameSettings>(
    loadSettingsFromStorage
  );

  // Save to localStorage whenever settings change
  useEffect(() => {
    saveSettingsToStorage(settings);
  }, [settings]);

  // Update a house multiplier
  const updateHouseMultiplier = useCallback(
    (key: keyof HouseMultipliers, value: number) => {
      // Ensure minimum value of 1
      const clampedValue = Math.max(1, value);

      setSettings(prev => ({
        ...prev,
        houseMultipliers: {
          ...prev.houseMultipliers,
          [key]: clampedValue,
        },
      }));
    },
    []
  );

  // Update reawakening level
  const updateReawakening = useCallback((value: number) => {
    // Clamp between 0 and 5
    const clampedValue = Math.max(0, Math.min(5, value));

    setSettings(prev => {
      const newSettings = {
        ...prev,
        playerStatus: {
          ...prev.playerStatus,
          reawakening: clampedValue,
        },
      };

      // Adjust rebirth if it exceeds the new max
      const maxRebirth = getMaxRebirth(clampedValue);
      if (maxRebirth > 0 && newSettings.playerStatus.rebirth > maxRebirth) {
        newSettings.playerStatus.rebirth = maxRebirth;
      }

      return newSettings;
    });
  }, []);

  // Update rebirth level
  const updateRebirth = useCallback((value: number) => {
    setSettings(prev => {
      const maxRebirth = getMaxRebirth(prev.playerStatus.reawakening);

      // Clamp between 0 and the max for current reawakening level
      let clampedValue = Math.max(0, value);
      if (maxRebirth > 0) {
        clampedValue = Math.min(clampedValue, maxRebirth);
      }

      return {
        ...prev,
        playerStatus: {
          ...prev.playerStatus,
          rebirth: clampedValue,
        },
      };
    });
  }, []);

  // Reset all settings to defaults
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  // Reset just house multipliers
  const resetHouseMultipliers = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      houseMultipliers: DEFAULT_SETTINGS.houseMultipliers,
    }));
  }, []);

  // Reset just player status
  const resetPlayerStatus = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      playerStatus: DEFAULT_SETTINGS.playerStatus,
    }));
  }, []);

  // Get the current max rebirth for the current reawakening level
  const maxRebirth = getMaxRebirth(settings.playerStatus.reawakening);

  return {
    settings,
    maxRebirth,
    updateHouseMultiplier,
    updateReawakening,
    updateRebirth,
    resetSettings,
    resetHouseMultipliers,
    resetPlayerStatus,
  };
};
