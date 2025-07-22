import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Initialize Supabase client
const supabaseUrl = "https://hwquviowywgcfxkfzplf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cXV2aW93eXdnY2Z4a2Z6cGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjMzMjksImV4cCI6MjA2ODMzOTMyOX0.qP3dFX7TYSTkMkE-DPy16ZMVo-itcJsvHZuqsZWiJgE";
const supabase = createClient(supabaseUrl, supabaseKey);

interface DictionaryStats {
  letter: string;
  sourceCount: number;
  dbCount: number;
  coverage: number;
  missing: number;
}

async function getDbWordCount(letter: string): Promise<number> {
  const { count } = await supabase
    .from('dictionary')
    .select('*', { count: 'exact', head: true })
    .ilike('word', `${letter}%`);
  
  return count || 0;
}

function getSourceWordCount(filePath: string): number {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.split('---').filter(entry => entry.trim()).length;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return 0;
  }
}

async function main() {
  const dictionaryPath = '/Users/lehinadenekan/Desktop/Yoruba Dictionary';
  const stats: DictionaryStats[] = [];
  
  // Get all dictionary files
  const files = fs.readdirSync(dictionaryPath)
    .filter(file => file.startsWith('yoruba_words_') && (file.endsWith('.md') || file.endsWith('.MD')));

  console.log('Analyzing dictionary coverage...\n');
  
  for (const file of files) {
    const letter = file.replace('yoruba_words_', '').replace('.md', '').replace('.MD', '');
    const filePath = path.join(dictionaryPath, file);
    
    const sourceCount = getSourceWordCount(filePath);
    const dbCount = await getDbWordCount(letter);
    const coverage = dbCount / sourceCount * 100;
    const missing = sourceCount - dbCount;

    stats.push({
      letter,
      sourceCount,
      dbCount,
      coverage: Math.round(coverage * 100) / 100,
      missing: missing > 0 ? missing : 0
    });
  }

  // Sort by coverage (ascending) to show sections needing most attention
  stats.sort((a, b) => a.coverage - b.coverage);

  console.log('Coverage Analysis:');
  console.log('=================');
  console.log('\nSections needing most attention (sorted by coverage):');
  console.log('\nLetter | Source Words | DB Words | Coverage % | Missing Words');
  console.log('-------------------------------------------------------------');
  stats.forEach(stat => {
    console.log(
      `${stat.letter.padEnd(6)} | ` +
      `${stat.sourceCount.toString().padEnd(12)} | ` +
      `${stat.dbCount.toString().padEnd(8)} | ` +
      `${stat.coverage.toFixed(1).padEnd(9)}% | ` +
      `${stat.missing}`
    );
  });

  // Summary statistics
  const totalSource = stats.reduce((sum, stat) => sum + stat.sourceCount, 0);
  const totalDb = stats.reduce((sum, stat) => sum + stat.dbCount, 0);
  const totalMissing = stats.reduce((sum, stat) => sum + stat.missing, 0);
  const overallCoverage = (totalDb / totalSource) * 100;

  console.log('\nSummary:');
  console.log('========');
  console.log(`Total words in source files: ${totalSource}`);
  console.log(`Total words in database: ${totalDb}`);
  console.log(`Overall coverage: ${overallCoverage.toFixed(1)}%`);
  console.log(`Total missing words: ${totalMissing}`);

  // Recommendations
  console.log('\nRecommendations:');
  console.log('===============');
  const lowCoverage = stats.filter(s => s.coverage < 50).map(s => s.letter);
  if (lowCoverage.length > 0) {
    console.log(`Priority sections to migrate (less than 50% coverage): ${lowCoverage.join(', ')}`);
  }
  
  const mediumCoverage = stats.filter(s => s.coverage >= 50 && s.coverage < 90).map(s => s.letter);
  if (mediumCoverage.length > 0) {
    console.log(`Secondary priority sections (50-90% coverage): ${mediumCoverage.join(', ')}`);
  }
}

// Run the analysis
main().catch(console.error); 