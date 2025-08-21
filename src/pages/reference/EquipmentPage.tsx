// src/pages/reference/EquipmentPage.tsx
import { useMemo } from 'react';

import MaterialsList from '@/components/MaterialsList';
import PageHeader from '@/components/PageHeader';
import Table, { type Column } from '@/components/Table';
import TextWithIcon from '@/components/TextWithIcon';
import { useTheme } from '@/hooks/useTheme';

import type { Equipment } from '@/gameData';
import { gameData } from '@/gameData';

const EquipmentPage = () => {
  const theme = useTheme();

  // Memoize data fetching - stable reference from GameDataService
  const equipment = useMemo(() => gameData.getAllEquipment(), []);

  // Helper function to extract material type from equipment ID
  const getMaterialType = (equipmentId: string): string => {
    // Handle special cases first
    if (equipmentId.includes('starter')) return 'starter';
    if (equipmentId.includes('leather')) return 'leather';
    if (equipmentId.includes('stone')) return 'stone';
    if (equipmentId.includes('copper')) return 'copper';
    if (equipmentId.includes('iron')) return 'iron';
    if (equipmentId.includes('gold')) return 'gold';
    if (equipmentId.includes('diamond')) return 'diamond';

    // Fallback to last part after underscore
    const parts = equipmentId.split('_');
    return parts[parts.length - 1] || 'unknown';
  };

  // Helper function to get material priority for sorting
  const getMaterialPriority = (material: string): number => {
    const materialOrder: Record<string, number> = {
      leather: 1,
      starter: 1, // Group starter with leather
      stone: 1, // Group stone with leather
      copper: 2,
      iron: 3,
      gold: 4,
      diamond: 5,
    };
    return materialOrder[material] || 999;
  };

  // Helper function to format slot name
  const formatSlot = (slot: string) => {
    return slot.charAt(0).toUpperCase() + slot.slice(1);
  };

  // Memoized column definitions to prevent Table re-renders
  const columns: Column<Equipment>[] = useMemo(
    () => [
      {
        header: 'Equipment',
        minWidth: '200px',
        cellClassName: theme.text.primary,
        sortBy: equipment => {
          const material = getMaterialType(equipment.id);
          const priority = getMaterialPriority(material);
          return `${priority.toString().padStart(3, '0')}-${equipment.slot}-${equipment.name}`;
        },
        defaultSortDirection: 'asc', // Ensure ascending order by default
        render: equipment => (
          <TextWithIcon
            item={equipment}
            linkTo={`/data/equipment/${equipment.id}`}
            textClassName={`font-medium ${theme.text.primary} hover:underline`}
            iconSize="lg"
          />
        ),
      },
      {
        header: 'Slot',
        minWidth: '100px',
        sortBy: 'slot', // Sort alphabetically by slot type
        render: equipment => (
          <span className={`text-sm font-medium ${theme.text.secondary}`}>
            {formatSlot(equipment.slot)}
          </span>
        ),
      },
      {
        header: 'Sell Price',
        minWidth: '80px',
        sortBy: equipment => equipment.sell_price || 0, // Sort numerically, treat null as 0
        defaultSortDirection: 'desc', // Show highest prices first by default
        render: equipment => (
          <span className={`font-medium ${theme.text.secondary}`}>
            {equipment.sell_price !== null
              ? equipment.sell_price.toLocaleString()
              : 'Cannot sell'}
          </span>
        ),
      },
      {
        header: 'Materials Required',
        minWidth: '200px',
        // No sortBy - complex MaterialsList component
        render: equipment =>
          equipment.materials && equipment.materials.length > 0 ? (
            <MaterialsList materials={equipment.materials} />
          ) : (
            <span className={`text-sm ${theme.text.muted}`}>n/a</span>
          ),
      },
    ],
    [theme.text.primary, theme.text.secondary, theme.text.muted]
  );

  return (
    <div>
      <PageHeader
        title="Equipment"
        description="Complete list of all equipment items, their crafting materials, and slot assignments. Gear up for your adventures!"
      />

      {/* Equipment Table */}
      <div className={theme.card()}>
        <Table
          data={equipment}
          columns={columns}
          initialSort={{ column: 'equipment', direction: 'asc' }}
        />
      </div>
    </div>
  );
};

export default EquipmentPage;
