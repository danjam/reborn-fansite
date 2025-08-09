import { BaseItem } from "./items";

export interface Vegetable extends BaseItem {
    grow_time: number;
    buy_price: number | null;
}

export const VEGETABLES: readonly Vegetable[] = [
  {
    id: 'broccoli',
    name: 'Broccoli',
    icon: '🥦',
    sell_price: 1,
    grow_time: 240,
    buy_price: 2,
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    icon: '🥬',
    sell_price: 1,
    grow_time: 360,
    buy_price: 2,
  },
  {
    id: 'carrot',
    name: 'Carrot',
    icon: '🥕',
    sell_price: 1,
    grow_time: 80,
    buy_price: 2,
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower',
    icon: '🥦',
    sell_price: 1,
    grow_time: 160,
    buy_price: 2,
  },
  {
    id: 'eggplant',
    name: 'Eggplant',
    icon: '🍆',
    sell_price: 1,
    grow_time: 120,
    buy_price: 2,
  },
  {
    id: 'onion',
    name: 'Onion',
    icon: '🧅',
    sell_price: 1,
    grow_time: 96,
    buy_price: 2,
  },
  {
    id: 'potato',
    name: 'Potato',
    icon: '🥔',
    sell_price: 1,
    grow_time: 16,
    buy_price: 2,
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    icon: '🎃',
    sell_price: 1,
    grow_time: 240,
    buy_price: 2,
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    icon: '🍓',
    sell_price: 1,
    grow_time: 40,
    buy_price: 2,
  },
  {
    id: 'turnip',
    name: 'Turnip',
    icon: '🥔',
    sell_price: 1,
    grow_time: 48,
    buy_price: 2,
  },
] as const;