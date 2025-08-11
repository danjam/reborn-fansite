import { BaseGameObject } from './BaseGameObject';

export interface Material {
  id: string;
  quantity: number;
}

export class Potion extends BaseGameObject {
  effect: string;
  value: number;
  materials: Material[];
  sell_price: number | null;

  constructor(data: any) {
    super(data);
    this.effect = data.effect;
    this.value = data.value;
    this.materials = data.materials;
    this.sell_price = data.sell_price;
  }
}