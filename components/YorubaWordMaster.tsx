'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { GameState, GuessResult, WordleWord, WORD_LENGTH, MAX_GUESSES, YORUBA_SPECIAL_CHARS } from '@/types/wordle';

export default function YorubaWordMaster() {
  const [gameState, setGameState] = useState<GameState>({
    currentGuess: '',
    guesses: [],
    results: [],
    gameStatus: 'playing'
  });

  // Debug logging for component mount and special characters
  useEffect(() => {
    console.log('YorubaWordMaster component mounted');
    console.log('Available special characters:', YORUBA_SPECIAL_CHARS);
    YORUBA_SPECIAL_CHARS.forEach(char => {
      console.log(`Character: ${char}, Unicode:`, char.split('').map(c => c.charCodeAt(0)));
    });
  }, []);

  // Load random word on component mount
  useEffect(() => {
    const loadRandomWord = async () => {
      try {
        const response = await fetch('/api/word-master/random-word');
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Failed to fetch word');
        
        setGameState(prev => ({
          ...prev,
          solution: {
            id: '',
            word: data.word.yorubaWord.toLowerCase(),
            part_of_speech: data.word.partOfSpeech,
            english_translation: data.word.englishTranslation,
            example_sentence: data.word.additionalInfo,
            word_length: data.word.yorubaWord.length
          }
        }));
      } catch (error) {
        console.error('Error loading random word:', error);
        setGameState(prev => ({ ...prev, error: 'Failed to load word' }));
      }
    };

    loadRandomWord();
  }, []);

  // Handle keyboard input
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (gameState.gameStatus !== 'playing') return;

    const key = event.key.toLowerCase();

    if (key === 'enter') {
      handleGuess();
    } else if (key === 'backspace') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
        error: undefined
      }));
    } else if (isValidKey(key)) {
      if (gameState.currentGuess.length < WORD_LENGTH) {
        setGameState(prev => ({
          ...prev,
          currentGuess: prev.currentGuess + key,
          error: undefined
        }));
      }
    }
  }, [gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Check if a key is valid (letter or special character)
  const isValidKey = (key: string): boolean => {
    const normalizedKey = key.normalize('NFC').toLowerCase();
    console.log('Validating key:', key);
    console.log('Normalized key:', normalizedKey);
    console.log('Unicode points:', normalizedKey.split('').map(c => c.charCodeAt(0)));
    console.log('Is in special chars:', YORUBA_SPECIAL_CHARS.includes(normalizedKey));
    console.log('Is regular letter:', /^[a-z]$/.test(normalizedKey));
    
    return (
      /^[a-z]$/.test(normalizedKey) ||
      YORUBA_SPECIAL_CHARS.includes(normalizedKey)
    );
  };

  // Handle guess submission
  const handleGuess = async () => {
    if (!gameState.solution) return;

    const guess = gameState.currentGuess.toLowerCase();

    // Validate guess length
    if (guess.length !== WORD_LENGTH) {
      setGameState(prev => ({ ...prev, error: `Word must be ${WORD_LENGTH} letters long` }));
      return;
    }

    try {
      // Validate word exists in dictionary
      const response = await fetch('/api/word-master/validate-guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to validate guess');
      }

      if (!data.isValid) {
        setGameState(prev => ({ ...prev, error: 'Word not found in dictionary' }));
        return;
      }

      // Check guess against solution
      const results = checkGuess(guess, gameState.solution.word);
      const isWinner = results.every(r => r.status === 'correct');

      setGameState(prev => ({
        ...prev,
        currentGuess: '',
        guesses: [...prev.guesses, guess],
        results: [...prev.results, results],
        gameStatus: isWinner ? 'won' :
                   prev.guesses.length + 1 >= MAX_GUESSES ? 'lost' : 'playing',
        error: undefined
      }));
    } catch (error) {
      console.error('Error validating guess:', error);
      setGameState(prev => ({ ...prev, error: 'Error validating guess' }));
    }
  };

  // Check guess against solution
  const checkGuess = (guess: string, solution: string): GuessResult[] => {
    const results: GuessResult[] = [];
    const solutionChars = solution.split('');
    const remainingChars = [...solutionChars];

    // First pass: Mark correct letters
    guess.split('').forEach((letter, i) => {
      if (letter === solutionChars[i]) {
        results[i] = { letter, status: 'correct' };
        remainingChars[i] = '';
      }
    });

    // Second pass: Mark present/absent letters
    guess.split('').forEach((letter, i) => {
      if (!results[i]) {
        const index = remainingChars.indexOf(letter);
        if (index !== -1) {
          results[i] = { letter, status: 'present' };
          remainingChars[index] = '';
        } else {
          results[i] = { letter, status: 'absent' };
        }
      }
    });

    return results;
  };

  // Get keyboard letter status
  const getLetterStatus = (letter: string): 'correct' | 'present' | 'absent' | 'unused' => {
    let status: 'correct' | 'present' | 'absent' | 'unused' = 'unused';
    
    // Exact match only - no normalization
    for (const results of gameState.results) {
      for (const result of results) {
        // Only mark the exact character as used
        if (result.letter === letter.toLowerCase()) {
          if (result.status === 'correct') return 'correct';
          if (result.status === 'present') status = 'present';
          if (result.status === 'absent' && status === 'unused') status = 'absent';
        }
      }
    }
    
    return status;
  };

  // Render game board
  const renderBoard = () => {
    const rows = [];
    
    // Past guesses
    for (let i = 0; i < gameState.guesses.length; i++) {
      rows.push(
        <div key={i} className="flex gap-1 mb-1">
          {gameState.results[i].map((result, j) => (
            <div
              key={j}
              className={`
                w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded
                ${result.status === 'correct' ? 'bg-green-500 border-green-600 text-white' :
                  result.status === 'present' ? 'bg-yellow-500 border-yellow-600 text-white' :
                  'bg-gray-500 border-gray-600 text-white'}
              `}
            >
              {result.letter.toUpperCase()}
            </div>
          ))}
        </div>
      );
    }
    
    // Current guess
    if (gameState.gameStatus === 'playing') {
      rows.push(
        <div key="current" className="flex gap-1 mb-1">
          {Array(WORD_LENGTH).fill(0).map((_, i) => (
            <div
              key={i}
              className={`
                w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded
                ${i < gameState.currentGuess.length ? 'border-gray-400 text-black' : 'border-gray-300'}
              `}
            >
              {i < gameState.currentGuess.length ? gameState.currentGuess[i].toUpperCase() : ''}
            </div>
          ))}
        </div>
      );
    }
    
    // Empty rows
    const remainingRows = MAX_GUESSES - rows.length;
    for (let i = 0; i < remainingRows; i++) {
      rows.push(
        <div key={`empty-${i}`} className="flex gap-1 mb-1">
          {Array(WORD_LENGTH).fill(0).map((_, j) => (
            <div
              key={j}
              className="w-14 h-14 border-2 border-gray-300 flex items-center justify-center text-2xl font-bold rounded"
            />
          ))}
        </div>
      );
    }
    
    return rows;
  };

  // Render keyboard
  const renderKeyboard = () => {
    const rows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
    ];

    return (
      <div className="mt-4">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 mb-1">
            {row.map(key => {
              const status = getLetterStatus(key.toLowerCase());
              return (
                <button
                  key={key}
                  onClick={() => {
                    if (key === 'Enter') handleGuess();
                    else if (key === 'Backspace') {
                      setGameState(prev => ({
                        ...prev,
                        currentGuess: prev.currentGuess.slice(0, -1),
                        error: undefined
                      }));
                    } else if (gameState.currentGuess.length < WORD_LENGTH) {
                      setGameState(prev => ({
                        ...prev,
                        currentGuess: prev.currentGuess + key.toLowerCase(),
                        error: undefined
                      }));
                    }
                  }}
                  className={`
                    px-2 py-4 text-sm font-semibold rounded
                    ${key.length > 1 ? 'px-4' : 'min-w-[2.5rem]'}
                    ${status === 'correct' ? 'bg-green-500 text-white' :
                      status === 'present' ? 'bg-yellow-500 text-white' :
                      status === 'absent' ? 'bg-gray-500 text-white' :
                      'bg-gray-200 text-black hover:bg-gray-300'}
                  `}
                >
                  {key === 'Backspace' ? '←' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Render special characters keyboard
  const handleSpecialCharClick = (char: string) => {
    console.log('handleSpecialCharClick called with:', char);
    if (gameState.currentGuess.length < WORD_LENGTH) {
      console.log('Adding character to guess:', char);
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + char,
        error: undefined
      }));
    }
  };

  const renderSpecialChars = () => {
    console.log('Rendering special characters keyboard');
    return (
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {YORUBA_SPECIAL_CHARS.map(char => {
          console.log('Rendering button for char:', char);
          const status = getLetterStatus(char);
          return (
            <button
              key={char}
              type="button"
              onClick={() => {
                console.log('Button clicked:', char);
                handleSpecialCharClick(char);
              }}
              disabled={status === 'absent'}
              className={`
                px-2 py-2 text-black rounded min-w-[2rem] text-sm font-semibold
                ${status === 'correct' ? 'bg-green-500 text-white' :
                  status === 'present' ? 'bg-yellow-500 text-white' :
                  status === 'absent' ? 'bg-gray-500 text-white cursor-not-allowed' :
                  'bg-gray-200 hover:bg-gray-300'}
              `}
            >
              {char}
            </button>
          );
        })}
      </div>
    );
  };

  // Render game status
  const renderGameStatus = () => {
    if (gameState.error) {
      return <div className="mt-4 text-red-500 text-center">{gameState.error}</div>;
    }

    if (gameState.gameStatus === 'won') {
      return (
        <div className="mt-4 text-center">
          <div className="text-green-500 font-bold text-xl">Congratulations! You won! 🎉</div>
          <div className="mt-2">
            <div>The word was: {gameState.solution?.word.toUpperCase()}</div>
            <div>Meaning: {gameState.solution?.english_translation}</div>
            {gameState.solution?.example_sentence && (
              <div className="mt-2">
                <div className="font-semibold">Example:</div>
                <div>{gameState.solution.example_sentence}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (gameState.gameStatus === 'lost') {
      return (
        <div className="mt-4 text-center">
          <div className="text-red-500 font-bold text-xl">Game Over</div>
          <div className="mt-2">
            <div>The word was: {gameState.solution?.word.toUpperCase()}</div>
            <div>Meaning: {gameState.solution?.english_translation}</div>
            {gameState.solution?.example_sentence && (
              <div className="mt-2">
                <div className="font-semibold">Example:</div>
                <div>{gameState.solution.example_sentence}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="mb-8">
        {renderBoard()}
      </div>
      {renderGameStatus()}
      {gameState.gameStatus === 'playing' && (
        <>
          {renderKeyboard()}
          {renderSpecialChars()}
        </>
      )}
    </div>
  );
} 