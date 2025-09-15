import { useState, useEffect, useRef } from "react";
import { Monitor, Layers, Clock, Paintbrush, Check, Film, ArrowRight, Sliders } from "lucide-react";
import { 
  ImageSquare, 
  PaintBrushBroad, 
  FilmSlate, 
  VideoCamera 
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { redirectToService } from "@/lib/authRedirect";
import { isReviewMode } from "@/lib/reviewMode";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function DiscoverServicesSection() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isAutoMoving, setIsAutoMoving] = useState(true);
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

  // Auto-moving slider animation
  useEffect(() => {
    if (!isAutoMoving) return;
    
    const interval = setInterval(() => {
      setSliderPosition(prev => {
        if (prev >= 90) return 10;
        if (prev <= 10) return 90;
        return prev > 50 ? prev + 20 : prev - 20;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoMoving]);

  const services = [
    {
      id: "image-enhancement",
      icon: ImageSquare,
      title: "Image Enhancement",
      description: "Transform blurry photos into crystal-clear masterpieces",
      features: [
        "Up to 6K resolution upscaling",
        "Noise reduction & sharpening", 
        "Batch processing available"
      ],
      href: "/enhance",
      demo: {
        type: "before-after",
        beforeImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&auto=format&q=30",
        afterImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=95",
        caption: "Upscale & restore in seconds."
      }
    },
    {
      id: "text-to-image", 
      icon: PaintBrushBroad,
      title: "Text-to-Image",
      description: "Generate stunning artwork from simple text descriptions",
      features: [
        "Multiple art styles available",
        "High-resolution outputs",
        "Commercial usage rights"
      ],
      href: "/generate",
      demo: {
        type: "generated-image",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format",
        prompt: "A futuristic city at sunset",
        caption: "From text → to art."
      }
    },
    {
      id: "text-to-video",
      icon: FilmSlate,
      title: "Text-to-Video",
      description: "Transform ideas into cinematic video clips",
      features: [
        "Up to 1080p video generation",
        "AI Storyboard (advanced scene planning)",
        "Custom aspect ratios"
      ],
      href: "/video",
      demo: {
        type: "video",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        caption: "Turn your ideas into cinematic clips."
      }
    },
    {
      id: "image-to-video",
      icon: VideoCamera,
      title: "Image-to-Video", 
      description: "Bring static photos to life with motion",
      features: [
        "720p & 1080p video generation",
        "Stitch up to 10s clips into longer videos",
        "AI Concierge Mode (guided video creation)"
      ],
      href: "/image-to-video",
      demo: {
        type: "animated-image",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&auto=format",
        caption: "Bring photos to life."
      }
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

  const renderDemo = (service: any, index: number) => {
    const { demo } = service;
    
    if (demo.type === "before-after") {
      return (
        <div 
          className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group"
          onMouseEnter={() => setIsAutoMoving(false)}
          onMouseLeave={() => setIsAutoMoving(true)}
        >
          <div className="relative w-full h-full">
            {/* Before image */}
            <img 
              src={demo.beforeImage} 
              alt="Before enhancement"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            />
            {/* After image */}
            <img 
              src={demo.afterImage} 
              alt="After enhancement"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            />
            
            {/* Before/After Labels */}
            <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
              Before
            </div>
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
              After
            </div>
            
            {/* Slider control */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10 group-hover:w-2 transition-all duration-200"
              style={{ 
                left: `${sliderPosition}%`, 
                transform: 'translateX(-50%)',
                transition: isAutoMoving ? 'left 3s ease-in-out' : 'none'
              }}
              onMouseDown={(e) => {
                setIsAutoMoving(false);
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  if (rect) {
                    const newPosition = ((moveEvent.clientX - rect.left) / rect.width) * 100;
                    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
                  }
                };
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                  setTimeout(() => setIsAutoMoving(true), 2000); // Resume auto-moving after 2 seconds
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Sliders className="w-3 h-3 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {demo.caption}
          </div>
        </div>
      );
    }
    
    if (demo.type === "generated-image") {
      return (
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group">
          <img 
            src={demo.image} 
            alt={demo.prompt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 text-white">
            <div className="text-xs opacity-75 mb-1">Prompt: "{demo.prompt}"</div>
            <div className="text-sm font-medium">{demo.caption}</div>
          </div>
        </div>
      );
    }
    
    if (demo.type === "video") {
      return (
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={demo.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {demo.caption}
          </div>
        </div>
      );
    }
    
    if (demo.type === "animated-image") {
      return (
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group">
          <img 
            src={demo.image} 
            alt="Portrait photo"
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {demo.caption}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            See Lorepic <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">in Action</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
          }`}>
            Experience our AI-powered tools through interactive demos and real examples
          </p>
        </div>

        {/* Services with Interactive Demos */}
        <div className={`space-y-16 ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
        }`}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <div key={service.id} className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Service Details */}
                <div className="order-2 lg:order-1">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" weight="duotone" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-600 dark:text-gray-300 flex items-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleServiceClick(service.id, service.href)}
                    className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 group"
                    data-testid={`service-cta-${service.id}`}
                  >
                    Try Now For Free
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Right Column: Interactive Demo */}
                <div className="order-1 lg:order-2">
                  {renderDemo(service, index)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}