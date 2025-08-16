import { BaseGameObject } from '@/classes/BaseGameObject';
import type { RawGameObjectData } from '@/types/gameObject';

export class Drop extends BaseGameObject {
  sell_price: number | null;
  monster_ids: string[];
  sources?: Array<{ type: string; id?: string }>;

  constructor(data: RawGameObjectData) {
    super(data);
    this.sell_price = data.sell_price as number | null;

    // Handle optional monster_ids property properly for exactOptionalPropertyTypes
    const monsterIds = data.monster_ids as string[] | undefined;
    this.monster_ids = monsterIds || [];

    // Handle optional sources property properly for exactOptionalPropertyTypes
    const sources = data.sources as
      | Array<{ type: string; id?: string }>
      | undefined;
    if (sources !== undefined) {
      this.sources = sources;
    }
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
