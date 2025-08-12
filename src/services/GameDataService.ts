import { GameObject, GameObjectConstructor } from '../types/GameObject';
import { Monster } from '../classes/Monster';
import { Villager } from '../classes/Villager';
import { Potion } from '../classes/Potion';
import { Container } from '../classes/Container';
import { Drop } from '../classes/Drop';
import { Vegetable } from '../classes/Vegetable';
import { Bar } from '../classes/Bar';
import { Ore } from '../classes/Ore';

type SupportedDataConfig = 
  | { data: any[], itemClass: GameObjectConstructor<Monster> }
  | { data: any[], itemClass: GameObjectConstructor<Villager> }
  | { data: any[], itemClass: GameObjectConstructor<Potion> }
  | { data: any[], itemClass: GameObjectConstructor<Container> }
  | { data: any[], itemClass: GameObjectConstructor<Drop> }
  | { data: any[], itemClass: GameObjectConstructor<Vegetable> }
  | { data: any[], itemClass: GameObjectConstructor<Bar> }
  | { data: any[], itemClass: GameObjectConstructor<Ore> };

/**
 * Game Data Service - Efficient lookup service for game objects
 * 
 * For the initialized instance with all game data loaded,
 * import from '../gameData' instead of creating your own instance.
 */
export class GameDataService {
  private objectsMap: Map<string, GameObject>;
  private typeIndex: Map<Function, Set<string>>;

  constructor(...gameDataConfigs: SupportedDataConfig[]) {
    console.log("Initializing GameDataService");
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

  getObjectsByIds(ids: string[]): GameObject[] {
    return ids
      .map(id => this.objectsMap.get(id))
      .filter((object): object is GameObject => object !== undefined);
  }

  private getAllByClass<T extends GameObject>(objectClass: GameObjectConstructor<T>): T[] {
    const typeSet = this.typeIndex.get(objectClass);
    if (!typeSet) return [];

    return Array.from(typeSet)
      .map(id => this.objectsMap.get(id))
      .filter((object): object is T => object !== undefined);
  }

  private getByClassAndIds<T extends GameObject>(objectClass: GameObjectConstructor<T>, ids: string[]): T[] {
    const typeSet = this.typeIndex.get(objectClass);
    if (!typeSet) return [];

    return ids
      .filter(id => typeSet.has(id))
      .map(id => this.objectsMap.get(id))
      .filter((object): object is T => object !== undefined);
  }

  getAllMonsters(): Monster[] {
    return this.getAllByClass(Monster);
  }

  getMonstersByIds(ids: string[]): Monster[] {
    return this.getByClassAndIds(Monster, ids);
  }

  getAllVillagers(): Villager[] {
    return this.getAllByClass(Villager);
  }

  getVillagersByIds(ids: string[]): Villager[] {
    return this.getByClassAndIds(Villager, ids);
  }

  getAllPotions(): Potion[] {
    return this.getAllByClass(Potion);
  }

  getPotionsByIds(ids: string[]): Potion[] {
    return this.getByClassAndIds(Potion, ids);
  }

  getAllContainers(): Container[] {
    return this.getAllByClass(Container);
  }

  getContainersByIds(ids: string[]): Container[] {
    return this.getByClassAndIds(Container, ids);
  }

  getAllDrops(): Drop[] {
    return this.getAllByClass(Drop);
  }

  getDropsByIds(ids: string[]): Drop[] {
    return this.getByClassAndIds(Drop, ids);
  }

  getAllVegetables(): Vegetable[] {
    return this.getAllByClass(Vegetable);
  }

  getVegetablesByIds(ids: string[]): Vegetable[] {
    return this.getByClassAndIds(Vegetable, ids);
  }

  getAllBars(): Bar[] {
    return this.getAllByClass(Bar);
  }

  getBarsByIds(ids: string[]): Bar[] {
    return this.getByClassAndIds(Bar, ids);
  }

  getAllOres(): Ore[] {
    return this.getAllByClass(Ore);
  }

  getOresByIds(ids: string[]): Ore[] {
    return this.getByClassAndIds(Ore, ids);
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
  getBarsFromOre(oreId: string): Bar[] {
    return this.getAllBars().filter(bar => 
      bar.materials.some(material => material.id === oreId)
    );
  }
}