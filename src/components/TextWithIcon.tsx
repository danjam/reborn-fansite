// src/components/TextWithIcon.tsx
import { PixelArtImage } from '@/components/PixelArtImage';
import type { GameObject } from '@/types/GameObject';
import { Link } from 'react-router-dom';

interface TextWithIconProps {
  item: GameObject; // Has icon, name, id properties
  iconSize?: 'sm' | 'md' | 'lg';
  className?: string;
  textClassName?: string;
  linkTo?: string; // Optional - if provided, wraps text in Link
}

const TextWithIcon: React.FC<TextWithIconProps> = ({
  item,
  iconSize = 'md',
  className = '',
  textClassName = '',
  linkTo,
}) => {
  const iconSizeClasses = {
    sm: 'w-4 h-4', // 16px
    md: 'w-8 h-8', // 32px
    lg: 'w-16 h-16', // 64px
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <PixelArtImage
        src={item.icon}
        alt={item.name}
        className={`${iconSizeClasses[iconSize]} object-contain`}
      />
      {linkTo ? (
        <Link to={linkTo} className={textClassName}>
          {item.name}
        </Link>
      ) : (
        <span className={textClassName}>{item.name}</span>
      )}
    </div>
  );
};

export default TextWithIcon;
