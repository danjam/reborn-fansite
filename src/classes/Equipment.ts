import { BaseGameObject } from '@/classes/BaseGameObject';
import type { RawGameObjectData } from '@/types/gameObject';
import { Material } from '@/types/gameObject';

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
