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
    
    // Handle optional sources property properly for exactOptionalPropertyTypes
    const sources = data.sources as Array<{ type: string; id?: string }> | undefined;
    if (sources !== undefined) {
      this.sources = sources;
    }
  }
}