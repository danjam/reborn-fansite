import { BaseGameObject } from './BaseGameObject';

export interface Material {
  id: string;
  quantity: number;
}

export class Bar extends BaseGameObject {
  sell_price: number | null;
  materials: Material[];

  constructor(data: any) {
    super(data);
    this.sell_price = data.sell_price;
    this.materials = data.materials;
  }
}