import React, { useEffect } from 'react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl text-left max-w-lg w-full mx-4 text-gray-300" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Báwo Ni A Ṣe Ń Ṣeré?</h2>
          <p className="text-lg text-gray-400">(How to Play)</p>
        </div>
        
        <div className="space-y-5 text-justify">
          <p className="text-center text-lg">Guess the secret 5-letter <strong className="text-yellow-400">Yorùbá</strong> word in six tries.</p>

          <hr className="border-gray-700"/>

          <div>
            <h3 className="font-bold text-xl mb-3 text-white">Àwọn Àwọ̀ (The Colors)</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500 flex items-center justify-center text-2xl font-bold text-white rounded-md">A</div>
                <p><strong className="text-white">Correct:</strong> The letter is in the word and in the correct spot.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center text-2xl font-bold text-white rounded-md">B</div>
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
              <li>To type an accented vowel, <strong className="text-yellow-400">press and hold</strong> it on the on-screen keyboard to see its variations.</li>
              <li>The unique letters <code className="bg-gray-700 px-1 rounded">ẹ</code>, <code className="bg-gray-700 px-1 rounded">ọ</code>, and <code className="bg-gray-700 px-1 rounded">ṣ</code> have their own keys.</li>
            </ul>
          </div>

          <hr className="border-gray-700"/>

          <div>
            <h3 className="font-bold text-xl mb-3 text-white">Ìrànlọ́wọ́ (Need a Clue?)</h3>
            <ul className="list-disc list-outside space-y-1 pl-5">
              <li>For an easier game, toggle on <strong className="text-yellow-400">'Show tonal accents'</strong> *before* you start to see the word's accents.</li>
              <li>After your first guess, you can use the other hint toggles to reveal the word's translation and more.</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HowToPlayModal; 