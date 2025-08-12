// src/constants/gameObjectTypes.ts

export const GAME_OBJECT_TYPES = {
  MONSTERS: 'monsters',
  POTIONS: 'potions',
  VEGETABLES: 'vegetables',
  CONTAINERS: 'containers',
  DROPS: 'drops',
  BARS: 'bars',
  ORES: 'ores',
} as const;

export type GameObjectType = typeof GAME_OBJECT_TYPES[keyof typeof GAME_OBJECT_TYPES];

export const VALID_GAME_OBJECT_TYPES: GameObjectType[] = Object.values(GAME_OBJECT_TYPES);

// Special groupings for certain features
export const SMITHING_TYPES: GameObjectType[] = [GAME_OBJECT_TYPES.BARS, GAME_OBJECT_TYPES.ORES];

// Type mappings for routes and displays
export const TYPE_TO_ROUTE_MAP: Record<GameObjectType, string> = {
  [GAME_OBJECT_TYPES.MONSTERS]: '/reference/monsters',
  [GAME_OBJECT_TYPES.POTIONS]: '/reference/potions',
  [GAME_OBJECT_TYPES.VEGETABLES]: '/reference/vegetables',
  [GAME_OBJECT_TYPES.CONTAINERS]: '/reference/containers',
  [GAME_OBJECT_TYPES.DROPS]: '/reference/drops',
  [GAME_OBJECT_TYPES.BARS]: '/reference/smithing',
  [GAME_OBJECT_TYPES.ORES]: '/reference/smithing',
};

export const TYPE_TO_DISPLAY_MAP: Record<GameObjectType, string> = {
  [GAME_OBJECT_TYPES.MONSTERS]: 'Monsters',
  [GAME_OBJECT_TYPES.POTIONS]: 'Potions',
  [GAME_OBJECT_TYPES.VEGETABLES]: 'Vegetables',
  [GAME_OBJECT_TYPES.CONTAINERS]: 'Containers',
  [GAME_OBJECT_TYPES.DROPS]: 'Drops',
  [GAME_OBJECT_TYPES.BARS]: 'Smithing',
  [GAME_OBJECT_TYPES.ORES]: 'Smithing',
};