import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The rules and guidelines for using our platform
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-black rounded-lg shadow-lg p-8 lg:p-12">
          <div className="space-y-8">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                By using <strong>Lorepic</strong>, you agree to these Terms of Service.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. License</h2>
              <p className="text-gray-700 dark:text-gray-300">
                You may use generated content for personal and commercial purposes unless restricted by your subscription plan.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">3. User Responsibilities</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>Do not upload unlawful, harmful, or infringing content.</p>
                <p>Respect intellectual property rights.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">4. Payments & Subscriptions</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>Plans are billed according to the pricing page.</p>
                <p>Refunds and renewals follow our policy.</p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Lorepic</strong> is provided "as is." We are not liable for indirect or incidental damages.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">6. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may suspend or terminate accounts for violations of these terms.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}