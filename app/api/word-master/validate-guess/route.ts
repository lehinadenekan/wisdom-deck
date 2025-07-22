import { validateWordleGuess } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { WORD_LENGTH } from '@/types/wordle';

// Helper function to get graphemes from a string
const getGraphemes = (str: string): string[] => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('yo', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(str), segment => segment.segment);
  }
  return Array.from(str.normalize('NFC'));
};

// Helper function to handle CORS
function corsResponse(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return corsResponse(new NextResponse(null, { status: 200 }));
}

export async function POST(request: Request) {
  try {
    console.log('🔍 VALIDATION ENDPOINT START 🔍');
    
    const body = await request.json();
    const { guess } = body;

    console.log('📝 GUESS RECEIVED:', {
      guess,
      type: typeof guess,
      length: guess?.length,
      normalized: guess?.normalize('NFC'),
      unicodePoints: guess ? [...guess].map(c => c.charCodeAt(0)) : []
    });

    // Validate input
    if (!guess || typeof guess !== 'string') {
      console.log('❌ VALIDATION FAILED: Invalid input type');
      return corsResponse(
        NextResponse.json(
          { error: 'Invalid guess provided' },
          { status: 400 }
        )
      );
    }

    // Normalize the guess and count graphemes
    const normalizedGuess = guess.normalize('NFC');
    const graphemes = getGraphemes(normalizedGuess);

    console.log('🔤 NORMALIZED GUESS:', {
      original: guess,
      normalized: normalizedGuess,
      graphemes: graphemes,
      graphemeCount: graphemes.length,
      unicodePoints: Array.from(normalizedGuess).map(c => c.charCodeAt(0))
    });

    // Check length using grapheme count
    if (graphemes.length !== WORD_LENGTH) {
      console.log('❌ VALIDATION FAILED: Wrong length', graphemes.length);
      return corsResponse(
        NextResponse.json(
          { error: `Guess must be ${WORD_LENGTH} letters long` },
          { status: 400 }
        )
      );
    }

    // Validate against dictionary
    console.log('📚 CHECKING DICTIONARY...');
    const isValid = await validateWordleGuess(normalizedGuess);
    console.log('✅ VALIDATION RESULT:', isValid);

    return corsResponse(NextResponse.json({ isValid }));
  } catch (error) {
    console.error('💥 VALIDATION ERROR:', error);
    return corsResponse(
      NextResponse.json(
        { error: 'Failed to validate guess', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      )
    );
  }
} 