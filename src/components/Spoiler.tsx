// src/components/Spoiler.tsx
import clsx from 'clsx';
import { useState } from 'react';

interface SpoilerProps {
  children: React.ReactNode;
  className?: string;
}

export const Spoiler = ({ children, className = '' }: SpoilerProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => setIsRevealed(true);

  return (
    <span
      onClick={handleReveal}
      className={clsx(
        'cursor-pointer select-none transition-all duration-200',
        isRevealed ? '' : 'filter blur-sm',
        className
      )}
      title={isRevealed ? '' : 'Tap to reveal spoiler'}
      role={isRevealed ? undefined : 'button'}
      tabIndex={isRevealed ? undefined : 0}
      onKeyDown={e => {
        if (!isRevealed && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleReveal();
        }
      }}
    >
      {children}
    </span>
  );
};
