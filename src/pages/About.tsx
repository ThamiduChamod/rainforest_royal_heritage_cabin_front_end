import React from 'react';
import Header from '../components/NavBar';
import Aboutcomponent from '../components/AboutComponent';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import heroImage from '../assets/photos/image2.jpeg'


const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
        <Header />
      {/* Hero Section */}
      <section className="bg-blue-600 relative py-38 text-white text-center bg-cover bg-center"
        style={{backgroundImage:`url(${heroImage})`}}
      >
          {/* overlay (optional) */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg opacity-90">
            We are a leading organization that has been providing reliable service for many years. 
            Our goal is to provide you with the highest quality service.
          </p>
        </div>
      </section>

      
        <Aboutcomponent />
        <Reviews />
        <Footer />


        
    </div>
  );
};

export default About;