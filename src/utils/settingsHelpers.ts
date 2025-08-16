// src/utils/settingsHelpers.ts
import { REBIRTH_LIMITS } from '@/constants/settings';
import type { HouseMultipliers } from '@/types/settings';

// Helper function to get max rebirth for a given reawakening level
export const getMaxRebirth = (reawakening: number): number => {
  return REBIRTH_LIMITS[reawakening] ?? 0;
};

// Helper function to format multiplier names for display
export const formatMultiplierName = (key: keyof HouseMultipliers): string => {
  const nameMap: Record<keyof HouseMultipliers, string> = {
    bed: 'Bed',
    forge: 'Forge',
    cauldron: 'Cauldron',
    anvil: 'Anvil',
    hammer: 'Hammer',
    pillow: 'Pillow',
    orcs: 'Orcs',
    diogo: 'Diogo',
    wishingWell: 'Wishing Well',
  };

  return nameMap[key];
};
