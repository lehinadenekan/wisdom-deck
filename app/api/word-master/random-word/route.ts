import { getRandomWordMasterWord } from '@/lib/supabase';
import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
  try {
    // Get length parameter from query string
    const { searchParams } = new URL(request.url);
    const lengthParam = searchParams.get('length');
    const wordLength = lengthParam ? parseInt(lengthParam, 10) : 5;
    
    // Validate word length
    if (wordLength < 3 || wordLength > 7) {
      return corsResponse(
        NextResponse.json(
          { error: 'Word length must be between 3 and 7' },
          { status: 400 }
        )
      );
    }

    // Log environment variables (safely)
    console.log('Environment check:');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY starts with:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 15));

    console.log(`Attempting to fetch random word from Supabase with length: ${wordLength}`);
    const word = await getRandomWordMasterWord(wordLength);
    
    if (!word) {
      console.error('No word returned from getRandomWordMasterWord');
      throw new Error('Failed to fetch word - no word returned');
    }

    console.log('Successfully fetched word:', {
      wordLength: word.word?.length || 'undefined',
      hasWord: !!word.word,
      hasTranslation: !!word.english_translation,
      hasPartOfSpeech: !!word.part_of_speech
    });

    // Return the word data
    return corsResponse(
      NextResponse.json({
        word: {
          yorubaWord: word.word,
          partOfSpeech: word.part_of_speech,
          englishTranslation: word.english_translation,
          additionalInfo: word.example_sentence || ''
        }
      })
    );
  } catch (error) {
    console.error('Error in random word API:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    // Log Supabase connection details
    console.log('Supabase connection check:');
    console.log('URL format correct:', process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase.co'));
    console.log('Anon key format correct:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.startsWith('sb_publishable_'));

    return corsResponse(
      NextResponse.json(
        { error: 'Failed to fetch random word' },
        { status: 500 }
      )
    );
  }
} 