import * as fs from "fs";
import * as path from "path";

function extractWord(entry: string): string {
  const lines = entry.split("\n");
  const wordLine = lines.find(l => l.trim().startsWith("Yoruba Word:"));
  return wordLine ? wordLine.split(":")[1]?.trim() || "" : "";
}

function analyzeLetters() {
  const dictionaryPath = "/Users/lehinadenekan/Desktop/Yoruba Dictionary";
  const files = fs.readdirSync(dictionaryPath)
    .filter(file => file.startsWith('yoruba_words_') && (file.endsWith('.md') || file.endsWith('.MD')));

  const letterGroups = new Map<string, Set<string>>();
  const letterCounts = new Map<string, number>();
  let totalWords = 0;

  files.forEach(file => {
    const content = fs.readFileSync(path.join(dictionaryPath, file), "utf8");
    const entries = content.split("---").filter(entry => entry.trim());

    entries.forEach(entry => {
      const word = extractWord(entry);
      if (word) {
        totalWords++;
        const firstLetter = word[0];
        const baseChar = firstLetter.normalize('NFD')[0]; // Get base character without diacritics

        // Group by base character
        if (!letterGroups.has(baseChar)) {
          letterGroups.set(baseChar, new Set());
        }
        letterGroups.get(baseChar)?.add(firstLetter);

        // Count words per letter variant
        if (!letterCounts.has(firstLetter)) {
          letterCounts.set(firstLetter, 0);
        }
        letterCounts.set(firstLetter, letterCounts.get(firstLetter)! + 1);
      }
    });
  });

  // Print analysis
  console.log("\nYoruba Letter Groups Analysis");
  console.log("============================");
  console.log(`Total words analyzed: ${totalWords}\n`);

  // Sort by base character
  const sortedGroups = Array.from(letterGroups.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  let aToMCount = 0;
  let nToZCount = 0;

  sortedGroups.forEach(([baseChar, variants]) => {
    const variantsList = Array.from(variants);
    const totalInGroup = variantsList.reduce((sum, variant) => sum + (letterCounts.get(variant) || 0), 0);
    
    console.log(`Base letter: ${baseChar}`);
    console.log(`Variants: ${variantsList.join(", ")}`);
    console.log(`Words starting with these letters: ${totalInGroup}`);
    
    variantsList.forEach(variant => {
      const count = letterCounts.get(variant) || 0;
      console.log(`  ${variant}: ${count} words`);
    });
    console.log();

    // Count words for A-M and N-Z split
    if (baseChar.toLowerCase() <= 'm') {
      aToMCount += totalInGroup;
    } else {
      nToZCount += totalInGroup;
    }
  });

  console.log("\nProposed Database Split Analysis");
  console.log("==============================");
  console.log(`A to M database: ${aToMCount} words`);
  console.log(`N to Z database: ${nToZCount} words`);
}

analyzeLetters(); 