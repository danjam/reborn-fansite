// src/utils/linkHelpers.ts
import {
  GameObjectType,
  SMITHING_TYPES,
  TYPE_TO_DISPLAY_MAP,
  TYPE_TO_ROUTE_MAP,
} from '@/constants/gameObjectTypes';

/**
 * Breadcrumb item for navigation
 */
export interface BreadcrumbItem {
  label: string;
  path?: string; // Optional for the current page (non-clickable)
}

/**
 * Generate URL for a specific game object
 */
export const getGameObjectUrl = (type: GameObjectType, id: string): string => {
  return `/data/${type}/${id}`;
};

/**
 * Generate URL for a reference page based on object type
 */
export const getReferenceUrl = (type: GameObjectType): string => {
  return TYPE_TO_ROUTE_MAP[type];
};

/**
 * Get display name for a type (handles special cases like smithing)
 */
export const getTypeDisplayName = (type: GameObjectType): string => {
  return TYPE_TO_DISPLAY_MAP[type];
};

/**
 * Check if a type belongs to smithing category
 */
export const isSmithingType = (type: GameObjectType): boolean => {
  return SMITHING_TYPES.includes(type);
};

/**
 * Generate breadcrumb data for reference pages
 */
export const getReferenceBreadcrumbs = (
  type: GameObjectType,
  itemName?: string
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Reference', path: '/reference' },
    { label: getTypeDisplayName(type), path: getReferenceUrl(type) },
  ];

  if (itemName) {
    breadcrumbs.push({ label: itemName }); // No path - this is the current page
  }

  return breadcrumbs;
};

/**
 * Get the singular form of a type name (for error messages, etc.)
 */
export const getTypeSingular = (type: GameObjectType): string => {
  // Remove 's' from the end for most types
  if (type.endsWith('s')) {
    return type.slice(0, -1);
  }
  return type;
};
