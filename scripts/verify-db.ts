import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fetch from 'cross-fetch';

dotenv.config();

// Log environment variable presence (not the actual values)
console.log('Environment check:');
console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

console.log('\nTrying to connect to:', supabaseUrl);

// Initialize Supabase client with custom fetch
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  global: {
    fetch: fetch
  }
});

async function testConnection() {
  try {
    // Simple test query
    console.log('\nTesting connection with simple query...');
    const { data, error } = await supabase
      .from('dictionary_ai')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    console.log('Connection successful! Response:', data);

    // If connection works, then check tables
    await verifyDatabase();
  } catch (error) {
    console.error('Error testing connection:', error);
  }
}

async function verifyDatabase() {
  const tables = ['dictionary_ai', 'dictionary_jz'];

  for (const table of tables) {
    console.log(`\nChecking table: ${table}`);

    try {
      // Check for 5-letter words
      const { data: fiveLetterWords, error: countError } = await supabase
        .from(table)
        .select('word, word_length')
        .eq('word_length', 5);

      if (countError) {
        console.error(`Error checking ${table}:`, countError);
        continue;
      }

      console.log(`Number of 5-letter words in ${table}: ${fiveLetterWords?.length || 0}`);

      if (fiveLetterWords && fiveLetterWords.length > 0) {
        console.log('Sample words:');
        fiveLetterWords.slice(0, 5).forEach((entry: { word: string; word_length: number }) => {
          console.log(`  ${entry.word} (length: ${entry.word_length})`);
        });
      }

      // Check for null word_length values
      const { data: nullWords, error: nullError } = await supabase
        .from(table)
        .select('word')
        .is('word_length', null);

      if (nullError) {
        console.error(`Error checking null values for ${table}:`, nullError);
        continue;
      }

      console.log(`Words with null word_length: ${nullWords?.length || 0}`);
      if (nullWords && nullWords.length > 0) {
        console.log('Sample words with null length:');
        nullWords.slice(0, 5).forEach((entry: { word: string }) => {
          console.log(`  ${entry.word}`);
        });
      }
    } catch (error) {
      console.error(`Error processing ${table}:`, error);
    }
  }
}

testConnection().catch(console.error); 