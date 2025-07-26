import 'dotenv/config';
console.log('Script started...');
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIG ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- TYPES ---
interface WordRow {
  id: number;
  word: string;
  part_of_speech: string;
  english_translation: string;
  word_length: number;
  table: 'dictionary_ai' | 'dictionary_jz';
}

interface CategorizedWord extends WordRow {
  difficulty_level: 'easy' | 'intermediate' | 'advanced';
}

// --- CATEGORIZATION LOGIC (simplified for demo, replace with your real logic) ---
function categorizeWord(word: WordRow): 'easy' | 'intermediate' | 'advanced' {
  // Example: short words and common greetings are easy, long/rare are advanced
  const easyWords = new Set([
    'káàró', 'káàsán', 'káalẹ́', 'báwo', 'àdúpẹ́', 'pẹ́lẹ́',
    'ọkan', 'èjì', 'ẹta', 'ẹrin', 'àrún', 'ẹfà', 'èje', 'ẹjọ', 'ẹsàn', 'ẹwá',
    'bàbá', 'màmá', 'ọmọ', 'ẹgbọ́n', 'àbúrò', 'ọkọ', 'ìyá',
    'orí', 'ojú', 'etí', 'imú', 'enu', 'ọwọ́', 'ẹsẹ̀', 'ayá', 'ikùn', 'ẹyìn',
    'jẹ', 'mu', 'lọ', 'wá', 'rí', 'gbọ́', 'sọ', 'kọ́', 'dìde', 'sùn',
    'ilé', 'àga', 'tábìlì', 'ibùsùn', 'àga', 'ìlẹ̀kùn',
    'funfun', 'dúdú', 'pupa', 'ewé',
    'tóbi', 'kékeré', 'dára', 'búburú', 'tútù', 'gbọ́nà',
    'ajá', 'ològbò', 'akùkọ', 'adie', 'ẹran', 'ẹja', 'ewúrẹ́', 'màlúù',
    'ọbẹ̀', 'ẹ̀bà', 'ìyán', 'àmàlà', 'omi', 'ọtí', 'bread', 'irẹsi',
    'òjọ́', 'àárọ̀', 'ọ̀sán', 'alẹ́', 'òru', 'òjò', 'oorun', 'afẹ́fẹ́',
    'iwájú', 'ẹ̀yìn', 'apa', 'òsì', 'ọ̀tún', 'níbí', 'níbẹ̀', 'nínú', 'lóde',
  ]);
  if (easyWords.has(word.word.trim().normalize('NFC').toLowerCase())) return 'easy';
  if (word.word_length <= 4) return 'easy';
  if (word.word_length >= 7) return 'advanced';
  return 'intermediate';
}

// --- MAIN SCRIPT ---
async function main() {
  console.log('Starting main function...');
  console.log('Supabase URL:', SUPABASE_URL);
  console.log('Supabase Key exists:', !!SUPABASE_ANON_KEY);
  
  const tables: Array<'dictionary_ai' | 'dictionary_jz'> = ['dictionary_ai', 'dictionary_jz'];
  const allWords: CategorizedWord[] = [];
  
  for (const table of tables) {
    console.log(`Processing table: ${table}`);
    let from = 0;
    const pageSize = 1000;
    let done = false;
    let pageCount = 0;
    
    while (!done) {
      pageCount++;
      console.log(`Fetching page ${pageCount} from ${table} (offset: ${from})`);
      
      const { data, error } = await supabase
        .from(table)
        .select('id, word, part_of_speech, english_translation, word_length')
        .range(from, from + pageSize - 1);
        
      if (error) {
        console.error(`Error fetching from ${table}:`, error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log(`No more data from ${table}`);
        break;
      }
      
      console.log(`Processing ${data.length} words from ${table}`);
      
      for (const row of data) {
        const wordRow: WordRow = { ...row, table };
        const difficulty_level = categorizeWord(wordRow);
        allWords.push({ ...wordRow, difficulty_level });
      }
      
      if (data.length < pageSize) {
        console.log(`Reached end of ${table} data`);
        done = true;
      }
      from += pageSize;
    }
  }

  console.log(`Total words processed: ${allWords.length}`);

  // --- UPDATE DB ---
  console.log('Starting database updates...');
  let updateCount = 0;
  for (const word of allWords) {
    const { error } = await supabase
      .from(word.table)
      .update({ difficulty_level: word.difficulty_level })
      .eq('id', word.id);
      
    if (error) {
      console.error(`Error updating word ${word.id} in ${word.table}:`, error);
    } else {
      updateCount++;
      if (updateCount % 100 === 0) {
        console.log(`Updated ${updateCount} words so far...`);
      }
    }
  }
  
  console.log(`Database updates completed. Updated ${updateCount} words.`);

  // --- OUTPUT CSV ---
  console.log('Writing CSV file...');
  const csvPath = path.join(__dirname, 'categorized_words.csv');
  const csvHeader = 'table,id,word,part_of_speech,english_translation,word_length,difficulty_level\n';
  const csvRows = allWords.map(w =>
    [w.table, w.id, w.word, w.part_of_speech, w.english_translation, w.word_length, w.difficulty_level].map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')
  );
  fs.writeFileSync(csvPath, csvHeader + csvRows.join('\n'));
  console.log(`CSV written to ${csvPath}`);

  // --- SUMMARY ---
  const stats = { easy: 0, intermediate: 0, advanced: 0 };
  for (const w of allWords) stats[w.difficulty_level]++;
  console.log('Categorization summary:', stats);
  console.log('Script completed successfully!');
}

main().catch(err => {
  console.error('Error during categorization:', err);
  process.exit(1);
}); 