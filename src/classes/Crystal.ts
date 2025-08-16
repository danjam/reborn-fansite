import { BaseGameObject } from '@/classes/BaseGameObject';
import type { RawGameObjectData } from '@/types/gameObject';

export class Crystal extends BaseGameObject {
  effect: string;
  sell_price: number | null;

  constructor(data: RawGameObjectData) {
    super(data);
    this.effect = data.effect as string;
    this.sell_price = data.sell_price as number | null;
  }
}
