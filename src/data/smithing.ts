import {
  copper_bar,
  copper_ore,
  defimg,
  diamond_bar,
  diamond_ore,
  gold_bar,
  gold_ore,
  iron_bar,
  iron_ore,
} from '@/assets/img';
import type { BaseItem, Material } from '@/types/Item';

export interface Smithing extends BaseItem {
  type: 'ore' | 'bar' | 'plate';
  materials?: Material[];
}

export const SMITHING_DATA: readonly Smithing[] = [
  // Ores
  {
    id: 'copper_ore',
    name: 'Copper Ore',
    icon: copper_ore,
    sell_price: 1,
    type: 'ore',
    sources: [{ type: 'mining' }],
  },
  {
    id: 'iron_ore',
    name: 'Iron Ore',
    icon: iron_ore,
    sell_price: 1,
    type: 'ore',
    sources: [{ type: 'mining' }],
  },
  {
    id: 'gold_ore',
    name: 'Gold Ore',
    icon: gold_ore,
    sell_price: 1,
    type: 'ore',
    sources: [{ type: 'mining' }],
  },
  {
    id: 'diamond_ore',
    name: 'Diamond Ore',
    icon: diamond_ore,
    sell_price: 35,
    type: 'ore',
    sources: [{ type: 'mining' }, { type: 'treasure' }],
  },
  // Bars
  {
    id: 'copper_bar',
    name: 'Copper Bar',
    icon: copper_bar,
    sell_price: 1,
    type: 'bar',
    materials: [{ id: 'copper_ore', quantity: 5 }],
  },
  {
    id: 'iron_bar',
    name: 'Iron Bar',
    icon: iron_bar,
    sell_price: 1,
    type: 'bar',
    materials: [{ id: 'iron_ore', quantity: 5 }],
  },
  {
    id: 'gold_bar',
    name: 'Gold Bar',
    icon: gold_bar,
    sell_price: 1,
    type: 'bar',
    materials: [{ id: 'gold_ore', quantity: 5 }],
  },
  {
    id: 'diamond_bar',
    name: 'Diamond Bar',
    icon: diamond_bar,
    sell_price: 210,
    type: 'bar',
    materials: [{ id: 'diamond_ore', quantity: 5 }],
  },
  // Plates
  {
    id: 'copper_plate',
    name: 'Copper Plate',
    icon: defimg,
    sell_price: 1,
    type: 'plate',
    materials: [{ id: 'copper_bar', quantity: 6 }],
  },
  {
    id: 'iron_plate',
    name: 'Iron Plate',
    icon: defimg,
    sell_price: 1,
    type: 'plate',
    materials: [{ id: 'iron_bar', quantity: 6 }],
  },
  {
    id: 'gold_plate',
    name: 'Gold Plate',
    icon: defimg,
    sell_price: 1,
    type: 'plate',
    materials: [{ id: 'gold_bar', quantity: 6 }],
  },
  {
    id: 'diamond_plate',
    name: 'Diamond Plate',
    icon: defimg,
    sell_price: 210,
    type: 'plate',
    materials: [{ id: 'diamond_bar', quantity: 6 }],
  },
] as const;
