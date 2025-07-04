import React, { useState } from 'react';
import { FaStar, FaPlay, FaStarHalfAlt, FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  const productCards = [
    {
      image: '/plant1.png',
      title: 'Calathea Plant',
      subtitle: 'Trendy House Plant',
    },
    {
      image: '/plant2.png',
      title: 'Fiddle Leaf Fig',
      subtitle: 'Popular Indoor Plant',
    },
    {
      image: '/plant3.png',
      title: 'Snake Plant',
      subtitle: 'Low Maintenance Plant',
    },
  ];

  const [index, setIndex] = useState(0);
  const current = productCards[index];

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % productCards.length);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 py-8 sm:py-12">
        {/* Left Side */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">Breath Natural</h1>
          <p className="text-white text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eveniet sequi ipsa. Fuga velit corrupti fugit ab in enim accusamus.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 px-4 sm:px-6 py-2 text-white rounded-[15px] border border-white hover:bg-[#3f483f] cursor-pointer text-sm sm:text-base">
              Explore
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-white rounded-full">
                <FaPlay className="text-white text-sm sm:text-base " />
              </div>
              <p className="text-white text-sm">Live Demo...</p>
            </div>
          </div>

          {/* Review Card */}
          <div className="flex items-start gap-3 p-3 sm:p-4 border border-white/30 rounded-[15px] shadow-sm bg-[#2c352b] w-full sm:w-[409px]">
            <img src="/breathcard.png" alt="Reviewer" className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full" />
            <div className="flex flex-col">
              <h4 className="text-white font-semibold text-base sm:text-lg mb-1">Max Luke</h4>
              <div className="flex text-yellow-400 mb-1">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="text-xs sm:text-sm" />
                ))}
                <FaStarHalfAlt className="text-xs sm:text-sm" />
              </div>
              <p className="text-xs sm:text-sm text-white leading-relaxed max-w-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia consequuntur dolorum veritatis.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Product Card */}
        <div className="flex md:justify-end justify-center pt-12">
          <div className="relative p-4 pt-20 border border-white/30 rounded-[30px] w-[250px] sm:w-[280px] h-[370px] sm:h-[390px] text-center bg-[#2c352b] transition-all duration-300 ease-in-out">
            {/* Arrow Button */}
            <button
              onClick={nextCard}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/70 hover:text-green-300 transition"
              aria-label="Next Card"
            >
              <FaArrowRight size={20} />
            </button>

            {/* Floating Image */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <img
                src={current.image}
                alt={current.title}
                className="w-[120px] sm:w-[150px] h-[160px] sm:h-[180px] object-cover rounded"
              />
            </div>

            {/* Card Content */}
            <div className="flex flex-col items-start px-4 sm:px-5 mt-12">
              <p className="text-white mb-1 mt-4 text-sm sm:text-base">{current.subtitle}</p>
              <h1 className="text-[#FFFFFFBF] text-xl sm:text-2xl mb-4">{current.title}</h1>
              <button className="text-[#FFFFFFBF] border border-[#FFFFFFBF] px-4 py-2 rounded-[15px] text-sm sm:text-base hover:bg-[#3f483f] cursor-pointer">
                Buy Now
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {productCards.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setIndex(dotIndex)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
                    index === dotIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;