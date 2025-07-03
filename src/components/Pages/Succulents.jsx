import React from 'react';
import Header from '../resuablecomp/Header';
import Footer from '../resuablecomp/Footer';

const Succulents = () => {
  return (
    <>
      <div className='bg-[#1c261a]'>
        <Header />
      </div>
      <div className="min-h-screen bg-[#1c261a]">
        {/* Centered header */}
        <header className="bg-[#1e2619] py-6 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-white/75">Succulent Plants </h1>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto py-8 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Succulent cards with images */}
            {[
              { 
                name: 'Echeveria', 
                image: '/succulent/plant1.png', 
                care: 'Rosette shape, needs bright light' 
              },
              { 
                name: 'Haworthia', 
                image: '/succulent/plant2.png', 
                care: 'Striped leaves, low maintenance' 
              },
              { 
                name: 'Sedum', 
                image: '/succulent/plant3.png', 
                care: 'Ground cover, drought tolerant' 
              },
              { 
                name: 'Aloe Vera', 
                image: '/succulent/plant4 (1).png', 
                care: 'Medicinal, needs well-draining soil' 
              },
              { 
                name: 'Crassula', 
                image: '/succulent/plant5.png', 
                care: 'Jade plant, easy to grow' 
              },
              { 
                name: 'Sempervivum', 
                image: '/succulent/plant6.png', 
                care: 'Cold hardy, forms clusters' 
              },
            ].map((succulent, index) => (
              <div key={index} className="bg-[#2c352b] border border-[#c7c9c6] rounded-[30px] shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={succulent.image} 
                  alt={succulent.name} 
                  className="w-full h-48 object-contain bg-[#2c352b] p-4"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{succulent.name}</h3>
                  <p className="text-[#cbcdca] mt-2">{succulent.care}</p>
                  <button className="mt-4 bg-transparent border border-white hover:bg-[#151d14] hover:text-white text-white px-4 py-2 rounded-md transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Centered "View More" button */}
          <div className="flex justify-center mt-8 w-full">
            <button className="bg-transparent border border-white hover:bg-[#151d14] hover:text-white text-white px-6 py-3 rounded-md transition-all duration-300 ease-in-out text-lg">
              View More
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Succulents;