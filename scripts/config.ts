import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabaseUrl = "https://hwquviowywgcfxkfzplf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cXV2aW93eXdnY2Z4a2Z6cGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjMzMjksImV4cCI6MjA2ODMzOTMyOX0.qP3dFX7TYSTkMkE-DPy16ZMVo-itcJsvHZuqsZWiJgE";
export const supabase = createClient(supabaseUrl, supabaseKey);

// Table names
export const TABLE_AI = "dictionary_ai";  // A through I words
export const TABLE_JZ = "dictionary_jz";  // J through Z words

// Helper function to determine which table to use for a word
export function getTableName(word: string): string {
  const firstLetter = word[0].normalize('NFD')[0].toLowerCase();
  return firstLetter <= 'i' ? TABLE_AI : TABLE_JZ;
}

// Letter ranges for each table
export const LETTERS_AI = new Set(['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i']);
export const LETTERS_JZ = new Set(['j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w', 'y']);

// Mapping of special characters to their base letter
export const SPECIAL_CHARS_MAP = {
  'à': 'a', 'á': 'a', 'ã': 'a',
  'è': 'e', 'é': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ì': 'i', 'í': 'i', 'ĩ': 'i',
  'ò': 'o', 'ó': 'o', 'õ': 'o', 'ọ': 'o',
  'ṣ': 's'
}; 