import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, Image, Video, Sparkles } from "lucide-react";
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
      icon: Sparkles,
      title: "Image Enhancement",
      description: "Transform your images with AI-powered upscaling, noise reduction, and quality enhancement.",
      features: ["4K Upscaling", "Noise Reduction", "Detail Enhancement"],
      href: "/enhance",
      color: "from-green-500 to-emerald-600",
      credits: "1 Credit"
    },
    {
      id: "text-to-image", 
      icon: Image,
      title: "Text-to-Image",
      description: "Create stunning visuals from simple text descriptions using advanced AI models.",
      features: ["Multiple Art Styles", "High Resolution", "Custom Prompts"],
      href: "/generate",
      color: "from-purple-600 to-pink-600",
      credits: "3 Credits"
    },
    {
      id: "image-to-video",
      icon: Video,
      title: "Image-to-Video", 
      description: "Bring static images to life with AI-generated animations and motion effects.",
      features: ["Smooth Animation", "Multiple Styles", "HD Output"],
      href: "/image-to-video",
      color: "from-blue-600 to-cyan-600",
      credits: "5 Credits"
    },
    {
      id: "text-to-video",
      icon: Zap,
      title: "Text-to-Video",
      description: "Generate complete videos from text descriptions with AI-powered scene creation.",
      features: ["Full HD Videos", "Scene Generation", "Custom Duration"],
      href: "/video",
      color: "from-orange-500 to-red-600",
      credits: "8 Credits"
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
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
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
            Explore our comprehensive suite of AI-powered creative tools designed to transform your ideas into reality
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
        }`}>
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <div
                key={service.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                data-testid={`service-card-${service.id}`}
                onClick={() => handleServiceClick(service.id, service.href)}
              >
                {/* Credit badge */}
                <div className="absolute top-4 right-4 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-xs font-medium px-2 py-1 rounded-full">
                  {service.credits}
                </div>

                {/* Icon with gradient background */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:border-purple-300 dark:group-hover:border-purple-600 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-all duration-300"
                  data-testid={`service-cta-${service.id}`}
                >
                  Try Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

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
            <Image className="mr-2 w-5 h-5" />
            Generate Your First AI Image
          </Button>
        </div>
      </div>
    </section>
  );
}