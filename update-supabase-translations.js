const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://hwquviowywgcfxkfzplf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Parse the complete dictionary file
function parseDictionaryFile(filePath) {
  console.log('📖 Reading dictionary file:', filePath);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const entries = [];
  
  // Split by sections (Letter headers)
  const sections = content.split(/## Letter [A-ZẸỌṢ]/);
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    // Parse entries within each section
    const entryBlocks = section.split(/(?=Yoruba Word:)/);
    
    for (const block of entryBlocks) {
      if (!block.trim() || !block.includes('Yoruba Word:')) continue;
      
      try {
        const entry = parseEntry(block);
        if (entry && entry.word) {
          entries.push(entry);
        }
      } catch (error) {
        console.log('⚠️  Error parsing entry:', error.message);
      }
    }
  }
  
  console.log(`✅ Parsed ${entries.length} dictionary entries`);
  return entries;
}

// Parse individual dictionary entry
function parseEntry(block) {
  const lines = block.split('\n').map(line => line.trim()).filter(line => line);
  
  let word = '';
  let partOfSpeech = '';
  let englishTranslation = '';
  let example = '';
  
  for (const line of lines) {
    if (line.startsWith('Yoruba Word:')) {
      word = line.replace('Yoruba Word:', '').trim();
    } else if (line.startsWith('Part of Speech:')) {
      partOfSpeech = line.replace('Part of Speech:', '').trim();
    } else if (line.startsWith('English Translation:')) {
      englishTranslation = line.replace('English Translation:', '').trim();
    } else if (line.startsWith('Additional Information:')) {
      example = line.replace('Additional Information:', '').trim();
    }
  }
  
  if (!word) return null;
  
  return {
    word: word,
    part_of_speech: partOfSpeech,
    english_translation: englishTranslation,
    example: example
  };
}

// Update Supabase database with missing translations
async function updateSupabaseTranslations(dictionaryEntries) {
  console.log('🔄 Starting Supabase database update...');
  
  let updatedCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  
  // Create a map for quick lookup
  const dictionaryMap = new Map();
  dictionaryEntries.forEach(entry => {
    const normalizedWord = entry.word.toLowerCase().normalize('NFC');
    dictionaryMap.set(normalizedWord, entry);
  });
  
  console.log(`📚 Dictionary map created with ${dictionaryMap.size} entries`);
  
  // Update both tables
  const tables = ['dictionary_ai', 'dictionary_jz'];
  
  for (const table of tables) {
    console.log(`\n📋 Processing table: ${table}`);
    
    let offset = 0;
    const limit = 100;
    let hasMore = true;
    
    while (hasMore) {
      try {
        // Fetch batch of records
        const { data: records, error } = await supabase
          .from(table)
          .select('id, word, english_translation')
          .range(offset, offset + limit - 1);
        
        if (error) {
          console.error(`❌ Error fetching from ${table}:`, error);
          break;
        }
        
        if (!records || records.length === 0) {
          hasMore = false;
          break;
        }
        
        console.log(`📄 Processing batch ${Math.floor(offset/limit) + 1}: ${records.length} records`);
        
        // Process each record
        for (const record of records) {
          try {
            // Skip if already has translation
            if (record.english_translation && 
                record.english_translation.trim() !== '' && 
                record.english_translation !== 'EMPTY') {
              skippedCount++;
              continue;
            }
            
            // Normalize the word for lookup
            const normalizedWord = record.word.toLowerCase().normalize('NFC');
            
            // Try exact match first
            let dictionaryEntry = dictionaryMap.get(normalizedWord);
            
            // If no exact match, try partial matching
            if (!dictionaryEntry) {
              for (const [dictWord, entry] of dictionaryMap) {
                if (normalizedWord.includes(dictWord) || dictWord.includes(normalizedWord)) {
                  dictionaryEntry = entry;
                  break;
                }
              }
            }
            
            if (dictionaryEntry && dictionaryEntry.english_translation) {
              // Update the record
              const { error: updateError } = await supabase
                .from(table)
                .update({
                  english_translation: dictionaryEntry.english_translation,
                  part_of_speech: dictionaryEntry.part_of_speech || record.part_of_speech,
                  example: dictionaryEntry.example || record.example
                })
                .eq('id', record.id);
              
              if (updateError) {
                console.error(`❌ Error updating record ${record.id}:`, updateError);
                errorCount++;
              } else {
                updatedCount++;
                console.log(`✅ Updated: ${record.word} -> ${dictionaryEntry.english_translation.substring(0, 50)}...`);
              }
            } else {
              console.log(`⚠️  No translation found for: ${record.word}`);
            }
            
          } catch (error) {
            console.error(`❌ Error processing record ${record.id}:`, error);
            errorCount++;
          }
        }
        
        offset += limit;
        
      } catch (error) {
        console.error(`❌ Error in batch processing:`, error);
        break;
      }
    }
  }
  
  console.log('\n📊 Update Summary:');
  console.log(`   ✅ Successfully updated: ${updatedCount} records`);
  console.log(`   ⚠️  Skipped (already has translation): ${skippedCount} records`);
  console.log(`   ❌ Errors: ${errorCount} records`);
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Supabase Translation Update...');
    
    // Parse the complete dictionary
    const dictionaryEntries = parseDictionaryFile('full-yoruba-dictionary-a-y.md');
    
    if (dictionaryEntries.length === 0) {
      console.error('❌ No dictionary entries found');
      return;
    }
    
    // Update Supabase database
    await updateSupabaseTranslations(dictionaryEntries);
    
    console.log('\n🎉 Translation update completed!');
    
  } catch (error) {
    console.error('❌ Error in main execution:', error);
  }
}

// Run the script
main(); 