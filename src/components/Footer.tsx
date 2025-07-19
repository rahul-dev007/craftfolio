import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-20">
      <div className="container mx-auto px-4 text-center">
        <h4 className="text-xl font-semibold text-white">Rahul Biswas</h4>
        <p className="text-sm mt-2 mb-4">© {new Date().getFullYear()} All rights reserved.</p>

        <div className="flex justify-center space-x-6 text-xl">
          <a href="https://github.com/rahul-dev007" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/rahul-dev007" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin />
          </a>
          <a href="https://facebook.com/rahul.biswas" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
