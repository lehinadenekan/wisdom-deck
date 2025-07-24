import React from 'react';

// Cleaned up game progression data (no letters, only colour logic)
const exampleGame = [
  // Row 1: 1 green, 1 purple, 3 grey
  [
    { status: 'correct' },
    { status: 'present' },
    { status: 'absent' },
    { status: 'absent' },
    { status: 'absent' },
  ],
  // Row 2: green, purple, green, grey, grey
  [
    { status: 'correct' },
    { status: 'present' },
    { status: 'correct' },
    { status: 'absent' },
    { status: 'absent' },
  ],
  // Row 3: all green
  [
    { status: 'correct' },
    { status: 'correct' },
    { status: 'correct' },
    { status: 'correct' },
    { status: 'correct' },
  ],
];

const getSquareStyle = (status: string) => {
  switch (status) {
    case 'correct':
      return 'bg-green-500 border-green-500';
    case 'present':
      return 'bg-purple-500 border-purple-500';
    case 'absent':
      return 'bg-gray-400 border-gray-400';
    default:
      return 'bg-gray-100 border-gray-300';
  }
};

export default function GamePreview() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Cleaned up mini game board */}
      <div className="flex flex-col gap-1 mb-2">
        {exampleGame.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-5 gap-1">
            {row.map((sq, i) => (
              <div
                key={i}
                className={`w-8 h-8 sm:w-10 sm:h-10 border-2 rounded flex items-center justify-center ${getSquareStyle(sq.status)}`}
                aria-label={`Square: ${sq.status}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 