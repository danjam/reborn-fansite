// src/pages/reference/VillagersPage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../../utils/styles';

const SPECIAL_VILLAGERS = [
  {
    id: 'holden',
    name: 'Holden',
    icon: '🔨',
    specialFunction: 'Master Blacksmith',
    description: 'Forges and upgrades weapons and armor'
  },
  {
    id: 'marius',
    name: 'Marius',
    icon: '⚗️',
    specialFunction: 'Village Alchemist',
    description: 'Brews potions and sells magical ingredients'
  },
  {
    id: 'diogo',
    name: 'Diogo',
    icon: '🏪',
    specialFunction: 'General Store Owner',
    description: 'Sells basic supplies, tools, and provisions'
  },
  {
    id: 'rocky',
    name: 'Rocky',
    icon: '⛏️',
    specialFunction: 'Quarry Master',
    description: 'Manages mining operations and sells stone materials'
  },
  {
    id: 'shelbs',
    name: 'Shelbs',
    icon: '🍺',
    specialFunction: 'Tavern Keeper',
    description: 'Runs the village inn and serves hearty meals'
  }
];

const ORCS = [
  { name: 'Forest Orc', icon: '🌲' },
  { name: 'Copper Orc', icon: '🟫' }
];

const REGULAR_VILLAGERS = [
  { name: 'Korben', icon: '👨' },
  { name: 'Milan', icon: '👩' },
  { name: 'Elke', icon: '👨' },
  { name: 'Shyble', icon: '👩' },
  { name: 'Bleshy', icon: '👨' },
  { name: 'Katya', icon: '👩' },
  { name: 'Anthony', icon: '👨' },
  { name: 'Reid', icon: '👨' },
  { name: 'Mayor', icon: '👑' },
  { name: 'Reya', icon: '👩' },
  { name: 'Benson', icon: '👨' },
  { name: 'Anion', icon: '👨' },
  { name: 'Matthew', icon: '❓' }
];

const VillagersPage = () => {
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
          <span className={styles.text.secondary}>Village NPCs & Quests</span>
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
          🏘️ Village NPCs & Quests
        </h1>
      </div>

      <div className="space-y-12">
        {/* Special Function Villagers */}
        <div>
          <h2 className={`text-2xl font-semibold mb-6 ${styles.text.primary}`}>
            ⭐ Special Services
          </h2>
          <div className={styles.card}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b-2 ${styles.border}`}>
                    <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[140px]`}>
                      Villager
                    </th>
                    <th className={`py-3 px-3 font-medium ${styles.text.secondary} min-w-[150px]`}>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">⚡</span>
                        <span className="whitespace-nowrap">Special Function</span>
                      </div>
                    </th>
                    <th className={`py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">📝</span>
                        <span className="whitespace-nowrap">Description</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SPECIAL_VILLAGERS.map((villager, index) => (
                    <tr key={villager.id} className={`border-b ${
                      darkMode ? 'border-gray-700' : 'border-gray-100'
                    }`}>
                      {/* Villager Name & Icon */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{villager.icon}</span>
                          <span className={`font-semibold ${styles.text.primary}`}>
                            {villager.name}
                          </span>
                        </div>
                      </td>

                      {/* Special Function */}
                      <td className="py-4 px-3 text-center">
                        <span className={`font-medium ${styles.text.accent}`}>
                          {villager.specialFunction}
                        </span>
                      </td>

                      {/* Description */}
                      <td className={`py-4 px-4 ${styles.text.secondary}`}>
                        {villager.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Regular Villagers */}
        <div>
          <h2 className={`text-2xl font-semibold mb-6 ${styles.text.primary}`}>
            👥 Village Residents
          </h2>
          <div className={styles.card}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {REGULAR_VILLAGERS.map((villager, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'
                } transition-colors`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{villager.icon}</span>
                    <span className={`font-medium ${styles.text.primary}`}>
                      {villager.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orcs */}
        <div>
          <h2 className={`text-2xl font-semibold mb-6 ${styles.text.primary}`}>
            👺 Orcs
          </h2>
          <div className={styles.card}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ORCS.map((orc, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'
                } transition-colors`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{orc.icon}</span>
                    <span className={`font-medium ${styles.text.primary}`}>
                      {orc.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillagersPage;