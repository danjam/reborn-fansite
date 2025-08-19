// src/types/index.ts

// Re-export game object and item types
export type {
  BaseItem,
  CraftableItem,
  EquipmentItem,
  GameObject,
  GameObjectConstructor,
  Material,
  RawGameObjectData,
} from '@/types/gameObject';

// Re-export existing centralized types
export type { NavigationItem } from '@/types/navigation';
export type {
  GameSettings,
  HouseMultipliers,
  PlayerStatus,
} from '@/types/settings';

// Re-export new theme types
export type {
  ButtonOptions,
  ButtonSize,
  ButtonVariant,
  IconSize,
  InputOptions,
  SpacingVariant,
  TableRowOptions,
  Theme,
  ThemeContextType,
} from '@/types/theme';
