import React from 'react'

const Review = () => {
  return (
    <section className="py-10 px-4 sm:px-5 text-center">
      {/* PNG Heading */}
      <div className="mb-8">
        <img 
          src="/Group 24.png" 
          alt="Customer Reviews" 
          className="max-w-[250px] sm:max-w-[300px] h-auto mx-auto"
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.05)] rounded-[30px] sm:rounded-[50px] p-5 sm:p-6 w-full sm:w-[360px]">
          <div className="flex items-start gap-3 sm:gap-4">
            <img 
              src="/emillia.jpg" 
              alt="Reviewer" 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-medium text-white mb-1">Emillia Hans</h3>
              <div className="flex items-center space-x-0.5 mb-2">
                {[...Array(4)].map((_, i) => (
                  <span key={`full-${i}`} className="text-yellow-400 text-lg sm:text-xl">★</span>
                ))}
                <div className="relative">
                  <span className="text-gray-400 text-lg sm:text-xl">★</span>
                  <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-yellow-400 text-lg sm:text-xl">★</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-white text-sm sm:text-base leading-relaxed text-left mt-3 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt natus et cupiditate nesciunt modi quam magnam nam, ullam, ratione doloribus accusantium totam sed excepturi.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.05)] rounded-[30px] sm:rounded-[50px] p-5 sm:p-6 w-full sm:w-[360px]">
          <div className="flex items-start gap-3 sm:gap-4">
            <img 
              src="/charles.jpg" 
              alt="Reviewer" 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-medium text-white mb-1">Charles Etoroma</h3>
              <div className="flex items-center space-x-0.5 mb-2">
                {[...Array(4)].map((_, i) => (
                  <span key={`full-${i}`} className="text-yellow-400 text-lg sm:text-xl">★</span>
                ))}
                <div className="relative">
                  <span className="text-gray-400 text-lg sm:text-xl">★</span>
                  <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-yellow-400 text-lg sm:text-xl">★</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-white text-sm sm:text-base leading-relaxed text-left mt-3 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt natus et cupiditate nesciunt modi quam magnam nam, ullam, ratione doloribus accusantium totam sed excepturi.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.05)] rounded-[30px] sm:rounded-[50px] p-5 sm:p-6 w-full sm:w-[360px]">
          <div className="flex items-start gap-3 sm:gap-4">
            <img 
              src="/alony.jpg" 
              alt="Reviewer" 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-medium text-white mb-1">Alony Haust</h3>
              <div className="flex items-center space-x-0.5 mb-2">
                {[...Array(4)].map((_, i) => (
                  <span key={`full-${i}`} className="text-yellow-400 text-lg sm:text-xl">★</span>
                ))}
                <div className="relative">
                  <span className="text-gray-400 text-lg sm:text-xl">★</span>
                  <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-yellow-400 text-lg sm:text-xl">★</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-white text-sm sm:text-base leading-relaxed text-left mt-3 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt natus et cupiditate nesciunt modi quam magnam nam, ullam, ratione doloribus accusantium totam sed excepturi.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Review