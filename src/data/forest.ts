import { hard_wood, rock_dark, rock_light, wood } from '@/assets/img';
import { BaseItem } from '@/types/gameObject';

type Forest = BaseItem;

export const FOREST_DATA: readonly Forest[] = [
  {
    id: 'wood',
    name: 'Wood',
    icon: wood,
    sell_price: 1, // done
  },
  {
    id: 'hard_wood',
    name: 'Hard Wood',
    icon: hard_wood,
    sell_price: 10, // done
  },
  {
    id: 'rock_light',
    name: 'Rock (Light)',
    icon: rock_light,
    sell_price: 9, // done
  },
  {
    id: 'rock_dark',
    name: 'Rock (Dark)',
    icon: rock_dark,
    sell_price: 1, // done
  },
] as const;
