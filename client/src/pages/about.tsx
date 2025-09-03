import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
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
              About Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Learn more about our mission and what drives us
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-black rounded-lg shadow-lg p-8 lg:p-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              <strong>Lorepic</strong> is an AI-powered SaaS platform built to make professional content creation simple, fast, and affordable. We provide advanced tools for image enhancement, text-to-image generation, and text-to-video creation—all in one platform.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our mission is to empower creators, businesses, and enterprises with cutting-edge AI technology that delivers high-quality results in seconds. Whether you're a content creator, marketer, or business owner, <strong>Lorepic</strong> helps you unlock creativity without complexity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}