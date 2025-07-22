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

// Helper function to determine which dictionary table to query
const getDictionaryTable = (word: string): string => {
  const firstLetter = word.toLowerCase().charAt(0);
  return firstLetter <= 'i' ? 'dictionary_ai' : 'dictionary_jz';
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

// Get a random 5-letter word for the Wordle game
export async function getRandomWordleWord(): Promise<WordleWord> {
  try {
    // Randomly choose which table to query
    const table = Math.random() < 0.5 ? 'dictionary_ai' : 'dictionary_jz';
    console.log('Querying table:', table);

    // First, check if we have any 5-letter words
    const { count, error: countError } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .eq('word_length', 5);

    if (countError) {
      console.error('Error checking word count:', countError);
      throw countError;
    }

    console.log(`Found ${count} 5-letter words in ${table}`);

    if (!count) {
      // Try the other table if no words found
      const otherTable = table === 'dictionary_ai' ? 'dictionary_jz' : 'dictionary_ai';
      console.log('Trying other table:', otherTable);
      
      const { count: otherCount, error: otherCountError } = await supabase
        .from(otherTable)
        .select('*', { count: 'exact', head: true })
        .eq('word_length', 5);

      if (otherCountError) {
        console.error('Error checking other table word count:', otherCountError);
        throw otherCountError;
      }

      if (!otherCount) {
        console.error('No 5-letter words found in either table');
        throw new Error('No 5-letter words found in either table');
      }

      // Use the other table since it has words
      const { data, error } = await supabase
        .from(otherTable)
        .select()
        .eq('word_length', 5)
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching word from other table:', error);
        throw error;
      }
      if (!data) {
        console.error('No word found in other table despite count > 0');
        throw new Error('No word found');
      }

      // Extract just the first word before any comma or bracket
      const word = data.word.split(/[,\(]/)[0].trim();
      console.log('Successfully fetched word from other table');
      return {
        ...data,
        word: word
      } as WordleWord;
    }

    // Get a random word from the first table
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq('word_length', 5)
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching word:', error);
      throw error;
    }
    if (!data) {
      console.error('No word found despite count > 0');
      throw new Error('No word found');
    }

    // Extract just the first word before any comma or bracket
    const word = data.word.split(/[,\(]/)[0].trim();
    console.log('Successfully fetched word');
    return {
      ...data,
      word: word
    } as WordleWord;

  } catch (error) {
    console.error('Error in getRandomWordleWord:', error);
    throw error;
  }
}

// Validate if a word exists in the dictionary
export async function validateWordleGuess(word: string): Promise<boolean> {
  try {
    const normalizedWord = word.normalize('NFC');
    const graphemes = getGraphemes(normalizedWord);
    const table = getDictionaryTable(normalizedWord);
    
    console.log('Validating word:', {
      original: word,
      normalized: normalizedWord,
      graphemes: graphemes,
      graphemeCount: graphemes.length,
      unicodePoints: getUnicodePoints(normalizedWord)
    });
    
    // Get all 5-letter words and compare locally to handle Unicode normalization
    const { data, error } = await supabase
      .from(table)
      .select('word')
      .eq('word_length', 5);

    if (error) {
      console.error('Error fetching words:', error);
      return false;
    }

    if (data && data.length > 0) {
      // Compare each word after normalization
      const isValid = data.some(row => {
        // Extract just the first word before any comma or bracket
        const dictWord = row.word.split(/[,\(]/)[0].trim();
        const normalizedDictWord = dictWord.normalize('NFC');
        const dictGraphemes = getGraphemes(normalizedDictWord);
        
        console.log('Comparing:', {
          guess: {
            word: normalizedWord,
            graphemes: graphemes,
            points: getUnicodePoints(normalizedWord)
          },
          dictWord: {
            word: normalizedDictWord,
            graphemes: dictGraphemes,
            points: getUnicodePoints(normalizedDictWord)
          }
        });

        return normalizedWord.toLowerCase() === normalizedDictWord.toLowerCase();
      });

      console.log('Word validation result:', isValid);
      return isValid;
    }

    console.log('No words found in dictionary');
    return false;
  } catch (error) {
    console.error('Error in validateWordleGuess:', error);
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