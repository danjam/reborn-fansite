// src/features/tools/crop-calculator/data/vegetables.js

export const INITIAL_FARM_CONFIG = {
  totalPlots: 75,
  fertilised: true,
  cauldronLevel: 1
};

export const INITIAL_VEGETABLES = [
  { name: "Broccoli", growTime: 240, amountNeeded: 6, potionName: "Speed (M)", potionPrice: 6500 },
  { name: "Cabbage", growTime: 360, amountNeeded: 4, potionName: "Precision (M)", potionPrice: 6688 },
  { name: "Carrot", growTime: 80, amountNeeded: 3, potionName: "Health", potionPrice: 1750 },
  { name: "Cauliflower", growTime: 160, amountNeeded: 3, potionName: "Speed", potionPrice: 2750 },
  { name: "Eggplant", growTime: 120, amountNeeded: 6, potionName: "Health (M)", potionPrice: 3625 },
  { name: "Onion", growTime: 96, amountNeeded: 5, potionName: "Defence", potionPrice: 3000 },
  { name: "Potato", growTime: 16, amountNeeded: 30, potionName: "Efficiency", potionPrice: 2750 },
  { name: "Pumpkin", growTime: 240, amountNeeded: 2, potionName: "Precision", potionPrice: 2938 },
  { name: "Strawberry", growTime: 40, amountNeeded: 12, potionName: "Agility", potionPrice: 2938 },
  { name: "Turnip", growTime: 48, amountNeeded: 10, potionName: "Strength", potionPrice: 2438 }
];

export const TABLE_HEADERS = {
  vegetables: ['Name', 'Grow Time (min)', 'Amount Needed', 'Potion', 'Potion Sell Price', 'Actions'],
  results: ['Rank', 'Vegetable', 'Profit/Minute', 'Max Potions', 'Total Profit', 'Plots Needed']
};

export const DEFAULT_NEW_VEGETABLE = {
  name: "New Vegetable",
  potionName: "New Potion",
  growTime: 60,
  amountNeeded: 5,
  potionPrice: 1000
};