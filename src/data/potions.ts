export type PotionRecipe = {
  id: string;
  name: string;
  icon: string;
  effect: string;
  monsterLoot: {
    item: string;
    amount: number;
    source: string;
  };
  vegetable: {
    item: string;
    amount: number;
    growTime: string;
  };
  container: {
    item: string;
    amount: number;
  };
};

export const POTION_RECIPES: PotionRecipe[] = [
  {
    id: 'agility',
    name: 'Agility',
    icon: '🏃',
    effect: 'Increases dodge chance and critical hit rate',
    monsterLoot: {
      item: 'Spider Silk',
      amount: 40,
      source: 'Spiders',
    },
    vegetable: {
      item: 'Strawberry',
      amount: 12,
      growTime: '40 min',
    },
    container: {
      item: 'Bottle',
      amount: 1,
    },
  },
  {
    id: 'defence',
    name: 'Defence',
    icon: '🛡️',
    effect: 'Reduces incoming damage and increases armor',
    monsterLoot: {
      item: 'Bear Claw',
      amount: 18,
      source: 'Bears',
    },
    vegetable: {
      item: 'Onion',
      amount: 5,
      growTime: '96 min',
    },
    container: {
      item: 'Bottle',
      amount: 1,
    },
  },
  {
    id: 'efficiency',
    name: 'Efficiency',
    icon: '⚡',
    effect: 'Improves resource gathering and crafting speed',
    monsterLoot: {
      item: 'Goblin Gear',
      amount: 35,
      source: 'Goblins',
    },
    vegetable: {
      item: 'Potato',
      amount: 30,
      growTime: '16 min',
    },
    container: {
      item: 'Bottle',
      amount: 1,
    },
  },
  {
    id: 'health',
    name: 'Health',
    icon: '❤️',
    effect: 'Restores health over time',
    monsterLoot: {
      item: 'Rat Tail',
      amount: 24,
      source: 'Rats',
    },
    vegetable: {
      item: 'Carrot',
      amount: 8,
      growTime: '24 min',
    },
    container: {
      item: 'Bottle',
      amount: 1,
    },
  },
  {
    id: 'health_medium',
    name: 'Health (M)',
    icon: '💖',
    effect: 'Restores significantly more health over time',
    monsterLoot: {
      item: 'Wolf Fur',
      amount: 15,
      source: 'Wolves',
    },
    vegetable: {
      item: 'Broccoli',
      amount: 6,
      growTime: '240 min',
    },
    container: {
      item: 'Empty Crystal',
      amount: 10,
    },
  },
  {
    id: 'precision',
    name: 'Precision',
    icon: '🎯',
    effect: 'Increases accuracy and critical hit chance',
    monsterLoot: {
      item: 'Eagle Eye',
      amount: 6,
      source: 'Giant Eagles',
    },
    vegetable: {
      item: 'Pumpkin',
      amount: 2,
      growTime: '240 min',
    },
    container: {
      item: 'Bottle',
      amount: 1,
    },
  },
  {
    id: 'precision_medium',
    name: 'Precision (M)',
    icon: '🔍',
    effect: 'Greatly increases accuracy and critical hit chance',
    monsterLoot: {
      item: 'Basilisk Scale',
      amount: 4,
      source: 'Basilisks',
    },
    vegetable: {
      item: 'Cabbage',
      amount: 4,
      growTime: '360 min',
    },
    container: {
      item: 'Empty Crystal',
      amount: 10,
    },
  },
  {
    id: 'strength',
    name: 'Strength',
    icon: '💪',
    effect: 'Increases damage and attack power',
    monsterLoot: {
      item: 'Orc Fang',
      amount: 22,
      source: 'Orcs',
    },
    vegetable: {
      item: 'Turnip',
      amount: 10,
      growTime: '48 min',
    },
    container: {
      item: 'Bottle',
      amount: 1,
    },
  },
];
