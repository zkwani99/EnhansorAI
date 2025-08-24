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
            AI-Powered Image, Video & Text{" "}
            <span className="block">
              Generation
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            One platform. Three powerful AI tools: Enhance your images, generate stunning visuals, or create videos from text.
          </p>
          
          {/* Service Cards */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-5xl mx-auto">
            {services.map((service) => {
              const IconComponent = service.icon;
              
              return (
                <Button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className={`${service.color} text-white px-8 py-6 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex flex-col items-center gap-2 min-w-[280px] h-auto`}
                  data-testid={`button-service-${service.id}`}
                >
                  <IconComponent className="h-6 w-6 mb-1" />
                  <span className="text-lg font-bold">{service.title}</span>
                  <span className="text-sm opacity-90 font-normal">{service.subtitle}</span>
                </Button>
              );
            })}
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