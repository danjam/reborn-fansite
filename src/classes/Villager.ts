import { BaseGameObject } from './BaseGameObject';

export class Villager extends BaseGameObject {
  profession: string;
  questIds: string[];

  constructor(data: any) {
    super(data);
    this.profession = data.profession;
    this.questIds = data.questIds || [];
  }

  hasQuests(): boolean {
    return this.questIds.length > 0;
  }

  getQuestCount(): number {
    return this.questIds.length;
  }
}