import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-primary">
        <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM23.5 16.5H17.5V22.5C17.5 23.3284 16.8284 24 16 24C15.1716 24 14.5 23.3284 14.5 22.5V16.5H8.5C7.67157 16.5 7 15.8284 7 15C7 14.1716 7.67157 13.5 8.5 13.5H14.5V7.5C14.5 6.67157 15.1716 6 16 6C16.8284 6 17.5 6.67157 17.5 7.5V13.5H23.5C24.3284 13.5 25 14.1716 25 15C25 15.8284 24.3284 16.5 23.5 16.5Z" fill="currentColor"/>
        <path d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2ZM22 17H17V22C17 22.5523 16.5523 23 16 23C15.4477 23 15 22.5523 15 22V17H10C9.44772 17 9 16.5523 9 16C9 15.4477 9.44772 15 10 15H15V10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10V15H22C22.5523 15 23 15.4477 23 16C23 16.5523 22.5523 17 22 17Z" fill="var(--background-dark)"/>
        <circle cx="16" cy="16" r="16" fill="currentColor" />
        <path d="M10 16L14 10V22L10 16Z" fill="#000" />
        <path d="M22 16L18 10V22L22 16Z" fill="#000" />
      </svg>
      <span className="font-display font-black text-xl tracking-tighter uppercase">Sali<span className="text-primary">music</span></span>
    </div>
  );
};

export default Logo;
