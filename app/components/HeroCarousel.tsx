import { useState, useEffect } from "react";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
}

interface HeroCarouselProps {
  slides?: Slide[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    image: "https://imgur.com/a/cx6LE2l",
    title: "Police / Accident System",
  },
  {
    id: 2,
    image: "https://imgur.com/a/73z41HD",
    title: "Bradley 1",
  },
  {
    id: 3,
    image: "https://imgur.com/a/strtk1ng-poster-3-tJFuXmR",
    title: "Rogue Lab Studio",
  },
    {
    id: 4,
    image: "https://imgur.com/bradley-cybermillion-ckc-dh0QeR6",
    title: "Cyber mill",
  },
    {
    id: 5,
    image: "https://imgur.com/bradley-cybermillion-keylogging-g76zrNF",
    title: "CyberMillion Keylogging",
  } , {
    id: 6,
    image: "https://imgur.com/bradley-cybermillion-darknets-TxfMBxo",
    title: "CyberMillion Darknets",
  },
    {
    id: 7,
    image: "https://imgur.com/bradley-cybermillion-fake-news-b3GgM4G",
    title: "CyberMillion Darknets",
  },
    {
    id: 8,
    image: "https://imgur.com/bradley-cybermillion-cookies-MPMigr4",
    title: "CyberMillion Cookies",
  },
    {
    id: 9,
    image: "https://imgur.com/bradley-cybermillion-geolocation-UKJJFmT",
    title: "CyberMillion GeoLocation",
  }
];

export default function HeroCarousel({ 
  slides = defaultSlides, 
  autoPlay = true, 
  interval = 5000,
  className = ""
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full flex-shrink-0">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-lg sm:text-xl lg:text-2xl mb-6">
                  {slide.subtitle}
                </p>
              )}
         
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-white w-4" 
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}