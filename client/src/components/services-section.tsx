import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Palette, Video, Check, Film } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      id: "image-enhancement",
      title: "Image Enhancement",
      description: "Transform low-quality images into crystal-clear, professional photos with our advanced AI upscaling and enhancement technology.",
      icon: Image,
      color: "purple",
      features: [
        "Up to 8K resolution upscaling",
        "Noise reduction & sharpening",
        "Batch processing available"
      ],
      buttonText: "Try Enhancement",
      buttonTestId: "button-try-image-enhancement"
    },
    {
      id: "ai-generator",
      title: "Text-to-Image AI",
      description: "Create stunning, unique artwork from simple text descriptions using state-of-the-art generative AI models.",
      icon: Palette,
      color: "purple",
      features: [
        "Multiple art styles available",
        "High-resolution outputs",
        "Commercial usage rights"
      ],
      buttonText: "Generate Images",
      buttonTestId: "button-try-image-generation"
    },
    {
      id: "video-generator",
      title: "Text-to-Video AI",
      description: "Generate professional video content from text prompts with our cutting-edge video synthesis technology.",
      icon: Video,
      color: "purple",
      features: [
        "4K video generation",
        "Multiple duration options",
        "Custom aspect ratios"
      ],
      buttonText: "Create Videos",
      buttonTestId: "button-try-video-generation"
    },
    {
      id: "image-to-video",
      title: "Image-to-Video AI",
      description: "Bring still images to life with cinematic AI motion. Transform photos into dynamic short clips perfect for ads, reels, and creative projects.",
      icon: Film,
      color: "purple",
      features: [
        "720p & 1080p video generation",
        "Multiple motion styles",
        "Up to 10s clips or stitched longer videos",
        "Batch processing supported"
      ],
      buttonText: "Create Video from Image",
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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Discover Our AI Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border ${colorClasses.border} h-full`}
                data-testid={`card-service-${service.id}`}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className={`w-16 h-16 ${colorClasses.icon} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white text-2xl" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Check className={`${colorClasses.checkIcon} mr-3`} size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
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
