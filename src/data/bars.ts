import type { CraftableItem } from '@/data/items';

export interface Bar extends CraftableItem {}

export const BARS: readonly Bar[] = [
  {
    id: 'copper_bar',
    name: 'Copper Bar',
    icon: '🟠',
    sell_price: 1,
    materials: [
      { id: 'copper_ore', quantity: 5 }
    ]
  },
  {
    id: 'diamond_bar',
    name: 'Diamond Bar',
    icon: '🔵',
    sell_price: 210,
    materials: [
      { id: 'diamond_ore', quantity: 5 }
    ]
  },
  {
    id: 'gold_bar',
    name: 'Gold Bar',
    icon: '🟡',
    sell_price: 1,
    materials: [
      { id: 'gold_ore', quantity: 5 }
    ]
  },
  {
    id: 'iron_bar',
    name: 'Iron Bar',
    icon: '🟡',
    sell_price: 1,
    materials: [
      { id: 'iron_ore', quantity: 5 }
    ]
  }
] as const;