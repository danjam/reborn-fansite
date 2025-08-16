// src/utils/gameObjectHelpers.ts
import { gameData } from '@/gameData';
import type { GameObject } from '@/types/gameObject';

/**
 * Get display name for a material by ID
 * Looks up the object in gameData and returns its name, with fallback formatting
 */
export const getMaterialDisplayName = (materialId: string): string => {
  // Try to get from game objects (includes smithing items)
  const gameObject = gameData.getObjectById(materialId);

  if (gameObject) {
    return gameObject.name;
  }

  // Fallback: format the ID (replace underscores with spaces and capitalize words)
  return materialId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Format type string for display (capitalize first letter)
 */
export const formatTypeForDisplay = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

/**
 * Get item type from constructor name
 */
export const getItemType = (item: GameObject): string => {
  return item.constructor.name;
};

/**
 * Check if a material ID belongs to a specific type
 * Updated to use only smithing items for ore/bar checks
 */
export const isMaterialOfType = (
  materialId: string,
  type: 'container' | 'vegetable' | 'drop' | 'ore' | 'bar' | 'smithing'
): boolean => {
  const gameObject = gameData.getObjectById(materialId);
  if (!gameObject) return false;

  switch (type) {
    case 'container':
      return gameData.getAllContainers().some(c => c.id === materialId);
    case 'vegetable':
      return gameData.getAllVegetables().some(v => v.id === materialId);
    case 'drop':
      return gameData.getAllDrops().some(d => d.id === materialId);
    case 'ore':
      return gameData.getAllSmithingOres().some(o => o.id === materialId);
    case 'bar':
      return gameData.getAllSmithingBars().some(b => b.id === materialId);
    case 'smithing':
      return gameData.getAllSmithing().some(s => s.id === materialId);
    default:
      return false;
  }
};

/**
 * Get styling information for a material based on its type
 * Returns color name and CSS classes for consistent material styling
 */
export const getMaterialStyle = (materialId: string) => {
  if (isMaterialOfType(materialId, 'container')) {
    return {
      color: 'purple',
      classes: 'bg-purple-900/20 border-purple-300/30',
    };
  }
  if (isMaterialOfType(materialId, 'vegetable')) {
    return {
      color: 'green',
      classes: 'bg-green-900/20 border-green-300/30',
    };
  }
  if (isMaterialOfType(materialId, 'drop')) {
    return {
      color: 'red',
      classes: 'bg-red-900/20 border-red-300/30',
    };
  }
  if (isMaterialOfType(materialId, 'smithing')) {
    return {
      color: 'orange',
      classes: 'bg-orange-900/20 border-orange-300/30',
    };
  }

  // Unknown material types
  return {
    color: 'blue',
    classes: 'bg-blue-900/20 border-blue-300/30',
  };
};
