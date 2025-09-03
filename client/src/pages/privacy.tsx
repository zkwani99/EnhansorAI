import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              How we protect and handle your information
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. Information We Collect</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p><strong>Account details:</strong> email, name, login credentials.</p>
                <p><strong>Usage data:</strong> activity logs, preferences, and generated content.</p>
                <p><strong>Uploaded content:</strong> images, text, or other inputs provided by you.</p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>To provide and improve our services.</p>
                <p>To personalize your experience.</p>
                <p>To ensure platform safety and prevent misuse.</p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">3. Data Sharing</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>We do not sell personal data.</p>
                <p>Third-party providers (e.g., payment processors, hosting) are used only to deliver the service.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">4. Security</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>Data is stored securely with encryption and restricted access.</p>
                <p>While we prioritize security, no system is 100% risk-free.</p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">5. Your Rights</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>Request access or deletion of your data anytime.</p>
                <p>Contact support for privacy concerns.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}