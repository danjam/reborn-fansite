import { BaseGameObject } from './BaseGameObject';
import type { RawGameObjectData } from '../types/GameObject';

export class Drop extends BaseGameObject {
  sell_price: number | null;
  monster_ids: string[];
  sources?: Array<{ type: string; id?: string }>;

  constructor(data: RawGameObjectData) {
    super(data);
    this.sell_price = data.sell_price as number | null;
    this.monster_ids = (data.monster_ids as string[]) || [];
    this.sources = data.sources as Array<{ type: string; id?: string }> | undefined;
  }

  /**
   * Check if this drop is associated with a specific monster
   */
  isDroppedBy(monsterId: string): boolean {
    return this.monster_ids.includes(monsterId);
  }

  /**
   * Get all monster IDs that drop this item
   */
  getMonsterIds(): string[] {
    return [...this.monster_ids];
  }
}