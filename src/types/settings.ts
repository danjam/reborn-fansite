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

export interface OtherSettings {
  wishes: number;
}

export interface GameSettings {
  houseMultipliers: HouseMultipliers;
  playerStatus: PlayerStatus;
  other: OtherSettings;
}
