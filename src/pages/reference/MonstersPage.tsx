// src/pages/reference/MonstersPage.tsx
import { Link, useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { createStyles } from '../../utils/styles';

const MONSTERS_DATA = [
  {
    id: 'baby_slime_red',
    name: 'Baby Slime (Red)',
    icon: '🟥',
    lootDrop: 'Tiny Slime Gel',
    floors: '1-9',
    boss: false
  },
  {
    id: 'slime_red',
    name: 'Slime (Red)',
    icon: '🔴',
    lootDrop: 'Slime Gel',
    floors: '1-19',
    boss: false
  },
  {
    id: 'baby_slime_blue',
    name: 'Baby Slime (Blue)',
    icon: '🟦',
    lootDrop: 'Crystallized Slime',
    floors: '10',
    boss: true
  },
  {
    id: 'rat_purple',
    name: 'Rat (Purple)',
    icon: '🐀',
    lootDrop: 'Rat Whisker',
    floors: '11-29',
    boss: false
  },
  {
    id: 'slime_blue',
    name: 'Slime (Blue)',
    icon: '🔵',
    lootDrop: 'Frost Slime Core',
    floors: '20',
    boss: true
  },
  {
    id: 'fungus_brown',
    name: 'Fungus (Brown)',
    icon: '🍄',
    lootDrop: 'Spore Dust',
    floors: '21-39',
    boss: false
  },
  {
    id: 'rat_red',
    name: 'Rat (Red)',
    icon: '🐁',
    lootDrop: 'Crimson Fang',
    floors: '30',
    boss: true
  },
  {
    id: 'bat_purple',
    name: 'Bat (Purple)',
    icon: '🦇',
    lootDrop: 'Bat Wing',
    floors: '31-49',
    boss: false
  },
  {
    id: 'fungus_purple',
    name: 'Fungus (Purple)',
    icon: '🟣',
    lootDrop: 'Toxic Mushroom Cap',
    floors: '40',
    boss: true
  },
  {
    id: 'snake_purple',
    name: 'Snake (Purple)',
    icon: '🐍',
    lootDrop: 'Snake Scale',
    floors: '41-59',
    boss: false
  },
  {
    id: 'bat_red',
    name: 'Bat (Red)',
    icon: '🩸',
    lootDrop: 'Blood Wing',
    floors: '50',
    boss: true
  },
  {
    id: 'orbinaut_red',
    name: 'Orbinaut (Red)',
    icon: '⚡',
    lootDrop: 'Metal Core',
    floors: '51-69',
    boss: false
  },
  {
    id: 'snake_green',
    name: 'Snake (Green)',
    icon: '🟢',
    lootDrop: 'Venom Sac',
    floors: '60',
    boss: true
  },
  {
    id: 'skeleton_white',
    name: 'Skeleton (White)',
    icon: '💀',
    lootDrop: 'Bone Fragment',
    floors: '61-79',
    boss: false
  },
  {
    id: 'orbinaut_fire',
    name: 'Orbinaut (Fire)',
    icon: '🔥',
    lootDrop: 'Flame Core',
    floors: '70',
    boss: true
  },
  {
    id: 'ghost_white',
    name: 'Ghost (White)',
    icon: '👻',
    lootDrop: 'Ectoplasm',
    floors: '71-89',
    boss: false
  },
  {
    id: 'skeleton_brown',
    name: 'Skeleton (Brown)',
    icon: '🦴',
    lootDrop: 'Ancient Skull',
    floors: '80',
    boss: true
  },
  {
    id: 'orc_bald',
    name: 'Orc (Bald)',
    icon: '👹',
    lootDrop: 'Orc Hide',
    floors: '81-99',
    boss: false
  },
  {
    id: 'ghost_green',
    name: 'Ghost (Green)',
    icon: '🟩',
    lootDrop: 'Spirit Essence',
    floors: '90',
    boss: true
  },
  {
    id: 'zombie_green',
    name: 'Zombie (Green)',
    icon: '🧟',
    lootDrop: 'Rotten Flesh',
    floors: '91-199',
    boss: false
  },
  {
    id: 'zombie_boss',
    name: 'Zombie (Boss)',
    icon: '🧟‍♂️',
    lootDrop: 'Necrotic Heart',
    floors: '100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200',
    boss: true
  },
  {
    id: 'zombie_blue',
    name: 'Zombie (Blue)',
    icon: '🧟‍♀️',
    lootDrop: 'Frozen Flesh',
    floors: '101-199',
    boss: false
  },
  {
    id: 'zombie_purple',
    name: 'Zombie (Purple)',
    icon: '☠️',
    lootDrop: 'Infected Blood',
    floors: '101-199',
    boss: false
  },
  {
    id: 'zombie_yellow',
    name: 'Zombie (Yellow)',
    icon: '🧌',
    lootDrop: 'Diseased Bone',
    floors: '101-199',
    boss: false
  },
  {
    id: 'zombie_red',
    name: 'Zombie (Red)',
    icon: '🩸',
    lootDrop: 'Crimson Gore',
    floors: '101-199',
    boss: false
  },
  {
    id: 'zombie_aqua',
    name: 'Zombie (Aqua)',
    icon: '🌊',
    lootDrop: 'Waterlogged Remains',
    floors: '101-199',
    boss: false
  }
];

const MonstersPage = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
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
          Monsters
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
                <th className={`text-left py-3 px-3 font-medium ${styles.text.secondary} min-w-[120px]`}>
                  Loot Drop
                </th>
                <th className={`text-left py-3 px-2 font-medium ${styles.text.secondary} min-w-[80px]`}>
                  Floor(s)
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
                        {monster.boss && <span className="ml-2 text-[10px] bg-red-500 text-white px-1 py-0.5 rounded-full">BOSS</span>}
                      </span>
                    </div>
                  </td>

                  {/* Loot Drop */}
                  <td className="py-4 px-3">
                    <a href="#" className={`font-medium ${styles.text.accent} hover:underline`}>
                      {monster.lootDrop}
                    </a>
                  </td>

                  {/* Floor(s) */}
                  <td className="py-4 px-2">
                    <span className={`font-bold ${styles.text.primary}`}>
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