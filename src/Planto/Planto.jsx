import React from 'react';
import Header from '../components/resuablecomp/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import TrendyPlants from '../components/OurTrendyPlantSection/TrendyPlants';
import SellingCards from '../components/OurTopSellingCards/SellingCards';
import Review from '../components/CustomerReview/Review';
import O2Card from '../components/OurBestO2/O2Card';
import Footer from '../components/resuablecomp/footer';

const Planto = () => {
  return (
    <>
      <div className="bg-[url('/bgdark.png')] bg-cover bg-center w-full min-h-screen">
        <Header />
        <HeroSection />
        <TrendyPlants />
      </div>

      <div className="bg-[#262e24]">
        <SellingCards />
        <Review />
        <O2Card />
      </div>

      <Footer />
    </>
  );
};

export default Planto;
