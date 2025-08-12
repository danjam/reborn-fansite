import { BaseGameObject } from './BaseGameObject';
import type { RawGameObjectData } from '../types/GameObject';

export class Villager extends BaseGameObject {
  profession: string;
  questIds: string[];

  constructor(data: RawGameObjectData) {
    super(data);
    this.profession = data.profession as string;
    this.questIds = (data.questIds as string[]) || [];
  }

  hasQuests(): boolean {
    return this.questIds.length > 0;
  }

  getQuestCount(): number {
    return this.questIds.length;
  }
}