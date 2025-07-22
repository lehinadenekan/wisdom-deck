'use client';

import React, { useState, useEffect } from 'react';
import GameBoard from '@/components/wordle/GameBoard';
import Keyboard from '@/components/wordle/Keyboard';
import useWordMaster from '@/hooks/useWordMaster';
import GameEndModal from '@/components/wordle/GameEndModal';
import HowToPlayModal from '@/components/wordle/HowToPlayModal';
import HintSystem from '@/components/wordle/HintSystem';
import NewGameButton from '@/components/word-master/NewGameButton';
import SettingsPanel from '@/components/word-master/SettingsPanel';
import SettingsButton from '@/components/word-master/SettingsButton';
import StatisticsDisplay from '@/components/word-master/StatisticsDisplay';
import { usePreferences } from '@/hooks/usePreferences';
import Image from 'next/image';
// import ConditionalNavbar from '@/components/layout/ConditionalNavbar';

const YorubaWordlePage = () => {
  const { 
    solution,
    solutionInfo, 
    guesses, 
    currentGuess, 
    turn, 
    handleKeyPress, 
    keyboardStatus,
    errorMessage,
    isGameWon,
    isGameLost,
    startNewGame
  } = useWordMaster();

  const { updateStatistics } = usePreferences();

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [showTonalAccents, setShowTonalAccents] = useState(false);

  // Track game completion for statistics
  useEffect(() => {
    if (isGameWon || isGameLost) {
      const gameWon = isGameWon;
      const guessCount = turn;
      updateStatistics(gameWon, guessCount);
    }
  }, [isGameWon, isGameLost, turn, updateStatistics]);

  const resetGame = async () => {
    await startNewGame();
  }

  // Handlers for navbar (still needed for modal state)
  const handleBack = () => {
    window.location.href = 'https://www.wisdomdeck.online';
  };
  const handleSettings = () => setIsSettingsOpen(true);
  const handleHelp = () => setIsHelpOpen(true);
  const handleStats = () => setIsStatsOpen(true);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-2 sm:p-4 relative overflow-hidden">
      {/* <ConditionalNavbar 
        onSettings={handleSettings}
        onHelp={handleHelp}
        onBack={handleBack}
        onStats={handleStats}
      /> */}
      <GameEndModal 
        isOpen={isGameWon || isGameLost} 
        isGameWon={isGameWon}
        solution={solution}
        guesses={guesses}
        turn={turn}
        onReset={resetGame}
      />
      <HowToPlayModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onNewGame={startNewGame}
      />
      <StatisticsDisplay 
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
      />

      {/* Remove old Back, Stats, Settings, Help buttons - now handled by navbar */}

      <header className="w-full max-w-lg text-center relative py-2 sm:py-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-widest uppercase">Yorùbá Word Master</h1>
          <p className="text-sm sm:text-lg text-gray-400">A Yorùbá Word Guessing Game</p>
        </div>
      </header>
      
      <main className="flex flex-col items-center flex-1 justify-start py-2 w-full">
        <GameBoard 
          guesses={guesses} 
          currentGuess={currentGuess} 
          turn={turn} 
          solution={solution} 
          showTonalAccents={showTonalAccents}
          className="mb-2"
        />
        
        {/* New Game Button - positioned below game board */}
        <div className="flex justify-center mt-2 mb-2">
          <NewGameButton onNewGame={startNewGame} />
        </div>
        
        <HintSystem 
          partOfSpeech={solutionInfo.partOfSpeech}
          englishTranslation={solutionInfo.englishTranslation}
          additionalInfo={solutionInfo.additionalInfo}
          showTonalAccents={showTonalAccents}
          setShowTonalAccents={setShowTonalAccents}
        />
        <Keyboard onKeyPress={handleKeyPress} keyboardStatus={keyboardStatus} />
      </main>

      <footer className="w-full max-w-lg text-center py-2 mt-auto">
        <div className="flex items-center justify-center mb-1">
          <a href="https://www.wisdomdeck.online">
            <Image 
              src="/wisdom-deck-logo.png" 
              alt="Wisdom Deck Logo" 
              width={60} 
              height={60}
              className="sm:w-[120px] sm:h-[120px] object-contain invert"
            />
          </a>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">© {new Date().getFullYear()} Wisdom Deck. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default YorubaWordlePage; 