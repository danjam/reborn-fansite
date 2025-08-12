// src/components/MaterialsList.tsx
import { PixelArtImage } from '@/components/PixelArtImage';
import { getMaterialDisplayName } from '@/utils/gameObjectHelpers';
import { gameData } from '@/gameData';

interface Material {
  id: string;
  quantity: number;
}

interface MaterialsListProps {
  materials: Material[];
  variant?: 'purple' | 'green' | 'red' | 'orange';
  className?: string;
}

const MaterialsList: React.FC<MaterialsListProps> = ({ 
  materials, 
  variant = 'purple',
  className = '' 
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'green':
        return 'bg-green-900/20 border-green-300/30';
      case 'red':
        return 'bg-red-900/20 border-red-300/30';
      case 'orange':
        return 'bg-orange-900/20 border-orange-300/30';
      case 'purple':
      default:
        return 'bg-purple-900/20 border-purple-300/30';
    }
  };

  const variantStyles = getVariantStyles(variant);

  return (
    <div className={`space-y-2 ${className}`}>
      {materials.map((material, index) => {
        const materialData = gameData.getObjectById(material.id);
        return (
          <div
            key={index}
            className={`${variantStyles} p-2 rounded border`}
          >
            <div className="text-sm flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {materialData && (
                  <PixelArtImage
                    src={materialData.icon}
                    alt={materialData.name}
                    className="w-4 h-4 object-contain"
                  />
                )}
                <span>{getMaterialDisplayName(material.id)}</span>
              </div>
              <span className="font-medium">
                x{material.quantity}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MaterialsList;