import { bottle_small, crystal_empty } from '@/assets/img';
import { BaseItem } from '@/data/items';

export type Container = BaseItem;

export const CONTAINERS: readonly Container[] = [
  {
    id: 'bottle_small',
    name: 'Bottle (Small)',
    icon: bottle_small,
    sell_price: 1,
  },
  {
    id: 'crystal_empty',
    name: 'Crystal (Empty)',
    icon: crystal_empty,
    sell_price: 1,
  },
] as const;
