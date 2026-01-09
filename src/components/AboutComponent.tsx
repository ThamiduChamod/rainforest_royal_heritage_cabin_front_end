import React from 'react';
// Import your images here
import aboutImg1 from '../assets/photos/frontView2.jpeg';
import aboutImg2 from '../assets/photos/logoWithBackground.jpg';

const About = () => {
  return (
    <section className="py-24 px-6 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image Composition */}
        <div className="relative">
          {/* Main Large Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl z-10 relative">
            <img 
              src={aboutImg1} 
              alt="Rainforest View" 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Small Floating Image */}
          <div className="absolute -bottom-10 -right-10 hidden md:block w-72 h-48 rounded-xl overflow-hidden border-8 border-[#f0c60ac4] shadow-xl z-20">
            <img 
              src={aboutImg2} 
              alt="Luxury Interior" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative Element */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-100 rounded-full -z-0 opacity-50 blur-2xl"></div>
        </div>

        {/* Right Side: Text Content */}
        <div className="space-y-8">
          <div>
            <span className="text-emerald-600 font-semibold tracking-[0.2em] uppercase text-sm block mb-2">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              A Sanctuary Where Nature <br /> 
              <span className="text-emerald-700 italic">Whispers Peace</span>
            </h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Royal Heritage Cabin Hotel is a peaceful nature retreat offering a perfect blend of traditional charm and modern comfort. Surrounded by lush greenery, our cabins provide a relaxing escape where guests can unwind and reconnect with nature.

Inspired by Sri Lanka’s rich heritage, we are committed to sustainable practices and warm hospitality, ensuring a comfortable and memorable stay for every guest.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">100% Eco-Friendly</h4>
                <p className="text-sm text-gray-500">Naturally built sustainable villas.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Organic Dining</h4>
                <p className="text-sm text-gray-500">Farm-to-table fresh local food.</p>
              </div>
            </div>
          </div>

          
          {/* <div className="pt-6">
            <button className="px-8 py-3 bg-emerald-900 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors shadow-lg active:scale-95">
              Read More About Us
            </button>
          </div> */}
        </div>

      </div>
    </section>
  );
};

export default About;