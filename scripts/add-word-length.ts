import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function addWordLengthColumn() {
  const tables = ['dictionary_ai', 'dictionary_jz'];
  
  for (const table of tables) {
    console.log(`Processing ${table}...`);
    
    try {
      // Add word_length column using raw SQL
      console.log(`Adding word_length column to ${table}...`);
      const { error: alterError } = await supabase
        .rpc('exec', { 
          sql: `ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS word_length INTEGER`
        });

      if (alterError) {
        console.error(`Error adding column to ${table}:`, alterError);
        continue;
      }

      // Update word_length values using raw SQL
      console.log(`Updating word_length values in ${table}...`);
      const { error: updateError } = await supabase
        .rpc('exec', {
          sql: `UPDATE ${table} SET word_length = length(word) WHERE word_length IS NULL`
        });
      
      if (updateError) {
        console.error(`Error updating word_length in ${table}:`, updateError);
        continue;
      }

      // Create index on word_length
      console.log(`Creating index on word_length for ${table}...`);
      const { error: indexError } = await supabase
        .rpc('create_index', { 
          table_name: table,
          column_name: 'word_length'
        });
      
      if (indexError) {
        console.error(`Error creating index on ${table}:`, indexError);
        continue;
      }

      console.log(`Successfully updated ${table}`);
    } catch (error) {
      console.error(`Error processing ${table}:`, error);
    }
  }
}

async function createIndexFunction() {
  const createIndexFunc = `
    create or replace function create_index(table_name text, column_name text)
    returns void as $$
    begin
      execute format('create index if not exists %I on %I (%I)',
        table_name || '_' || column_name || '_idx',
        table_name,
        column_name
      );
    end;
    $$ language plpgsql security definer;
  `;

  const { error } = await supabase.rpc('exec', { sql: createIndexFunc });
  if (error) {
    console.error('Error creating index function:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('Starting migration...');
    
    console.log('Creating index function...');
    await createIndexFunction();
    
    console.log('Adding word_length column and updating values...');
    await addWordLengthColumn();
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main(); 