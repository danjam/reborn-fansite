import { BaseItem } from './items';

export interface Vegetable extends BaseItem {
  grow_time: number;
  buy_price: number | null;
}

export const VEGETABLES: readonly Vegetable[] = [
  {
    id: 'broccoli',
    name: 'Broccoli',
    icon: '🥦',
    sell_price: 0,
    grow_time: 240,
    buy_price: null,
    sources: [{ type: 'farm' }],
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    icon: '🥬',
    sell_price: 900,
    grow_time: 360,
    buy_price: null,
    sources: [{ type: 'farm' }],
  },
  {
    id: 'carrot',
    name: 'Carrot',
    icon: '🥕',
    sell_price: 300,
    grow_time: 80,
    buy_price: 100,
    sources: [{ type: 'farm' }, { type: 'shop', id: 'shelbs' }],
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower',
    icon: '🥦',
    sell_price: 200,
    grow_time: 160,
    buy_price: 200,
    sources: [{ type: 'farm' }, { type: 'shop', id: 'shelbs' }],
  },
  {
    id: 'eggplant',
    name: 'Eggplant',
    icon: '🍆',
    sell_price: 0,
    grow_time: 120,
    buy_price: null,
    sources: [{ type: 'farm' }],
  },
  {
    id: 'onion',
    name: 'Onion',
    icon: '🧅',
    sell_price: 120,
    grow_time: 96,
    buy_price: 120,
    sources: [{ type: 'farm' }, { type: 'shop', id: 'shelbs' }],
  },
  {
    id: 'potato',
    name: 'Potato',
    icon: '🥔',
    sell_price: 20,
    grow_time: 16,
    buy_price: 20,
    sources: [{ type: 'farm' }, { type: 'shop', id: 'shelbs' }],
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    icon: '🎃',
    sell_price: 300,
    grow_time: 240,
    buy_price: 300,
    sources: [{ type: 'farm' }, { type: 'shop', id: 'shelbs' }],
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    icon: '🍓',
    sell_price: 50,
    grow_time: 40,
    buy_price: 50,
    sources: [{ type: 'farm' }, { type: 'shop', id: 'shelbs' }],
  },
  {
    id: 'turnip',
    name: 'Turnip',
    icon: '🥔',
    sell_price: 60,
    grow_time: 48,
    buy_price: 60,
    sources: [{ type: 'farm' }, { type: 'shop', id: 'shelbs' }],
  },
] as const;
