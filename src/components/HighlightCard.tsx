// src/components/HighlightCard.tsx
import { PixelArtImage } from '@/components/PixelArtImage';
import { useStyles } from '@/hooks';

interface HighlightCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  content: string;
}

const HighlightCard = ({
  icon,
  iconAlt,
  title,
  content,
}: HighlightCardProps) => {
  const { styles } = useStyles();

  // Parse content to handle **bold** markdown-style formatting
  const parseContent = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  return (
    <div
      className={`${styles.card} border-l-4 border-green-500 mb-4 bg-green-900/20`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <PixelArtImage
            src={icon}
            alt={iconAlt}
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${styles.text.primary} mb-2`}>
            {title}
          </h3>
          <p className={`${styles.text.secondary}`}>{parseContent(content)}</p>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
