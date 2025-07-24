'use client';

import { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import { usePreferences } from '@/hooks/usePreferences';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNewGame?: () => void;
  showTonalAccents?: boolean;
  setShowTonalAccents?: (show: boolean) => void;
  showPartOfSpeech?: boolean;
  setShowPartOfSpeech?: (show: boolean) => void;
  showEnglishTranslation?: boolean;
  setShowEnglishTranslation?: (show: boolean) => void;
  onSettingsApplied?: () => void;
  startNewGameWithLength?: (length: number) => void;
  currentWordLength?: number;
}

export default function SettingsPanel({ 
  isOpen, 
  onClose, 
  onNewGame, 
  showTonalAccents, 
  setShowTonalAccents, 
  showPartOfSpeech, 
  setShowPartOfSpeech, 
  showEnglishTranslation, 
  setShowEnglishTranslation, 
  onSettingsApplied,
  startNewGameWithLength,
  currentWordLength = 5
}: SettingsPanelProps) {
  const { preferences, updatePreference } = usePreferences();
  
  // Use preferences for state
  const difficulty = preferences.difficulty;
  const [selectedWordLength, setSelectedWordLength] = useState(currentWordLength);

  useEffect(() => {
    setSelectedWordLength(currentWordLength);
  }, [currentWordLength]);

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

  const handleDifficultyChange = (value: string) => {
    updatePreference('difficulty', value as 'beginner' | 'intermediate' | 'advanced');
  };

  const handleWordLengthChange = (value: number) => {
    setSelectedWordLength(value);
    updatePreference('wordLength', value as 3 | 4 | 5 | 6 | 7);
  };

  const handleApplySettings = () => {
    // If word length changed, start a new game with the new length
    if (selectedWordLength !== currentWordLength && startNewGameWithLength) {
      startNewGameWithLength(selectedWordLength);
    }
    
    // Apply settings without resetting the game
    onSettingsApplied && onSettingsApplied();
    onClose();
  };

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
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 py-4 space-y-6" style={{ WebkitOverflowScrolling: 'touch' }}>
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

          {/* Word Length Setting */}
          <div>
            <label className="block text-sm font-medium mb-2">Word Length</label>
            <div className="text-sm text-gray-400 mb-2">Number of letters in the word</div>
            <select 
              value={selectedWordLength}
              onChange={(e) => handleWordLengthChange(Number(e.target.value))}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={3}>3 Letters</option>
              <option value={4}>4 Letters</option>
              <option value={5}>5 Letters</option>
              <option value={6}>6 Letters</option>
              <option value={7}>7 Letters</option>
            </select>
          </div>

          {/* Game Hint Toggles */}
          <div>
            <label className="block text-sm font-medium mb-2">Game Hints</label>
            <div className="text-sm text-gray-400 mb-3">Control what hints are shown during gameplay</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-white">Show Tonal Accents</span>
                <button
                  onClick={() => setShowTonalAccents && setShowTonalAccents(!showTonalAccents)}
                  className={`w-12 h-6 rounded-full transition-colors ${showTonalAccents ? 'bg-blue-500' : 'bg-gray-500'} relative`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${showTonalAccents ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-white">Show Part of Speech</span>
                <button
                  onClick={() => setShowPartOfSpeech && setShowPartOfSpeech(!showPartOfSpeech)}
                  className={`w-12 h-6 rounded-full transition-colors ${showPartOfSpeech ? 'bg-blue-500' : 'bg-gray-500'} relative`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${showPartOfSpeech ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-white">Show English Translation</span>
                <button
                  onClick={() => setShowEnglishTranslation && setShowEnglishTranslation(!showEnglishTranslation)}
                  className={`w-12 h-6 rounded-full transition-colors ${showEnglishTranslation ? 'bg-blue-500' : 'bg-gray-500'} relative`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${showEnglishTranslation ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-purple-900 bg-opacity-50 border border-purple-600 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-purple-200">Word Length Available!</h3>
            <p className="text-sm text-purple-300">
              You can now choose between 3-7 letter words. Changing the word length will start a new game.
            </p>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-6 pt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApplySettings}
            className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
} 