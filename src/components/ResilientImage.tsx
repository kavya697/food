import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-[#171411]',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1C1713] via-[#15120F] to-[#261D15] border border-[#29231E]"
          role="img"
          aria-label={alt}
        >
          <Utensils className="w-8 h-8 text-[#D97706] mb-2 opacity-80" />
          <span className="font-display text-lg text-[#F7F4EF] font-medium">
            {fallbackLabel || alt}
          </span>
          <span className="text-xs text-[#B8AFA6] mt-1">
            Spice Garden Culinary Kitchen
          </span>
        </div>
      )}
    </div>
  );
};
