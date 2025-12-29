import React, { useState, useEffect } from 'react';
import Header from '../components/NavBar';

// Oyaage images tika me wage array ekakata daganna
// f1, f2, f3 kiyala assets import karala thiyanawa kiyala hithamu
import f1 from '../assets/photos/frontView.jpeg';
import f2 from '../assets/photos/frontView2.jpeg'; // Udaharanayak lesa
import f3 from '../assets/photos/image1.jpeg';   // Udaharanayak lesa
import About from '../components/AboutComponent';
import Reviews from '../components/Reviews';
import Rooms from '../components/Rooms';
import Footer from '../components/Footer';

const Welcome = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [f1, f2, f3]; // Me array ekata ona tharam images danna puluwan

  useEffect(() => {
    // Thappara 5kata sarayak image eka change wenawa
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-black">
        
        {/* Background Images Layer */}
        <div className="absolute inset-0">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Rainforest ${index}`}
              className={`absolute inset-0 h-full w-full object-cover tranition-opacity duration-1000 ease-in-out trans${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        </div>

        {/* Header Container - Added absolute to stay on top */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          
          {/* Animation ekak ekka text eka pennamu */}
          <div className="animate-fade-in-up">
            <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-emerald-400 md:text-base">
              Experience Pure Nature
            </span>

            <h1 className="mb-6 max-w-4xl font-serif text-5xl font-bold leading-tight md:text-7xl">
              <span className="text-emerald-500 italic">Rainforest</span> Royal Heritage Cabin
            </h1>

            <p className="mb-10 max-w-2xl text-lg font-light text-gray-200 md:text-xl mx-auto"> 
              Unwind in the heart of the wild. Discover the serenity of the jungle.
            </p>

            <div className="flex flex-col space-y-4 items-center justify-center sm:flex-row sm:space-x-6 sm:space-y-0">
              <button className="rounded-full bg-emerald-600 px-10 py-4 font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95">
                Book Your Stay
              </button>
              <button className="rounded-full border border-white/40 bg-white/10 px-10 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-black">
                Explore Rooms
              </button>
            </div>
          </div>

        </div>

        {/* Slider Indicators (Bindi tika) */}
        <div className="absolute bottom-10 right-10 z-20 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === currentImage ? "w-8 bg-emerald-500" : "w-2 bg-white/50"
              }`}
            ></div>
          ))}
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
          <div className="h-10 w-6 rounded-full border-2 border-white flex justify-center p-1">
            <div className="h-2 w-1 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
      <About />
      <Rooms />
      <Reviews />
      <Footer />
    </>
  );
};

export default Welcome;