import { BaseGameObject } from './BaseGameObject';
import type { RawGameObjectData } from '../types/GameObject';

export class Vegetable extends BaseGameObject {
  sell_price: number | null;
  grow_time: number;
  buy_price: number | null;
  sources?: Array<{ type: string; id?: string }>;

  constructor(data: RawGameObjectData) {
    super(data);
    this.sell_price = data.sell_price as number | null;
    this.grow_time = data.grow_time as number;
    this.buy_price = data.buy_price as number | null;
    this.sources = data.sources as Array<{ type: string; id?: string }> | undefined;
  }

  /**
   * Check if this vegetable can be purchased from shops
   */
  canBePurchased(): boolean {
    return this.buy_price !== null && this.buy_price > 0;
  }

  /**
   * Check if this vegetable can be sold for profit
   */
  canBeSold(): boolean {
    return this.sell_price !== null && this.sell_price > 0;
  }

  /**
   * Get grow time in hours (converted from minutes)
   */
  getGrowTimeInHours(): number {
    return this.grow_time / 60;
  }
}