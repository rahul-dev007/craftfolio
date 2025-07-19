// src/components/Navbar.tsx

import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* বাম দিকে আপনার নাম বা লোগো */}
        <Link href="/" className="text-white text-2xl font-bold">
          CraftFolio
        </Link>

        {/* ডান দিকে নেভিগেশন লিংকগুলো */}
        <div className="hidden md:flex space-x-6">
          <Link href="#about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="#skills" className="text-gray-300 hover:text-white">
            Skills
          </Link>
          <Link href="#projects" className="text-gray-300 hover:text-white">
            Projects
          </Link>
          <Link href="#contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </div>

        {/* ছোট স্ক্রিনের জন্য একটি মেনু বাটন (আপাতত খালি) */}
        <div className="md:hidden">
          {/* এখানে আমরা পরে একটি হ্যামবার্গার মেনু আইকন যোগ করব */}
          <button className="text-white">
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;