import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://hwquviowywgcfxkfzplf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cXV2aW93eXdnY2Z4a2Z6cGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjMzMjksImV4cCI6MjA2ODMzOTMyOX0.qP3dFX7TYSTkMkE-DPy16ZMVo-itcJsvHZuqsZWiJgE";
const supabase = createClient(supabaseUrl, supabaseKey);

async function clearDatabase() {
  try {
    // First, count total entries
    const { count, error: countError } = await supabase
      .from('dictionary')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error("Error counting entries:", countError);
      return;
    }

    console.log(`Found ${count} entries in database`);
    
    // Confirm deletion
    console.log("Proceeding with deletion...");

    // Delete all entries
    const { error: deleteError } = await supabase
      .from('dictionary')
      .delete()
      .neq('id', 0); // This will match all rows since id is never 0

    if (deleteError) {
      console.error("Error deleting entries:", deleteError);
      return;
    }

    // Verify deletion
    const { count: remainingCount, error: verifyError } = await supabase
      .from('dictionary')
      .select('*', { count: 'exact', head: true });

    if (verifyError) {
      console.error("Error verifying deletion:", verifyError);
      return;
    }

    console.log(`Deletion complete. ${count} entries removed.`);
    console.log(`Remaining entries: ${remainingCount}`);

  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the clear operation
clearDatabase(); 