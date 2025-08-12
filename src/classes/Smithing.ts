import type { RawGameObjectData } from '../types/GameObject';
import { BaseGameObject } from './BaseGameObject';

export interface Material {
  id: string;
  quantity: number;
}

export class Smithing extends BaseGameObject {
  sell_price: number | null;
  type: 'ore' | 'bar' | 'plate';
  sources?: Array<{
    type: string;
    id?: string;
  }>;
  materials?: Material[];

  constructor(data: RawGameObjectData) {
    super(data);
    this.sell_price = data.sell_price as number | null;
    this.type = data.type as 'ore' | 'bar';

    // Handle optional sources property properly for exactOptionalPropertyTypes
    const sources = data.sources as
      | Array<{ type: string; id?: string }>
      | undefined;
    if (sources !== undefined) {
      this.sources = sources;
    }

    // Handle optional materials property for bars
    const materials = data.materials as Material[] | undefined;
    if (materials !== undefined) {
      this.materials = materials;
    }
  }
}
