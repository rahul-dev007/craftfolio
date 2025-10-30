'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

// Smooth scroll helper
const scrollToSection = (id: string) => {
  const section = document.querySelector(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('#hero');

  const toggleMenu = () => setIsOpen(!isOpen);

  // Detect active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        '#hero',
        '#upload',
        '#chat',
        '#about',
        '#skills',
        '#projects',
        '#contact',
      ];
      const scrollPos = window.scrollY + 120;

      for (const id of sections) {
        const el = document.querySelector(id);
        if (el && el instanceof HTMLElement) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Upload', href: '#upload' },
    { label: 'Chat', href: '#chat' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md text-white fixed top-0 left-0 w-full z-50 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-white">
          <Sparkles className="text-indigo-400 drop-shadow" size={26} />
          CraftFolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`transition font-medium hover:text-indigo-400 ${
                active === link.href ? 'text-indigo-400' : 'text-gray-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="hover:text-indigo-400 transition"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 border-t border-gray-700 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                scrollToSection(link.href);
                setIsOpen(false);
              }}
              className={`w-full text-center py-2 hover:text-indigo-400 ${
                active === link.href ? 'text-indigo-400 font-semibold' : 'text-gray-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
