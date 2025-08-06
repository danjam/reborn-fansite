// src/pages/reference/MonstersPage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../../utils/styles';

const MONSTERS_DATA = [
  {
    id: 'rats',
    name: 'Rats',
    icon: '🐀',
    lootDrop: 'Rat Tail',
    floors: '1-5',
    boss: false
  },
  {
    id: 'goblins',
    name: 'Goblins',
    icon: '👹',
    lootDrop: 'Goblin Gear',
    floors: '3-12',
    boss: false
  },
  {
    id: 'spiders',
    name: 'Spiders',
    icon: '🕷️',
    lootDrop: 'Spider Silk',
    floors: '8-18',
    boss: false
  },
  {
    id: 'wolves',
    name: 'Wolves',
    icon: '🐺',
    lootDrop: 'Wolf Fur',
    floors: '15-28',
    boss: false
  },
  {
    id: 'bears',
    name: 'Bears',
    icon: '🐻',
    lootDrop: 'Bear Claw',
    floors: '25-40',
    boss: false
  },
  {
    id: 'orcs',
    name: 'Orcs',
    icon: '👺',
    lootDrop: 'Orc Fang',
    floors: '35-55',
    boss: false
  },
  {
    id: 'ancient_dragon',
    name: 'Ancient Dragon',
    icon: '🐉',
    lootDrop: 'Troll Blood',
    floors: '50',
    boss: true
  },
  {
    id: 'giant_eagles',
    name: 'Giant Eagles',
    icon: '🦅',
    lootDrop: 'Eagle Eye',
    floors: '70-95',
    boss: false
  },
  {
    id: 'shadow_cheetah',
    name: 'Shadow Cheetah',
    icon: '🐆',
    lootDrop: 'Cheetah Essence',
    floors: '100',
    boss: true
  },
  {
    id: 'basilisk',
    name: 'Basilisk',
    icon: '🐍',
    lootDrop: 'Basilisk Scale',
    floors: '200',
    boss: true
  }
];

const MonstersPage = () => {
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
          <span className={styles.text.secondary}>Monsters</span>
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
          🐺 Monsters
        </h1>
      </div>

      {/* Monsters Table */}
      <div className={styles.card}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${styles.border}`}>
                <th className={`text-left py-3 px-4 font-medium ${styles.text.secondary} min-w-[140px]`}>
                  Monster
                </th>
                <th className={`py-3 px-3 font-medium ${styles.text.secondary} min-w-[120px]`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">💎</span>
                    <span className="whitespace-nowrap">Loot Drop</span>
                  </div>
                </th>
                <th className={`py-3 px-2 font-medium ${styles.text.secondary} min-w-[80px]`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">🏰</span>
                    <span className="whitespace-nowrap">Floor(s)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {MONSTERS_DATA.map((monster, index) => (
                <tr key={monster.id} className={`border-b ${
                  darkMode ? 'border-gray-700' : 'border-gray-100'
                } ${monster.boss ? (darkMode ? 'bg-red-900/10' : 'bg-red-50') : ''}`}>
                  {/* Monster Name & Icon */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{monster.icon}</span>
                      <span className={`font-semibold ${styles.text.primary} ${monster.boss ? 'text-red-500' : ''}`}>
                        {monster.name}
                        {monster.boss && <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">BOSS</span>}
                      </span>
                    </div>
                  </td>

                  {/* Loot Drop */}
                  <td className="py-4 px-3 text-center">
                    <div className={styles.text.secondary}>
                      <a href="#" className={`font-medium ${styles.text.accent} hover:underline`}>
                        {monster.lootDrop}
                      </a>
                    </div>
                  </td>

                  {/* Floor(s) */}
                  <td className="py-4 px-2 text-center">
                    <span className={`font-bold text-lg ${styles.text.primary}`}>
                      {monster.floors}
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

export default MonstersPage;