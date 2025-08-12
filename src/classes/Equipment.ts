import type { RawGameObjectData } from '../types/GameObject';
import { BaseGameObject } from './BaseGameObject';

export interface Material {
  id: string;
  quantity: number;
}

export class Equipment extends BaseGameObject {
  sell_price: number | null;
  materials: Material[] | null;
  slot: string;

  constructor(data: RawGameObjectData) {
    super(data);
    this.sell_price = data.sell_price as number | null;
    this.materials = data.materials as Material[] | null;
    this.slot = data.slot as string;
  }
}
