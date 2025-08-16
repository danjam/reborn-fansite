import { Container } from '@/classes/Container';
import { Crystal } from '@/classes/Crystal';
import { Drop } from '@/classes/Drop';
import { Equipment } from '@/classes/Equipment';
import { Monster } from '@/classes/Monster';
import { Potion } from '@/classes/Potion';
import { Smithing } from '@/classes/Smithing';
import { Vegetable } from '@/classes/Vegetable';
import {
  GameObject,
  GameObjectConstructor,
  RawGameObjectData,
} from '@/types/gameObject';

type SupportedDataConfig =
  | {
      data: readonly RawGameObjectData[];
      itemClass: GameObjectConstructor<Monster>;
    }
  | {
      data: readonly RawGameObjectData[];
      itemClass: GameObjectConstructor<Potion>;
    }
  | {
      data: readonly RawGameObjectData[];
      itemClass: GameObjectConstructor<Container>;
    }
  | {
      data: readonly RawGameObjectData[];
      itemClass: GameObjectConstructor<Crystal>;
    }
  | {
      data: readonly RawGameObjectData[];
      itemClass: GameObjectConstructor<Drop>;
    }
  | {
      data: readonly RawGameObjectData[];
      itemClass: GameObjectConstructor<Vegetable>;
    }
  | {
      data: readonly RawGameObjectData[];
      itemClass: GameObjectConstructor<Equipment>;
    }
  | {
      data: readonly RawGameObjectData[];
      itemClass: GameObjectConstructor<Smithing>;
    };

// Type for vegetable-potion relationship data
export interface VegetablePotionData {
  name: string;
  growTime: number;
  amountNeeded: number;
  potionName: string;
  potionPrice: number;
}

/**
 * Game Data Service - Efficient lookup service for game objects
 *
 * For the initialized instance with all game data loaded, import from '@/gameData'
 */
export class GameDataService {
  private objectsMap: Map<string, GameObject>;
  private typeIndex: Map<GameObjectConstructor<GameObject>, Set<string>>;

  // Memoisation caches for stable references during React renders
  private _allMonsters: Monster[] | null = null;
  private _allPotions: Potion[] | null = null;
  private _allContainers: Container[] | null = null;
  private _allCrystals: Crystal[] | null = null;
  private _allDrops: Drop[] | null = null;
  private _allVegetables: Vegetable[] | null = null;
  private _allEquipment: Equipment[] | null = null;
  private _allSmithing: Smithing[] | null = null;
  private _allSmithingOres: Smithing[] | null = null;
  private _allSmithingBars: Smithing[] | null = null;
  private _allSmithingPlates: Smithing[] | null = null;
  private _vegetablePotionData: VegetablePotionData[] | null = null;

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
    if (this._allMonsters === null) {
      this._allMonsters = this.getAllByClass(Monster);
    }
    return this._allMonsters;
  }

  getAllPotions(): Potion[] {
    if (this._allPotions === null) {
      this._allPotions = this.getAllByClass(Potion);
    }
    return this._allPotions;
  }

  getAllContainers(): Container[] {
    if (this._allContainers === null) {
      this._allContainers = this.getAllByClass(Container);
    }
    return this._allContainers;
  }

  getAllCrystals(): Crystal[] {
    if (this._allCrystals === null) {
      this._allCrystals = this.getAllByClass(Crystal);
    }
    return this._allCrystals;
  }

  getAllDrops(): Drop[] {
    if (this._allDrops === null) {
      this._allDrops = this.getAllByClass(Drop);
    }
    return this._allDrops;
  }

  getAllVegetables(): Vegetable[] {
    if (this._allVegetables === null) {
      this._allVegetables = this.getAllByClass(Vegetable);
    }
    return this._allVegetables;
  }

  getAllEquipment(): Equipment[] {
    if (this._allEquipment === null) {
      this._allEquipment = this.getAllByClass(Equipment);
    }
    return this._allEquipment;
  }

  getAllSmithing(): Smithing[] {
    if (this._allSmithing === null) {
      this._allSmithing = this.getAllByClass(Smithing);
    }
    return this._allSmithing;
  }

  getAllSmithingOres(): Smithing[] {
    if (this._allSmithingOres === null) {
      this._allSmithingOres = this.getAllSmithing().filter(
        item => item.type === 'ore'
      );
    }
    return this._allSmithingOres;
  }

  getAllSmithingBars(): Smithing[] {
    if (this._allSmithingBars === null) {
      this._allSmithingBars = this.getAllSmithing().filter(
        item => item.type === 'bar'
      );
    }
    return this._allSmithingBars;
  }

  getAllSmithingPlates(): Smithing[] {
    if (this._allSmithingPlates === null) {
      this._allSmithingPlates = this.getAllSmithing().filter(
        item => item.type === 'plate'
      );
    }
    return this._allSmithingPlates;
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

  /**
   * Get combined vegetable and potion data for crop calculations
   * Returns vegetables that can be used to make sellable potions
   *
   * Memoised for performance - expensive computation done once
   */
  getVegetablePotionData(): VegetablePotionData[] {
    if (this._vegetablePotionData === null) {
      this._vegetablePotionData = this.computeVegetablePotionData();
    }
    return this._vegetablePotionData;
  }

  /**
   * Private method to compute vegetable-potion relationships
   * Expensive operation - only run once and cached
   */
  private computeVegetablePotionData(): VegetablePotionData[] {
    const vegetablePotionData: VegetablePotionData[] = [];

    // Get all vegetables and potions
    const vegetables = this.getAllVegetables();
    const potions = this.getAllPotions();

    // For each vegetable, find which potion uses it
    vegetables.forEach(vegetable => {
      const potion = potions.find(
        potion =>
          potion.materials?.some(material => material.id === vegetable.id) &&
          potion.sell_price !== null &&
          potion.sell_price > 0
      );

      if (potion && potion.materials) {
        const materialEntry = potion.materials.find(
          material => material.id === vegetable.id
        );

        if (materialEntry && potion.sell_price !== null) {
          vegetablePotionData.push({
            name: vegetable.name,
            growTime: vegetable.grow_time,
            amountNeeded: materialEntry.quantity,
            potionName: potion.name,
            potionPrice: potion.sell_price,
          });
        }
      }
    });

    return vegetablePotionData;
  }
}
