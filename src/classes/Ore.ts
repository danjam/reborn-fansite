import { BaseGameObject } from './BaseGameObject';

export class Ore extends BaseGameObject {
  sell_price: number | null;
  sources?: Array<{
    type: string;
    id?: string;
  }>;

  constructor(data: any) {
    super(data);
    this.sell_price = data.sell_price;
    this.sources = data.sources;
  }
}