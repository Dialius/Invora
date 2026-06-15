import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
  /** 'colored' = original | 'light' = white (dark bg) | 'dark' = black */
  variant?: 'colored' | 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  size = 32,
  className = '',
  showText = false,
  textColor = 'text-stone-900',
  variant = 'colored',
}) => {
  const filterStyle: React.CSSProperties =
    variant === 'light'
      ? { filter: 'brightness(0) invert(1)' }   // all white
      : variant === 'dark'
      ? { filter: 'brightness(0)' }              // all black
      : {};                                       // original colors

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt="Invora logo"
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain', ...filterStyle }}
        className="flex-shrink-0"
      />
      {showText && (
        <span className={`text-[17px] font-bold tracking-tight transition-colors ${textColor}`}>
          Invora
        </span>
      )}
    </div>
  );
};
