import React from 'react';

const SellingCards = () => {
  const products = [
    {
      img: "/plant1.png",
      title: "Desk Plant",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "Rs.999/-",
    },
    {
      img: "/plant2.png",
      title: "Calthea Plant",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "Rs.749/-",
    },
    {
      img: "/plant3.png",
      title: "Calthea Ai Plant",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "Rs.899/-",
    },
    {
      img: "/plant4 (1).png",
      title: "Cal 874 plant",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "Rs.599/-",
    },
    {
      img: "/plant5.png",
      title: "Show Plant",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "Rs.449/-",
    },
    {
      img: "/plant6.png",
      title: "Calat O2 plant",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "Rs.1299/-",
    },
  ];

  return (
    <section className="px-4 py-10 text-neutral-200">
      {/* Header Image */}
      <img 
        src="/Group 16.png" 
        alt="Plant Collection" 
        className="w-auto h-[140px] md:h-[180px] mx-auto mb-10 md:mb-14" 
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-30 md:gap-x-5 md:gap-y-30 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-[#32382f] rounded-3xl shadow-xl p-6 flex flex-col items-center border-2 border-[#4a5540] relative hover:shadow-2xl transition-all duration-300 min-h-[380px]"
          >
            {/* Floating Plant Image - Extra Large */}
            <div className="absolute -top-24 md:-top-28 left-1/2 transform -translate-x-1/2 w-full px-6">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-[200px] md:h-[240px] object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Card Content */}
            <div className="mt-35 md:mt-44 w-full text-left space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">{product.title}</h3>
              <p className="text-base md:text-lg text-neutral-300">{product.desc}</p>
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl md:text-2xl font-bold text-white">{product.price}</span>
                <button className="border-2 border-neutral-400 p-3 rounded-xl hover:bg-[#4a5540] hover:border-[#4a5540] transition-all duration-300">
                  <img 
                    src="/bag.png" 
                    alt="Add to cart" 
                    className="w-6 h-6 md:w-7 md:h-7" 
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SellingCards;