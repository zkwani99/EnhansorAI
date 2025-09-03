import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Palette, Video, Check, Film, Monitor, Paintbrush, Clock, Layers } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      id: "image-enhancement",
      title: "Image Enhancement",
      emoji: "🖼️",
      description: "Enhance photos in high resolution in seconds.",
      icon: Image,
      color: "purple",
      features: [
        { text: "Up to 6K resolution upscaling", icon: Monitor },
        { text: "Noise reduction & sharpening", icon: Layers },
        { text: "Batch processing available", icon: Clock }
      ],
      buttonText: "Try Now For Free",
      buttonTestId: "button-try-image-enhancement"
    },
    {
      id: "ai-generator",
      title: "Text-to-Image AI",
      emoji: "🎨",
      description: "Generate stunning visuals from any text.",
      icon: Palette,
      color: "purple",
      features: [
        { text: "Multiple art styles available", icon: Paintbrush },
        { text: "High-resolution outputs", icon: Monitor },
        { text: "Commercial usage rights", icon: Check }
      ],
      buttonText: "Try Now For Free",
      buttonTestId: "button-try-image-generation"
    },
    {
      id: "video-generator",
      title: "Text-to-Video AI",
      emoji: "🎬",
      description: "Turn scripts into engaging short videos.",
      icon: Video,
      color: "purple",
      features: [
        { text: "Up to 1080p video generation", icon: Monitor },
        { text: "AI Storyboard (advanced scene planning)", icon: Layers },
        { text: "Custom aspect ratios", icon: Clock }
      ],
      buttonText: "Try Now For Free",
      buttonTestId: "button-try-video-generation"
    },
    {
      id: "image-to-video",
      title: "Image-to-Video AI",
      emoji: "📹",
      description: "Animate your images into dynamic clips.",
      icon: Film,
      color: "purple",
      features: [
        { text: "720p & 1080p video generation", icon: Monitor },
        { text: "Stitch up to 10s clips into longer videos", icon: Clock },
        { text: "AI Concierge Mode (guided video creation)", icon: Layers }
      ],
      buttonText: "Try Now For Free",
      buttonTestId: "button-try-image-to-video"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          border: "border-purple-100 hover:border-purple-600",
          icon: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800",
          checkIcon: "text-purple-700",
          button: "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"
        };
      case "purple":
        return {
          border: "border-purple-100 hover:border-purple-600",
          icon: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800",
          checkIcon: "text-purple-700",
          button: "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"
        };
      case "orange":
        return {
          border: "border-orange-100 hover:border-primary-orange",
          icon: "bg-gradient-to-br from-primary-orange to-orange-400",
          checkIcon: "text-primary-orange",
          button: "bg-gradient-to-r from-primary-orange to-orange-500"
        };
      default:
        return {
          border: "border-gray-100",
          icon: "bg-gray-400",
          checkIcon: "text-gray-400",
          button: "bg-gray-500"
        };
    }
  };

  return (
    <section id="services" className="py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Our AI Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our powerful suite of AI-driven tools designed to elevate your creative projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const colorClasses = getColorClasses(service.color);
            const IconComponent = service.icon;
            
            return (
              <Card
                key={service.id}
                id={service.id}
                className={`group bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-2xl hover:border-purple-500 hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] border ${colorClasses.border} h-full`}
                data-testid={`card-service-${service.id}`}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className={`w-16 h-16 ${colorClasses.icon} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{service.emoji}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    {service.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <FeatureIcon className={`${colorClasses.checkIcon} mr-3`} size={16} />
                          <span>{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-auto">
                    <Button
                      className={`w-full ${colorClasses.button} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200`}
                      data-testid={service.buttonTestId}
                    >
                      {service.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
