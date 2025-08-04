import React, { useEffect, useState } from 'react';

const TrendyPlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch('https://eb-project-backend-kappa.vercel.app/api/v0/plants/getAll')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched trendy plants:', data);
        if (data?.data) {
          setPlants(data.data.slice(0, 3)); // First 3 plants
        }
      })
      .catch((err) => console.error('Error fetching trendy plants:', err));
  }, []);

  // ✅ Helper to get full image URL
  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http')
      ? path
      : `https://eb-project-backend-kappa.vercel.app/${path}`;
  };

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
    <section className="px-4 sm:px-6 py-4 sm:py-12 text-white">
      <img
        src="/Group 51 (1).png"
        alt="Heading"
        className="w-full max-w-md h-auto mx-auto mb-6 sm:mb-8 drop-shadow-lg"
      />

      {plants.length === 3 ? (
        <>
          {/* First Plant Card */}
          <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-[rgba(255,255,255,0.05)] rounded-3xl sm:rounded-[80px] shadow-md p-4 sm:p-6 border mb-8 sm:mb-12">
            <img
              src={getImageUrl(plants[2].image)}
              alt={plants[2].plantname}
              className="w-full max-w-[300px] md:w-[300px] h-auto object-contain -mt-20 md:-mt-30 mx-auto md:mx-0"
            />
            <div className="flex flex-col justify-between flex-1 w-full">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
                  {plants[2].plantname}
                </h3>
                <p className="text-white text-sm sm:text-base mb-3 sm:mb-4">
                  {plants[2].description}
                </p>
                <p className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                  Rs.{plants[2].price}/-
                </p>
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
          <div className="w-full md:h-[300px] pt-8 md:pt-20 max-w-4xl mx-auto flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8 bg-[rgba(255,255,255,0.05)] rounded-3xl sm:rounded-[80px] shadow-md p-4 sm:p-6 border">
            <img
              src={getImageUrl(plants[1].image)}
              alt={plants[1].plantname}
              className="w-full max-w-[300px] md:w-[300px] h-auto object-contain -mt-20 md:-mt-30 mx-auto md:mx-0"
            />
            <div className="flex flex-col justify-between flex-1 w-full">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold md:-mt-15 sm:mb-3">
                  {plants[1].plantname}
                </h3>
                <p className="text-white text-sm sm:text-base mb-3 sm:mb-4">
                  {plants[1].description}
                </p>
                <p className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                  Rs.{plants[1].price}/-
                </p>
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
        </>
      ) : (
        <p className="text-center text-white mt-12">Loading plants...</p>
      )}
    </section>
  );
};

export default TrendyPlants;
