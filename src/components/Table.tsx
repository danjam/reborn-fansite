// src/components/Table.tsx
import { memo, ReactNode, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';

import { useTheme } from '@/hooks/useTheme';

type CellRenderer<T extends object> = (item: T, index: number) => ReactNode;
type SortableValue = string | number | boolean | Date;

type SortDirection = 'asc' | 'desc';

type SortState = {
  column: string;
  direction: SortDirection;
} | null;

export type Column<T extends object> = {
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

export type TableProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  initialSort?: {
    column: string;
    direction: SortDirection;
  };
};

// Create the component using memo with displayName defined inside
const Table = memo(function Table<T extends object>({
  data,
  columns,
  className = '',
  initialSort,
}: TableProps<T>) {
  const theme = useTheme();

  // Initialize sort state
  const [sortState, setSortState] = useState<SortState>(initialSort || null);

  // Memoize column key generation
  const getColumnKey = useCallback((header: string) => {
    return header.toLowerCase().replace(/\s+/g, '_');
  }, []);

  // Generate row keys for React key prop
  const generateRowKey = useCallback((item: T, index: number): string => {
    // Try to use an 'id' field if available, otherwise use index
    if (typeof item === 'object' && item !== null && 'id' in item) {
      return String(item.id);
    }
    return `row-${index}`;
  }, []);

  // Generate column keys for React key prop
  const generateColumnKey = useCallback(
    (column: Column<T>, index: number): string => {
      return `${getColumnKey(column.header)}-${index}`;
    },
    [getColumnKey]
  );

  // Memoize column key mappings for sorting
  const columnKeyMap = useMemo(() => {
    const map = new Map<string, Column<T>>();
    columns.forEach(column => {
      map.set(getColumnKey(column.header), column);
    });
    return map;
  }, [columns, getColumnKey]);

  // Handle column header clicks for sorting
  const handleHeaderClick = useCallback(
    (column: Column<T>) => {
      if (!column.sortBy) return;

      const columnKey = getColumnKey(column.header);

      setSortState(prevState => {
        if (prevState?.column === columnKey) {
          // Toggle direction for same column
          return {
            column: columnKey,
            direction: prevState.direction === 'asc' ? 'desc' : 'asc',
          };
        } else {
          // New column - use default or 'asc'
          return {
            column: columnKey,
            direction: column.defaultSortDirection || 'asc',
          };
        }
      });
    },
    [getColumnKey]
  );

  // Sort data based on current sort state
  // Optimized dependencies - only recompute when data or sort state changes
  const sortedData = useMemo(() => {
    if (!sortState) return data;

    const sortColumn = columnKeyMap.get(sortState.column);
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
  }, [data, sortState, columnKeyMap]);

  // Get sort indicator for column - memoized to prevent recalculation
  const getSortIndicator = useCallback(
    (column: Column<T>) => {
      if (!column.sortBy) return null;

      const columnKey = getColumnKey(column.header);
      const isActive = sortState?.column === columnKey;

      if (!isActive) return null;

      return sortState.direction === 'asc' ? ' ▲' : ' ▼';
    },
    [sortState, getColumnKey]
  );

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className={clsx('border-b-2', theme.border.default)}>
            {columns.map((column, index) => (
              <th
                key={generateColumnKey(column, index)}
                scope="col"
                className={clsx(
                  'text-left py-3 px-4 font-medium',
                  theme.text.secondary,
                  column.minWidth ? `min-w-[${column.minWidth}]` : '',
                  column.headerClassName,
                  column.sortBy && [
                    'cursor-pointer transition-colors',
                    theme.darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  ]
                )}
                style={
                  column.minWidth ? { minWidth: column.minWidth } : undefined
                }
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
              className={theme.tableRow()}
            >
              {columns.map((column, colIndex) => {
                let cellContent: ReactNode;

                if (column.render) {
                  cellContent = column.render(item, rowIndex);
                } else if (column.accessor) {
                  if (typeof column.accessor === 'function') {
                    cellContent = String(column.accessor(item));
                  } else {
                    cellContent = String(item[column.accessor]);
                  }
                } else {
                  cellContent = '';
                }

                return (
                  <td
                    key={`${generateRowKey(item, rowIndex)}_${generateColumnKey(column, colIndex)}`}
                    className={clsx('py-3 px-4', column.cellClassName)}
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
}) as <T extends object>(props: TableProps<T>) => JSX.Element;

export default Table;