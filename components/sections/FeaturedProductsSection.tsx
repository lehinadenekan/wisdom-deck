import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedProductsSection = () => {
  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Books</h2>
        <Link href="/yoruba-proverbs" className="block max-w-sm mx-auto">
          <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full" style={{ paddingTop: '150%' /* Aspect ratio 2:3 */ }}>
            <Image 
              src="/book-cover.png" 
              alt="Yoruba Proverbs Wisdom Deck Cover" 
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Yoruba Proverbs: 40 Illustrated Proverbs with Translation & Meaning</h3>
            <p className="text-gray-600">
              Dive deep into the wisdom of Yoruba culture with this curated collection of proverbs.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProductsSection; 