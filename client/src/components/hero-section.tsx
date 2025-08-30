import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Video, Film } from "lucide-react";
import { redirectToService } from "@/lib/authRedirect";

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
      title: "Create Video from Text or Image",
      subtitle: "AI-powered short clips",
      icon: Video,
      color: "bg-purple-600"
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    redirectToService(serviceId);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Turn <span className="text-primary-purple">Ideas</span> into Visual <span className="text-primary-purple">Magic</span> — Instantly.
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Upscale low-res images, create stunning AI art, and transform text or photos into cinematic videos — all in one seamless platform powered by cutting-edge AI.
          </p>
          
          {/* Service Buttons - 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Top row */}
            <Button 
              size="lg"
              onClick={() => handleServiceClick('enhance')}
              className="bg-primary-purple text-white px-8 py-5 rounded-xl text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-primary-purple"
              data-testid="button-enhance-image"
            >
              <Sparkles className="mr-3 h-5 w-5" />
              Enhance Image
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleServiceClick('generate')}
              className="border-3 border-gray-400 bg-white text-gray-800 px-8 py-5 rounded-xl text-lg font-bold shadow-md hover:border-primary-purple hover:text-primary-purple hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              data-testid="button-generate-image"
            >
              <Palette className="mr-3 h-5 w-5" />
              Text to Image
            </Button>
            {/* Bottom row */}
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleServiceClick('video')}
              className="border-3 border-gray-400 bg-white text-gray-800 px-8 py-5 rounded-xl text-lg font-bold shadow-md hover:border-primary-purple hover:text-primary-purple hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              data-testid="button-create-video"
            >
              <Video className="mr-3 h-5 w-5" />
              Text to Video
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleServiceClick('image-to-video')}
              className="border-3 border-gray-400 bg-white text-gray-800 px-8 py-5 rounded-xl text-lg font-bold shadow-md hover:border-primary-purple hover:text-primary-purple hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              data-testid="button-create-video-from-image"
            >
              <Film className="mr-3 h-5 w-5" />
              Image to Video
            </Button>
          </div>
          
          {/* Hero Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-purple" data-testid="stat-images-processed">2K+</div>
              <div className="text-gray-600 mt-1">Images Enhanced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-purple" data-testid="stat-videos-generated">1K+</div>
              <div className="text-gray-600 mt-1">Videos Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-purple" data-testid="stat-happy-users">500+</div>
              <div className="text-gray-600 mt-1">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}