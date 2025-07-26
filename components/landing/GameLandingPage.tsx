import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GamePreview from '@/components/landing/GamePreview';

const featureHighlights = [
  { icon: '🎯', text: 'Choose from 2, 3, 4, 5, 6, or 7 letter words' },
  { icon: '💡', text: 'Smart hints and tonal accent helpers' },
  { icon: '📊', text: 'Detailed statistics and progress tracking' },
  { icon: '🎮', text: 'Mobile-optimised gaming experience' },
];

export default function GameLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-purple-700 mb-2 drop-shadow">Yorùbá Word Master</h1>
        <p className="text-lg sm:text-2xl text-center text-gray-700 mb-4">A Yorùbá Word Guessing Game</p>
        <p className="text-base sm:text-lg text-center text-gray-600 mb-8 max-w-xl">
          Guess the Yorùbá word within 6 attempts. Test your knowledge while learning new vocabulary.
        </p>
        <div className="mb-8">
          <GamePreview />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md mx-auto mb-8">
          <Link href="/yoruba-word-master/game" passHref legacyBehavior>
            <a className="w-full min-h-14 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-lg shadow transition-colours focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 aria-label='Play Yorùbá Word Master'">
              Play Now
            </a>
          </Link>
          <button
            className="w-full min-h-14 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-lg rounded-lg shadow transition-colours focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            aria-label="How to Play Yorùbá Word Master"
            id="how-to-play-landing-btn"
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('startWalkthrough', 'true');
                window.location.href = '/yoruba-word-master/game';
              }
            }}
          >
            How to Play
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
          {featureHighlights.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-lg shadow p-4 border border-gray-100">
              <span className="text-2xl" aria-hidden="true">{f.icon}</span>
              <span className="text-base font-medium text-gray-800">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full flex flex-col items-center py-6 bg-gray-50 border-t border-gray-200 mt-auto">
        <a href="https://www.wisdomdeck.online" className="mb-2">
          <Image src="/wisdom-deck-logo.png" alt="Wisdom Deck Logo" width={120} height={120} className="object-contain" />
        </a>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Wisdom Deck. Celebrating Yorùbá language and culture.
        </p>
      </footer>
    </div>
  );
} 