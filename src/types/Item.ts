export interface BaseItem {
  id: string;
  name: string;
  icon: string;
  sell_price: number | null;
  sources?: SourceData[];
  [key: string]: unknown; // Allow additional properties
}

export interface Material {
  id: string;
  quantity: number;
}

export interface CraftableItem extends BaseItem {
  materials: Material[];
}

export interface EquipmentItem extends BaseItem {
  materials: Material[] | null;
  slot: string;
}

type SourceType =
  | 'monster'
  | 'shop'
  | 'farm'
  | 'quest'
  | 'enchanting'
  | 'house'
  | 'mining'
  | 'digging'
  | 'treasure'
  | 'orc'
  | 'forest'
  | 'early_access_reward'
  | 'daily_spin_reward';

type SourceData = {
  type: SourceType;
  id?: string;
};
