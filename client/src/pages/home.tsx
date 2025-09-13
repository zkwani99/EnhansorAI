import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import WhyLorepicSection from "@/components/why-lorepic-section";
import WhatMakesUsDifferentSection from "@/components/what-makes-us-different-section";
import GallerySection from "@/components/gallery-section";
import TemplatesSection from "@/components/templates-section";
import FAQSection from "@/components/faq-section";
import FinalCTASection from "@/components/final-cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WhyLorepicSection />
      <WhatMakesUsDifferentSection />
      <GallerySection />
      <TemplatesSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
