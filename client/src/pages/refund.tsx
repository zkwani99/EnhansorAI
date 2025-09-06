import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function RefundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-black transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-600 transition-colors duration-300">
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
              Refund Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our refund policy and terms for subscriptions and credits
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-black rounded-lg shadow-lg dark:shadow-black/50 transition-colors duration-300 p-8 lg:p-12">
          <div className="space-y-8">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. No Refund Policy</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>At Lorepic, all payments for subscriptions and credit packs are final. We do not offer refunds for any unused portion of your plan or credits.</p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. Free Plan</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>Lorepic offers a free plan with no time limit. No payment details are required for free plan users, and no charges will ever be applied unless you upgrade to a paid subscription or purchase credits.</p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">3. Cancellation</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>You may cancel your Lorepic subscription at any time directly in your account settings. Once canceled, you will continue to have access until the end of your current billing cycle.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">4. Service Issues</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>In the event of a major outage or disruption that prevents you from using the platform, Lorepic may provide credits or extend your plan. These cases will be reviewed individually.</p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">5. Billing Mistakes</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>If you identify a charge that appears incorrect, please contact us at support@lorepic.com. We will promptly investigate, and if an error is confirmed, your account will be corrected or a refund will be issued.</p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">6. Changes to This Policy</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>Lorepic reserves the right to update this Refund Policy at any time. Any changes will take effect immediately upon being posted on our website.</p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">7. Contact Us</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>For any questions about this Refund Policy, please reach out to us at support@lorepic.com.</p>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">8. Subscription Renewals</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>All paid subscriptions renew automatically unless canceled before the renewal date. By continuing your subscription, you authorize Lorepic to process recurring payments using your selected payment method.</p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">9. Eligibility for Refunds</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>Refunds are only considered in rare cases, such as duplicate charges or confirmed billing errors. Lorepic does not provide refunds for unused subscription time, accidental purchases, or dissatisfaction with generated results.</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: 06/09/2025
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}