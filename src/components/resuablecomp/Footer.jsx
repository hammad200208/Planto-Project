import React, { useState } from 'react';

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <footer className="bg-[#171d14] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <img src="/g4.png" alt="Logo" className="w-15 h-15 mr-2" />
            <span className="text-xl font-bold">Planto.</span>
          </div>
          <p className="text-sm text-white mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At reprehenderit laudantium modi adipisci expedita quis eaque veniam perspiciatis ullam!
          </p>
          <div className="flex gap-4 pt-6 justify-center md:justify-start">
            <a href="#" className="hover:text-white">FB</a>
            <a href="#" className="hover:text-white">TW</a>
            <a href="#" className="hover:text-white">LI</a>
          </div>
        </div>

        {/* Column 2 - Centered on all screens */}
<div className="flex justify-center">
  <div className="text-center">
    <h3 className="text-lg text-[#cccdcb] font-semibold mb-4">Quick Links</h3>
    <ul className="space-y-2 text-[#cccdcb]">
      <li><a href="#" className="hover:text-white">Home</a></li>
      <li className="relative">
        <button 
          onClick={toggleDropdown}
          className="text-[#cccdcb] hover:text-white flex items-center justify-center"
        >
          Plant Types <span className="text-[10px] ml-1">{isDropdownOpen ? '▲' : '▼'}</span>
        </button>
        {isDropdownOpen && (
          <ul className="bg-gray-800 mt-1 rounded shadow-lg text-left left-1/2 transform -translate-x-1/2 absolute">
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-700">Indoor</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-700">Outdoor</a></li>
          </ul>
        )}
      </li>
      <li><a href="#" className="hover:text-white">Contact</a></li>
      <li><a href="#" className="hover:text-white">Privacy</a></li>
    </ul>
  </div>
</div>


        {/* Column 3 - Centered on mobile, left-aligned on md+ */}
        <div className="text-center md:text-left">
          <h3 className="text-lg text-[#cccdcb] font-semibold mb-4">For Every Update's</h3>
          <div className="flex justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter Email..."
              className="px-3 py-2 text-white placeholder-[#cccdcb] bg-transparent border-2 border-white rounded-l w-full max-w-xs"
            />
            <button className="bg-white text-[#171d14] font-bold px-4 py-2 rounded-r border-2 border-white border-l-0 hover:bg-gray-100 transition">
              SUBSCRIBE
            </button>
          </div>
          <p className="pt-5 md:pt-24 text-sm text-[#cccdcb] text-center md:text-left">Planto. © All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;