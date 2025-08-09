export interface BaseItem {
  id: string;
  name: string;
  icon: string;
  sell_price: number | null;
}

export interface Material {
  id: string;
  quantity: number;
}

export interface CraftableItem extends BaseItem {
  materials: Material[];
}
