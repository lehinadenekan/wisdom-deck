import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from 'next/image';
import { getProverbs } from '@/lib/proverbs';
import ProverbPurchase from "@/components/proverbs/ProverbPurchase";

const YorubaProverbsPage = () => {
  const proverbs = getProverbs();

  return (
    <div className="bg-white">
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <Image 
              src="/book-cover.png"
              alt="Yoruba Proverbs Book Cover"
              width={500}
              height={750}
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>

          <div className="text-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Òwe Yorùbá: 40 Illustrated Proverbs
            </h1>
            <p className="text-lg mb-6">
              Embark on a cultural and linguistic journey with this beautifully illustrated guide to 40 essential Yoruba proverbs. Each proverb is presented with its original Yoruba text, a direct English translation, and a detailed explanation of its meaning and cultural context. Perfect for learners and anyone interested in the richness of Yoruba wisdom.
            </p>
            <ProverbPurchase />
          </div>

        </div>

        <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Explore the Proverbs
            </h2>
            <div className="space-y-8">
              {proverbs.map((proverb) => (
                <div key={proverb.id} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                  <p className="text-lg font-semibold text-purple-800 italic">&ldquo;{proverb.yoruba}&rdquo;</p>
                  <p className="mt-2 text-gray-700"><span className="font-bold">Translation:</span> {proverb.translation}</p>
                  <p className="mt-2 text-gray-600 text-sm"><span className="font-bold">Meaning:</span> {proverb.meaning}</p>
                  <div className="mt-4">
                    <button className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full cursor-not-allowed" disabled>
                      Play Audio (Coming Soon)
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default YorubaProverbsPage; 