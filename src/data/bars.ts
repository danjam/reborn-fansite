import { copper_bar, diamond_bar, gold_bar, iron_bar } from '@/assets/img';
import type { CraftableItem } from '@/types/Item';

export type Bar = CraftableItem;

export const BARS: readonly Bar[] = [
  {
    id: 'copper_bar',
    name: 'Copper Bar',
    icon: copper_bar,
    sell_price: 1,
    materials: [{ id: 'copper_ore', quantity: 5 }],
  },
  {
    id: 'diamond_bar',
    name: 'Diamond Bar',
    icon: diamond_bar,
    sell_price: 210,
    materials: [{ id: 'diamond_ore', quantity: 5 }],
  },
  {
    id: 'gold_bar',
    name: 'Gold Bar',
    icon: gold_bar,
    sell_price: 1,
    materials: [{ id: 'gold_ore', quantity: 5 }],
  },
  {
    id: 'iron_bar',
    name: 'Iron Bar',
    icon: iron_bar,
    sell_price: 1,
    materials: [{ id: 'iron_ore', quantity: 5 }],
  },
] as const;
