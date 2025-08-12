import { Container } from '../classes/Container';
import { Drop } from '../classes/Drop';
import { Equipment } from '../classes/Equipment';
import { Monster } from '../classes/Monster';
import { Potion } from '../classes/Potion';
import { Smithing } from '../classes/Smithing';
import { Vegetable } from '../classes/Vegetable';
import { Villager } from '../classes/Villager';
import {
  GameObject,
  GameObjectConstructor,
  RawGameObjectData,
} from '../types/GameObject';

type SupportedDataConfig =
  | { data: RawGameObjectData[]; itemClass: GameObjectConstructor<Monster> }
  | { data: RawGameObjectData[]; itemClass: GameObjectConstructor<Villager> }
  | { data: RawGameObjectData[]; itemClass: GameObjectConstructor<Potion> }
  | { data: RawGameObjectData[]; itemClass: GameObjectConstructor<Container> }
  | { data: RawGameObjectData[]; itemClass: GameObjectConstructor<Drop> }
  | { data: RawGameObjectData[]; itemClass: GameObjectConstructor<Vegetable> }
  | { data: RawGameObjectData[]; itemClass: GameObjectConstructor<Equipment> }
  | { data: RawGameObjectData[]; itemClass: GameObjectConstructor<Smithing> };

/**
 * Game Data Service - Efficient lookup service for game objects
 *
 * For the initialized instance with all game data loaded, import from '../gameData'
 */
export class GameDataService {
  private objectsMap: Map<string, GameObject>;
  private typeIndex: Map<GameObjectConstructor<GameObject>, Set<string>>;

  constructor(...gameDataConfigs: SupportedDataConfig[]) {
    this.objectsMap = new Map();
    this.typeIndex = new Map();

    gameDataConfigs.forEach(({ data, itemClass }) => {
      if (!this.typeIndex.has(itemClass)) {
        this.typeIndex.set(itemClass, new Set());
      }

      const typeSet = this.typeIndex.get(itemClass)!;

      data.forEach(rawItem => {
        const object = new itemClass(rawItem);

        if (this.objectsMap.has(object.id)) {
          const existingObject = this.objectsMap.get(object.id)!;
          throw new Error(
            `Duplicate ID found: "${object.id}" exists in both ` +
              `${existingObject.constructor.name} and ${object.constructor.name}`
          );
        }

        this.objectsMap.set(object.id, object);
        typeSet.add(object.id);
      });
    });
  }

  getObjectById<T extends GameObject>(id: string): T | undefined {
    return this.objectsMap.get(id) as T | undefined;
  }

  hasObject(id: string): boolean {
    return this.objectsMap.has(id);
  }

  private getAllByClass<T extends GameObject>(
    objectClass: GameObjectConstructor<T>
  ): T[] {
    const typeSet = this.typeIndex.get(objectClass);
    if (!typeSet) return [];

    return Array.from(typeSet)
      .map(id => this.objectsMap.get(id))
      .filter((object): object is T => object !== undefined);
  }

  getAllMonsters(): Monster[] {
    return this.getAllByClass(Monster);
  }

  getAllVillagers(): Villager[] {
    return this.getAllByClass(Villager);
  }

  getAllPotions(): Potion[] {
    return this.getAllByClass(Potion);
  }

  getAllContainers(): Container[] {
    return this.getAllByClass(Container);
  }

  getAllDrops(): Drop[] {
    return this.getAllByClass(Drop);
  }

  getAllVegetables(): Vegetable[] {
    return this.getAllByClass(Vegetable);
  }

  getAllEquipment(): Equipment[] {
    return this.getAllByClass(Equipment);
  }

  getAllSmithing(): Smithing[] {
    return this.getAllByClass(Smithing);
  }

  getAllSmithingOres(): Smithing[] {
    return this.getAllSmithing().filter(item => item.type === 'ore');
  }

  getAllSmithingBars(): Smithing[] {
    return this.getAllSmithing().filter(item => item.type === 'bar');
  }

  getAllSmithingPlates(): Smithing[] {
    return this.getAllSmithing().filter(item => item.type === 'plate');
  }

  /**
   * Get all drops that a specific monster can drop
   */
  getDropsByMonsterId(monsterId: string): Drop[] {
    return this.getAllDrops().filter(drop => drop.isDroppedBy(monsterId));
  }

  /**
   * Get all bars that can be made from a specific ore
   */
  getBarsFromOre(oreId: string): Smithing[] {
    return this.getAllSmithingBars().filter(bar =>
      bar.materials?.some(material => material.id === oreId)
    );
  }
}
