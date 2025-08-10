import {
  agility,
  defence,
  efficiency,
  exp_boost,
  health,
  health_m,
  precision,
  precision_m,
  speed,
  speed_m,
  strength,
} from '@/assets/img';
import { CraftableItem } from './items';

export interface Potion extends CraftableItem {
  effect: string;
}

export const POTIONS: readonly Potion[] = [
  {
    id: 'agility',
    name: 'Agility',
    icon: agility,
    effect: 'Agility +10',
    materials: [
      { id: 'bottle_small', quantity: 1 },
      { id: 'strawberry', quantity: 12 },
      { id: 'snake_venom_purple', quantity: 40 },
    ],
    sell_price: 2938,
  },
  {
    id: 'defence',
    name: 'Defence',
    icon: defence,
    effect: 'Defence +10',
    materials: [
      { id: 'bottle_small', quantity: 1 },
      { id: 'onion', quantity: 5 },
      { id: 'bat_wing_purple', quantity: 200 },
    ],
    sell_price: 3000,
  },
  {
    id: 'efficiency',
    name: 'Efficiency',
    icon: efficiency,
    effect: 'Efficiency +10',
    materials: [
      { id: 'bottle_small', quantity: 1 },
      { id: 'potato', quantity: 30 },
      { id: 'orb_red', quantity: 100 },
    ],
    sell_price: 2750,
  },
  {
    id: 'health',
    name: 'Health',
    icon: health,
    effect: 'Health +10',
    materials: [
      { id: 'bottle_small', quantity: 1 },
      { id: 'carrot', quantity: 3 },
      { id: 'slime_egg_red', quantity: 100 },
    ],
    sell_price: 1750,
  },
  {
    id: 'health_m',
    name: 'Health (M)',
    icon: health_m,
    effect: 'Health +20',
    materials: [
      { id: 'crystal_empty', quantity: 10 },
      { id: 'eggplant', quantity: 6 },
      { id: 'slime_egg_blue', quantity: 10 },
    ],
    sell_price: 3625,
  },
  {
    id: 'precision',
    name: 'Precision',
    icon: precision,
    effect: 'Precision +10',
    materials: [
      { id: 'bottle_small', quantity: 1 },
      { id: 'pumpkin', quantity: 2 },
      { id: 'mushroom_brown', quantity: 250 },
    ],
    sell_price: 2938,
  },
  {
    id: 'precision_m',
    name: 'Precision (M)',
    icon: precision_m,
    effect: 'Precision +20',
    materials: [
      { id: 'crystal_empty', quantity: 10 },
      { id: 'cabbage', quantity: 4 },
      { id: 'mushroom_purple', quantity: 25 },
    ],
    sell_price: 6688,
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: speed,
    effect: 'Speed +10',
    materials: [
      { id: 'bottle_small', quantity: 1 },
      { id: 'cauliflower', quantity: 3 },
      { id: 'rat_tail_purple', quantity: 300 },
    ],
    sell_price: 2750,
  },
  {
    id: 'speed_m',
    name: 'Speed (M)',
    icon: speed_m,
    effect: 'Speed +20',
    materials: [
      { id: 'crystal_empty', quantity: 10 },
      { id: 'broccoli', quantity: 6 },
      { id: 'rat_tail_red', quantity: 30 },
    ],
    sell_price: 6500,
  },
  {
    id: 'strength',
    name: 'Strength',
    icon: strength,
    effect: 'Strength +10',
    materials: [
      { id: 'bottle_small', quantity: 1 },
      { id: 'turnip', quantity: 10 },
      { id: 'bone', quantity: 50 },
    ],
    sell_price: 2438,
  },
  {
    id: 'xp_boost',
    name: 'XP Boost',
    icon: exp_boost,
    effect: 'XP +100% for 10 floors',
    materials: [],
    sell_price: null,
  },
] as const;
