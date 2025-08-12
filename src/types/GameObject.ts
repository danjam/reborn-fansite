export interface GameObject {
  id: string;
  icon: string;
  name: string;
}

/**
 * Base interface for raw data used to construct game objects
 * All game object data must include these core properties
 */
export interface RawGameObjectData {
  id: string;
  name: string;
  icon: string;
  [key: string]: unknown; // Allow additional properties specific to each object type
}

export type GameObjectConstructor<T extends GameObject> = new (
  data: RawGameObjectData
) => T;
