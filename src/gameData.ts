import { GameDataService } from './services/GameDataService';
import { Monster, Potion, Container, Drop, Vegetable, Bar, Ore, Equipment } from './classes';
import { MONSTERS_DATA } from './data/monsters';
import { POTIONS } from './data/potions';
import { CONTAINERS } from './data/containers';
import { DROPS } from './data/drops';
import { VEGETABLES } from './data/vegetables';
import { BARS } from './data/bars';
import { ORES } from './data/ores';
import { EQUIPMENT } from './data/equipment';

/**
 * Global game data service instance
 * Single source of truth for all game object data
 */
export const gameData = new GameDataService(
  { data: MONSTERS_DATA, itemClass: Monster },
  { data: POTIONS, itemClass: Potion },
  { data: CONTAINERS, itemClass: Container },
  { data: DROPS, itemClass: Drop },
  { data: VEGETABLES, itemClass: Vegetable },
  { data: BARS, itemClass: Bar },
  { data: ORES, itemClass: Ore },
  { data: EQUIPMENT, itemClass: Equipment },
);

// Export types for convenience
export type { Monster, Villager, Container, Drop, Vegetable, Bar, Ore, Equipment, Potion } from './classes';
export type { GameObject } from './types/GameObject';