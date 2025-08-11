export interface GameObject {
  id: string;
  icon: string;
  name: string;
}

export type GameObjectConstructor<T extends GameObject> = new (data: any) => T;