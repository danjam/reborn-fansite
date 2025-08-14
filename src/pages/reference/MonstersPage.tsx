// src/pages/reference/MonstersPage.tsx
import PageHeader from '@/components/PageHeader';
import { PixelArtImage } from '@/components/PixelArtImage';
import Table, { type Column } from '@/components/Table';
import { useStyles } from '@/hooks';

import type { Monster } from '../../gameData';
import { gameData } from '../../gameData';

const MonstersPage = () => {
  const { styles } = useStyles();
  const monsters = gameData.getAllMonsters();

  const columns: Column<Monster>[] = [
    {
      header: 'Monster',
      minWidth: '140px',
      cellClassName: styles.text.primary,
      sortBy: 'name', // Sort alphabetically by monster name
      render: monster => (
        <div className="flex items-center space-x-3">
          <PixelArtImage
            src={monster.icon}
            alt={monster.name}
            className="w-16 h-16 object-contain"
          />
          <span className={`font-semibold ${styles.text.primary}`}>
            {monster.name}
            {monster.boss && (
              <span className="ml-2 text-[10px] bg-red-500 text-white px-1 py-0.5 rounded-full">
                BOSS
              </span>
            )}
          </span>
        </div>
      ),
    },
    {
      header: 'Loot Drops',
      minWidth: '120px',
      // No sortBy - complex JSX content with multiple drops
      render: monster => {
        const monsterDrops = gameData.getDropsByMonsterId(monster.id);

        if (monsterDrops.length === 0) {
          return null;
        }

        return (
          <div className="flex flex-wrap gap-2">
            {monsterDrops.map(drop => (
              <div key={drop.id} className="flex items-center space-x-2">
                <PixelArtImage
                  src={drop.icon}
                  alt={drop.name}
                  className="w-4 h-4 object-contain"
                />
                <span className="text-sm">{drop.name}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      header: 'Floor(s)',
      minWidth: '80px',
      // No sortBy - complex floor ranges would be confusing to sort
      render: monster => (
        <span className={styles.text.primary}>{monster.displayFloors()}</span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Monsters"
        description="Comprehensive guide to all monsters, their loot drops, and floor locations. Find out what each creature drops and where to encounter them."
      />

      {/* Monsters Table */}
      <div className={styles.card}>
        <Table
          data={monsters}
          columns={columns}
          initialSort={{ column: 'monster', direction: 'asc' }}
        />
      </div>
    </div>
  );
};

export default MonstersPage;
