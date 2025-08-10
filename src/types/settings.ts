// src/types/settings.ts

export interface HouseMultipliers {
  bed: number;
  forge: number;
  cauldron: number;
  anvil: number;
  hammer: number;
  pillow: number;
  orcs: number;
  diogo: number;
  wishingWell: number;
}

export interface PlayerStatus {
  reawakening: number;
  rebirth: number;
}

export interface GameSettings {
  houseMultipliers: HouseMultipliers;
  playerStatus: PlayerStatus;
}

export const DEFAULT_HOUSE_MULTIPLIERS: HouseMultipliers = {
  bed: 1,
  forge: 1,
  cauldron: 1,
  anvil: 1,
  hammer: 1,
  pillow: 1,
  orcs: 1,
  diogo: 1,
  wishingWell: 1,
};

export const DEFAULT_PLAYER_STATUS: PlayerStatus = {
  reawakening: 0,
  rebirth: 0,
};

export const DEFAULT_SETTINGS: GameSettings = {
  houseMultipliers: DEFAULT_HOUSE_MULTIPLIERS,
  playerStatus: DEFAULT_PLAYER_STATUS,
};

// Rebirth limits based on reawakening level
export const REBIRTH_LIMITS: Record<number, number> = {
  0: 50,
  1: 60,
  2: 70,
  3: 80,
  4: 90,
  5: 0, // May change later
};

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
