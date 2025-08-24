import {
  Container,
  Crystal,
  Drop,
  Equipment,
  Forest,
  Monster,
  Potion,
  Smithing,
  Vegetable,
} from '@/classes';
import { CONTAINERS_DATA } from '@/data/containers';
import { CRYSTALS_DATA } from '@/data/crystals';
import { DROPS_DATA } from '@/data/drops';
import { EQUIPMENT_DATA } from '@/data/equipment';
import { FOREST_DATA } from '@/data/forest';
import { MONSTERS_DATA } from '@/data/monsters';
import { POTIONS_DATA } from '@/data/potions';
import { SMITHING_DATA } from '@/data/smithing';
import { VEGETABLES_DATA } from '@/data/vegetables';
import { GameDataService } from '@/services/GameDataService';

/**
 * Global game data service instance
 * Single source of truth for all game object data
 */
export const gameData = new GameDataService(
  { data: MONSTERS_DATA, itemClass: Monster },
  { data: POTIONS_DATA, itemClass: Potion },
  { data: CONTAINERS_DATA, itemClass: Container },
  { data: CRYSTALS_DATA, itemClass: Crystal },
  { data: DROPS_DATA, itemClass: Drop },
  { data: VEGETABLES_DATA, itemClass: Vegetable },
  { data: EQUIPMENT_DATA, itemClass: Equipment },
  { data: SMITHING_DATA, itemClass: Smithing },
  { data: FOREST_DATA, itemClass: Forest }
);

// Export types for convenience
export type {
  Container,
  Crystal,
  Drop,
  Equipment,
  Forest,
  Monster,
  Potion,
  Smithing,
  Vegetable,
} from '@/classes';
export type { GameObject } from '@/types/gameObject';
