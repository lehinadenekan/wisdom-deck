import React, { useState, useRef, useEffect } from 'react';
import { KeyboardStatus } from '@/hooks/useWordMaster';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyboardStatus: KeyboardStatus;
  className?: string;
}

// Create a lowercase to uppercase map for easier lookup
const keyToVowelMap: { [key: string]: string } = {
  'a': 'A',
  'e': 'E',
  'ẹ': 'Ẹ',
  'i': 'I',
  'o': 'O',
  'ọ': 'Ọ',
  'u': 'U',
};

// Normalize all keys in the map
Object.keys(keyToVowelMap).forEach(key => {
  const normalizedKey = key.normalize('NFC');
  const normalizedValue = keyToVowelMap[key].normalize('NFC');
  delete keyToVowelMap[key];
  keyToVowelMap[normalizedKey] = normalizedValue;
});

const yorubaKeyboardLayout = [
  ['a', 'b', 'd', 'e', 'ẹ', 'f', 'g'],
  ['gb', 'h', 'i', 'j', 'k', 'l', 'm'],
  ['n', 'o', 'ọ', 'p', 'r', 's', 'ṣ'],
  ['t', 'u', 'w', 'y', 'Enter', 'Backspace']
].map(row => row.map(key => key.normalize('NFC')));

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, keyboardStatus, className }) => {
  const [uppercaseVowelMap, setUppercaseVowelMap] = useState<Map<string, string[]>>(new Map());
  const [activeVowelKey, setActiveVowelKey] = useState<string | null>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVowels = async () => {
      try {
        const res = await fetch('/api/word-master/vowels');
        const data = await res.json();
        console.log('Fetched vowel data:', data);
        if (data.vowels) {
          // Normalize all vowel variants
          const normalizedVowels = data.vowels.map(([key, variants]: [string, string[]]) => [
            key.normalize('NFC'),
            variants.map(v => v.normalize('NFC'))
          ]) as [string, string[]][];
          const vowelMap = new Map(normalizedVowels);
          console.log('Constructed vowel map:', Array.from(vowelMap.entries()));
          setUppercaseVowelMap(vowelMap);
        }
      } catch (error) {
        console.error('Failed to fetch vowels:', error);
      }
    };

    fetchVowels();
  }, []);

  const getKeyClass = (key: string) => {
    const normalizedKey = key.normalize('NFC').toLowerCase();
    const status = keyboardStatus[normalizedKey];
    if (status === 'correct') return 'bg-green-500 text-white';
    if (status === 'present') return 'bg-purple-500 text-white';
    if (status === 'absent') return 'bg-gray-900 text-gray-500';
    return 'bg-gray-700 text-white';
  };
  
  const handleKeyClick = (key: string) => {
    const normalizedKey = key.normalize('NFC');
    console.log('Key clicked:', normalizedKey);
    const baseVowel = keyToVowelMap[normalizedKey];
    if (baseVowel) {
      console.log('Base vowel:', baseVowel);
      console.log('Available variants:', uppercaseVowelMap.get(baseVowel));
      setActiveVowelKey(normalizedKey === activeVowelKey ? null : normalizedKey);
    } else {
      setActiveVowelKey(null);
      onKeyPress(normalizedKey);
    }
  };

  const handleVariantClick = (variant: string) => {
    const normalizedVariant = variant.normalize('NFC');
    console.log('Variant clicked:', normalizedVariant);
    console.log('Unicode points:', Array.from(normalizedVariant).map(c => c.charCodeAt(0)));
    onKeyPress(normalizedVariant.toLowerCase());
    setActiveVowelKey(null);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (keyboardRef.current && !keyboardRef.current.contains(event.target as Node)) {
        setActiveVowelKey(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={keyboardRef} className={`w-full px-1 sm:max-w-2xl ${className || ''}`}>
      {yorubaKeyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-2">
          {row.map((key) => {
            const normalizedKey = key.normalize('NFC');
            const baseVowel = keyToVowelMap[normalizedKey];
            const variants = baseVowel ? uppercaseVowelMap.get(baseVowel) : [];
            console.log(`Key: ${normalizedKey}, Base vowel: ${baseVowel}, Variants:`, variants);

            return (
              <div key={normalizedKey} className="relative flex-1">
                <button
                  onClick={() => handleKeyClick(normalizedKey)}
                  className={`h-8 sm:h-14 w-full rounded hover:bg-gray-600 flex items-center justify-center text-xs sm:text-lg font-bold uppercase p-0.5 sm:p-1
                    ${getKeyClass(normalizedKey)}
                  `}
                >
                  {key === 'Backspace' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 002.828 0L21 12M3 12l6.414-6.414a2 2 0 012.828 0L21 12" />
                    </svg>
                  ) : ( normalizedKey )}
                </button>
                {activeVowelKey === normalizedKey && variants && variants.length > 0 && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex gap-1 bg-gray-900 p-2 rounded-md shadow-lg z-10">
                    {variants.map(variantChar => {
                      const normalizedVariant = variantChar.normalize('NFC');
                      return (
                        <button
                          key={normalizedVariant}
                          onClick={() => handleVariantClick(normalizedVariant)}
                          className={`w-12 h-12 rounded hover:bg-blue-500 text-white flex items-center justify-center text-2xl ${getKeyClass(normalizedVariant.toLowerCase())}`}
                        >
                          {normalizedVariant}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard; 