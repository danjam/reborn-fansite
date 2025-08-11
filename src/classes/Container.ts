import { BaseGameObject } from './BaseGameObject';

export class Container extends BaseGameObject {
  sell_price: number | null;

  constructor(data: any) {
    super(data);
    this.sell_price = data.sell_price;
  }
}