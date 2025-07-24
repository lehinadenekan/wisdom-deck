'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Settings as SettingsIcon } from 'lucide-react';

interface GamePageNavbarProps {
  onSettings?: () => void;
  onHelp?: () => void;
  onBack?: () => void;
  onStats?: () => void;
  onNewGame?: () => void;
  showTonalAccents?: boolean;
  setShowTonalAccents?: (show: boolean) => void;
  showPartOfSpeech?: boolean;
  setShowPartOfSpeech?: (show: boolean) => void;
  showEnglishTranslation?: boolean;
  setShowEnglishTranslation?: (show: boolean) => void;
}

const ConditionalNavbar: React.FC<GamePageNavbarProps> = ({
  onSettings, onHelp, onBack, onStats, onNewGame,
  showTonalAccents, setShowTonalAccents,
  showPartOfSpeech, setShowPartOfSpeech,
  showEnglishTranslation, setShowEnglishTranslation
}) => {
  const pathname = usePathname();
  const isGamePage = pathname === '/yoruba-word-master';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Homepage Navbar
  if (!isGamePage) {
    return (
      <header className="bg-white shadow-md relative">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/#products" className="text-gray-600 hover:text-blue-500">Books</Link>
              <Link href="/#games" className="text-gray-600 hover:text-blue-500">Games</Link>
              <a href="#about" className="text-gray-600 hover:text-blue-500">About</a>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <Link href="/#products" className="text-gray-600 hover:text-blue-500 py-2 px-3 rounded-lg hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center" onClick={closeMobileMenu}>Books</Link>
                <Link href="/#games" className="text-gray-600 hover:text-blue-500 py-2 px-3 rounded-lg hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center" onClick={closeMobileMenu}>Games</Link>
                <a href="#about" className="text-gray-600 hover:text-blue-500 py-2 px-3 rounded-lg hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center" onClick={closeMobileMenu}>About</a>
              </div>
            </div>
          )}
        </nav>
      </header>
    );
  }

  // Game Page Navbar
  return (
    <header className="bg-gray-900 shadow-md relative">
      <nav className="container mx-auto px-2 py-2">
        <div className="flex justify-between items-center">
          {/* Back to Wisdom Deck */}
          <button
            onClick={onBack}
            className="text-gray-300 hover:text-white text-sm flex items-center min-h-[44px] px-2"
            aria-label="Back to Wisdom Deck"
          >
            <span className="mr-1">←</span> Back to Wisdom Deck
          </button>
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={onNewGame} className="text-gray-300 hover:text-blue-400 min-h-[44px] px-2 flex items-center text-sm" aria-label="New Game">
              <span className="mr-1">🎮</span> New Game
            </button>
            <button onClick={onStats} className="text-gray-300 hover:text-blue-400 min-h-[44px] px-2 flex items-center text-sm" aria-label="View statistics">
              <span className="mr-1">📊</span> Statistics
            </button>
            <button onClick={onSettings} className="text-gray-300 hover:text-blue-400 min-h-[44px] px-2 flex items-center text-sm" aria-label="Settings">
              <span className="mr-1">⚙️</span> Settings
            </button>
            <button onClick={onHelp} className="text-gray-300 hover:text-blue-400 min-h-[44px] px-2 flex items-center text-sm" aria-label="Help">
              <span className="mr-1">❓</span> Help & Hints
            </button>
            {/* Toggles moved to Settings modal */}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3 pt-4">
              <button onClick={() => { onNewGame && onNewGame(); closeMobileMenu(); }} className="text-white hover:text-yellow-300 py-2 px-3 rounded-lg hover:bg-gray-800 text-base font-medium min-h-[44px] flex items-center">
                <span className="mr-1">🎮</span> New Game
              </button>
              <button onClick={() => { onStats && onStats(); closeMobileMenu(); }} className="text-white hover:text-yellow-300 py-2 px-3 rounded-lg hover:bg-gray-800 text-base font-medium min-h-[44px] flex items-center">
                <span className="mr-1">📊</span> Statistics
              </button>
              <button onClick={() => { onSettings && onSettings(); closeMobileMenu(); }} className="text-white hover:text-yellow-300 py-2 px-3 rounded-lg hover:bg-gray-800 text-base font-medium min-h-[44px] flex items-center">
                <span className="mr-1">⚙️</span> Settings
              </button>
              <button onClick={() => { onHelp && onHelp(); closeMobileMenu(); }} className="text-white hover:text-yellow-300 py-2 px-3 rounded-lg hover:bg-gray-800 text-base font-medium min-h-[44px] flex items-center">
                <span className="mr-1">❓</span> Help & Hints
              </button>
              {/* Toggle options for hints */}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default ConditionalNavbar; 