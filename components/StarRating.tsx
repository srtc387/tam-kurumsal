import React from 'react';
import Icon from './Icon';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  onRatingChange?: (newRating: number) => void;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'md', onRatingChange, className }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const handleStarClick = (starValue: number) => {
    if (onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const handleMouseEnter = (starValue: number) => {
    if (onRatingChange) {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (onRatingChange) {
      setHoverRating(0);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {stars.map((starValue) => {
        const displayRating = hoverRating > 0 ? hoverRating : rating;
        const isFilled = starValue <= displayRating;

        return (
          <button
            key={starValue}
            type="button"
            disabled={!onRatingChange}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={`
              ${sizeClasses[size]} 
              ${isFilled ? 'text-yellow-400' : 'text-slate-300'}
              ${onRatingChange ? 'cursor-pointer' : ''}
            `}
            aria-label={`Rate ${starValue} stars`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
