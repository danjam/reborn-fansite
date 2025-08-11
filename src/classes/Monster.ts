import { BaseGameObject } from './BaseGameObject';

export class Monster extends BaseGameObject {
  floors: number[];
  boss: boolean;
  lootDrop: string | null;

  constructor(data: any) {
    super(data);
    this.floors = data.floors;
    this.boss = data.boss;
    this.lootDrop = data.lootDrop || null;
  }

  displayFloors = (): string => {
    if (this.floors.length === 0) return '';

    const sorted = [...this.floors].sort((a, b) => a - b);
    const result: string[] = [];
    let rangeStart = 0;

    for (let i = 0; i < sorted.length; i++) {
      if (i === sorted.length - 1 || sorted[i + 1]! !== sorted[i]! + 1) {
        const rangeLength = i - rangeStart + 1;

        if (rangeLength >= 3) {
          result.push(`${sorted[rangeStart]!}-${sorted[i]!}`);
        } else {
          for (let j = rangeStart; j <= i; j++) {
            result.push(sorted[j]!.toString());
          }
        }

        rangeStart = i + 1;
      }
    }

    return result.join(', ');
  };
}