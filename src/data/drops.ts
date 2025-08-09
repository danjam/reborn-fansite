import { BaseItem } from "./items";

export interface Drop extends BaseItem {
    monster_ids: string[];
}

export const DROPS: readonly Drop[] = [
  {
    id: 'slime_egg_red',
    name: 'Slime Egg (Red)',
    icon: '🟠',
    sell_price: 1,
    monster_ids: ['slime_red']
  }
] as const;
