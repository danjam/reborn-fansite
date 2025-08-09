import { BaseItem } from "@/data/items";

export interface Ore extends BaseItem {}

export const ORES: readonly Ore[] = [
  {
    id: 'copper_ore',
    name: 'Copper Ore',
    icon: '🟠',
    sell_price: 1
  },
  {
    id: 'diamond_ore',
    name: 'Diamond Ore',
    icon: '🔵',
    sell_price: 35
  },
  {
    id: 'gold_ore',
    name: 'Gold Ore',
    icon: '🟡',
    sell_price: 1
  },
  {
    id: 'iron_ore',
    name: 'Iron Ore',
    icon: '🟡',
    sell_price: 1
  }
] as const;