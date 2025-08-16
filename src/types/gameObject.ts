// src/types/gameObject.ts

export interface GameObject {
  id: string;
  icon: string;
  name: string;
}

/**
 * Base interface for raw data used to construct game objects
 * All game object data must include these core properties
 */
export interface RawGameObjectData {
  id: string;
  name: string;
  icon: string;
  [key: string]: unknown; // Allow additional properties specific to each object type
}

export type GameObjectConstructor<T extends GameObject> = new (
  data: RawGameObjectData
) => T;

// Game item interfaces extending GameObject
export interface BaseItem extends GameObject {
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
