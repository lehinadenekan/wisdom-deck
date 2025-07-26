import { createClient } from '@supabase/supabase-js';
import { WordleWord } from '../types/wordle';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase Configuration:');
console.log('URL:', supabaseUrl);
console.log('Anon Key starts with:', supabaseAnonKey?.substring(0, 15));

if (!supabaseUrl) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL');
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Initialize Supabase client
console.log('Initializing Supabase client...');
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

// Test the connection immediately
(async () => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('dictionary_ai')
      .select('count(*)', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection successful:', data);
    }
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
  }
})();

// Helper function to validate word format for game use
const isValidGameWord = (word: string): boolean => {
  const cleanWord = word.trim().normalize('NFC');
  
  // Check for hyphens
  if (cleanWord.includes('-')) {
    console.log(`Filtering out hyphenated word: ${cleanWord}`);
    return false;
  }
  
  // Check for spaces
  if (cleanWord.includes(' ')) {
    console.log(`Filtering out multi-word entry: ${cleanWord}`);
    return false;
  }
  
  return true;
};

// Helper function to determine which dictionary table to query
const getDictionaryTable = (word: string): string => {
  const firstChar = word.toLowerCase().normalize('NFC').charAt(0);
  
  // Handle Yoruba-specific characters properly
  // Characters a-i (including accented variants) go to dictionary_ai
  // Characters j-z (including ọ, ṣ, etc.) go to dictionary_jz
  const aiTableChars = ['a', 'à', 'á', 'ã', 'b', 'd', 'e', 'è', 'é', 'ẽ', 'ẹ', 'f', 'g', 'gb', 'h', 'i', 'ì', 'í', 'ĩ'];
  
  // Check if the first character (or digraph like 'gb') is in the ai table range
  if (word.toLowerCase().startsWith('gb')) {
    return 'dictionary_ai';
  }
  
  return aiTableChars.includes(firstChar) ? 'dictionary_ai' : 'dictionary_jz';
};

// Helper function to normalize Yoruba text
const normalizeYorubaText = (text: string): string => {
  // Try all normalization forms
  const forms = ['NFC', 'NFD', 'NFKC', 'NFKD'] as const;
  const normalizedForms = forms.map(form => text.normalize(form));
  
  // Return the shortest normalized form (usually the most compact representation)
  return normalizedForms.reduce((shortest, current) => 
    current.length < shortest.length ? current : shortest
  , text);
};

// Helper function to strip diacritics for fuzzy matching
const stripDiacritics = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Helper function to count graphemes (visual characters) in a string
const countGraphemes = (str: string): number => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('yo', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str)).length;
  }
  return Array.from(str.normalize('NFC')).length;
};

// Helper function to get graphemes from a string
const getGraphemes = (str: string): string[] => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('yo', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str), segment => segment.segment);
  }
  return Array.from(str.normalize('NFC'));
};

// Helper function to get Unicode points for debugging
const getUnicodePoints = (str: string): { grapheme: string; points: number[] }[] => {
  const graphemes = getGraphemes(str);
  return graphemes.map(g => ({
    grapheme: g,
    points: Array.from(g).map(c => c.charCodeAt(0))
  }));
};

// Get a random 5-letter word for the Word Master game
export async function getRandomWordMasterWord(wordLength: number = 5, difficulty: 'easy' | 'intermediate' = 'intermediate'): Promise<WordleWord> {
  const maxAttempts = 10;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      attempts++;
      console.log(`Attempt ${attempts}/${maxAttempts} to find valid word`);
      
      const table = Math.random() < 0.5 ? 'dictionary_ai' : 'dictionary_jz';
      console.log(`Querying table: ${table} for word length: ${wordLength}, difficulty: ${difficulty}`);

      // Build query with strict difficulty filtering (NO NULL fallback)
      let query = supabase.from(table).select('*', { count: 'exact', head: true }).eq('word_length', wordLength);
      if (difficulty === 'easy') {
        query = query.eq('difficulty_level', 'easy');
      } else if (difficulty === 'intermediate') {
        query = query.eq('difficulty_level', 'intermediate');
      }
      const { count } = await query;

      if (!count || count === 0) {
        console.log(`No ${wordLength}-letter ${difficulty} words found in ${table}, trying fallback to 5-letter words`);
        // Fallback to 5-letter words if requested length not available
        let fallbackQuery = supabase.from(table).select('*', { count: 'exact', head: true }).eq('word_length', 5);
        if (difficulty === 'easy') {
          fallbackQuery = fallbackQuery.eq('difficulty_level', 'easy');
        } else if (difficulty === 'intermediate') {
          fallbackQuery = fallbackQuery.eq('difficulty_level', 'intermediate');
        }
        const { count: fallbackCount } = await fallbackQuery;
        
        if (!fallbackCount || fallbackCount === 0) {
          throw new Error(`No ${difficulty} words found in ${table}`);
        }
        
        const randomOffset = Math.floor(Math.random() * fallbackCount);
        let fallbackDataQuery = supabase.from(table).select().eq('word_length', 5);
        if (difficulty === 'easy') {
          fallbackDataQuery = fallbackDataQuery.eq('difficulty_level', 'easy');
        } else if (difficulty === 'intermediate') {
          fallbackDataQuery = fallbackDataQuery.eq('difficulty_level', 'intermediate');
        }
        const { data, error } = await fallbackDataQuery.range(randomOffset, randomOffset).limit(1);

        if (error || !data || data.length === 0) {
          throw error || new Error('No word found');
        }

        const wordData = data[0];
        
        // Extract and validate word variants for fallback (5-letter words)
        const wordVariants = [];
        const commaParts = wordData.word.split(',');
        
        for (const part of commaParts) {
          const cleanPart = part.split('(')[0].trim();
          if (cleanPart) {
            // Count graphemes to validate length
            const partLength = countGraphemes(cleanPart);
            console.log(`Fallback - Checking variant: "${cleanPart}" (${partLength} graphemes)`);
            
            // Only include variants that match requested word length (5 for fallback) and are valid game words
            if (partLength === 5 && isValidGameWord(cleanPart)) {
              wordVariants.push(cleanPart);
            }
          }
        }
        
        // Select first valid variant or fallback
        let extractedWord;
        if (wordVariants.length > 0) {
          extractedWord = wordVariants[0];
          console.log(`Fallback - Selected valid variant: "${extractedWord}" (${countGraphemes(extractedWord)} graphemes)`);
        } else {
          // Fallback: try first word part and validate
          const fallbackWord = wordData.word.split(/[\s,\(]/)[0].trim();
          const fallbackLength = countGraphemes(fallbackWord);
          console.log(`Fallback - Fallback word: "${fallbackWord}" (${fallbackLength} graphemes)`);
          
          if (fallbackLength === 5 && isValidGameWord(fallbackWord)) {
            extractedWord = fallbackWord;
          } else {
            console.log(`Fallback - Invalid word format, trying next attempt`);
            continue; // Try next attempt
          }
        }
        
        // Final validation
        const finalLength = countGraphemes(extractedWord);
        if (finalLength !== 5) {
          console.error(`Fallback - Final validation failed: expected 5, got ${finalLength} for word "${extractedWord}"`);
          continue; // Try next attempt
        }
        
        console.log('Selected random word (fallback):', {
          original: wordData.word,
          extracted: extractedWord,
          wordLength: countGraphemes(extractedWord)
        });

        return {
          ...wordData,
          word: extractedWord
        } as WordleWord;
      }

      const randomOffset = Math.floor(Math.random() * count);
      
      // Build query with strict difficulty filtering
      let dataQuery = supabase.from(table).select().eq('word_length', wordLength);
      if (difficulty === 'easy') {
        dataQuery = dataQuery.eq('difficulty_level', 'easy');
      } else if (difficulty === 'intermediate') {
        dataQuery = dataQuery.eq('difficulty_level', 'intermediate');
      }
      
      const { data, error } = await dataQuery.range(randomOffset, randomOffset).limit(1);

      if (error || !data || data.length === 0) {
        throw error || new Error('No word found');
      }

      const wordData = data[0];
      
      // Extract and validate word variants
      const wordVariants = [];
      const commaParts = wordData.word.split(',');
      
      for (const part of commaParts) {
        const cleanPart = part.split('(')[0].trim();
        if (cleanPart) {
          // Count graphemes to validate length
          const partLength = countGraphemes(cleanPart);
          console.log(`Checking variant: "${cleanPart}" (${partLength} graphemes)`);
          
          // Only include variants that match requested word length and are valid game words
          if (partLength === wordLength && isValidGameWord(cleanPart)) {
            wordVariants.push(cleanPart);
          }
        }
      }
      
      // Select first valid variant or fallback
      let extractedWord;
      if (wordVariants.length > 0) {
        extractedWord = wordVariants[0];
        console.log(`Selected valid variant: "${extractedWord}" (${countGraphemes(extractedWord)} graphemes)`);
      } else {
        // Fallback: try first word part and validate
        const fallbackWord = wordData.word.split(/[\s,\(]/)[0].trim();
        const fallbackLength = countGraphemes(fallbackWord);
        console.log(`Fallback word: "${fallbackWord}" (${fallbackLength} graphemes)`);
        
        if (fallbackLength === wordLength && isValidGameWord(fallbackWord)) {
          extractedWord = fallbackWord;
        } else {
          console.log(`Invalid word format, trying next attempt`);
          continue; // Try next attempt
        }
      }
      
      // Final validation
      const finalLength = countGraphemes(extractedWord);
      if (finalLength !== wordLength) {
        console.error(`Final validation failed: expected ${wordLength}, got ${finalLength} for word "${extractedWord}"`);
        continue; // Try next attempt
      }
      
      console.log('Selected random word:', {
        original: wordData.word,
        extracted: extractedWord,
        wordLength: countGraphemes(extractedWord)
      });

      return {
        ...wordData,
        word: extractedWord
      } as WordleWord;

    } catch (error) {
      console.error(`Error in getRandomWordMasterWord (attempt ${attempts}):`, error);
      if (attempts >= maxAttempts) {
        throw error;
      }
      // Continue to next attempt
    }
  }
  
  // If we get here, all attempts failed
  throw new Error(`Failed to find valid word after ${maxAttempts} attempts`);
}

// Validate if a word exists in the dictionary
export async function validateWordleGuess(word: string): Promise<boolean> {
  try {
    const normalizedWord = word.normalize('NFC').toLowerCase();
    const firstLetter = normalizedWord.charAt(0);
    const table = firstLetter <= 'i' ? 'dictionary_ai' : 'dictionary_jz';
    
    console.log('Validating word:', { word: normalizedWord, table });
    
    const { data, error } = await supabase
      .from(table)
      .select('word')
      .ilike('word', `%${normalizedWord}%`);

    if (error) {
      console.error('Database error:', error);
      return false;
    }

    if (!data || data.length === 0) {
      console.log('No matches found in database');
      return false;
    }

    console.log(`Found ${data.length} potential matches`);

    // Helper function to count graphemes (same as used elsewhere in the app)
    const countGraphemes = (str: string): number => {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('yo', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(str)).length;
      }
      return Array.from(str.normalize('NFC')).length;
    };

    // Check each database entry
    for (const row of data) {
      // Extract word variants, filtering out empty strings
      const parts = row.word
        .split(',')
        .map((p: string) => p.split('(')[0].trim())
        .filter((p: string) => p.length > 0);
      
      console.log('Checking entry:', row.word, '-> Valid parts:', parts);
      
      for (const part of parts) {
        const normalizedPart = part.normalize('NFC').toLowerCase();
        
        // FIXED: Use proper grapheme counting
        const partGraphemeCount = countGraphemes(normalizedPart);
        if (partGraphemeCount !== 5) {
          console.log(`Skipping "${part}" - wrong length (${partGraphemeCount} graphemes)`);
          continue;
        }
        
        console.log('Comparing 5-grapheme word:', {
          guess: normalizedWord,
          dbPart: normalizedPart,
          match: normalizedPart === normalizedWord
        });
        
        if (normalizedPart === normalizedWord) {
          console.log('✅ MATCH FOUND:', part);
          return true;
        }
      }
    }

    console.log('❌ No 5-grapheme matches found');
    return false;

  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

// Search dictionary with pagination
export async function searchDictionary(
  query: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ data: WordleWord[]; count: number }> {
  try {
    const normalizedQuery = normalizeYorubaText(query);
    const table = getDictionaryTable(normalizedQuery);
    
    // Get total count for pagination
    const { count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .ilike('word', `${normalizedQuery}%`);

    // Get paginated results
    const { data, error } = await supabase
      .from(table)
      .select()
      .ilike('word', `${normalizedQuery}%`)
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order('word');

    if (error) throw error;

    return {
      data: (data || []) as WordleWord[],
      count: count || 0
    };
  } catch (error) {
    console.error('Error in searchDictionary:', error);
    throw error;
  }
} 