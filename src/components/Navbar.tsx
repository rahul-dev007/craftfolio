// src/components/Navbar.tsx

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Icon for mobile menu
import { Sparkles } from 'lucide-react'; // Logo icon (changeable)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* লোগো + টাইটেল */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
          <Sparkles className="text-blue-400" size={28} />
          CraftFolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="#about" className="hover:text-blue-400 transition">
            About
          </Link>
          <Link href="#skills" className="hover:text-blue-400 transition">
            Skills
          </Link>
          <Link href="#projects" className="hover:text-blue-400 transition">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-gray-700 px-4 pt-2 pb-4 space-y-2 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'
          }`}
      >
        <Link href="#about" className="block hover:text-blue-400" onClick={toggleMenu}>
          About
        </Link>
        <Link href="#skills" className="block hover:text-blue-400" onClick={toggleMenu}>
          Skills
        </Link>
        <Link href="#projects" className="block hover:text-blue-400" onClick={toggleMenu}>
          Projects
        </Link>
        <Link href="#contact" className="block hover:text-blue-400" onClick={toggleMenu}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
