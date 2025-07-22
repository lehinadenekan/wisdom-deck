'use client';

import { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { usePreferences } from '@/hooks/usePreferences';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNewGame?: () => void;
}

export default function SettingsPanel({ isOpen, onClose, onNewGame }: SettingsPanelProps) {
  const { preferences, updatePreference } = usePreferences();
  
  // Use preferences for state
  const difficulty = preferences.difficulty;
  const wordLength = preferences.wordLength;

  if (!isOpen) return null;

  const handleDifficultyChange = (value: string) => {
    updatePreference('difficulty', value as 'beginner' | 'intermediate' | 'advanced');
  };

  const handleWordLengthChange = (value: number) => {
    updatePreference('wordLength', value as 3 | 4 | 5 | 6 | 7);
  };

  const handleApplySettings = () => {
    // Future: Apply settings and start new game
    if (onNewGame) {
      onNewGame();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Settings className="mr-2" size={24} />
            Game Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close settings"
          >
            <X size={24} />
          </button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Difficulty Setting (Placeholder) */}
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty Level</label>
            <div className="text-sm text-gray-400 mb-2">Choose your challenge level</div>
            <select 
              value={difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled
            >
              <option value="beginner">Beginner (Coming Soon)</option>
              <option value="intermediate">Intermediate (Current)</option>
              <option value="advanced">Advanced (Coming Soon)</option>
            </select>
          </div>

          {/* Word Length Setting (Placeholder) */}
          <div>
            <label className="block text-sm font-medium mb-2">Word Length</label>
            <div className="text-sm text-gray-400 mb-2">Number of letters in the word</div>
            <select 
              value={wordLength}
              onChange={(e) => handleWordLengthChange(Number(e.target.value))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled
            >
              <option value={3}>3 Letters (Coming Soon)</option>
              <option value={4}>4 Letters (Coming Soon)</option>
              <option value={5}>5 Letters (Current)</option>
              <option value={6}>6 Letters (Coming Soon)</option>
              <option value={7}>7 Letters (Coming Soon)</option>
            </select>
          </div>

          {/* Info Box */}
          <div className="bg-purple-900 bg-opacity-50 border border-purple-600 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-purple-200">Coming Soon!</h3>
            <p className="text-sm text-purple-300">
              Difficulty levels and variable word lengths are in development. 
              Currently playing with 5-letter intermediate words.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApplySettings}
            className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
            disabled
          >
            Apply & New Game
          </button>
        </div>
      </div>
    </div>
  );
} 