// src/components/PixelArtImage.tsx
import { ImgHTMLAttributes } from 'react';

type PixelArtImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const PixelArtImage = ({ style, ...props }: PixelArtImageProps) => {
  const pixelArtStyle = {
    imageRendering: 'pixelated' as const,
    ...style,
  };

  return (
    <img style={pixelArtStyle} loading="lazy" decoding="async" {...props} />
  );
};
