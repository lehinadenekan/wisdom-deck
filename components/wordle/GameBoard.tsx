import React from 'react';
import { Tile } from '@/hooks/useWordMaster';
import { getDiacritic } from '@/lib/accents';

interface GameBoardProps {
  guesses: Tile[][];
  currentGuess: string;
  turn: number;
  solution: string;
  showTonalAccents: boolean;
  className?: string;
}

// Helper function to get graphemes from a string
const getGraphemes = (str: string): string[] => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('yo', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str)).map(seg => seg.segment);
  }
  return Array.from(str.normalize('NFC'));
};

const GameBoard: React.FC<GameBoardProps> = ({ guesses, currentGuess, turn, solution, showTonalAccents, className }) => {
  const totalCols = 5;

  return (
    <div className={`relative ${className || ''}`}>
      <div className="grid grid-rows-6 gap-0.5 sm:gap-1.5">
        {guesses.map((guess, rowIndex) => {
          // This is a past guess, so we display it from the `guesses` state
          if (rowIndex < turn) {
            return (
              <div key={rowIndex} className="grid grid-cols-5 gap-0.5 sm:gap-1.5">
                {guess.map((tile, colIndex) => (
                  <div 
                    key={colIndex}
                    className={`w-10 h-10 sm:w-16 sm:h-16 border border-gray-600 flex items-center justify-center text-sm sm:text-3xl font-bold uppercase
                      ${tile.status === 'correct' ? 'bg-green-500 border-green-500' : ''}
                      ${tile.status === 'present' ? 'bg-yellow-500 border-yellow-500' : ''}
                      ${tile.status === 'absent' ? 'bg-gray-700 border-gray-700' : ''}
                    `}
                  >
                    {tile.char}
                  </div>
                ))}
              </div>
            );
          }

          // This is the current row for the active guess
          if (rowIndex === turn) {
            const currentGraphemes = getGraphemes(currentGuess);
            return (
              <div key={rowIndex} className="grid grid-cols-5 gap-0.5 sm:gap-1.5">
                {Array.from({ length: totalCols }).map((_, colIndex) => (
                  <div 
                    key={colIndex}
                    className="w-10 h-10 sm:w-16 sm:h-16 border border-gray-600 flex items-center justify-center text-sm sm:text-3xl font-bold uppercase"
                  >
                    {currentGraphemes[colIndex] || ''}
                  </div>
                ))}
              </div>
            );
          }

          // This is a future, empty row
          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-0.5 sm:gap-1.5">
              {Array.from({ length: totalCols }).map((_, colIndex) => (
                <div 
                  key={colIndex}
                  className="w-10 h-10 sm:w-16 sm:h-16 border border-gray-600"
                />
              ))}
            </div>
          );
        })}
      </div>
      {showTonalAccents && (
        <div className="absolute -top-8 left-0 right-0 grid grid-cols-5 gap-0.5 sm:gap-1.5 pointer-events-none">
          {getGraphemes(solution).map((char, index) => {
            const accent = getDiacritic(char);
            return (
              <div key={index} className="w-10 h-10 sm:w-16 sm:h-16 flex items-start justify-center">
                <span className="text-sm sm:text-3xl text-yellow-400 font-semibold">
                  {accent}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GameBoard; 