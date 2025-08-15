// src/components/PixelArtImage.tsx
import React, { ImgHTMLAttributes } from 'react';

interface PixelArtImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
}

// Memoize the pixel art style to prevent object recreation on every render
const PIXEL_ART_STYLE = { imageRendering: 'pixelated' as const };

export const PixelArtImage = React.memo(
  ({
    src,
    alt,
    className = '',
    lazy = true,
    style,
    ...props
  }: PixelArtImageProps) => {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        style={style ? { ...PIXEL_ART_STYLE, ...style } : PIXEL_ART_STYLE}
        {...props}
      />
    );
  }
);

// Add display name for better debugging
PixelArtImage.displayName = 'PixelArtImage';
