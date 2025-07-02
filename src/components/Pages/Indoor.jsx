import React from 'react';
import Header from '../resuablecomp/Header';
import Footer from '../resuablecomp/Footer';

const Indoor = () => {
  return (
    <>
      <div className='bg-[#1c261a]'>
        <Header />
      </div>
      <div className="min-h-screen bg-[#1c261a]">
        {/* Centered header */}
        <header className="bg-[#1e2619] py-6 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-white/75">Indoor Plants</h1>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto py-8 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Plant cards with PNG images */}
            {[
              { 
                name: 'Realistic Plant', 
                image: '/indoor/plant3.webp', 
                care: 'Low maintenance, purifies air' 
              },
              { 
                name: 'Banana Plant', 
                image: '/indoor/plant2.png', 
                care: 'Tropical beauty, medium light' 
              },
              { 
                name: 'Realistic Plant', 
                image: '/indoor/plant3.webp', 
                care: 'Statement plant, bright indirect light' 
              },
              { 
                name: 'Realistic Plant', 
                image: '/indoor/plant3.webp', 
                care: 'Great for beginners, versatile' 
              },
              { 
                name: 'Banana Plant', 
                image: '/indoor/plant2.png', 
                care: 'Glossy leaves, drought tolerant' 
              },
              { 
                name: 'Realistic Plant', 
                image: '/indoor/plant3.webp', 
                care: 'Nearly indestructible, low light' 
              },
            ].map((plant, index) => (
              <div key={index} className="bg-[#2c352b] border-1 border-[#c7c9c6] rounded-[30px] shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={plant.image} 
                  alt={plant.name} 
                  className="w-full h-48 object-contain bg-[#2c352b] p-4"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{plant.name}</h3>
                  <p className="text-[#cbcdca] mt-2">{plant.care}</p>
                  <button className="mt-4 bg-transparent border-1 border-white hover:bg-[#1c261a] text-white px-4 py-2 rounded-md transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Centered "View More" button */}
          <div className="flex justify-center mt-8 w-full">
            <button className="bg-transparent border-1 border-white hover:bg-[#1c261a] text-white px-6 py-3 rounded-md transition-colors text-lg">
              View More
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Indoor;