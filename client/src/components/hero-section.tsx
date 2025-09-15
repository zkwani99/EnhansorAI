import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Sparkles, Palette, Video, Film } from "lucide-react";
import { redirectToService } from "@/lib/authRedirect";
import { isReviewMode } from "@/lib/reviewMode";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function HeroSection() {
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
      title: "Image Enhancement",
      icon: Sparkles,
      route: "/enhance"
    },
    {
      id: "text-to-image",
      title: "Text-to-Image", 
      icon: Palette,
      route: "/generate"
    },
    {
      id: "image-to-video",
      title: "Image-to-Video",
      icon: Film, 
      route: "/image-to-video"
    },
    {
      id: "text-to-video",
      title: "Text-to-Video",
      icon: Video,
      route: "/video"
    }
  ];

  const handleServiceClick = (serviceId: string, route: string) => {
    // During review mode, allow navigation to service pages without authentication
    if (isReviewMode()) {
      navigate(route);
      window.scrollTo(0, 0);
      return;
    }
    
    // Check authentication status before navigating
    if (isAuthenticated) {
      // User is logged in, navigate directly to the service page
      navigate(route);
      window.scrollTo(0, 0);
    } else {
      // User not logged in, redirect to auth flow
      redirectToService(serviceId);
    }
  };

  const handleStartFree = () => {
    if (isReviewMode()) {
      navigate("/generate");
      window.scrollTo(0, 0);
      return;
    }

    if (isAuthenticated) {
      navigate("/generate");
      window.scrollTo(0, 0);
    } else {
      redirectToService("text-to-image");
    }
  };

  const scrollToGallery = () => {
    const galleryElement = document.querySelector('[data-testid="gallery-section"]');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
      {/* Video Background Placeholder - Ready for future video implementation */}
      <div className="absolute inset-0 bg-black">
        {/* Future video element will go here: */}
        {/* <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/hero-background-video.mp4" type="video/mp4" />
        </video> */}
      </div>
      
      {/* Black Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          {/* New Headline */}
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl text-white mb-8 leading-tight ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            Bring Your Ideas to Life with{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI-Powered Creativity
            </span>
          </h1>
          
          {/* New Subheadline */}
          <p className={`text-xl lg:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
          }`}>
            Enhance photos, generate art, and create cinematic videos—instantly, with AI.
          </p>
          
          {/* Primary CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
          }`}>
            <Button 
              size="lg"
              onClick={handleStartFree}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              data-testid="button-start-free"
            >
              Start For Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg"
              onClick={scrollToGallery}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 hover:border-white hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-200 backdrop-blur-sm font-medium"
              data-testid="button-see-examples"
            >
              <Eye className="mr-2 h-5 w-5" />
              See Examples
            </Button>
          </div>

          {/* Service Icon Buttons - Quick Links */}
          <div className={`mb-12 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-sm text-gray-300 mb-6 uppercase tracking-wide">
              Quick Start with Our AI Tools
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.id, service.route)}
                    className="group flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    data-testid={`service-quick-${service.id}`}
                  >
                    <div className="p-3 bg-purple-600/20 backdrop-blur-sm rounded-lg mb-3 group-hover:bg-purple-600/30 transition-colors">
                      <IconComponent className="w-6 h-6 text-purple-300" />
                    </div>
                    <span className="text-sm text-gray-200 font-medium text-center leading-tight">
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-gray-300 text-lg mb-8">
              ✨ Start Creating for Free • No Credit Card Required
            </p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent" data-testid="stat-images-processed">
                  10K+
                </div>
                <div className="text-gray-300 mt-1">Images Enhanced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent" data-testid="stat-videos-generated">
                  5K+
                </div>
                <div className="text-gray-300 mt-1">Videos Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent" data-testid="stat-happy-users">
                  50K+
                </div>
                <div className="text-gray-300 mt-1">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}