import { Button } from "@/components/ui/button";
import { Rocket, BarChart3, Shield, Clock, RotateCcw, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function FinalCTASection() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const trustIndicators = [
    { emoji: "🔒", text: "Enterprise Security" },
    { emoji: "⚡", text: "Fast AI Processing" },
    { emoji: "🔄", text: "Cancel Anytime" },
    { emoji: "☁️", text: "Cloud-based" },
  ];

  const handleTryFree = () => {
    // Check authentication status before navigating
    if (isAuthenticated) {
      // User is logged in, navigate to dashboard
      navigate('/dashboard');
    } else {
      // User not logged in, redirect to auth flow
      window.location.href = '/api/login';
    }
  };

  const handleComparePlans = () => {
    navigate('/pricing');
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          The Future of Content Starts Here
        </h2>
        <p className="text-xl text-gray-600 dark:text-white/90 mb-10 leading-relaxed">
          From stunning images to dynamic videos, Lorepic puts next-gen AI tools in your hands. Join free today and stay ahead of the curve.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            onClick={handleTryFree}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 min-w-[200px]"
            data-testid="button-final-try-free"
          >
            <Rocket className="mr-2" size={20} />
            Try It Free Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleComparePlans}
            className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-2 border-purple-300 hover:border-purple-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 min-w-[200px]"
            data-testid="button-final-compare-plans"
          >
            <BarChart3 className="mr-2" size={20} />
            Explore Plans
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-600 dark:text-white/80">
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
