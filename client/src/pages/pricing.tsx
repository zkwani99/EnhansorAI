import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import PricingSection from "@/components/pricing-section";

export default function PricingPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    // Update document title
    document.title = "Pricing Plans - Lorepic | AI-Powered Content Creation";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-black transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Subscription Plans & Credit Packs (PAYG)
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Flexible pricing — scale with plans or pay only for what you use.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - The Pricing Section */}
      <div className="bg-gradient-to-br from-white to-purple-50 dark:from-black dark:to-black">
        <PricingSection />
      </div>
    </div>
  );
}