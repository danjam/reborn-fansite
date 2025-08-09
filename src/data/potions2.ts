import { CraftableItem } from "./items";

export interface Potion extends CraftableItem {
  effect: string;
}

export const POTIONS: readonly Potion[] = [
  {
    id: 'agility',
    name: 'Agility',
    icon: '🏃',
    effect: 'Agility +10',
    materials: [
      { id: 'snake_venom_purple', quantity: 40 },
      { id: 'strawberry', quantity: 12 },
      { id: 'bottle_small', quantity: 1 },
    ],
    sell_price: 100,
  },
  {
    id: 'defence',
    name: 'Defence',
    icon: '🛡️',
    effect: 'Defence +10',
    materials: [
      { id: 'bat_wing_purple', quantity: 200 },
      { id: 'onion', quantity: 5 },
      { id: 'bottle_small', quantity: 1 },
    ],
    sell_price: 100,
  },
  {
    id: 'efficiency',
    name: 'Efficiency',
    icon: '⚡',
    effect: 'Efficiency +10',
    materials: [
      { id: 'orb_red', quantity: 100 },
      { id: 'potato', quantity: 30 },
      { id: 'bottle_small', quantity: 1 },
    ],
    sell_price: 100,
  },
  {
    id: 'health',
    name: 'Health',
    icon: '❤️',
    effect: 'Health +10',
    materials: [
      { id: 'slime_egg_red', quantity: 100 },
      { id: 'carrot', quantity: 3 },
      { id: 'bottle_small', quantity: 1 },
    ],
    sell_price: 100,
  },
  {
    id: 'health_m',
    name: 'Health (M)',
    icon: '💖',
    effect: 'Health +20',
    materials: [
      { id: 'slime_egg_blue', quantity: 10 },
      { id: 'eggplant', quantity: 6 },
      { id: 'empty_crystal', quantity: 10 },
    ],
    sell_price: 100,
  },
  {
    id: 'precision',
    name: 'Precision',
    icon: '🎯',
    effect: 'Precision +10',
    materials: [
      { id: 'mushroom_brown', quantity: 250 },
      { id: 'pumpkin', quantity: 2 },
      { id: 'bottle_small', quantity: 1 },
    ],
    sell_price: 100,
  },
  {
    id: 'precision_m',
    name: 'Precision (M)',
    icon: '🔍',
    effect: 'Precision +20',
    materials: [
      { id: 'mushroom_purple', quantity: 25 },
      { id: 'cabbage', quantity: 4 },
      { id: 'empty_crystal', quantity: 10 },
    ],
    sell_price: 100,
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: '💨',
    effect: 'Speed +10',
    materials: [
      { id: 'rat_tail_purple', quantity: 300 },
      { id: 'cauliflower', quantity: 3 },
      { id: 'bottle_small', quantity: 1 },
    ],
    sell_price: 100,
  },
  {
    id: 'speed_m',
    name: 'Speed (M)',
    icon: '🚀',
    effect: 'Speed +20',
    materials: [
      { id: 'rat_tail_red', quantity: 30 },
      { id: 'broccoli', quantity: 6 },
      { id: 'empty_crystal', quantity: 10 },
    ],
    sell_price: 100,
  },
  {
    id: 'strength',
    name: 'Strength',
    icon: '💪',
    effect: 'Strength +10',
    materials: [
      { id: 'bone', quantity: 50 },
      { id: 'turnip', quantity: 10 },
      { id: 'bottle_small', quantity: 1 },
    ],
    sell_price: 100,
  },
  {
    id: 'xp_boost',
    name: 'XP Boost',
    icon: '⭐',
    effect: 'XP +100% for 10 floors',
    materials: [],
    sell_price: 0,
  },
] as const;