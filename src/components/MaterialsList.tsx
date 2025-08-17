// src/components/MaterialsList.tsx
import { FC, memo, useMemo } from 'react';

import TextWithIcon from '@/components/TextWithIcon';
import { gameData } from '@/gameData';
import { Material } from '@/types';
import { getMaterialStyle } from '@/utils/gameObjectHelpers';

interface MaterialsListProps {
  materials: Material[];
  className?: string;
}

const MaterialsList: FC<MaterialsListProps> = memo(
  ({ materials, className = '' }) => {
    // Memoize all the expensive lookups and calculations
    // Only recomputes when materials array changes
    const materialData = useMemo(
      () =>
        materials.map(material => ({
          ...material,
          data: gameData.getObjectById(material.id),
          style: getMaterialStyle(material.id),
          // Pre-compute fallback name to avoid repeated string operations
          fallbackName: material.id
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase()),
        })),
      [materials]
    );

    return (
      <div className={`space-y-2 ${className}`}>
        {materialData.map((material, index) => (
          <div
            key={`${material.id}-${material.quantity}-${index}`}
            className={`${material.style.classes} p-2 rounded border`}
          >
            <div className="text-sm flex items-center justify-between">
              {material.data ? (
                <TextWithIcon item={material.data} iconSize="sm" />
              ) : (
                <span>{material.fallbackName}</span>
              )}
              <span className="font-medium">x{material.quantity}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

// Add display name for better debugging
MaterialsList.displayName = 'MaterialsList';

export default MaterialsList;
