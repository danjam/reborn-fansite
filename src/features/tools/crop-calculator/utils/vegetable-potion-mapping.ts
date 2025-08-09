// src/features/tools/crop-calculator/utils/vegetable-potion-mapping.ts
import { POTIONS, VEGETABLES } from '@/data';

export interface VegetablePotionData {
  name: string;
  growTime: number; // in minutes
  amountNeeded: number;
  potionName: string;
  potionPrice: number;
}

/**
 * Create vegetable-potion relationship data from the VEGETABLES and POTIONS arrays
 */
export const createVegetablePotionData = (): VegetablePotionData[] => {
  const vegetablePotionData: VegetablePotionData[] = [];

  // For each vegetable, find which potion uses it
  VEGETABLES.forEach(vegetable => {
    // Find potion that uses this vegetable in its materials
    const potion = POTIONS.find(
      potion =>
        potion.materials.some(material => material.id === vegetable.id) &&
        potion.sell_price !== null &&
        potion.sell_price > 0 // Only include potions that can be sold for profit
    );

    if (potion) {
      // Find the material entry for this vegetable
      const materialEntry = potion.materials.find(
        material => material.id === vegetable.id
      );

      // Additional type safety check for sell_price
      if (materialEntry && potion.sell_price !== null) {
        vegetablePotionData.push({
          name: vegetable.name,
          growTime: vegetable.grow_time, // Already in minutes, no conversion needed
          amountNeeded: materialEntry.quantity,
          potionName: potion.name,
          potionPrice: potion.sell_price, // TypeScript now knows this is definitely a number
        });
      }
    }
  });

  return vegetablePotionData;
};

/**
 * Get default new vegetable for adding to calculator
 */
export const getDefaultNewVegetable = (): VegetablePotionData => ({
  name: 'New Vegetable',
  potionName: 'New Potion',
  growTime: 60,
  amountNeeded: 5,
  potionPrice: 1000,
});
