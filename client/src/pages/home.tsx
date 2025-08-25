import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import WhyEnhansorSection from "@/components/why-enhansor-section";
import WhatMakesUsDifferentSection from "@/components/what-makes-us-different-section";
import GallerySection from "@/components/gallery-section";
import PricingSection from "@/components/pricing-section";
import FAQSection from "@/components/faq-section";
import FinalCTASection from "@/components/final-cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WhyEnhansorSection />
      <WhatMakesUsDifferentSection />
      <GallerySection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
