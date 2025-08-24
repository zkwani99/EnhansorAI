import { Button } from "@/components/ui/button";
import { Rocket, PlayCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Content with{" "}
            <span className="gradient-text">
              AI-Powered
            </span>{" "}
            Magic
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Professional-grade AI services for image enhancement, text-to-image generation, and text-to-video creation. 
            No watermarks, HD quality, lightning-fast processing at unbeatable prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary-blue to-primary-purple text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              data-testid="button-get-started"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary-blue hover:text-primary-blue transition-all duration-300"
              data-testid="button-explore-services"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Explore Services
            </Button>
          </div>
          
          {/* Hero Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-blue" data-testid="stat-images-processed">50K+</div>
              <div className="text-gray-600 mt-1">Images Enhanced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-purple" data-testid="stat-videos-generated">12K+</div>
              <div className="text-gray-600 mt-1">Videos Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-orange" data-testid="stat-happy-users">25K+</div>
              <div className="text-gray-600 mt-1">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
