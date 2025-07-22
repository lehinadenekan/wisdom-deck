import fs from 'fs';
import path from 'path';

export interface WordleWord {
  yorubaWord: string;
  partOfSpeech: string;
  englishTranslation: string;
  additionalInfo: string;
}

interface ParsedWordData {
  yorubaWord?: string;
  partOfSpeech?: string;
  englishTranslation?: string;
  additionalInfo?: string;
}

export function getWordleWords(): WordleWord[] {
  const filePath = path.join(process.cwd(), 'public', 'yoruba_words.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const words: WordleWord[] = [];
  const entries = fileContent.split('---').filter(entry => entry.trim() !== '');

  entries.forEach(entry => {
    const lines = entry.trim().split('\n');
    const wordData: ParsedWordData = {};

    lines.forEach(line => {
      if (line.startsWith('Yoruba Word:')) {
        wordData.yorubaWord = line.replace('Yoruba Word:', '').trim();
      } else if (line.startsWith('Part of Speech:')) {
        wordData.partOfSpeech = line.replace('Part of Speech:', '').trim();
      } else if (line.startsWith('English Translation:')) {
        wordData.englishTranslation = line.replace('English Translation:', '').trim();
      } else if (line.startsWith('Additional Information:')) {
        // Find the index of this line and get all subsequent lines
        const infoIndex = lines.findIndex(l => l.startsWith('Additional Information:'));
        if (infoIndex !== -1) {
            const infoLines = lines.slice(infoIndex);
            // The first line contains the key, so we slice it off
            infoLines[0] = infoLines[0].replace('Additional Information:', '').trim();
            wordData.additionalInfo = infoLines.join('\n').trim();
        }
      }
    });

    if (wordData.yorubaWord) {
        words.push({
            yorubaWord: wordData.yorubaWord,
            partOfSpeech: wordData.partOfSpeech || '',
            englishTranslation: wordData.englishTranslation || '',
            additionalInfo: wordData.additionalInfo || '',
        });
    }
  });

  return words;
} 