import { Link } from "react-router";
import { useState } from 'react';

export function meta(){
  return [
    { title :"Rogue Laboratory Studio" },
    { name : "", content : "Bradley King'ori Rogue Lab studio Portfolio" }
  ];
}

// Alternative version - Full width artistic carousel
export default function roguelab() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showcaseItems = [
    {
      type: "image",
      src: "https://i.imgur.com/XXrz4FP.png",
      title: "Moran",
      artistNote: "The Moran in Black and White"
    },
    {
      type: "youtube",
      src: "https://www.youtube-nocookie.com/embed/UwG-UxBY04c?autoplay=1&mute=1",
      // 1. Added the direct YouTube link here for the button to use
      youtubeLink: "https://www.youtube.com/watch?v=UwG-UxBY04c", 
      title: "STRTK1NG : The First Trailer",
      artistNote: "The first trailer for STRTK1NG"
    },

  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Full Screen Carousel */}
      <div className="relative h-screen">
        {/* Always-visible link out to the studio site */}
        <a
          href="https://roguelabstudio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-3 rounded-lg font-semibold transition"
        >
          Visit roguelabstudio.com
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5v5M19 5l-8 8M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
          </svg>
        </a>

        {showcaseItems[activeIndex].type === "image" && (
          <div className="absolute inset-0">
            <img 
              src={showcaseItems[activeIndex].src}
              alt={showcaseItems[activeIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          </div>
        )}
        
        {showcaseItems[activeIndex].type === "youtube" && (
          <iframe
            src={showcaseItems[activeIndex].src}
            className="absolute inset-0 w-full h-full pointer-events-none"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold mb-4">{showcaseItems[activeIndex].title}</h2>
            <p className="text-xl text-gray-300 mb-8">{showcaseItems[activeIndex].artistNote}</p>
            
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition"
              >
                Previous
              </button>
              <button 
                onClick={() => setActiveIndex((prev) => (prev + 1) % showcaseItems.length)}
                className="bg-green-600 hover:bg-green-600 px-6 py-3 rounded-lg transition"
              >
                Next
              </button>

              {/* 2. Conditional YouTube Button */}
              {showcaseItems[activeIndex].type === "youtube" && (
                <a 
                  href={showcaseItems[activeIndex].youtubeLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition ml-4 font-semibold"
                >
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
