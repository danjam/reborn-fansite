import { GameDataService } from './services/GameDataService';
import { Monster, Potion } from './classes';
import { MONSTERS_DATA } from './data/monsters';
import { POTIONS } from './data/potions';
// import itemsData from './data/items';
// import villagersData from './data/villagers';

/**
 * Global game data service instance
 * Single source of truth for all game object data
 */
export const gameData = new GameDataService(
  { data: MONSTERS_DATA, itemClass: Monster },
  { data: POTIONS, itemClass: Potion },
//   { data: itemsData, itemClass: Item },
//   { data: villagersData, itemClass: Villager }
);

// Export types for convenience
export type { Monster, Villager } from './classes';
export type { GameObject } from './types/GameObject';