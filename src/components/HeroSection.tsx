'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white min-h-screen flex items-center pt-24 md:pt-0 overflow-hidden">
      {/* 🔆 Glowing Background Circle */}
      <div className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl top-10 -left-20 animate-pulse"></div>

      <div className="container mx-auto px-4 z-10">
        {/* মোবাইলে flex-col-reverse (image উপরে), ডেক্সটপে flex-row */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">

          {/* ✨ Text Content + Typing + Button */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 text-left space-y-5"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              Hi, I'm <span className="text-blue-400">Rahul</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
              <Typewriter
                words={[
                  'MERN Stack Developer',
                  'Next.js Enthusiast',
                  'Tailwind CSS Lover',
                  'Clean UI Crafter',
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </h2>

            <p className="text-gray-400">
              I build scalable web apps with stunning design and clean code.
              Let’s create something amazing together.
            </p>

            {/* 🔘 Button */}
            <Link
              href="#contact"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg font-semibold text-white shadow-lg"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* 🖼️ Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="md:w-1/2 flex justify-center items-center"
          >
            <div className="w-52 h-52 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
              <img
                src="/profile1.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
