import { BaseGameObject } from './BaseGameObject';
import type { RawGameObjectData } from '../types/GameObject';

export class Villager extends BaseGameObject {
  profession: string;
  questIds: string[];

  constructor(data: RawGameObjectData) {
    super(data);
    this.profession = data.profession as string;
    
    // Handle optional questIds property properly for exactOptionalPropertyTypes
    const questIds = data.questIds as string[] | undefined;
    this.questIds = questIds || [];
  }

  hasQuests(): boolean {
    return this.questIds.length > 0;
  }

  getQuestCount(): number {
    return this.questIds.length;
  }
}