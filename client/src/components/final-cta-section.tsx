import { Button } from "@/components/ui/button";
import { Rocket, BarChart3, Shield, Clock, RotateCcw, Award } from "lucide-react";

export default function FinalCTASection() {
  const trustIndicators = [
    { emoji: "🔒", text: "Enterprise Security" },
    { emoji: "⚡", text: "Fast AI Processing" },
    { emoji: "🔄", text: "Cancel Anytime" },
    { emoji: "☁️", text: "Cloud-based" },
  ];

  const handleTryFree = () => {
    // Redirect to login/signup
    window.location.href = '/api/login';
  };

  const handleComparePlans = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:bg-black dark:from-black dark:via-black dark:to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          The Future of Content Starts Here
        </h2>
        <p className="text-xl text-white/90 mb-10 leading-relaxed">
          From stunning images to dynamic videos, Lorepic puts next-gen AI tools in your hands. Join free today and stay ahead of the curve.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            onClick={handleTryFree}
            className="bg-white text-purple-700 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:bg-purple-50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 min-w-[200px]"
            data-testid="button-final-try-free"
          >
            <Rocket className="mr-2" size={20} />
            Try It Free Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleComparePlans}
            className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-purple-700 transition-all duration-300 min-w-[200px] bg-transparent"
            data-testid="button-final-compare-plans"
          >
            <BarChart3 className="mr-2" size={20} />
            Explore Plans
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/80">
          {trustIndicators.map((indicator, index) => {
            return (
              <div key={index} className="flex items-center" data-testid={`trust-indicator-${index}`}>
                <span className="mr-2 text-lg">{indicator.emoji}</span>
                <span className="text-sm">{indicator.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
