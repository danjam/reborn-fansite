import { BaseGameObject } from './BaseGameObject';

export class Vegetable extends BaseGameObject {
  sell_price: number | null;
  grow_time: number;
  buy_price: number | null;
  sources?: Array<{ type: string; id?: string }>;

  constructor(data: any) {
    super(data);
    this.sell_price = data.sell_price;
    this.grow_time = data.grow_time;
    this.buy_price = data.buy_price;
    this.sources = data.sources;
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