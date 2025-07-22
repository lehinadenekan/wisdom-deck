import fs from 'fs';
import path from 'path';

export interface Proverb {
  id: number;
  yoruba: string;
  translation: string;
  meaning: string;
}

export function getProverbs(): Proverb[] {
  // Look for the file in the project root.
  const filePath = path.join(process.cwd(), 'yoruba_proverbs.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const proverbs: Proverb[] = [];
  
  // Split the file into blocks, where each block is one proverb.
  // A new proverb starts with a number, a dot, and a space (e.g., "1. ").
  const proverbBlocks = fileContent.split(/\n(?=\d+\.\s)/).filter(block => block.trim() !== '');

  for (const block of proverbBlocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;

    // Extract the ID from the first line
    const idMatch = lines[0].match(/^(\d+)/);
    const id = idMatch ? parseInt(idMatch[1], 10) : 0;

    // Extract content by looking for the labels
    const yorubaLine = lines.find(line => line.includes('**Yoruba:**'));
    const translationLine = lines.find(line => line.includes('**Translation:**'));
    const meaningLine = lines.find(line => line.includes('**Meaning:**'));

    if (id && yorubaLine && translationLine && meaningLine) {
        const yoruba = yorubaLine.replace(/.*?\\*\\*Yoruba:\\*\\*\\s*/, '').trim();
        const translation = translationLine.replace(/.*?\\*\\*Translation:\\*\\*\\s*/, '').trim();
        const meaning = meaningLine.replace(/.*?\\*\\*Meaning:\\*\\*\\s*/, '').trim();
        
        proverbs.push({ id, yoruba, translation, meaning });
    }
  }

  return proverbs;
} 