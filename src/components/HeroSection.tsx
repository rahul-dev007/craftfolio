'use client';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">Hi, I'm Rahul</h1>
            <p className="text-xl text-gray-300">MERN & Next.js Developer</p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg relative -translate-y-8">
              <img
                src="/profile1.jpg"
                alt="Profile Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
