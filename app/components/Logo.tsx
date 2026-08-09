import { NavLink } from 'react-router';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <NavLink to="/" className={`flex items-center gap-2 ${className}`}>
      <img 
      height={400}
      width={400}
        src="/Logo.jpg" 
        alt="Logo" 
        className="h-full  rounded-md w-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-300 "  // Inherits height from parent
      />
      <span>Bradley</span>
    </NavLink>
  );
};