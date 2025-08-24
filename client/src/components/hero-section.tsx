import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Video } from "lucide-react";

export default function HeroSection() {
  const services = [
    {
      id: "enhance",
      title: "Enhance My Image",
      subtitle: "Upscale & restore photos",
      icon: Sparkles,
      color: "bg-green-500"
    },
    {
      id: "generate",
      title: "Generate Image from Text",
      subtitle: "AI art & visuals",
      icon: Palette,
      color: "bg-primary-purple"
    },
    {
      id: "video",
      title: "Create Video from Text",
      subtitle: "AI-powered short clips",
      icon: Video,
      color: "bg-purple-600"
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    console.log("Service clicked:", serviceId);
    // TODO: Navigate to specific service
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-primary-purple">AI-Powered</span> Image, Video & Text{" "}
            <span className="block">
              Generation
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            One platform. Three powerful AI tools: <span className="text-primary-purple font-semibold">Enhance your images</span>, <span className="text-primary-purple font-semibold">generate stunning visuals</span>, or <span className="text-primary-purple font-semibold">create videos from text</span>.
          </p>
          
          {/* Service Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => handleServiceClick('enhance')}
              className="bg-primary-purple text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              data-testid="button-enhance-image"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Enhance My Image
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleServiceClick('generate')}
              className="border-2 border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary-purple hover:text-primary-purple transition-all duration-300"
              data-testid="button-generate-image"
            >
              <Palette className="mr-2 h-5 w-5" />
              Generate Image from Text
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleServiceClick('video')}
              className="border-2 border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary-purple hover:text-primary-purple transition-all duration-300"
              data-testid="button-create-video"
            >
              <Video className="mr-2 h-5 w-5" />
              Create Video from Text
            </Button>
          </div>
          
          {/* Hero Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-purple" data-testid="stat-images-processed">50K+</div>
              <div className="text-gray-600 mt-1">Images Enhanced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-purple" data-testid="stat-videos-generated">12K+</div>
              <div className="text-gray-600 mt-1">Videos Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-purple" data-testid="stat-happy-users">25K+</div>
              <div className="text-gray-600 mt-1">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}