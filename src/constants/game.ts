// src/constants/game.ts

/**
 * Game mechanics constants
 */
export const INVENTORY = {
  MAX_SLOTS: 40,
  STACK_SIZE: 9999,
  get MAX_CAPACITY() {
    return this.MAX_SLOTS * this.STACK_SIZE;
  },
} as const;

/**
 * Available batch sizes for crafting potions
 * Ordered from largest to smallest for optimization logic
 */
export const BATCH_SIZES = [100, 20, 5, 1] as const;

/**
 * Batch size thresholds for optimal selection
 */
export const BATCH_THRESHOLDS = {
  LARGE: 20, // Use 100× batches when > 20 total batches
  MEDIUM: 5, // Use 20× batches when > 5 total batches
  SMALL: 1, // Use 5× batches when > 1 total batch
  // Use 1× batches when = 1 total batch
} as const;
