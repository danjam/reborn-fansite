import { BaseGameObject } from './BaseGameObject';
import type { RawGameObjectData } from '../types/GameObject';

export class Container extends BaseGameObject {
  sell_price: number | null;

  constructor(data: RawGameObjectData) {
    super(data);
    this.sell_price = data.sell_price as number | null;
  }
}