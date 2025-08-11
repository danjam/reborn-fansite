import { BaseGameObject } from './BaseGameObject';

export class Drop extends BaseGameObject {
  sell_price: number | null;
  monster_ids: string[];
  sources?: Array<{ type: string; id?: string }>;

  constructor(data: any) {
    super(data);
    this.sell_price = data.sell_price;
    this.monster_ids = data.monster_ids || [];
    this.sources = data.sources;
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