import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedGamesSection = () => {
  return (
    <section id="games" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Games</h2>
        <Link href="/yoruba-word-master" className="block max-w-sm mx-auto">
          <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full" style={{ paddingTop: '150%' /* Aspect ratio 2:3 */ }}>
              <Image 
                src="/wordle-game-preview.png"
                alt="Yoruba Word Master Game" 
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg group-hover:opacity-80 transition-opacity"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Yorùbá Word Master</h3>
            <p className="text-gray-600 mb-6">
              Challenge your Yoruba vocabulary with this fun word-guessing game.
            </p>
            <div className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Play Now
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedGamesSection; 