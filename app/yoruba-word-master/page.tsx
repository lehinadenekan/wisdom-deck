'use client';

import React, { useState, useEffect } from 'react';
import GameBoard from '@/components/wordle/GameBoard';
import Keyboard from '@/components/wordle/Keyboard';
import useWordMaster from '@/hooks/useWordMaster';
import GameEndModal from '@/components/wordle/GameEndModal';
import HowToPlayModal from '@/components/wordle/HowToPlayModal';
import HintSystem from '@/components/wordle/HintSystem';
import SettingsPanel from '@/components/word-master/SettingsPanel';
import SettingsButton from '@/components/word-master/SettingsButton';
import StatisticsDisplay from '@/components/word-master/StatisticsDisplay';
import { usePreferences } from '@/hooks/usePreferences';
import Image from 'next/image';
import ConditionalNavbar from '@/components/layout/ConditionalNavbar';
import ConfirmationModal from '@/components/word-master/ConfirmationModal';
import ToastNotification from '@/components/word-master/ToastNotification';

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
  const [showPartOfSpeech, setShowPartOfSpeech] = useState(false);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(false);
  const [showNewGameConfirmation, setShowNewGameConfirmation] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  // Handlers for navbar
  const handleBack = () => {
    window.location.href = 'https://www.wisdomdeck.online';
  };
  const handleSettings = () => setIsSettingsOpen(true);
  const handleHelp = () => setIsHelpOpen(true);
  const handleStats = () => setIsStatsOpen(true);
  const handleNewGame = () => setShowNewGameConfirmation(true);
  
  const handleConfirmNewGame = () => {
    startNewGame();
    setShowNewGameConfirmation(false);
  };
  
  const handleSettingsApplied = () => {
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ConditionalNavbar 
        onSettings={handleSettings}
        onHelp={handleHelp}
        onBack={handleBack}
        onStats={handleStats}
        onNewGame={handleNewGame}
        showTonalAccents={showTonalAccents}
        setShowTonalAccents={setShowTonalAccents}
        showPartOfSpeech={showPartOfSpeech}
        setShowPartOfSpeech={setShowPartOfSpeech}
        showEnglishTranslation={showEnglishTranslation}
        setShowEnglishTranslation={setShowEnglishTranslation}
      />
      
      {/* Modals */}
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
        showTonalAccents={showTonalAccents}
        setShowTonalAccents={setShowTonalAccents}
        showPartOfSpeech={showPartOfSpeech}
        setShowPartOfSpeech={setShowPartOfSpeech}
        showEnglishTranslation={showEnglishTranslation}
        setShowEnglishTranslation={setShowEnglishTranslation}
        onSettingsApplied={handleSettingsApplied}
      />
      <StatisticsDisplay 
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
      />
      <ConfirmationModal
        isOpen={showNewGameConfirmation}
        onConfirm={handleConfirmNewGame}
        onCancel={() => setShowNewGameConfirmation(false)}
        title="Start New Game?"
        message="Your current progress will be lost. Are you sure you want to start a new game?"
      />
      <ToastNotification
        isVisible={showToast}
        message="Settings applied successfully!"
        onClose={() => setShowToast(false)}
      />

      {/* Game Content */}
      <div className="flex flex-col items-center h-screen bg-gray-900 text-white overflow-hidden pt-16">
        {/* Game Title Header */}
        <header className="w-full text-center py-1 px-2 mb-8">
          <h1 className="text-lg sm:text-4xl font-bold tracking-wide uppercase mb-2">Yorùbá Word Master</h1>
          <p className="text-xs sm:text-lg text-gray-400 hidden sm:block">A Yorùbá Word Guessing Game</p>
        </header>
        
        {/* Main Game Area */}
        <main className="flex flex-col items-center px-1 w-full min-h-0">
          <div className="flex flex-col items-center w-full">
            <GameBoard 
              guesses={guesses} 
              currentGuess={currentGuess} 
              turn={turn} 
              solution={solution} 
              showTonalAccents={showTonalAccents}
              className="mb-2 sm:mb-4"
            />
            
            {/* Inline Hints Display */}
            {(showPartOfSpeech || showEnglishTranslation) && (
              <div className="text-center text-sm text-gray-300 px-2 mt-2">
                {showPartOfSpeech && solutionInfo.partOfSpeech && (
                  <p><strong>Part of Speech:</strong> {solutionInfo.partOfSpeech}</p>
                )}
                {showEnglishTranslation && solutionInfo.englishTranslation && (
                  <p><strong>English:</strong> {solutionInfo.englishTranslation}</p>
                )}
              </div>
            )}
          </div>
          
          {/* Keyboard */}
          <div className="mt-4 mb-4">
            <Keyboard onKeyPress={handleKeyPress} keyboardStatus={keyboardStatus} />
          </div>
        </main>

        {/* Footer */}
        <footer className="hidden sm:block w-full max-w-lg text-center py-2 mt-4">
          <div className="flex items-center justify-center mb-3">
            <a href="https://www.wisdomdeck.online">
              <Image 
                src="/wisdom-deck-logo.png" 
                alt="Wisdom Deck Logo" 
                width={120} 
                height={120}
                className="object-contain invert"
              />
            </a>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Wisdom Deck. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default YorubaWordlePage;