import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://hwquviowywgcfxkfzplf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cXV2aW93eXdnY2Z4a2Z6cGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjMzMjksImV4cCI6MjA2ODMzOTMyOX0.qP3dFX7TYSTkMkE-DPy16ZMVo-itcJsvHZuqsZWiJgE";
const supabase = createClient(supabaseUrl, supabaseKey);

interface DictionaryEntry {
  id: number;
  word: string;
  part_of_speech: string;
  english_translation: string;
  example_sentence: string | null;
  created_at: string;
}

async function checkDatabase() {
  try {
    // Get all entries
    const { data, error } = await supabase
      .from("dictionary")
      .select("*")
      .order('word');

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    if (!data) {
      console.error("No data returned");
      return;
    }

    const entries = data as DictionaryEntry[];

    console.log("\nDatabase Contents Analysis:");
    console.log("=========================");
    console.log(`Total entries: ${entries.length}`);

    // Group by first letter
    const byLetter: Record<string, DictionaryEntry[]> = entries.reduce((acc, entry) => {
      const firstLetter = entry.word[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(entry);
      return acc;
    }, {} as Record<string, DictionaryEntry[]>);

    // Print analysis by letter
    Object.entries(byLetter)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([letter, letterEntries]) => {
        console.log(`\n${letter}:`);
        console.log(`- Total entries: ${letterEntries.length}`);
        console.log("\nSample entries:");
        letterEntries.slice(0, 5).forEach(entry => {
          console.log(`  - ${entry.word} (${entry.part_of_speech}): ${entry.english_translation}`);
        });
        if (letterEntries.length > 5) {
          console.log(`  ... and ${letterEntries.length - 5} more`);
        }
      });

  } catch (error) {
    console.error("Error:", error);
  }
}

checkDatabase(); 