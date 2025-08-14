// src/components/Table.tsx
import { useStyles } from '@/hooks';
import { useMemo, useState } from 'react';

type CellRenderer<T extends object> = (
  item: T,
  index: number
) => React.ReactNode;
type SortableValue = string | number | boolean | Date;

type SortDirection = 'asc' | 'desc';

type SortState = {
  column: string;
  direction: SortDirection;
} | null;

type Column<T extends object> = {
  header: string;
  accessor?: keyof T | ((item: T) => unknown);
  render?: CellRenderer<T>;
  sortBy?: keyof T | ((item: T) => SortableValue);
  sortable?: boolean; // Auto-inferred from sortBy presence
  defaultSortDirection?: 'asc' | 'desc';
  minWidth?: string;
  headerClassName?: string;
  cellClassName?: string;
};

type TableProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  initialSort?: {
    column: string;
    direction: SortDirection;
  };
};

const Table = <T extends object>({
  data,
  columns,
  className = '',
  initialSort,
}: TableProps<T>) => {
  const { styles } = useStyles();

  // Sort state management
  const [sortState, setSortState] = useState<SortState>(initialSort || null);

  // Auto key generation strategy
  const generateRowKey = (item: T, index: number): string => {
    // Try item.id first, fallback to computed key
    if ('id' in item && typeof item.id === 'string') {
      return `${item.id}_${index}`;
    }
    // Generate from available properties
    if ('name' in item && typeof item.name === 'string') {
      return `${item.name.toLowerCase().replace(/\s+/g, '_')}_${index}`;
    }
    // Last resort
    return `item_${index}`;
  };

  const generateColumnKey = (column: Column<T>, index: number): string => {
    // Use header as basis for column key
    return column.header.toLowerCase().replace(/\s+/g, '_') + `_${index}`;
  };

  // Handle header click for sorting
  const handleHeaderClick = (column: Column<T>) => {
    if (!column.sortBy) return; // Not sortable

    const columnKey = column.header.toLowerCase().replace(/\s+/g, '_');

    if (!sortState || sortState.column !== columnKey) {
      // New column - use default direction or 'asc'
      setSortState({
        column: columnKey,
        direction: column.defaultSortDirection || 'asc',
      });
    } else {
      // Same column - toggle direction
      setSortState({
        column: columnKey,
        direction: sortState.direction === 'asc' ? 'desc' : 'asc',
      });
    }
  };

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState) return data;

    const sortColumn = columns.find(
      col => col.header.toLowerCase().replace(/\s+/g, '_') === sortState.column
    );

    if (!sortColumn || !sortColumn.sortBy) return data;

    const sorted = [...data].sort((a, b) => {
      let aVal: SortableValue;
      let bVal: SortableValue;

      if (typeof sortColumn.sortBy === 'function') {
        aVal = sortColumn.sortBy(a);
        bVal = sortColumn.sortBy(b);
      } else {
        // sortColumn.sortBy is keyof T at this point
        const key = sortColumn.sortBy as keyof T;
        aVal = a[key] as SortableValue;
        bVal = b[key] as SortableValue;
      }

      // Handle null/undefined values
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Compare values
      if (aVal < bVal) return sortState.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortState, columns]);

  // Get sort indicator for column
  const getSortIndicator = (column: Column<T>) => {
    if (!column.sortBy) return null;

    const columnKey = column.header.toLowerCase().replace(/\s+/g, '_');
    const isActive = sortState?.column === columnKey;

    if (!isActive) return null;

    return sortState.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className={`border-b-2 ${styles.border}`}>
            {columns.map((column, index) => (
              <th
                key={generateColumnKey(column, index)}
                scope="col"
                className={`text-left py-3 px-4 font-medium ${styles.text.secondary} ${
                  column.minWidth ? `min-w-[${column.minWidth}]` : ''
                } ${column.headerClassName || ''} ${
                  column.sortBy
                    ? 'cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition-colors'
                    : ''
                }`}
                onClick={() => handleHeaderClick(column)}
              >
                {column.header}
                {getSortIndicator(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, rowIndex) => (
            <tr
              key={generateRowKey(item, rowIndex)}
              className={`border-b ${styles.border}`}
            >
              {columns.map((column, colIndex) => {
                let cellContent: React.ReactNode;

                if (column.render) {
                  cellContent = column.render(item, rowIndex);
                } else if (column.accessor) {
                  const value =
                    typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : item[column.accessor];
                  cellContent = value as React.ReactNode;
                } else {
                  cellContent = null;
                }

                return (
                  <td
                    key={generateColumnKey(column, colIndex)}
                    className={`py-4 px-4 ${column.cellClassName || styles.text.secondary}`}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
export type { Column, TableProps };
