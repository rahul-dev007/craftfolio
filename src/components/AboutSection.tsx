// src/components/AboutSection.tsx

'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-white tracking-tight">
          👨‍💻 About Me
        </h2>

        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Right side: Text */}
          <motion.div
            className="md:w-2/3 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              Hello! I’m <span className="text-teal-400 font-semibold">Rahul Biswas</span>, a passionate Full-Stack Developer who loves building beautiful, scalable, and functional web apps. I’m committed to writing clean, efficient, and maintainable code.
            </p>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              My core stack includes <span className="text-teal-400">Express, React, Next.js, Node.js</span> and <span className="text-teal-400">MongoDB</span>. I enjoy solving problems and continuously push myself to grow by exploring the latest tools and trends in web development.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Outside of coding, you’ll find me reading dev blogs, experimenting with side projects, or sharing knowledge in the community. I believe in lifelong learning and contributing to meaningful projects.
            </p>
          </motion.div>

          {/* Left side: Image */}
          <motion.div
            className="md:w-1/3 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-60 h-60 relative group">
            

            <Image
              src="/profile.jpg"
              alt="Profile"
              width={300}
              height={300}
              priority
            />

              <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
