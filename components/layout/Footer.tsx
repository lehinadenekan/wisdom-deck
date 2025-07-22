import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white mt-16 py-8">
      <div className="container mx-auto px-6 text-center text-gray-600">
        <div className="flex items-center justify-center mb-4">
          <Link href="https://www.wisdomdeck.online">
            <Image 
              src="/wisdom-deck-logo.png" 
              alt="Wisdom Deck Logo" 
              width={120} 
              height={120}
              className="object-contain"
            />
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Wisdom Deck. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 