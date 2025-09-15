import { useState, useEffect, useRef } from "react";
import { ArrowRight, Settings, Camera, Play, RotateCcw, Monitor, Layers, Clock, Paintbrush, Check, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirectToService } from "@/lib/authRedirect";
import { isReviewMode } from "@/lib/reviewMode";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function DiscoverServicesSection() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: "image-enhancement",
      icon: Settings,
      title: "Image Enhancement",
      description: "Enhance photos in high resolution in seconds.",
      features: [
        { text: "Up to 6K resolution upscaling", icon: Monitor },
        { text: "Noise reduction & sharpening", icon: Layers },
        { text: "Batch processing available", icon: Clock }
      ],
      href: "/enhance",
      color: "from-purple-600 to-purple-800"
    },
    {
      id: "text-to-image", 
      icon: Camera,
      title: "Text-to-Image AI",
      description: "Generate stunning visuals from any text.",
      features: [
        { text: "Multiple art styles available", icon: Paintbrush },
        { text: "High-resolution outputs", icon: Monitor },
        { text: "Commercial usage rights", icon: Check }
      ],
      href: "/generate",
      color: "from-purple-600 to-purple-800"
    },
    {
      id: "text-to-video",
      icon: Play,
      title: "Text-to-Video AI",
      description: "Turn scripts into engaging short videos.",
      features: [
        { text: "Up to 1080p video generation", icon: Monitor },
        { text: "AI Storyboard (advanced scene planning)", icon: Layers },
        { text: "Custom aspect ratios", icon: Clock }
      ],
      href: "/video",
      color: "from-purple-600 to-purple-800"
    },
    {
      id: "image-to-video",
      icon: RotateCcw,
      title: "Image-to-Video AI", 
      description: "Animate your images into dynamic clips.",
      features: [
        { text: "720p & 1080p video generation", icon: Monitor },
        { text: "Stitch up to 10s clips into longer videos", icon: Clock },
        { text: "AI Concierge Mode (guided video creation)", icon: Layers }
      ],
      href: "/image-to-video",
      color: "from-purple-600 to-purple-800"
    }
  ];

  const handleServiceClick = (serviceId: string, href: string) => {
    if (isReviewMode()) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    if (isAuthenticated) {
      navigate(href);
      window.scrollTo(0, 0);
    } else {
      redirectToService(serviceId);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            Discover Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Services</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
          }`}>
            Choose from our powerful suite of AI-driven tools designed to elevate your creative projects
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
        }`}>
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <div
                key={service.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full flex flex-col"
                data-testid={`service-card-${service.id}`}
                onClick={() => handleServiceClick(service.id, service.href)}
              >
                {/* Icon with gradient background */}
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <FeatureIcon className="text-purple-600 dark:text-purple-400 mr-3 w-4 h-4 flex-shrink-0" />
                        <span>{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                    data-testid={`service-cta-${service.id}`}
                  >
                    Try Now For Free
                  </Button>
                </div>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            New to AI creation? Start with our most popular service
          </p>
          <Button
            size="lg" 
            onClick={() => handleServiceClick("text-to-image", "/generate")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            data-testid="popular-service-cta"
          >
            <Camera className="mr-2 w-5 h-5" />
            Generate Your First AI Image
          </Button>
        </div>
      </div>
    </section>
  );
}