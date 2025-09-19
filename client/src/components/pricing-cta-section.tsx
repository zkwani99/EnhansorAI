import { useState, useEffect, useRef } from "react";
import { ArrowRight, CreditCard, Zap, Star, Gift, CheckCircle } from "lucide-react";

export default function PricingCTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Free Credits CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/10 to-purple-600/10 rounded-3xl"></div>
          <div className="relative bg-gradient-to-b from-fuchsia-50/70 to-purple-50/70 dark:from-fuchsia-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-3xl p-10 border border-fuchsia-200/50 dark:border-purple-700/50 ring-1 ring-white/20 dark:ring-white/5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-b from-fuchsia-500 to-purple-700 rounded-full mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl text-gray-900 dark:text-white mb-4">
                Start Creating for <span className="bg-gradient-to-b from-fuchsia-500 to-purple-700 bg-clip-text text-transparent font-bold">Free</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Get <strong>50 free credits</strong> when you sign up. Explore all our AI tools with no commitment and no credit card required.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
              <a
                href="/pricing"
                className="group inline-flex items-center bg-gradient-to-b from-fuchsia-500 to-purple-700 hover:from-fuchsia-600 hover:to-purple-800 text-white px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg font-medium"
                data-testid="pricing-cta-button"
              >
                View All Plans & Pricing
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </a>
              
              <a
                href="/auth/signup"
                className="group inline-flex items-center border-2 border-fuchsia-300 dark:border-purple-600 text-fuchsia-600 dark:text-purple-300 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20 px-8 py-5 rounded-2xl transition-all duration-300 text-lg font-medium"
                data-testid="signup-free-button"
              >
                Start Free Trial
                <Gift className="ml-2 w-5 h-5" />
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>No hidden fees</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}