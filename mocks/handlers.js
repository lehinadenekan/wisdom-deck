import { http, HttpResponse } from 'msw';

const mockWordleWord = {
  yorubaWord: 'ìbínú',
  partOfSpeech: 'noun',
  englishTranslation: 'anger',
  additionalInfo: 'A state of annoyance, displeasure, or hostility.',
};

export const handlers = [
  // Mock for fetching the random word
  http.get('/api/word-master/random-word', () => {
    return HttpResponse.json({ word: mockWordleWord });
  }),

  // Mock for validating a guess
  http.post('/api/word-master/validate-guess', async ({ request }) => {
    const { guess } = await request.json();
    
    // For testing purposes, we can consider any 5-letter word valid.
    // A more robust mock could check against a small list.
    const isValid = typeof guess === 'string' && guess.length === 5;
    
    return HttpResponse.json({ isValid });
  }),
]; 