// src/utils/gameObjectHelpers.ts
import { gameData } from '@/gameData';
import { GameObjectType, GAME_OBJECT_TYPES } from '@/constants/gameObjectTypes';

/**
 * Get display name for a material by ID
 * Looks up the object in gameData and returns its name, with fallback formatting
 */
export const getMaterialDisplayName = (materialId: string): string => {
  const gameObject = gameData.getObjectById(materialId);
  if (gameObject) {
    return gameObject.name;
  }

  // Fallback: format the ID (replace underscores with spaces and capitalize words)
  return materialId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Format source types for display
 * Converts source objects to readable strings
 */
export const formatSources = (sources?: Array<{ type: string; id?: string }>): string => {
  if (!sources || sources.length === 0) return 'Unknown';
  
  return sources.map(source => {
    const formatted = source.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return formatted;
  }).join(', ');
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
export const getItemType = (item: any): string => {
  return item.constructor.name;
};

/**
 * Categorize materials into containers, vegetables, and monster loot
 * Returns organized arrays for each category
 */
export const categorizeMaterials = (materials: { id: string; quantity: number }[]) => {
  const containers: { id: string; quantity: number }[] = [];
  const vegetables: { id: string; quantity: number }[] = [];
  const monsterLoot: { id: string; quantity: number }[] = [];

  // Get reference arrays for type checking
  const allContainers = gameData.getAllContainers();
  const allVegetables = gameData.getAllVegetables();
  const allDrops = gameData.getAllDrops();

  materials.forEach(material => {
    const gameObject = gameData.getObjectById(material.id);
    
    if (gameObject && allContainers.some(c => c.id === material.id)) {
      containers.push(material);
    } else if (gameObject && allVegetables.some(v => v.id === material.id)) {
      vegetables.push(material);
    } else if (gameObject && allDrops.some(d => d.id === material.id)) {
      monsterLoot.push(material);
    }
  });

  return {
    containers,
    vegetables,
    monsterLoot,
  };
};

/**
 * Check if a material ID belongs to a specific type
 */
export const isMaterialOfType = (materialId: string, type: 'container' | 'vegetable' | 'drop' | 'ore' | 'bar'): boolean => {
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
      return gameData.getAllOres().some(o => o.id === materialId);
    case 'bar':
      return gameData.getAllBars().some(b => b.id === materialId);
    default:
      return false;
  }
};