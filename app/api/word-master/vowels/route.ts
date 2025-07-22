import { NextResponse } from 'next/server';
import { getVowelVariants } from '@/lib/vowels';

export async function GET() {
  try {
    const vowelVariants = getVowelVariants();
    // We must convert the Map to an array to send it as JSON
    const serializableVowels = Array.from(vowelVariants.entries());
    return NextResponse.json({ vowels: serializableVowels });
  } catch (error) {
    console.error('Failed to load vowel variants:', error);
    return NextResponse.json({ error: 'Could not load vowel data.' }, { status: 500 });
  }
} 