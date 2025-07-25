'use client';

import React, { useState, useEffect, Suspense } from 'react';
import GameBoard from '@/components/wordle/GameBoard';
import Keyboard from '@/components/wordle/Keyboard';
import useWordMaster from '@/hooks/useWordMaster';
import GameEndModal from '@/components/wordle/GameEndModal';
import HelpModal from '@/components/wordle/HelpModal';
import HintSystem from '@/components/wordle/HintSystem';
import SettingsPanel from '@/components/word-master/SettingsPanel';
import SettingsButton from '@/components/word-master/SettingsButton';
import StatisticsDisplay from '@/components/word-master/StatisticsDisplay';
import { usePreferences } from '@/hooks/usePreferences';
import Image from 'next/image';
import ConditionalNavbar from '@/components/layout/ConditionalNavbar';
import ConfirmationModal from '@/components/word-master/ConfirmationModal';
import ToastNotification from '@/components/word-master/ToastNotification';
import GameWalkthrough, { walkthroughSteps } from '@/components/walkthrough/GameWalkthrough';
import WalkthroughCompletionModal from '@/components/walkthrough/WalkthroughCompletionModal';
import { useSearchParams, useRouter } from 'next/navigation';

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p className="text-gray-400">Loading game...</p>
    </div>
  </div>
);

// Component that uses useSearchParams - this needs to be wrapped in Suspense
const YorubaWordMasterGame = () => {
  const { preferences } = usePreferences();
  const difficulty = preferences.difficulty;
  
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
    startNewGame,
    startNewGameWithLength,
    wordLength
  } = useWordMaster(difficulty);

  const { updateStatistics } = usePreferences();

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [showTonalAccents, setShowTonalAccents] = useState(false);
  const [showPartOfSpeech, setShowPartOfSpeech] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('showPartOfSpeech') : null;
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('showEnglishTranslation') : null;
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showNewGameConfirmation, setShowNewGameConfirmation] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isWordRevealed, setIsWordRevealed] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const walkthroughParam = searchParams!.get('walkthrough');
  const [walkthroughRun, setWalkthroughRun] = useState(false);
  const [walkthroughStepIndex, setWalkthroughStepIndex] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Start walkthrough if ?walkthrough=true
  useEffect(() => {
    if (walkthroughParam === 'true') {
      startWalkthrough();
      // Remove ?walkthrough=true from URL after starting
      router.replace('/yoruba-word-master/game');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walkthroughParam]);

  const startWalkthrough = () => {
    setWalkthroughRun(true);
    setWalkthroughStepIndex(0);
    setShowCompletionModal(false);
  };

  const handleWalkthroughCallback = (data: any) => {
    const { status, index, type } = data;
    if (status === 'finished') {
      setWalkthroughRun(false);
      setShowCompletionModal(true);
    } else if (status === 'skipped') {
      setWalkthroughRun(false);
      setShowCompletionModal(false);
    } else if (type === 'step:after' || type === 'error:target_not_found') {
      setWalkthroughStepIndex(index + 1);
    }
  };

  const restartWalkthrough = () => {
    setShowCompletionModal(false);
    setWalkthroughRun(true);
    setWalkthroughStepIndex(0);
  };

  useEffect(() => {
    if (isGameWon || isGameLost) {
      const gameWon = isGameWon;
      const guessCount = turn;
      updateStatistics(gameWon, guessCount);
    }
  }, [isGameWon, isGameLost, turn, updateStatistics]);

  const resetGame = async () => {
    await startNewGame();
    setIsWordRevealed(false);
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
    setIsWordRevealed(false);
  };
  
  const handleSettingsApplied = () => {
    setShowToast(true);
  };

  const handleRevealWord = () => {
    setIsWordRevealed(true);
    setIsHelpOpen(false);
  };

  // Save to localStorage when toggled
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('showPartOfSpeech', JSON.stringify(showPartOfSpeech));
    }
  }, [showPartOfSpeech]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('showEnglishTranslation', JSON.stringify(showEnglishTranslation));
    }
  }, [showEnglishTranslation]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <GameWalkthrough
        run={walkthroughRun}
        stepIndex={walkthroughStepIndex}
        steps={walkthroughSteps}
        callback={handleWalkthroughCallback}
      />
      <WalkthroughCompletionModal
        open={showCompletionModal}
        onReplay={restartWalkthrough}
        onClose={() => {
          setShowCompletionModal(false);
          // Focus on game input if needed
        }}
      />
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
        // Add data-tour attributes for walkthrough
        data-tour-new-game
        data-tour-settings
        data-tour-statistics
        data-tour-help
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
      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
        solution={solution}
        revealWord={handleRevealWord}
        wordLength={wordLength}
        onRestartWalkthrough={() => {
          setIsHelpOpen(false);
          setTimeout(() => restartWalkthrough(), 300);
        }}
      />
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
        startNewGameWithLength={startNewGameWithLength}
        currentWordLength={wordLength}
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
          <div className="flex flex-col items-center w-full game-board">
            <GameBoard 
              guesses={guesses} 
              currentGuess={currentGuess} 
              turn={turn} 
              solution={solution} 
              showTonalAccents={showTonalAccents}
              wordLength={wordLength}
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

            {/* Revealed Word Display */}
            {isWordRevealed && (
              <div className="text-center text-sm text-red-400 px-2 mt-2 bg-red-900 bg-opacity-20 rounded-lg py-2">
                <p><strong>Revealed Solution:</strong> <span className="font-mono text-lg">{solution}</span></p>
              </div>
            )}
          </div>
          
          {/* Keyboard */}
          <div className="mt-4 mb-4 keyboard-container">
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

// Main component that wraps the game in Suspense
const YorubaWordlePage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <YorubaWordMasterGame />
    </Suspense>
  );
};

export default YorubaWordlePage;