import fs from 'fs';
import path from 'path';

// A cache to store the parsed vowel data so we don't re-read the file on every call
let vowelMap: Map<string, string[]>;

/**
 * Parses the yoruba_vowels.MD file to create a map of base vowels to their uppercase variants.
 * Example: 'A' -> ['A', 'À', 'Á', 'Ã']
 */
export function getVowelVariants(): Map<string, string[]> {
  if (vowelMap) {
    return vowelMap;
  }

  const filePath = path.join(process.cwd(), 'public', 'yoruba_vowels.MD');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const newVowelMap = new Map<string, string[]>();
  const lines = fileContent.split('\n');

  let currentBaseVowel = '';

  for (const line of lines) {
    if (line.startsWith('Vowel:')) {
      // Example: "Vowel: Ẹ (E with dot below)" -> "Ẹ"
      const baseVowel = line.split(':')[1].trim().split(' ')[0].toUpperCase();
      if (baseVowel) {
        // Normalize the key to prevent unicode issues
        currentBaseVowel = baseVowel.normalize('NFC');
        newVowelMap.set(currentBaseVowel, []);
      }
    } else if (line.trim() && currentBaseVowel && newVowelMap.has(currentBaseVowel)) {
      // Example: "Plain: a, A" -> "A"
      // Example: "Grave (do): à, À" -> "À"
      const parts = line.split(',');
      if (parts.length > 1) {
        const uppercaseVariant = parts[1].trim().normalize('NFC');
        newVowelMap.get(currentBaseVowel)?.push(uppercaseVariant);
      }
    }
  }
  
  // Cache the result
  vowelMap = newVowelMap;

  return vowelMap;
} 