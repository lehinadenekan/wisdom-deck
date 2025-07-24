import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GamePreview from '@/components/landing/GamePreview';

const featureHighlights = [
  { icon: '🎯', text: 'Choose from 3, 4, 5, 6, or 7 letter words' },
  { icon: '💡', text: 'Smart hints and tonal accent helpers' },
  { icon: '📊', text: 'Detailed statistics and progress tracking' },
  { icon: '🎮', text: 'Mobile-optimised gaming experience' },
];

export default function YorubaWordMasterLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-purple-700 font-bold text-sm hover:underline" aria-label="Back to Wisdom Deck">
          ← Back to Wisdom Deck
        </Link>
      </header>
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-purple-700 mb-2 text-center">Yorùbá Word Master</h1>
        <h2 className="text-lg sm:text-2xl text-gray-700 mb-4 text-center">A Yorùbá Word Guessing Game</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6 text-center max-w-xl">
          Guess the Yorùbá word within 6 attempts. Test your knowledge while learning new vocabulary.
        </p>
        <GamePreview />
        {/* Feature Highlights */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full">
          {featureHighlights.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 bg-purple-50 rounded-lg px-4 py-3 shadow">
              <span className="text-2xl" aria-hidden="true">{feature.icon}</span>
              <span className="text-base text-gray-800">{feature.text}</span>
            </div>
          ))}
        </div>
        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link href="/yoruba-word-master/game" className="flex-1 min-h-14 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg flex items-center justify-center text-lg shadow transition-colours duration-150 focus:outline-none focus:ring-2 focus:ring-purple-400" aria-label="Play Yorùbá Word Master">
            Play Now
          </Link>
          <Link href="/yoruba-word-master/game?walkthrough=true" className="flex-1 min-h-14 bg-white border border-purple-600 text-purple-700 font-bold rounded-lg flex items-center justify-center text-lg shadow transition-colours duration-150 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400" aria-label="How to Play Yorùbá Word Master">
            How to Play
          </Link>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full flex flex-col items-center justify-center py-6 bg-gray-100 mt-auto">
        <Image src="/wisdom-deck-logo.png" alt="Wisdom Deck Logo" width={120} height={120} className="object-contain mb-2" />
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} Wisdom Deck. Celebrating Yorùbá language and culture.</p>
      </footer>
    </div>
  );
} 