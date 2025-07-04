import React from 'react';

const TrendyPlants = () => {
  // Custom BagIcon component without number indicator
  const BagIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="text-white"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );

  return (
    <>
      {/* Our Trendy Plants Section */}
      <section className="px-4 sm:px-6 py-4 sm:py-12 text-white">
        {/* Heading Image - Responsive sizing */}
        <img 
          src="/Group 51 (1).png" 
          alt="Heading" 
          className="w-full max-w-md h-auto mx-auto mb-6 sm:mb-8 drop-shadow-lg"
        />

        {/* First Plant Card */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-[rgba(255,255,255,0.05)] rounded-3xl sm:rounded-[80px] shadow-md p-4 sm:p-6 border mb-8 sm:mb-12">
          <img 
            src="/plant2.png" 
            alt="Trendy Plant" 
            className="w-full max-w-[300px] md:w-[300px] h-auto object-contain -mt-20 md:-mt-30 mx-auto md:mx-0" 
          />

          <div className="flex flex-col justify-between flex-1 w-full">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">For Small Desk Ai Plant</h3>
              <p className="text-white text-sm sm:text-base mb-3 sm:mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aut deleniti quae. Itaque saepe rem voluptatum impedit dolorem animi!
              </p>
              <p className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Rs.599/-</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="bg-transparent text-white px-4 sm:px-5 py-1 sm:py-2 rounded-xl sm:rounded-[15px] border text-sm sm:text-base hover:bg-[#3f483f] cursor-pointer">
                Buy Now
              </button>
              <button className="flex items-center justify-center gap-2 border bg-transparent p-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-[13px] hover:bg-[#3f483f] cursor-pointer">
                <BagIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Second Plant Card (Reversed) */}
        <div className="w-full md:h-[300px] pt-8 md:pt-20 max-w-4xl mx-auto flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8  bg-[rgba(255,255,255,0.05)] rounded-3xl sm:rounded-[80px] shadow-md p-4 sm:p-6 border">
          {/* Image on the right */}
          <img
            src="/plant3.png"
            alt="Trendy Plant"
            className="w-full max-w-[300px] md:w-[300px] h-auto object-contain -mt-20 md:-mt-50 mx-auto md:mx-0"
          />

          {/* Text content on the left */}
          <div className="flex flex-col justify-between flex-1 w-full ">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold md:-mt-15 sm:mb-3">For Small Desk Ai Plant</h3>
              <p className="text-white text-sm sm:text-base mb-3 sm:mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aut
                deleniti quae. Itaque saepe rem voluptatum impedit dolorem animi!
              </p>
              <p className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Rs.599/-</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="bg-transparent text-white px-4 sm:px-5 py-1 sm:py-2 rounded-xl sm:rounded-[15px] border text-sm sm:text-base hover:bg-[#3f483f] cursor-pointer">
                Buy Now
              </button>
              <button className="flex items-center justify-center gap-2 border bg-transparent p-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-[13px] hover:bg-[#3f483f] cursor-pointer">
                <BagIcon />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendyPlants;