// src/pages/reference/VillagersPage.tsx
import PageHeader from '@/components/PageHeader';
import { useTheme } from '@/hooks/useTheme';

type Villager = {
  name: string;
  icon: string;
  id: string;
  specialFunction?: string;
  description?: string;
  title?: string;
};

const SPECIAL_VILLAGERS: Villager[] = [
  {
    id: 'diogo',
    name: 'Diogo',
    icon: '🏪',
    specialFunction: 'General Store Owner',
    description: 'Sells basic supplies, tools, and provisions',
  },
  {
    id: 'holden',
    name: 'Holden',
    icon: '🔨',
    specialFunction: 'Master Blacksmith',
    description: 'Forges and upgrades weapons and armor',
  },
  {
    id: 'marius',
    name: 'Marius',
    icon: '⚗️',
    specialFunction: 'Village Alchemist',
    description: 'Brews potions and sells magical ingredients',
  },
  {
    id: 'rocky',
    name: 'Rocky',
    icon: '⛏️',
    specialFunction: 'Quarry Master',
    description: 'Manages mining operations and sells stone materials',
  },
  {
    id: 'shelbs',
    name: 'Shelbs',
    icon: '🍺',
    specialFunction: 'Tavern Keeper',
    description: 'Runs the village inn and serves hearty meals',
  },
];

const ORCS = [
  { id: 'copperorc', name: 'Copper Orc', icon: '🟫' },
  { id: 'forestorc', name: 'Forest Orc', icon: '🌲' },
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
  { id: 'shyble', name: 'Shyble', icon: '👩' },
];

const VillagersPage = () => {
  const theme = useTheme();

  const renderVillagerCard = (villager: Villager, showFunction = false) => (
    <div key={villager.id} className={`${theme.card()} hover:scale-105`}>
      <div className="flex items-start space-x-4">
        <div className="text-4xl flex-shrink-0">{villager.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold ${theme.text.primary} mb-1`}>
            {villager.name}
            {villager.title && (
              <span
                className={`block text-sm font-normal ${theme.text.accent}`}
              >
                {villager.title}
              </span>
            )}
          </h3>
          {showFunction && villager.specialFunction && (
            <p className={`text-sm font-medium ${theme.text.accent} mb-2`}>
              {villager.specialFunction}
            </p>
          )}
          {villager.description && (
            <p className={`text-sm ${theme.text.secondary}`}>
              {villager.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="🏘️ Village NPCs & Quests"
        description="Meet the colorful cast of characters that call the village home. Each has their own story, services, and role in your journey."
      />

      {/* Special NPCs Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${theme.text.primary}`}>
          🔧 Special Function NPCs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SPECIAL_VILLAGERS.map(villager =>
            renderVillagerCard(villager, true)
          )}
        </div>
      </div>

      {/* Orcs Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${theme.text.primary}`}>
          🛡️ Friendly Orcs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ORCS.map(villager => renderVillagerCard(villager))}
        </div>
      </div>

      {/* Regular Villagers Section */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${theme.text.primary}`}>
          👥 Village Residents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {REGULAR_VILLAGERS.map(villager => renderVillagerCard(villager))}
        </div>
      </div>
    </div>
  );
};

export default VillagersPage;
