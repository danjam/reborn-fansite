import { VegetablePotion } from '@/data/vegetable_potions';
import { FarmConfig } from '@/types';

export const INITIAL_FARM_CONFIG: FarmConfig = {
  totalPlots: 75,
  fertilised: true,
  cauldronLevel: 1,
};

export const TABLE_HEADERS = {
  vegetables: [
    'Name',
    'Grow Time (min)',
    'Amount Needed',
    'Potion',
    'Potion Sell Price',
    'Actions',
  ],
  results: [
    'Rank',
    'Vegetable',
    'Profit/Minute',
    'Max Potions',
    'Total Profit',
    'Plots Needed',
  ],
};

export const DEFAULT_NEW_VEGETABLE: VegetablePotion = {
  name: 'New Vegetable',
  potionName: 'New Potion',
  growTime: 60,
  amountNeeded: 5,
  potionPrice: 1000,
};
