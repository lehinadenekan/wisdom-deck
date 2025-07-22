'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const searchDictionary = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/dictionary/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to trigger search when debounced value changes
  useEffect(() => {
    searchDictionary(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Yoruba Dictionary</h1>
      
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a word..."
          className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result: any) => (
            <div key={result.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{result.word}</h2>
              <p className="text-gray-600">{result.meaning}</p>
              {result.example && (
                <p className="mt-2 text-sm text-gray-500">
                  Example: {result.example}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : searchTerm ? (
        <div className="text-center text-gray-600">No results found</div>
      ) : null}
    </div>
  );
} 