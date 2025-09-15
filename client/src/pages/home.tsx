import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import WhyLorepicSection from "@/components/why-lorepic-section";
import DiscoverServicesSection from "@/components/discover-services-section";
import GallerySection from "@/components/gallery-section";
import TemplatesSection from "@/components/templates-section";
import PricingCTASection from "@/components/pricing-cta-section";
import FinalCTASection from "@/components/final-cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* 1. Hero Section (Light) */}
      <HeroSection />
      {/* 2. Why Lorepic? (Dark) */}
      <WhyLorepicSection />
      {/* 3. Discover Services (Light) */}
      <DiscoverServicesSection />
      {/* 4. Gallery & Examples (Dark, Dynamic) */}
      <GallerySection />
      {/* 5. AI Template Library (Light) */}
      <TemplatesSection />
      {/* 7. Pricing & Credits (Light) */}
      <PricingCTASection />
      {/* 8. Final CTA (Dark Gradient) */}
      <FinalCTASection />
      <Footer />
    </div>
  );
}
