// src/components/MaterialsList.tsx
import TextWithIcon from '@/components/TextWithIcon';
import { Material } from '@/data';
import { gameData } from '@/gameData';
import { getMaterialStyle } from '@/utils/gameObjectHelpers';

interface MaterialsListProps {
  materials: Material[];
  className?: string;
}

const MaterialsList: React.FC<MaterialsListProps> = ({
  materials,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {materials.map((material, index) => {
        const materialData = gameData.getObjectById(material.id);
        const materialStyle = getMaterialStyle(material.id);

        return (
          <div
            key={`${material.id}-${material.quantity}-${index}`}
            className={`${materialStyle.classes} p-2 rounded border`}
          >
            <div className="text-sm flex items-center justify-between">
              {materialData ? (
                <TextWithIcon item={materialData} iconSize="sm" />
              ) : (
                <span>
                  {material.id
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              )}
              <span className="font-medium">x{material.quantity}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MaterialsList;
