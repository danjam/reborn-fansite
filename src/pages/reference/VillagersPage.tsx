// src/pages/reference/VillagersPage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../../utils/styles';

type Villager = {
  name: string;
  icon: string;
  id: string;
  specialFunction?: string;
  description?: string;
  title?: string;
}

const PLAYER_CHARACTER: Villager = {
  id: 'katie',
  name: 'Katie',
  title: 'The Reborn',
  icon: '/static/img/logo.png',
  description: 'The legendary reborn hero, destined to grow stronger with each death and rebirth (this is you!)'
};

const SPECIAL_VILLAGERS: Villager[] = [
  {
    id: 'diogo',
    name: 'Diogo',
    icon: '🏪',
    specialFunction: 'General Store Owner',
    description: 'Sells basic supplies, tools, and provisions'
  },
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
  { id: 'copperorc', name: 'Copper Orc', icon: '🟫' },
  { id: 'forestorc', name: 'Forest Orc', icon: '🌲' }
];

const REGULAR_VILLAGERS = [
  { id: 'anion', name: 'Anion', icon: '👨' },
  { id: 'anthony', name: 'Anthony', icon: '👨' },
  { id: 'benson', name: 'Benson', icon: '👨' },
  { id: 'bleshy', name: 'Bleshy', icon: '👨' },
  { id: 'elke', name: 'Elke', icon: '👨' },
  { id: 'katya', name: 'Katya', icon: '👩' },
  { id: 'korben', name: 'Korben', icon: '👨' },
  { id: 'matthew', name: 'Matthew', icon: '❓' },
  { id: 'mayor', name: 'Mayor', icon: '👑' },
  { id: 'milan', name: 'Milan', icon: '👩' },
  { id: 'reid', name: 'Reid', icon: '👨' },
  { id: 'reya', name: 'Reya', icon: '👩' },
  { id: 'shyble', name: 'Shyble', icon: '👩' }
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
        {/* Player Character - The Reborn */}
        <div>
          <h2 className={`text-2xl font-semibold mb-6 ${styles.text.primary}`}>
            The Reborn
          </h2>
          <div className={styles.card}>
            <div className={`relative p-8 rounded-xl border-2 bg-gradient-to-br ${
              darkMode 
                ? 'from-purple-900/30 via-blue-900/30 to-green-900/30 border-purple-500/50' 
                : 'from-purple-100 via-blue-100 to-green-100 border-purple-400'
            } shadow-lg hover:shadow-xl transition-all duration-300 group`}>
              {/* Animated glow effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                darkMode 
                  ? 'from-purple-500/20 via-blue-500/20 to-green-500/20' 
                  : 'from-purple-300/30 via-blue-300/30 to-green-300/30'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>
              
              <div className="relative z-10 text-center">
                <div className="mb-6">
                  <img 
                    src={PLAYER_CHARACTER.icon} 
                    alt="Reborn Logo" 
                    className="w-16 h-16 mx-auto"
                  />
                </div>
                <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${
                  darkMode 
                    ? 'from-purple-300 via-blue-300 to-green-300' 
                    : 'from-purple-600 via-blue-600 to-green-600'
                } bg-clip-text text-transparent`}>
                  {PLAYER_CHARACTER.name}
                </h3>
                <p className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-600'
                }`}>
                  {PLAYER_CHARACTER.title}
                </p>
                <p className={`text-lg leading-relaxed ${styles.text.secondary} max-w-md mx-auto`}>
                  {PLAYER_CHARACTER.description}
                </p>
                
                {/* Special accent bars */}
                <div className="mt-6 flex justify-center space-x-2">
                  <div className={`h-1 w-8 rounded-full ${
                    darkMode ? 'bg-purple-400' : 'bg-purple-500'
                  }`}></div>
                  <div className={`h-1 w-8 rounded-full ${
                    darkMode ? 'bg-blue-400' : 'bg-blue-500'
                  }`}></div>
                  <div className={`h-1 w-8 rounded-full ${
                    darkMode ? 'bg-green-400' : 'bg-green-500'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Function Villagers */}
        <div>
          <h2 className={`text-2xl font-semibold mb-6 ${styles.text.primary}`}>
            Special Services
          </h2>
          <div className={styles.card}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b-2 ${styles.border}`}>
                    <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[140px]`}>
                      Villager
                    </th>
                    <th className={`text-left py-3 px-3 font-medium ${styles.text.secondary} min-w-[150px]`}>
                      Special Function
                    </th>
                    <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[200px]`}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SPECIAL_VILLAGERS.map((villager: Villager) => (
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
                      <td className="py-4 px-3 text-left">
                        <span className={`font-medium ${styles.text.accent}`}>
                          {villager.specialFunction}
                        </span>
                      </td>

                      {/* Description */}
                      <td className={`py-4 px-4 text-left ${styles.text.secondary}`}>
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
            Village Residents
          </h2>
          <div className={styles.card}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {REGULAR_VILLAGERS.map((villager: Villager) => (
                <div key={villager.id} className={`p-4 rounded-lg border ${
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
              {ORCS.map((orc: Villager) => (
                <div key={orc.id} className={`p-4 rounded-lg border ${
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