import { ArrowRight, CreditCard, Zap } from "lucide-react";

export default function PricingCTASection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
            Pricing & Credits
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from flexible credit packs or subscription plans that fit your creative workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="text-purple-600 dark:text-purple-400 mb-4">
              <CreditCard className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-2xl text-gray-900 dark:text-white mb-4">
              Credit Packs
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Pay-as-you-go with flexible credit bundles. Perfect for occasional use.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Starting from <span className="text-purple-600 dark:text-purple-400 font-semibold">$9.99</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="text-purple-600 dark:text-purple-400 mb-4">
              <Zap className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-2xl text-gray-900 dark:text-white mb-4">
              Subscriptions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Monthly plans with unlimited access. Ideal for regular creators.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Starting from <span className="text-purple-600 dark:text-purple-400 font-semibold">$19/month</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800">
          <h3 className="text-2xl text-gray-900 dark:text-white mb-4">
            🚀 <strong>Free Credits</strong> to Get Started
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            New users get 50 free credits to explore all our AI tools. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/pricing"
              className="group inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              data-testid="pricing-cta-button"
            >
              View Plans & Credit Packs
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              No hidden fees • Cancel anytime
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">1 Credit</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Image Enhancement</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">3 Credits</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Text-to-Image</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">5 Credits</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Image-to-Video</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">8 Credits</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Text-to-Video</div>
          </div>
        </div>
      </div>
    </section>
  );
}