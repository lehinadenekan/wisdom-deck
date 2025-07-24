'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution?: string;
  solutionInfo?: {
    partOfSpeech: string;
    englishTranslation: string;
    additionalInfo: string;
  };
  isWordRevealed?: boolean;
  revealWord?: () => void;
  turn?: number;
  wordLength?: number;
}

const HelpModal: React.FC<HelpModalProps> = ({ 
  isOpen, 
  onClose, 
  solution, 
  solutionInfo, 
  isWordRevealed, 
  revealWord, 
  turn = 0,
  wordLength = 5
}) => {
  const [activeTab, setActiveTab] = useState<'how-to-play' | 'need-help'>('how-to-play');
  const [showRevealConfirmation, setShowRevealConfirmation] = useState(false);

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

  const handleRevealWord = () => {
    if (revealWord) {
      revealWord();
      setShowRevealConfirmation(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl text-left max-w-2xl w-full mx-4 text-gray-300 flex flex-col max-h-[75vh] sm:max-h-[80vh] min-h-[300px]" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 p-6 pb-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Help & Hints</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close help"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('how-to-play')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'how-to-play' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              How to Play
            </button>
            <button
              onClick={() => setActiveTab('need-help')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'need-help' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Need Help?
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 py-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          {activeTab === 'how-to-play' && (
            <div className="space-y-5 text-justify">
              <p className="text-center text-lg">Guess the secret {wordLength}-letter <strong className="text-purple-400">Yorùbá</strong> word in six tries.</p>

              <hr className="border-gray-700"/>

              <div>
                <h3 className="font-bold text-xl mb-3 text-white">Àwọn Àwọ̀ (The Colors)</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-2xl font-bold text-white rounded-md">A</div>
                    <p><strong className="text-white">Correct:</strong> The letter is in the word and in the correct spot.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500 flex items-center justify-center text-2xl font-bold text-white rounded-md">B</div>
                    <p><strong className="text-white">Present:</strong> The letter is in the word but in the wrong spot.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-700 flex items-center justify-center text-2xl font-bold text-white rounded-md">D</div>
                    <p><strong className="text-white">Absent:</strong> The letter is not in the word in any spot.</p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-700"/>

              <div>
                <h3 className="font-bold text-xl mb-3 text-white">Àmì Ohùn (Accents Are Key)</h3>
                <p className="mb-2">In Yorùbá, accents change a word's meaning! (e.g., <code className="bg-gray-700 px-1 rounded">oko</code> = farm, <code className="bg-gray-700 px-1 rounded">ọkọ</code> = husband, <code className="bg-gray-700 px-1 rounded">ọkọ́</code> = spear).</p>
                <ul className="list-disc list-outside space-y-1 pl-5">
                  <li>To type an accented vowel, <strong className="text-purple-400">press and hold</strong> it on the on-screen keyboard to see its variations.</li>
                  <li>The unique letters <code className="bg-gray-700 px-1 rounded">ẹ</code>, <code className="bg-gray-700 px-1 rounded">ọ</code>, and <code className="bg-gray-700 px-1 rounded">ṣ</code> have their own keys.</li>
                </ul>
              </div>

              <hr className="border-gray-700"/>

              <div>
                <h3 className="font-bold text-xl mb-3 text-white">Ìrànlọ́wọ́ (Need a Clue?)</h3>
                <ul className="list-disc list-outside space-y-1 pl-5">
                  <li>For an easier game, toggle on <strong className="text-purple-400">'Show tonal accents'</strong> *before* you start to see the word's accents.</li>
                  <li>After your first guess, you can use the other hint toggles to reveal the word's translation and more.</li>
                  <li>If you're really stuck, check the "Need Help?" tab to reveal the word and learn its meaning.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'need-help' && (
            <div className="space-y-6">
              {!isWordRevealed ? (
                <>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Stuck on this word?</h3>
                    <p className="text-gray-300 mb-4">
                      You've made <strong className="text-purple-400">{turn}</strong> out of 6 guesses.
                    </p>
                    <p className="text-gray-400 mb-6">
                      Don't worry! You can reveal the word to learn its meaning and try again.
                    </p>
                  </div>

                  <div className="bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-purple-200">Ready to learn?</h4>
                    <p className="text-sm text-purple-300 mb-4">
                      Revealing the word will end your current game and show you the solution with its meaning.
                    </p>
                    <button
                      onClick={() => setShowRevealConfirmation(true)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                      Reveal the Word
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-white">Now you know!</h3>
                  
                  <div className="bg-green-900 bg-opacity-30 border border-green-600 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-green-200">The word was:</h4>
                    <div className="text-2xl font-bold text-green-300 mb-2">{solution}</div>
                    {solutionInfo && (
                      <div className="text-sm text-green-300 space-y-1">
                        {solutionInfo.englishTranslation && (
                          <p><strong>English:</strong> {solutionInfo.englishTranslation}</p>
                        )}
                        {solutionInfo.partOfSpeech && (
                          <p><strong>Part of Speech:</strong> {solutionInfo.partOfSpeech}</p>
                        )}
                        {solutionInfo.additionalInfo && (
                          <p><strong>Info:</strong> {solutionInfo.additionalInfo}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300">Ready for another word?</p>
                  <button
                    onClick={onClose}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Start New Game
                  </button>
                </div>
              )}

              {showRevealConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-4">
                    <h4 className="text-lg font-bold text-white mb-4">Reveal the word?</h4>
                    <p className="text-gray-300 mb-6">
                      This will end your current game and show you the solution with its meaning.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowRevealConfirmation(false)}
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRevealWord}
                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                      >
                        Yes, Reveal
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal; 