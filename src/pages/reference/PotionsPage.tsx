// src/pages/reference/PotionListPage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../../utils/styles';

const POTION_RECIPES = [
  {
    id: 'health',
    name: 'Health Potion',
    icon: '❤️',
    effect: 'Restores health over time',
    monsterLoot: {
      item: 'Rat Tail',
      amount: 25,
      source: 'Rats'
    },
    vegetable: {
      item: 'Carrot',
      amount: 3,
      growTime: '80 min'
    },
    container: {
      item: 'Bottle',
      amount: 1
    }
  },
  {
    id: 'health_medium',
    name: 'Health Potion (M)',
    icon: '💖',
    effect: 'Restores large amount of health over time',
    monsterLoot: {
      item: 'Troll Blood',
      amount: 8,
      source: 'Trolls'
    },
    vegetable: {
      item: 'Eggplant',
      amount: 6,
      growTime: '120 min'
    },
    container: {
      item: 'Empty Crystal',
      amount: 10
    }
  },
  {
    id: 'speed',
    name: 'Speed Potion',
    icon: '💨',
    effect: 'Increases movement and attack speed',
    monsterLoot: {
      item: 'Wolf Fur',
      amount: 15,
      source: 'Wolves'
    },
    vegetable: {
      item: 'Cauliflower',
      amount: 3,
      growTime: '160 min'
    },
    container: {
      item: 'Bottle',
      amount: 1
    }
  },
  {
    id: 'speed_medium',
    name: 'Speed Potion (M)',
    icon: '🌪️',
    effect: 'Greatly increases movement and attack speed',
    monsterLoot: {
      item: 'Cheetah Essence',
      amount: 12,
      source: 'Shadow Cheetahs'
    },
    vegetable: {
      item: 'Broccoli',
      amount: 6,
      growTime: '240 min'
    },
    container: {
      item: 'Empty Crystal',
      amount: 10
    }
  },
  {
    id: 'defence',
    name: 'Defence Potion',
    icon: '🛡️',
    effect: 'Reduces incoming damage and increases armor',
    monsterLoot: {
      item: 'Bear Claw',
      amount: 18,
      source: 'Bears'
    },
    vegetable: {
      item: 'Onion',
      amount: 5,
      growTime: '96 min'
    },
    container: {
      item: 'Bottle',
      amount: 1
    }
  },
  {
    id: 'agility',
    name: 'Agility Potion',
    icon: '🏃',
    effect: 'Increases dodge chance and critical hit rate',
    monsterLoot: {
      item: 'Spider Silk',
      amount: 40,
      source: 'Spiders'
    },
    vegetable: {
      item: 'Strawberry',
      amount: 12,
      growTime: '40 min'
    },
    container: {
      item: 'Bottle',
      amount: 1
    }
  },
  {
    id: 'strength',
    name: 'Strength Potion',
    icon: '💪',
    effect: 'Increases damage and attack power',
    monsterLoot: {
      item: 'Orc Fang',
      amount: 22,
      source: 'Orcs'
    },
    vegetable: {
      item: 'Turnip',
      amount: 10,
      growTime: '48 min'
    },
    container: {
      item: 'Bottle',
      amount: 1
    }
  },
  {
    id: 'efficiency',
    name: 'Efficiency Potion',
    icon: '⚡',
    effect: 'Improves resource gathering and crafting speed',
    monsterLoot: {
      item: 'Goblin Gear',
      amount: 35,
      source: 'Goblins'
    },
    vegetable: {
      item: 'Potato',
      amount: 30,
      growTime: '16 min'
    },
    container: {
      item: 'Bottle',
      amount: 1
    }
  },
  {
    id: 'precision',
    name: 'Precision Potion',
    icon: '🎯',
    effect: 'Increases accuracy and critical hit chance',
    monsterLoot: {
      item: 'Eagle Eye',
      amount: 6,
      source: 'Giant Eagles'
    },
    vegetable: {
      item: 'Pumpkin',
      amount: 2,
      growTime: '240 min'
    },
    container: {
      item: 'Bottle',
      amount: 1
    }
  },
  {
    id: 'precision_medium',
    name: 'Precision Potion (M)',
    icon: '🔍',
    effect: 'Greatly increases accuracy and critical hit chance',
    monsterLoot: {
      item: 'Basilisk Scale',
      amount: 4,
      source: 'Basilisks'
    },
    vegetable: {
      item: 'Cabbage',
      amount: 4,
      growTime: '360 min'
    },
    container: {
      item: 'Empty Crystal',
      amount: 10
    }
  }
];

const PotionListPage = () => {
  const { darkMode } = useOutletContext();
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link 
            to="/reference" 
            className={`${styles.text.accent} hover:underline`}
          >
            Reference
          </Link>
          <span className={styles.text.muted}>/</span>
          <span className={styles.text.secondary}>Potions</span>
        </nav>
        
        <Link
          to="/reference"
          className={`${styles.button.nav} ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} mt-4 inline-flex items-center`}
        >
          ← Back to Reference
        </Link>
      </div>

      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${styles.text.accent}`}>
          Potions
        </h1>
      </div>

      {/* Potions Table */}
      <div className={styles.card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${styles.border}`}>
                <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[120px]`}>
                  Potion
                </th>
                <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}>
                  Effect
                </th>
                <th className={`py-3 px-3 font-medium ${styles.text.secondary} min-w-[100px] ${
                  darkMode ? 'bg-red-900/20' : 'bg-red-50'
                } border-r border-red-300/30`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">🐺</span>
                    <span className="whitespace-nowrap">Monster Loot</span>
                  </div>
                </th>
                <th className={`py-3 px-2 font-medium ${styles.text.secondary} min-w-[60px] ${
                  darkMode ? 'bg-red-900/20' : 'bg-red-50'
                }`}>
                  <div className="flex items-center justify-center">
                    <span className="text-sm">Qty</span>
                  </div>
                </th>
                <th className={`py-3 px-3 font-medium ${styles.text.secondary} min-w-[100px] ${
                  darkMode ? 'bg-green-900/20' : 'bg-green-50'
                } border-r border-green-300/30`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">🌱</span>
                    <span className="whitespace-nowrap">Vegetable</span>
                  </div>
                </th>
                <th className={`py-3 px-2 font-medium ${styles.text.secondary} min-w-[60px] ${
                  darkMode ? 'bg-green-900/20' : 'bg-green-50'
                }`}>
                  <div className="flex items-center justify-center">
                    <span className="text-sm">Qty</span>
                  </div>
                </th>
                <th className={`py-3 px-3 font-medium ${styles.text.secondary} min-w-[100px] ${
                  darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
                } border-r border-purple-300/30`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">🍶</span>
                    <span className="whitespace-nowrap">Container</span>
                  </div>
                </th>
                <th className={`py-3 px-2 font-medium ${styles.text.secondary} min-w-[60px] ${
                  darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
                }`}>
                  <div className="flex items-center justify-center">
                    <span className="text-sm">Qty</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {POTION_RECIPES.map((potion, index) => (
                <tr key={potion.id} className={`border-b ${
                  darkMode ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  {/* Potion Name & Icon */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{potion.icon}</span>
                      <span className={`font-semibold ${styles.text.primary}`}>
                        {potion.name}
                      </span>
                    </div>
                  </td>

                  {/* Effect Description */}
                  <td className={`py-4 px-4 ${styles.text.secondary}`}>
                    {potion.effect}
                  </td>

                  {/* Monster Loot Item */}
                  <td className={`py-4 px-3 text-center ${
                    darkMode ? 'bg-red-900/10' : 'bg-red-25'
                  } border-r border-red-300/30`}>
                    <div className={styles.text.secondary}>
                      <p className="font-medium">{potion.monsterLoot.item}</p>
                      <p className="text-sm opacity-75">
                        from <a href="#" className={`${styles.text.accent} hover:underline`}>
                          {potion.monsterLoot.source}
                        </a>
                      </p>
                    </div>
                  </td>

                  {/* Monster Loot Quantity */}
                  <td className={`py-4 px-2 text-center ${
                    darkMode ? 'bg-red-900/10' : 'bg-red-25'
                  }`}>
                    <span className={`font-bold text-lg ${styles.text.primary}`}>
                      {potion.monsterLoot.amount}x
                    </span>
                  </td>

                  {/* Vegetable Item */}
                  <td className={`py-4 px-3 text-center ${
                    darkMode ? 'bg-green-900/10' : 'bg-green-25'
                  } border-r border-green-300/30`}>
                    <div className={styles.text.secondary}>
                      <a href="#" className={`font-medium ${styles.text.accent} hover:underline`}>
                        {potion.vegetable.item}
                      </a>
                      <p className="text-sm opacity-75">{potion.vegetable.growTime}</p>
                    </div>
                  </td>

                  {/* Vegetable Quantity */}
                  <td className={`py-4 px-2 text-center ${
                    darkMode ? 'bg-green-900/10' : 'bg-green-25'
                  }`}>
                    <span className={`font-bold text-lg ${styles.text.primary}`}>
                      {potion.vegetable.amount}x
                    </span>
                  </td>

                  {/* Container Item */}
                  <td className={`py-4 px-3 text-center ${
                    darkMode ? 'bg-purple-900/10' : 'bg-purple-25'
                  } border-r border-purple-300/30`}>
                    <div className={styles.text.secondary}>
                      <a href="#" className={`font-medium ${styles.text.accent} hover:underline`}>
                        {potion.container.item}
                      </a>
                    </div>
                  </td>

                  {/* Container Quantity */}
                  <td className={`py-4 px-2 text-center ${
                    darkMode ? 'bg-purple-900/10' : 'bg-purple-25'
                  }`}>
                    <span className={`font-bold text-lg ${styles.text.primary}`}>
                      {potion.container.amount}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PotionListPage;