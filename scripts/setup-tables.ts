import { supabase, TABLE_AI, TABLE_JZ } from './config.js';

async function createTable(tableName: string) {
  try {
    // First check if table exists
    const { data: existingTable, error: checkError } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);

    if (!checkError) {
      console.log(`Table ${tableName} already exists`);
      return;
    }

    // Create table using raw SQL
    const { error: createError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
          word text NOT NULL,
          part_of_speech text NOT NULL,
          english_translation text NOT NULL,
          example_sentence text,
          created_at timestamp with time zone DEFAULT timezone('utc', now())
        );
        
        CREATE INDEX IF NOT EXISTS ${tableName}_word_idx ON ${tableName} (word);
      `
    });

    if (createError) {
      console.error(`Error creating table ${tableName}:`, createError);
      return;
    }

    console.log(`Successfully created table ${tableName}`);
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
  }
}

async function setupTables() {
  try {
    console.log("Setting up dictionary tables...");

    // Create both tables
    await createTable(TABLE_AI);
    await createTable(TABLE_JZ);

    console.log("\nTable setup completed!");
  } catch (error) {
    console.error("Error setting up tables:", error);
  }
}

// Run setup
setupTables(); 