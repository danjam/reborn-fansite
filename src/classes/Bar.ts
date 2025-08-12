import { BaseGameObject } from './BaseGameObject';
import type { RawGameObjectData } from '../types/GameObject';

export interface Material {
  id: string;
  quantity: number;
}

export class Bar extends BaseGameObject {
  sell_price: number | null;
  materials: Material[];

  constructor(data: RawGameObjectData) {
    super(data);
    this.sell_price = data.sell_price as number | null;
    this.materials = data.materials as Material[];
  }
}