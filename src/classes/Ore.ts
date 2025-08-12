import { BaseGameObject } from './BaseGameObject';
import type { RawGameObjectData } from '../types/GameObject';

export class Ore extends BaseGameObject {
  sell_price: number | null;
  sources?: Array<{
    type: string;
    id?: string;
  }>;

  constructor(data: RawGameObjectData) {
    super(data);
    this.sell_price = data.sell_price as number | null;
    this.sources = data.sources as Array<{ type: string; id?: string }> | undefined;
  }
}