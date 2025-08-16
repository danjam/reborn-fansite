// src/constants/settings.ts
import type {
  GameSettings,
  HouseMultipliers,
  PlayerStatus,
} from '@/types/settings';

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
