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
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-6xl text-gray-900 dark:text-white mb-6 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            Simple <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
          }`}>
            Choose the perfect plan for your creative needs. Start free, scale as you grow.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
        }`}>
          {/* Credit Packs Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-70"></div>
            <div className="relative bg-white/70 dark:bg-gray-900/30 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ring-1 ring-white/20 dark:ring-white/10">
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                  Credit Packs
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Pay-as-you-go with flexible credit bundles. Perfect for occasional creators and testing workflows.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>No monthly commitment</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Credits never expire</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Volume discounts available</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  From <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$9.99</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">100 credits included</div>
              </div>
            </div>
          </div>

          {/* Subscriptions Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-white/70 dark:bg-gray-900/30 backdrop-blur-xl rounded-3xl p-8 shadow-xl ring-1 ring-white/20 dark:ring-white/10">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </div>
              </div>
              
              <div className="text-center mb-6 mt-4">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                  Pro Subscriptions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Monthly plans with generous credit allowances. Best value for regular creators and professionals.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Priority processing</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Advanced features included</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>24/7 priority support</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  From <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$19/mo</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">1,000 credits monthly</div>
              </div>
            </div>
          </div>
        </div>

        {/* Free Credits CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl"></div>
          <div className="relative bg-gradient-to-r from-purple-50/70 to-blue-50/70 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-sm rounded-3xl p-10 border border-purple-200/50 dark:border-purple-700/50 ring-1 ring-white/20 dark:ring-white/5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl text-gray-900 dark:text-white mb-4">
                Start Creating for <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">Free</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Get <strong>50 free credits</strong> when you sign up. Explore all our AI tools with no commitment and no credit card required.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
              <a
                href="/pricing"
                className="group inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg font-medium"
                data-testid="pricing-cta-button"
              >
                View All Plans & Pricing
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </a>
              
              <a
                href="/auth/signup"
                className="group inline-flex items-center border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-8 py-5 rounded-2xl transition-all duration-300 text-lg font-medium"
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

        {/* Credit costs breakdown */}
        <div className="mt-16">
          <h4 className="text-center text-2xl text-gray-900 dark:text-white mb-8">
            Credit Usage Guide
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">1</div>
              <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">Credit</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Image Enhancement</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">3</div>
              <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">Credits</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Text-to-Image AI</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">5</div>
              <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">Credits</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Image-to-Video AI</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">8</div>
              <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">Credits</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Text-to-Video AI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}