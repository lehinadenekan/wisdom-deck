const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://hwquviowywgcfxkfzplf.supabase.co';
const supabaseAnonKey = 'sb_publishable_W-tST7egeG7xsipgTK8noA_wEJCRae7';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function analyzeDatabaseStatus() {
  console.log('🔍 Analyzing Supabase Database Status...\n');
  
  const tables = ['dictionary_ai', 'dictionary_jz'];
  
  for (const table of tables) {
    console.log(`📋 Analyzing table: ${table}`);
    
    try {
      // Get total count
      const { count: totalCount } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      // Get count of records with translations
      const { count: withTranslationCount } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
        .not('english_translation', 'is', null)
        .neq('english_translation', '')
        .neq('english_translation', 'EMPTY');
      
      // Get count of records without translations
      const { count: withoutTranslationCount } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
        .or('english_translation.is.null,english_translation.eq.,english_translation.eq.EMPTY');
      
      // Get sample of records without translations
      const { data: sampleWithoutTranslations } = await supabase
        .from(table)
        .select('word, english_translation')
        .or('english_translation.is.null,english_translation.eq.,english_translation.eq.EMPTY')
        .limit(10);
      
      console.log(`   📊 Total records: ${totalCount}`);
      console.log(`   ✅ With translations: ${withTranslationCount}`);
      console.log(`   ❌ Without translations: ${withoutTranslationCount}`);
      console.log(`   📈 Completion rate: ${((withTranslationCount / totalCount) * 100).toFixed(1)}%`);
      
      if (sampleWithoutTranslations && sampleWithoutTranslations.length > 0) {
        console.log(`   📝 Sample words without translations:`);
        sampleWithoutTranslations.forEach(record => {
          console.log(`      - "${record.word}" (${record.english_translation || 'NULL'})`);
        });
      }
      
      console.log('');
      
    } catch (error) {
      console.error(`❌ Error analyzing ${table}:`, error);
    }
  }
  
  // Check for 5-letter words specifically (for Wordle game)
  console.log('🎯 Wordle Game Analysis (5-letter words):');
  
  for (const table of tables) {
    try {
      const { count: totalFiveLetter } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
        .eq('word_length', 5);
      
      const { count: fiveLetterWithTranslation } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
        .eq('word_length', 5)
        .not('english_translation', 'is', null)
        .neq('english_translation', '')
        .neq('english_translation', 'EMPTY');
      
      console.log(`   📋 ${table}: ${fiveLetterWithTranslation}/${totalFiveLetter} 5-letter words have translations`);
      
    } catch (error) {
      console.error(`❌ Error analyzing 5-letter words in ${table}:`, error);
    }
  }
}

// Run the analysis
analyzeDatabaseStatus().catch(console.error); 