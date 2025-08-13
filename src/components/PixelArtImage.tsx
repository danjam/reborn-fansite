// src/components/PixelArtImage.tsx
import { ImgHTMLAttributes } from 'react';

interface PixelArtImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
}

export const PixelArtImage = ({
  src,
  alt,
  className = '',
  lazy = true,
  ...props
}: PixelArtImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      style={{ imageRendering: 'pixelated' }}
      {...props}
    />
  );
};
