// src/components/TextWithIcon.tsx
import { FC, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { PixelArtImage } from '@/components/PixelArtImage';
import type { GameObject } from '@/types/gameObject';

interface TextWithIconProps {
  item: GameObject; // Has icon, name, id properties
  iconSize?: 'sm' | 'md' | 'lg';
  className?: string;
  textClassName?: string;
  linkTo?: string; // Optional - if provided, wraps text in Link
}

// Memoize icon size classes to prevent recreation on every render
const ICON_SIZE_CLASSES = {
  sm: 'w-4 h-4', // 16px
  md: 'w-8 h-8', // 32px
  lg: 'w-16 h-16', // 64px
} as const;

const TextWithIcon: FC<TextWithIconProps> = memo(
  ({ item, iconSize = 'md', className = '', textClassName = '', linkTo }) => {
    // Memoize the icon className to prevent recreation
    const iconClassName = useMemo(
      () => `${ICON_SIZE_CLASSES[iconSize]} object-contain`,
      [iconSize]
    );

    // Memoize the text content to prevent unnecessary re-renders
    const textContent = useMemo(() => {
      if (linkTo) {
        return (
          <Link to={linkTo} className={textClassName}>
            {item.name}
          </Link>
        );
      }
      return <span className={textClassName}>{item.name}</span>;
    }, [linkTo, textClassName, item.name]);

    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <PixelArtImage
          src={item.icon}
          alt={item.name}
          className={iconClassName}
        />
        {textContent}
      </div>
    );
  }
);

// Add display name for better debugging
TextWithIcon.displayName = 'TextWithIcon';

export default TextWithIcon;
