'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md relative">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand area (currently empty, preserving original layout) */}
          <div className="flex-1"></div>
          
          {/* Desktop Navigation - unchanged from original */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/#products" className="text-gray-600 hover:text-blue-500">
              Books
            </Link>
            <Link href="/#games" className="text-gray-600 hover:text-blue-500">
              Games
            </Link>
            <a href="#about" className="text-gray-600 hover:text-blue-500">About</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                href="/#products" 
                className="text-gray-600 hover:text-blue-500 py-2 px-3 rounded-lg hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center"
                onClick={closeMobileMenu}
              >
                Books
              </Link>
              <Link 
                href="/#games" 
                className="text-gray-600 hover:text-blue-500 py-2 px-3 rounded-lg hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center"
                onClick={closeMobileMenu}
              >
                Games
              </Link>
              <a 
                href="#about" 
                className="text-gray-600 hover:text-blue-500 py-2 px-3 rounded-lg hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center"
                onClick={closeMobileMenu}
              >
                About
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

// File path: components/layout/Navbar.tsx