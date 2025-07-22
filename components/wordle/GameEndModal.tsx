import React from 'react';
import { Tile } from '@/hooks/useWordMaster';

interface GameEndModalProps {
  isOpen: boolean;
  isGameWon: boolean;
  solution: string;
  guesses: Tile[][];
  turn: number;
  onReset: () => void;
}

const GameEndModal: React.FC<GameEndModalProps> = ({ isOpen, isGameWon, solution, guesses, turn, onReset }) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    const title = isGameWon ? `Yorùbá Word Master ${turn}/6` : `Yorùbá Word Master X/6`;
    const emojiGrid = guesses
      .slice(0, turn)
      .map(guessRow =>
        guessRow
          .map(tile => {
            if (tile.status === 'correct') return '🟩';
            if (tile.status === 'present') return '🟨';
            return '⬜';
          })
          .join('')
      )
      .join('\\n');

    const shareText = `${title}\\n\\n${emojiGrid}`;
    navigator.clipboard.writeText(shareText).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4">
          {isGameWon ? 'Congratulations!' : 'Game Over'}
        </h2>
        <p className="text-lg mb-2">
          {isGameWon ? "You guessed the word correctly." : "Better luck next time!"}
        </p>
        <p className="text-md mb-6">
          The word was: <strong className="text-xl text-green-400 uppercase tracking-widest">{solution}</strong>
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            Play Again
          </button>
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            {hasCopied ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal; 