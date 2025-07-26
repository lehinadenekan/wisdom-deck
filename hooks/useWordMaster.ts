'use client';

import { useState, useEffect, useCallback } from 'react';

// Define the structure for a tile's state
export type TileStatus = 'empty' | 'correct' | 'present' | 'absent';

export interface Tile {
  char: string;
  status: TileStatus;
}

export type KeyboardStatus = { [key: string]: TileStatus };

// Helper function to count graphemes (visual characters) in a string
const countGraphemes = (str: string): number => {
  // Use Intl.Segmenter if available (modern browsers)
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('yo', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str)).length;
  }
  // Fallback: normalize and use Array.from (which splits on grapheme boundaries)
  return Array.from(str.normalize('NFC')).length;
};

// Helper function to get graphemes from a string
const getGraphemes = (str: string): string[] => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('yo', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str)).map(seg => seg.segment);
  }
  return Array.from(str.normalize('NFC'));
};

// The full set of characters allowed in the Yoruba Wordle.
const yorubaAlphabet = new Set([
  'a', 'à', 'á', 'ã', 'b', 'd', 'e', 'è', 'é', 'ẽ', 'ẹ', 'ẹ̀', 'ẹ́', 'ẹ̃', 'f', 'g', 
  'gb', 'h', 'i', 'ì', 'í', 'ĩ', 'j', 'k', 'l', 'm', 'n', 'o', 'ò', 'ó', 'õ', 
  'ọ', 'ọ̀', 'ọ́', 'ọ̃', 'p', 'r', 's', 'ṣ', 't', 'u', 'ù', 'ú', 'ũ', 'w', 'y'
].map(char => char.normalize('NFC')));

const useWordMaster = (difficulty: 'easy' | 'intermediate' = 'easy') => {
  const [solution, setSolution] = useState<string>('');
  const [solutionInfo, setSolutionInfo] = useState({
    partOfSpeech: '',
    englishTranslation: '',
    additionalInfo: ''
  });
  const [wordLength, setWordLength] = useState<number>(5);
  const [guesses, setGuesses] = useState<Tile[][]>(() => Array(6).fill(null).map(() => Array(5).fill({ char: '', status: 'empty' })));
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [turn, setTurn] = useState<number>(0);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isGameLost, setIsGameLost] = useState<boolean>(false);
  const [keyboardStatus, setKeyboardStatus] = useState<KeyboardStatus>({});
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const fetchWord = useCallback(async (length: number = 5) => {
    try {
      console.log(`Fetching random word with length: ${length}, difficulty: ${difficulty}`);
      const res = await fetch(`/api/word-master/random-word?length=${length}&difficulty=${difficulty}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Received word data:', data);
      
      if (data.word && data.word.yorubaWord) {
        const newWordLength = countGraphemes(data.word.yorubaWord);
        setWordLength(newWordLength);
        setSolution(data.word.yorubaWord.toLowerCase());
        setSolutionInfo({
          partOfSpeech: data.word.partOfSpeech,
          englishTranslation: data.word.englishTranslation,
          additionalInfo: data.word.additionalInfo,
        });
        console.log('Set solution:', data.word.yorubaWord.toLowerCase(), 'with length:', newWordLength);
      } else {
        throw new Error('Invalid word data received');
      }
    } catch (error) {
      console.error("Failed to fetch word:", error);
      setErrorMessage("Could not load word. Please refresh.");
    }
  }, [difficulty]);

  useEffect(() => {
    fetchWord(wordLength);
  }, [fetchWord, wordLength]);

  // Start new game function - resets all state and fetches new word
  const startNewGame = useCallback(async () => {
    // Reset all game state
    setGuesses(Array(6).fill(null).map(() => Array(wordLength).fill({ char: '', status: 'empty' })));
    setCurrentGuess('');
    setTurn(0);
    setIsGameWon(false);
    setIsGameLost(false);
    setKeyboardStatus({});
    setErrorMessage('');
    
    // Fetch new random word
    await fetchWord(wordLength);
  }, [fetchWord, wordLength]);

  // Start new game with specific word length
  const startNewGameWithLength = useCallback(async (length: number) => {
    setWordLength(length);
    // Reset all game state with new length
    setGuesses(Array(6).fill(null).map(() => Array(length).fill({ char: '', status: 'empty' })));
    setCurrentGuess('');
    setTurn(0);
    setIsGameWon(false);
    setIsGameLost(false);
    setKeyboardStatus({});
    setErrorMessage('');
    
    // Fetch new random word with specified length
    await fetchWord(length);
  }, [fetchWord]);

  const evaluateGuess = useCallback((guess: string): Tile[] => {
    const normalizedGuess = guess.normalize('NFC');
    const normalizedSolution = solution.normalize('NFC');
    
    const guessChars = getGraphemes(normalizedGuess);
    const solutionChars = getGraphemes(normalizedSolution);

    const result: Tile[] = guessChars.map(char => ({ char, status: 'absent' }));
    const newKeyboardStatus = { ...keyboardStatus };

    const solutionCharCount = solutionChars.reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });

    // First pass for 'correct' letters (green)
    guessChars.forEach((char, i) => {
        if (char === solutionChars[i]) {
            result[i].status = 'correct';
            solutionCharCount[char]--;
            newKeyboardStatus[char] = 'correct';
        }
    });

    // Second pass for 'present' letters (yellow)
    guessChars.forEach((char, i) => {
        if (result[i].status !== 'correct') {
            if (solutionCharCount[char] > 0) {
                result[i].status = 'present';
                solutionCharCount[char]--;
                if (newKeyboardStatus[char] !== 'correct') {
                    newKeyboardStatus[char] = 'present';
                }
            } else {
                if (newKeyboardStatus[char] !== 'correct' && newKeyboardStatus[char] !== 'present') {
                    newKeyboardStatus[char] = 'absent';
                }
            }
        }
    });

    setKeyboardStatus(newKeyboardStatus);
    return result;
  }, [solution, keyboardStatus]);

  const submitGuess = useCallback(async () => {
    const currentGuessLength = countGraphemes(currentGuess);
    if (currentGuessLength !== wordLength) {
      setErrorMessage("Not enough letters");
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }
    if (turn >= 6 || isGameWon) return;

    // Validate word
    try {
      console.log('Validating guess:', currentGuess);
      const res = await fetch('/api/word-master/validate-guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: currentGuess }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Validation response:', data);

      if (!data.isValid) {
        setErrorMessage("Not in word list");
        setTimeout(() => setErrorMessage(''), 2000);
        return;
      }

      const evaluatedGuess = evaluateGuess(currentGuess);
      const newGuesses = [...guesses];
      newGuesses[turn] = evaluatedGuess;
      setGuesses(newGuesses);

      if (currentGuess === solution) {
        setIsGameWon(true);
      }

      setTurn(prev => prev + 1);
      setCurrentGuess('');

      if (turn + 1 === 6 && currentGuess !== solution) {
        setIsGameLost(true);
      }
    } catch (error) {
      console.error("Validation failed:", error);
      setErrorMessage("Could not validate word.");
      setTimeout(() => setErrorMessage(''), 2000);
    }
  }, [currentGuess, turn, isGameWon, solution, guesses, evaluateGuess, wordLength]);

  const handleKeyPress = useCallback((key: string) => {
    const lowerKey = key.toLowerCase().normalize('NFC');
    console.log('Handling key press:', lowerKey);
    console.log('Unicode points:', Array.from(lowerKey).map(c => c.charCodeAt(0)));

    if (isGameWon || isGameLost) return;

    if (lowerKey === 'enter') {
      submitGuess();
      return;
    }

    if (lowerKey === 'backspace') {
      // Remove the last grapheme instead of the last character
      const graphemes = getGraphemes(currentGuess);
      graphemes.pop();
      setCurrentGuess(graphemes.join(''));
      return;
    }

    // Handle 'gb' as a single character
    if (lowerKey === 'gb') {
      if (countGraphemes(currentGuess) < wordLength) {
        setCurrentGuess((prev) => prev + 'gb');
      }
      return;
    }

    // Regular letter input - now properly handles combined characters
    if (countGraphemes(currentGuess) < wordLength && yorubaAlphabet.has(lowerKey)) {
      console.log('Adding character to guess:', lowerKey);
      setCurrentGuess((prev) => prev + lowerKey);
    } else {
      console.log('Character not in Yoruba alphabet:', lowerKey);
    }
  }, [submitGuess, currentGuess, isGameWon, isGameLost, wordLength]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      // Let the on-screen keyboard handle accented letters, as physical keyboard support is complex.
      // This regex allows basic Yoruba letters and standard alphabet for typing.
      if (/^[a-zA-ZẹọṣẸỌṢ]$/.test(key) || key === 'Backspace' || key === 'Enter') {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return {
    solution,
    solutionInfo,
    guesses,
    currentGuess,
    turn,
    isGameWon,
    isGameLost,
    keyboardStatus,
    errorMessage,
    handleKeyPress,
    startNewGame,
    startNewGameWithLength,
    wordLength,
  };
};

export default useWordMaster; 