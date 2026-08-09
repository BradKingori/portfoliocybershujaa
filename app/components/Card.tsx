// Using named export
import type { ReactNode } from "react"; 

interface CardProps {
  className?: string;
  image?: string;
  title?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  date?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function Card({ 
  className = "", 
  image,
  title,
  price,
  rating,
  reviews,
  date,
  children,
  onClick
}: CardProps) {
  return (
    <div 
      className={`cursor-pointer group ${className}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-2">
        {/* Title and Rating Row */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate">{title || "Untitled"}</h3>
          {rating && (
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{rating}</span>
              {reviews && <span className="text-sm text-gray-500">({reviews})</span>}
            </div>
          )}
        </div>

        {/* Date/Info */}
        {date && <p className="text-sm text-gray-500">{date}</p>}

        {/* Price */}
        {price && (
          <div className="mt-1">
            <span className="font-semibold">{price}</span>
            {!reviews && <span className="text-gray-500"> night</span>}
          </div>
        )}

        {/* Custom children content */}
        {children}
      </div>
    </div>
  );
}