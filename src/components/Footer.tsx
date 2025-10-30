'use client';
import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaGlobe,
} from 'react-icons/fa';
import { SiFiverr, SiVercel } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 text-gray-400 py-10 mt-24 border-t border-gray-800">
      <div className="container mx-auto px-6 text-center">
        {/* Name + tagline */}
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
          Rahul Biswas
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Full Stack Developer • Next.js • MERN • AI Integrator
        </p>

        {/* Social icons */}
        <div className="flex justify-center flex-wrap gap-6 text-2xl mb-6">
          <a
            href="https://www.linkedin.com/in/rahul-biswas-571443390/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition transform hover:scale-110"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.fiverr.com/rahulbisaws/buying?source=avatar_menu_profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition transform hover:scale-110"
            title="Fiverr"
          >
            <SiFiverr />
          </a>

          <a
            href="https://web.facebook.com/profile.php?id=61578806211905"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition transform hover:scale-110"
            title="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://vercel.com/rahul-dev007s-projects"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition transform hover:scale-110"
            title="Vercel Projects"
          >
            <SiVercel />
          </a>

          <a
            href="https://github.com/rahul-dev007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition transform hover:scale-110"
            title="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.instagram.com/rahuldev00999/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition transform hover:scale-110"
            title="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Gradient Line */}
        <div className="mx-auto mb-4 w-32 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>

        {/* Footer bottom */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} <span className="text-white">CraftFolio</span>. 
          All rights reserved. | Built with ❤️ by{' '}
          <a
            href="https://www.linkedin.com/in/rahul-biswas-571443390/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline"
          >
            Rahul Biswas
          </a>
        </p>
      </div>

      {/* Top gradient border glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;
