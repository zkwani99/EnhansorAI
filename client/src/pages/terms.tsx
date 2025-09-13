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
              Last Updated: September 13, 2025
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
              Welcome to Lorepic ("we," "our," "us"). These Terms of Service ("Terms") govern your access and use of our website, products, and services, including subscriptions and credit packs (the "Service"). By using Lorepic, you agree to these Terms.
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. Eligibility & Account Creation</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• You must be at least 18 years old (or the legal age in your jurisdiction) to create an account.</p>
                <p>• You are responsible for maintaining the confidentiality of your account credentials.</p>
                <p>• You agree to provide accurate, current, and complete information during registration.</p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. Service Description</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• Lorepic provides AI-powered tools for image enhancement, text-to-image, image-to-video, and text-to-video generation.</p>
                <p>• Features and usage limits depend on your chosen subscription plan or credit pack.</p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">3. Subscriptions & Billing</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• Paid subscriptions are billed on a recurring basis (monthly or annually) unless canceled.</p>
                <p>• Free plans are offered with limited features and may be changed or discontinued at any time.</p>
                <p>• Pricing details are available on our Pricing Page.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">4. Refunds & Cancellations</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• All payments are final. Refunds are only issued in rare cases as described in our Refund Policy.</p>
                <p>• You may cancel your subscription at any time from your account settings. Cancellations take effect at the end of the current billing cycle.</p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">5. Intellectual Property</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• All software, designs, and branding remain the property of Lorepic (ZAKWANI LLC).</p>
                <p>• You may use generated content for personal and commercial purposes, subject to your subscription plan.</p>
                <p>• You may not reproduce, resell, or exploit the Service without prior written consent.</p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">6. User Conduct</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">You agree not to:</p>
              <div className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <p>• Upload, generate, or share unlawful, harmful, abusive, or infringing content.</p>
                <p>• Attempt to hack, disrupt, or reverse-engineer the Service.</p>
                <p>• Misuse the Service for fraudulent or illegal activities.</p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">7. Data & Privacy</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• We collect and process personal data in accordance with our Privacy Policy.</p>
                <p>• By using Lorepic, you consent to this data processing.</p>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">8. Limitation of Liability</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• The Service is provided "as is" without warranties of any kind.</p>
                <p>• We are not liable for indirect, incidental, or consequential damages.</p>
                <p>• Our total liability for any claim shall not exceed the amount paid by you in the last 3 months.</p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">9. Termination & Suspension</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• We reserve the right to suspend or terminate your account if you violate these Terms.</p>
                <p>• You may stop using the Service at any time.</p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">10. Changes to Terms</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>• We may update these Terms at any time. Changes will be effective when posted on our website.</p>
                <p>• Continued use of the Service after changes means you accept the updated Terms.</p>
              </div>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">11. Contact Information</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p><strong>Lorepic is operated by:</strong></p>
                <p>ZAKWANI LLC<br />
                15442 Ventura Blvd., Ste 201-1430<br />
                Sherman Oaks, California 91403, USA</p>
                <p>📧 Email: <a href="mailto:support@lorepic.com" className="text-purple-600 dark:text-purple-400 hover:underline">support@lorepic.com</a></p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}