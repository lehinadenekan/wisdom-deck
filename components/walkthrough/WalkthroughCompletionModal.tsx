import React from 'react';

interface WalkthroughCompletionModalProps {
  open: boolean;
  onReplay: () => void;
  onClose: () => void;
}

export default function WalkthroughCompletionModal({ open, onReplay, onClose }: WalkthroughCompletionModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
      <div className="bg-white border-2 border-purple-600 rounded-xl shadow-xl max-w-md w-full mx-4 p-8 flex flex-col items-center animate-scale-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-2 text-center">You're Ready to Master Yorùbá Words.</h2>
        <p className="text-gray-700 text-base sm:text-lg mb-6 text-center">
          You've learned all the game features. Ready to put your knowledge to the test?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button
            onClick={onReplay}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors text-base border border-gray-300"
          >
            Take Walkthrough Again
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-base border border-purple-600"
            autoFocus
          >
            Start Playing
          </button>
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in { animation: fadeIn 0.2s ease; }
        .animate-scale-in { animation: scaleIn 0.25s cubic-bezier(0.4,0,0.2,1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
} 