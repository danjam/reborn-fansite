import { copper_ore, diamond_ore, gold_ore, iron_ore } from '@/assets/img';
import { BaseItem } from '@/types/Item';

export type Ore = BaseItem;

export const ORES: readonly Ore[] = [
  {
    id: 'copper_ore',
    name: 'Copper Ore',
    icon: copper_ore,
    sell_price: 1,
    sources: [{ type: 'mining' }],
  },
  {
    id: 'diamond_ore',
    name: 'Diamond Ore',
    icon: diamond_ore,
    sell_price: 35,
    sources: [{ type: 'mining' }, { type: 'treasure' }],
  },
  {
    id: 'gold_ore',
    name: 'Gold Ore',
    icon: gold_ore,
    sell_price: 1,
    sources: [{ type: 'mining' }],
  },
  {
    id: 'iron_ore',
    name: 'Iron Ore',
    icon: iron_ore,
    sell_price: 1,
    sources: [{ type: 'mining' }],
  },
] as const;
