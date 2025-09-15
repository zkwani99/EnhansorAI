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
      className="py-20 bg-gradient-to-b from-pink-400 via-purple-500 to-blue-600"
      data-testid="built-to-stand-out-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl text-white mb-6 font-semibold ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            Built to <span className="text-yellow-300">Stand Out</span>
          </h2>
          <p className={`text-xl text-white/90 max-w-4xl mx-auto ${
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
                className={`group bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-xl p-6 shadow-sm hover:shadow-lg hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? `animate-in fade-in slide-in-from-bottom-4 duration-700 ${delayClasses[index]}` : 'opacity-0 translate-y-4'
                }`}
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div>
                  {/* Content with just emoji icon */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">{feature.emoji}</span>
                    <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-8 bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 shadow-sm">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face&auto=format" alt="Creator" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face&auto=format" alt="Creator" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=120&h=120&fit=crop&crop=face&auto=format" alt="Creator" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
              <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=120&h=120&fit=crop&crop=face&auto=format" alt="Creator" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face&auto=format" alt="Creator" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
            </div>
            <div className="text-left">
              <div className="text-lg text-white font-semibold">1000+ Creators</div>
              <div className="text-sm text-white/80">Growing every day</div>
            </div>
            <div className="h-8 w-px bg-white/30"></div>
            <div className="text-left">
              <div className="text-lg text-white font-semibold">99.9% Uptime</div>
              <div className="text-sm text-white/80">Always available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}