import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Star, Shield, RotateCcw, DollarSign, Ticket, BookOpen, Palette } from "lucide-react";

export default function WhyLorepicSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: Zap,
      emoji: "🚀",
      title: "Speed",
      description: "Fast AI processing with smooth results.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Star,
      emoji: "⭐",
      title: "Quality",
      description: "High-resolution outputs tailored for professionals.",
      color: "from-purple-600 to-pink-500",
    },
    {
      icon: Shield,
      emoji: "🔒",
      title: "Security",
      description: "Safe, encrypted, and privacy-focused.",
      color: "from-purple-700 to-indigo-500",
    },
    {
      icon: RotateCcw,
      emoji: "🔄",
      title: "Flexibility",
      description: "Adaptable to different creative workflows.",
      color: "from-purple-800 to-violet-600",
    },
    {
      icon: DollarSign,
      emoji: "💰",
      title: "Affordable & Transparent Pricing",
      description: "Lower cost than competitors, with flexible subscriptions + PAYG.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Ticket,
      emoji: "🎟",
      title: "Unified Credit System",
      description: "One pool of credits works across all services.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BookOpen,
      emoji: "📚",
      title: "AI Template Library",
      description: "Pre-built workflows and creative starting points.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Palette,
      emoji: "🎨",
      title: "Multi-Format Creativity",
      description: "Images, text-to-image, text-to-video, and image-to-video in one place.",
      color: "from-pink-500 to-purple-500",
    }
  ];

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

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-50"
      data-testid="built-to-stand-out-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl text-gray-900 dark:text-gray-800 mb-6 font-semibold ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            Built to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Stand Out</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-700 max-w-4xl mx-auto ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
          }`}>
            Discover what makes Lorepic the preferred choice for professionals and businesses worldwide
          </p>
        </div>
        
        {/* Modern SaaS Features Grid - 2 rows of 4 items */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
        }`}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const delayClasses = ["delay-0", "delay-75", "delay-150", "delay-225", "delay-300", "delay-375", "delay-450", "delay-500"];
            
            return (
              <div
                key={index}
                className={`group bg-white dark:bg-gray-50 border border-gray-100 dark:border-gray-200 hover:border-purple-200 dark:hover:border-purple-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? `animate-in fade-in slide-in-from-bottom-4 duration-700 ${delayClasses[index]}` : 'opacity-0 translate-y-4'
                }`}
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon Container */}
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{feature.emoji}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-800 group-hover:text-purple-700 transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-8 bg-gray-50 dark:bg-white rounded-xl px-8 py-6 border border-gray-100 shadow-sm">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full border-2 border-white shadow-sm"></div>
              <div className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              <div className="w-10 h-10 bg-green-600 rounded-full border-2 border-white shadow-sm"></div>
              <div className="w-10 h-10 bg-orange-600 rounded-full border-2 border-white shadow-sm"></div>
              <div className="w-10 h-10 bg-pink-600 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="text-left">
              <div className="text-lg text-gray-900 font-semibold">50,000+ Creators</div>
              <div className="text-sm text-gray-600">Growing every day</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="text-left">
              <div className="text-lg text-gray-900 font-semibold">99.9% Uptime</div>
              <div className="text-sm text-gray-600">Always available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}