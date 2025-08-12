import { GameObject, RawGameObjectData } from '../types/GameObject';

export abstract class BaseGameObject implements GameObject {
  id: string;
  icon: string;
  name: string;

  constructor(data: RawGameObjectData) {
    this.id = data.id;
    this.icon = data.icon;
    this.name = data.name;
  }

  getDisplayName(): string {
    return this.name;
  }

  toDisplayProps(iconSize: string = '16px') {
    return {
      icon: this.icon,
      name: this.getDisplayName(),
      iconSize,
      alt: this.getDisplayName()
    };
  }

  toString(): string {
    return this.getDisplayName();
  }
}