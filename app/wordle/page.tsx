import YorubaWordMaster from '@/components/YorubaWordMaster';

export default function WordlePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Yoruba Word Master</h1>
        <p className="text-center mb-8 text-gray-600">
          Guess the 5-letter Yoruba word. Use the special character buttons below the keyboard for Yoruba-specific letters.
        </p>
        <YorubaWordMaster />
      </div>
    </div>
  );
} 