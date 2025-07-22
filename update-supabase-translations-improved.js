const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://hwquviowywgcfxkfzplf.supabase.co';
const supabaseAnonKey = 'sb_publishable_W-tST7egeG7xsipgTK8noA_wEJCRae7';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Parse the complete dictionary file with improved logic
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
        if (entry && entry.word && entry.english_translation) {
          entries.push(entry);
        }
      } catch (error) {
        console.log('⚠️  Error parsing entry:', error.message);
      }
    }
  }
  
  console.log(`✅ Parsed ${entries.length} dictionary entries with translations`);
  return entries;
}

// Parse individual dictionary entry with improved logic
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
    } else if (line.startsWith('Definition:')) {
      // Some entries use "Definition:" instead of "English Translation:"
      englishTranslation = line.replace('Definition:', '').trim();
    } else if (line.startsWith('Additional Information:')) {
      example = line.replace('Additional Information:', '').trim();
    }
  }
  
  if (!word || !englishTranslation) return null;
  
  return {
    word: word,
    part_of_speech: partOfSpeech,
    english_translation: englishTranslation,
    example: example
  };
}

// Improved matching function
function findBestMatch(targetWord, dictionaryMap) {
  const normalizedTarget = targetWord.toLowerCase().normalize('NFC');
  
  // Try exact match first
  if (dictionaryMap.has(normalizedTarget)) {
    return dictionaryMap.get(normalizedTarget);
  }
  
  // Try exact match with original case
  if (dictionaryMap.has(targetWord.toLowerCase())) {
    return dictionaryMap.get(targetWord.toLowerCase());
  }
  
  // Try matching without diacritics
  const strippedTarget = targetWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  for (const [dictWord, entry] of dictionaryMap) {
    const strippedDict = dictWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (strippedTarget === strippedDict) {
      return entry;
    }
  }
  
  // Try partial matching (target contains dict word or dict word contains target)
  for (const [dictWord, entry] of dictionaryMap) {
    if (normalizedTarget.includes(dictWord) || dictWord.includes(normalizedTarget)) {
      return entry;
    }
  }
  
  // Try fuzzy matching for similar words
  for (const [dictWord, entry] of dictionaryMap) {
    if (calculateSimilarity(normalizedTarget, dictWord) > 0.8) {
      return entry;
    }
  }
  
  return null;
}

// Simple similarity calculation
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance calculation
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Update Supabase database with missing translations
async function updateSupabaseTranslations(dictionaryEntries) {
  console.log('🔄 Starting Supabase database update...');
  
  let updatedCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  let notFoundCount = 0;
  
  // Create a map for quick lookup
  const dictionaryMap = new Map();
  dictionaryEntries.forEach(entry => {
    const normalizedWord = entry.word.toLowerCase().normalize('NFC');
    dictionaryMap.set(normalizedWord, entry);
    // Also store with original case
    dictionaryMap.set(entry.word.toLowerCase(), entry);
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
            
            // Find best match
            const dictionaryEntry = findBestMatch(record.word, dictionaryMap);
            
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
              notFoundCount++;
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
  console.log(`   ❌ Not found in dictionary: ${notFoundCount} records`);
  console.log(`   ❌ Errors: ${errorCount} records`);
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Improved Supabase Translation Update...');
    
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