import { BaseGameObject } from './BaseGameObject';
import type { RawGameObjectData } from '../types/GameObject';

export interface Material {
  id: string;
  quantity: number;
}

export class Potion extends BaseGameObject {
  effect: string;
  materials: Material[];
  sell_price: number | null;

  constructor(data: RawGameObjectData) {
    super(data);
    this.effect = data.effect as string;
    this.materials = data.materials as Material[];
    this.sell_price = data.sell_price as number | null;
  }
}