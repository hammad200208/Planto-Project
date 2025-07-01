import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlantTypesOpen, setIsPlantTypesOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const togglePlantTypes = () => setIsPlantTypesOpen(prev => !prev);

  return (
    <>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-5 py-10">
        <div className="flex items-center">
          <img src="/g4.png" alt="Logo" className="w-[100px] h-[100px] -mt-12" />
          <span className="text-xl font-bold text-white/75 -ml-5">Planto.</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-white/75 font-medium">
          <li className="hover:text-green-300 cursor-pointer">Home</li>
          <li className="relative group cursor-pointer">
            <span className="hover:text-green-300">Plant Types</span>
            <ul className="absolute top-8 left-0 hidden group-hover:block bg-white text-gray-700 border shadow-md w-40 z-10">
              <li className="px-4 py-2 hover:bg-green-50">Indoor</li>
              <li className="px-4 py-2 hover:bg-green-50">Outdoor</li>
              <li className="px-4 py-2 hover:bg-green-50">Succulents</li>
            </ul>
          </li>
          <li className="hover:text-green-300 cursor-pointer">More</li>
          <li className="hover:text-green-300 cursor-pointer">Contact</li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-8 text-white">
          <img src="/search.png" alt="Search" className="hidden sm:block w-6 h-6 cursor-pointer" />
          <img src="/bag.png" alt="Bag" className="hidden sm:block w-6 h-6 cursor-pointer" />
          <img
            src="/hamburger.png"
            alt="Menu"
            className="md:hidden w-6 h-4 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1e2619] text-white/75 px-5 py-4 space-y-3 transition-all duration-300 ease-in-out">
          <div className="flex flex-col gap-2 font-medium">
            <span className="cursor-pointer hover:text-green-300">Home</span>
            
            {/* Toggleable Plant Types Submenu */}
            <div>
              <span
                className="block hover:text-green-300 cursor-pointer"
                onClick={togglePlantTypes}
              >
                Plant Types
              </span>
              {isPlantTypesOpen && (
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  <div className="hover:text-green-300 cursor-pointer">Indoor</div>
                  <div className="hover:text-green-300 cursor-pointer">Outdoor</div>
                  <div className="hover:text-green-300 cursor-pointer">Succulents</div>
                </div>
              )}
            </div>

            <span className="cursor-pointer hover:text-green-300">More</span>
            <span className="cursor-pointer hover:text-green-300">Contact</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
