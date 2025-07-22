import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to safely get Unicode points
const getUnicodePoints = (str: string): number[] => {
  return Array.from(str).map(c => c.charCodeAt(0));
};

async function checkWord(word: string) {
  const tables = ['dictionary_ai', 'dictionary_jz'];
  const forms = ['NFC', 'NFD', 'NFKC', 'NFKD'] as const;
  
  console.log('Original word:', word);
  console.log('Original Unicode points:', getUnicodePoints(word));
  
  // Try all normalization forms
  forms.forEach(form => {
    const normalized = word.normalize(form);
    console.log(`\n${form}:`, normalized);
    console.log(`${form} Unicode points:`, getUnicodePoints(normalized));
  });
  
  for (const table of tables) {
    console.log(`\nChecking table: ${table}`);
    
    // Try searching with LIKE to find similar words
    const { data: similarWords, error: similarError } = await supabase
      .from(table)
      .select('word')
      .like('word', '%luk%');
      
    if (similarError) {
      console.error('Error searching similar words:', similarError);
    } else {
      console.log('\nSimilar words found:');
      if (similarWords && similarWords.length > 0) {
        similarWords.forEach(match => {
          console.log('\nMatch word:', match.word);
          console.log('Match Unicode points:', getUnicodePoints(match.word));
          forms.forEach(form => {
            const normalized = match.word.normalize(form);
            console.log(`${form}:`, normalized);
            console.log(`${form} Unicode points:`, getUnicodePoints(normalized));
          });
        });
      }
    }
  }
}

// Check the word
checkWord('olùkọ́'); 