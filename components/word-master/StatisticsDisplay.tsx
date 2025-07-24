'use client';

import { useEffect } from 'react';
import { usePreferences } from '@/hooks/usePreferences';

interface StatisticsDisplayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatisticsDisplay({ isOpen, onClose }: StatisticsDisplayProps) {
  const { preferences, resetStatistics } = usePreferences();
  const { statistics } = preferences;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const winPercentage = statistics.gamesPlayed > 0 
    ? Math.round((statistics.gamesWon / statistics.gamesPlayed) * 100)
    : 0;

  const maxGuesses = Math.max(...Object.values(statistics.guessDistribution));

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 text-white rounded-lg shadow-xl w-full max-w-md mx-4 flex flex-col max-h-[75vh] sm:max-h-[80vh] min-h-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 p-6 pb-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Statistics</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 py-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{statistics.gamesPlayed}</div>
              <div className="text-sm text-gray-400">Played</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{winPercentage}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{statistics.currentStreak}</div>
              <div className="text-sm text-gray-400">Current</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{statistics.maxStreak}</div>
              <div className="text-sm text-gray-400">Best</div>
            </div>
          </div>

          {/* Guess Distribution */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Guess Distribution</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map(guess => {
                const count = statistics.guessDistribution[guess];
                const percentage = maxGuesses > 0 ? (count / maxGuesses) * 100 : 0;
                return (
                  <div key={guess} className="flex items-center">
                    <div className="w-4 text-center">{guess}</div>
                    <div className="flex-1 mx-2 bg-gray-700 rounded">
                      <div 
                        className="bg-purple-600 h-6 rounded flex items-center justify-end pr-2"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      >
                        <span className="text-sm">{count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-6 pt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (confirm('Reset all statistics?')) {
                resetStatistics();
              }
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
} 