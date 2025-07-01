import React from 'react'

const O2Card = () => {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      {/* PNG Heading */}
      <div className="mb-10 text-center">
        <img 
          src="/Group 22.png" 
          alt="Featured Content" 
          className="mx-auto max-w-[240px] sm:max-w-[280px] md:max-w-[350px]"
        />
      </div>

      {/* Card Container */}
      <div className="max-w-5xl mx-auto bg-[rgba(255,255,255,0.05)] border-2 rounded-[50px]
       border-[rgba(255,255,255,0.05)] overflow-visible">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Image */}
          <div className="w-full md:w-1/2 relative -mt-10 md:mt-[-152px] md:ml-[-40px]">
            <img 
              src="/plant5.png" 
              alt="O2 Plant" 
              className="w-full h-auto object-cover md:rounded-tr-[50px] md:rounded-br-[50px]"
              style={{ 
                objectPosition: 'top center'
              }}
            />
          </div>

          {/* Right Content */}
          <div className="p-6 sm:p-8 md:w-1/2 md:pl-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#cccdcb] mb-4">
              We Have Small And Best O2 Plants Collection's
            </h2>

            <p className="text-[#cccdcb] mb-4 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia odio quos optio exercitationem? Earum magni illum nam eveniet saepe?
            </p>

            <p className="text-[#cccdcb] mb-6 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum itaque laboriosam laudantium.
            </p>

            <button className="border border-[#cccdcb] text-white font-medium py-2 px-6 rounded-lg transition duration-300 hover:bg-[rgba(204,205,203,0.1)]">
              Explore
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default O2Card
