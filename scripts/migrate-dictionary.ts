import * as fs from "fs";
import * as path from "path";
import {
  supabase,
  TABLE_AI,
  TABLE_JZ,
  getTableName,
  LETTERS_AI,
  LETTERS_JZ,
  SPECIAL_CHARS_MAP
} from "./config.js";

interface DictionaryEntry {
  word: string;
  part_of_speech: string;
  english_translation: string;
  example_sentence: string | null;
}

interface MigrationStats {
  total: number;
  processed: number;
  tableAI: {
    added: number;
    skipped: number;
    errors: Array<{ word: string; error: string }>;
  };
  tableJZ: {
    added: number;
    skipped: number;
    errors: Array<{ word: string; error: string }>;
  };
}

const stats: MigrationStats = {
  total: 0,
  processed: 0,
  tableAI: {
    added: 0,
    skipped: 0,
    errors: [],
  },
  tableJZ: {
    added: 0,
    skipped: 0,
    errors: [],
  }
};

function extractField(entry: string, fieldName: string): string {
  const lines = entry.split("\n");
  const line = lines.find((l) => l.trim().startsWith(`${fieldName}:`));
  if (!line) {
    console.log(`Warning: Could not find field "${fieldName}" in entry:\n${entry}`);
    return "";
  }
  const value = line.split(":")[1]?.trim() || "";
  console.log(`Extracted ${fieldName}: "${value}"`);
  return value;
}

function extractExampleFromInfo(info: string): string | null {
  if (!info) return null;
  
  // Look for "e.g.," or "Example:" in the text
  const egMatch = info.match(/e\.g\.,\s*([^.]+\.)/);
  const exampleMatch = info.match(/Example:\s*([^.]+\.)/);
  
  if (egMatch) return egMatch[1].trim();
  if (exampleMatch) return exampleMatch[1].trim();
  
  // If no explicit example marker, check if the text contains quotes
  const quoteMatch = info.match(/"([^"]+)"/);
  if (quoteMatch) return quoteMatch[1].trim();
  
  return null;
}

async function checkForDuplicate(word: string): Promise<{ isDuplicate: boolean; existingEntry?: any }> {
  try {
    console.log(`Checking for duplicate: "${word}"`);
    const tableName = getTableName(word);
    
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("word", word)
      .limit(1);
    
    if (error) {
      console.error("Database error while checking duplicate:", error);
      throw error;
    }

    const isDuplicate = Boolean(data && data.length > 0);
    console.log(`Duplicate check result: ${isDuplicate ? "Found duplicate" : "No duplicate found"}`);
    
    return {
      isDuplicate,
      existingEntry: data && data.length > 0 ? data[0] : undefined
    };
  } catch (error) {
    console.error("Error checking for duplicate:", error);
    return { isDuplicate: false };
  }
}

async function uploadEntry(entry: DictionaryEntry): Promise<void> {
  console.log("\nAttempting to upload entry:", entry);
  
  try {
    const tableName = getTableName(entry.word);
    const { error } = await supabase
      .from(tableName)
      .insert([{
        word: entry.word,
        part_of_speech: entry.part_of_speech,
        english_translation: entry.english_translation,
        example_sentence: entry.example_sentence,
      }]);

    if (error) {
      console.error("Database error during upload:", error);
      throw new Error(`Failed to upload entry: ${error.message}`);
    }
    
    // Update stats for the appropriate table
    const isTableAI = tableName === TABLE_AI;
    if (isTableAI) {
      stats.tableAI.added++;
    } else {
      stats.tableJZ.added++;
    }
    
    console.log(`Successfully uploaded entry to ${isTableAI ? "A-I table" : "J-Z table"}`);
  } catch (error) {
    console.error("Error during upload:", error);
    throw error;
  }
}

async function processDictionaryFile(filePath: string) {
  console.log(`\nProcessing file: ${filePath}`);
  const content = fs.readFileSync(filePath, "utf8");
  const entries = content.split("---").filter((entry) => entry.trim());
  stats.total += entries.length;

  console.log(`Found ${entries.length} entries in file`);

  for (const entry of entries) {
    const word = extractField(entry, "Yoruba Word");
    if (!word) {
      console.log("Skipping entry with no word");
      const tableStats = getTableName(word) === TABLE_AI ? stats.tableAI : stats.tableJZ;
      tableStats.skipped++;
      continue;
    }

    try {
      const { isDuplicate, existingEntry } = await checkForDuplicate(word);
      if (isDuplicate) {
        console.log(`Skipping duplicate word: ${word}`);
        console.log("Existing entry:", existingEntry);
        const tableStats = getTableName(word) === TABLE_AI ? stats.tableAI : stats.tableJZ;
        tableStats.skipped++;
        continue;
      }

      const newEntry = {
        word,
        part_of_speech: extractField(entry, "Part of Speech"),
        english_translation: extractField(entry, "English Translation"),
        example_sentence: extractExampleFromInfo(
          extractField(entry, "Additional Information")
        ),
      };

      await uploadEntry(newEntry);
      console.log(`Successfully added word: ${word}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error processing word ${word}:`, errorMessage);
      const tableStats = getTableName(word) === TABLE_AI ? stats.tableAI : stats.tableJZ;
      tableStats.errors.push({ word, error: errorMessage });
    }
    stats.processed++;

    // Log progress every 10 entries
    if (stats.processed % 10 === 0) {
      console.log("\nProgress Update:");
      console.log(`- Processed: ${stats.processed}/${stats.total} entries`);
      console.log("\nA-I Table:");
      console.log(`- Added: ${stats.tableAI.added}`);
      console.log(`- Skipped: ${stats.tableAI.skipped}`);
      console.log(`- Errors: ${stats.tableAI.errors.length}`);
      console.log("\nJ-Z Table:");
      console.log(`- Added: ${stats.tableJZ.added}`);
      console.log(`- Skipped: ${stats.tableJZ.skipped}`);
      console.log(`- Errors: ${stats.tableJZ.errors.length}`);
    }
  }
}

async function main() {
  try {
    const dictionaryPath = "/Users/lehinadenekan/Desktop/Yoruba Dictionary";
    const files = fs.readdirSync(dictionaryPath)
      .filter(file => file.startsWith('yoruba_words_') && (file.endsWith('.md') || file.endsWith('.MD')));

    console.log("Starting migration...");
    console.log(`Found ${files.length} dictionary files to process`);

    // Sort files to process A-I first, then J-Z
    files.sort((a, b) => {
      const letterA = a.replace('yoruba_words_', '').replace('.md', '').replace('.MD', '').toLowerCase();
      const letterB = b.replace('yoruba_words_', '').replace('.md', '').replace('.MD', '').toLowerCase();
      
      const isAInTableAI = LETTERS_AI.has(letterA[0]);
      const isBInTableAI = LETTERS_AI.has(letterB[0]);
      
      if (isAInTableAI && !isBInTableAI) return -1;
      if (!isAInTableAI && isBInTableAI) return 1;
      return letterA.localeCompare(letterB);
    });

    console.log("\nProcessing order:");
    files.forEach(file => console.log(`- ${file}`));
    
    for (const file of files) {
      const filePath = path.join(dictionaryPath, file);
      const letter = file.replace('yoruba_words_', '').replace('.md', '').replace('.MD', '');
      
      console.log(`\n${'-'.repeat(50)}`);
      console.log(`Processing ${letter.toUpperCase()} section (${file})`);
      console.log(`${'-'.repeat(50)}\n`);
      
      const startTime = Date.now();
      await processDictionaryFile(filePath);
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      console.log(`\nCompleted ${letter.toUpperCase()} section in ${duration}s`);
      console.log(`Current overall stats:`);
      console.log(`- Total processed: ${stats.processed}/${stats.total}`);
      console.log("\nA-I Table:");
      console.log(`- Added: ${stats.tableAI.added}`);
      console.log(`- Skipped: ${stats.tableAI.skipped}`);
      console.log(`- Errors: ${stats.tableAI.errors.length}`);
      console.log("\nJ-Z Table:");
      console.log(`- Added: ${stats.tableJZ.added}`);
      console.log(`- Skipped: ${stats.tableJZ.skipped}`);
      console.log(`- Errors: ${stats.tableJZ.errors.length}`);
    }
    
    console.log("\nMigration completed!");
    console.log("\nFinal Statistics:");
    console.log(`Total entries processed: ${stats.processed}`);
    console.log("\nA-I Table:");
    console.log(`- Added: ${stats.tableAI.added}`);
    console.log(`- Skipped: ${stats.tableAI.skipped}`);
    console.log(`- Errors: ${stats.tableAI.errors.length}`);
    console.log("\nJ-Z Table:");
    console.log(`- Added: ${stats.tableJZ.added}`);
    console.log(`- Skipped: ${stats.tableJZ.skipped}`);
    console.log(`- Errors: ${stats.tableJZ.errors.length}`);
    
    if (stats.tableAI.errors.length > 0) {
      console.log("\nErrors in A-I Table:");
      stats.tableAI.errors.forEach(({ word, error }) => {
        console.log(`- ${word}: ${error}`);
      });
    }
    
    if (stats.tableJZ.errors.length > 0) {
      console.log("\nErrors in J-Z Table:");
      stats.tableJZ.errors.forEach(({ word, error }) => {
        console.log(`- ${word}: ${error}`);
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Migration failed:", errorMessage);
  }
}

// Run the migration
main(); 