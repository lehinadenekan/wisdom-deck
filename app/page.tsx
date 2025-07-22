import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import FeaturedGamesSection from "@/components/sections/FeaturedGamesSection";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <main>
        <HeroSection />
        <FeaturedProductsSection />
        <FeaturedGamesSection />
      </main>
      <Footer />
    </div>
  );
}
