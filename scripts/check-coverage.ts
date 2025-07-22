import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Initialize Supabase client
const supabaseUrl = "https://hwquviowywgcfxkfzplf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cXV2aW93eXdnY2Z4a2Z6cGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjMzMjksImV4cCI6MjA2ODMzOTMyOX0.qP3dFX7TYSTkMkE-DPy16ZMVo-itcJsvHZuqsZWiJgE";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Coverage {
  letter: string;
  totalWords: number;
  inDatabase: number;
  coverage: number;
  missingWords: string[];
}

async function getDbWords(): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("dictionary")
    .select("word");
  
  if (error) {
    console.error("Error fetching from database:", error);
    return new Set();
  }
  
  return new Set(data.map(entry => entry.word));
}

function extractWordsFromFile(filePath: string): Set<string> {
  const content = fs.readFileSync(filePath, "utf8");
  const entries = content.split("---").filter(entry => entry.trim());
  const words = new Set<string>();
  
  for (const entry of entries) {
    const lines = entry.split("\n");
    const wordLine = lines.find(l => l.trim().startsWith("Yoruba Word:"));
    if (wordLine) {
      const word = wordLine.split(":")[1]?.trim();
      if (word) words.add(word);
    }
  }
  
  return words;
}

async function analyzeCoverage() {
  const dbWords = await getDbWords();
  const dictionaryPath = "/Users/lehinadenekan/Desktop/Yoruba Dictionary";
  const files = fs.readdirSync(dictionaryPath)
    .filter(file => file.startsWith('yoruba_words_') && (file.endsWith('.md') || file.endsWith('.MD')));

  const coverage: Coverage[] = [];
  let totalWords = 0;
  let totalInDb = 0;
  let totalMissing = 0;

  for (const file of files) {
    const filePath = path.join(dictionaryPath, file);
    const letter = file.replace('yoruba_words_', '').replace('.md', '').replace('.MD', '');
    const sourceWords = extractWordsFromFile(filePath);
    
    const wordsInDb = [...sourceWords].filter(word => dbWords.has(word));
    const missingWords = [...sourceWords].filter(word => !dbWords.has(word));
    
    const letterCoverage: Coverage = {
      letter,
      totalWords: sourceWords.size,
      inDatabase: wordsInDb.length,
      coverage: (wordsInDb.length / sourceWords.size) * 100,
      missingWords
    };
    
    coverage.push(letterCoverage);
    totalWords += sourceWords.size;
    totalInDb += wordsInDb.length;
    totalMissing += missingWords.length;
  }

  // Sort by coverage ascending (lowest coverage first)
  coverage.sort((a, b) => a.coverage - b.coverage);

  console.log("\nCoverage Analysis:");
  console.log("=================");
  console.log(`Total words in source files: ${totalWords}`);
  console.log(`Words in database: ${totalInDb}`);
  console.log(`Overall coverage: ${((totalInDb / totalWords) * 100).toFixed(1)}%`);
  console.log(`Missing words: ${totalMissing}`);
  
  console.log("\nCoverage by letter section:");
  console.log("=========================");
  coverage.forEach(({ letter, totalWords, inDatabase, coverage, missingWords }) => {
    console.log(`\n${letter.toUpperCase()}:`);
    console.log(`- Total words: ${totalWords}`);
    console.log(`- In database: ${inDatabase}`);
    console.log(`- Coverage: ${coverage.toFixed(1)}%`);
    console.log(`- Missing words: ${missingWords.length}`);
    
    if (missingWords.length > 0) {
      console.log("\nSample of missing words:");
      missingWords.slice(0, 5).forEach(word => console.log(`  - ${word}`));
      if (missingWords.length > 5) {
        console.log(`  ... and ${missingWords.length - 5} more`);
      }
    }
  });
}

analyzeCoverage(); 