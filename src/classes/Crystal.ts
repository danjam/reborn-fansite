import type { RawGameObjectData } from '../types/GameObject';
import { BaseGameObject } from './BaseGameObject';

export class Crystal extends BaseGameObject {
  effect: string;
  sell_price: number | null;

  constructor(data: RawGameObjectData) {
    super(data);
    this.effect = data.effect as string;
    this.sell_price = data.sell_price as number | null;
  }
}
