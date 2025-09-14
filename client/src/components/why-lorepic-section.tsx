import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Palette, RotateCcw, Shield } from "lucide-react";

export default function WhyLorepicSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const advantages = [
    {
      icon: Zap,
      emoji: "⚡",
      title: "Speed",
      tagline: "Lightning-fast AI rendering powered by GPU acceleration and optimized models.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Palette,
      emoji: "🎨",
      title: "Quality",
      tagline: "Crystal-clear images & cinematic-quality videos every time you create.",
      color: "from-purple-600 to-pink-500",
    },
    {
      icon: RotateCcw,
      emoji: "🔄",
      title: "Flexibility",
      tagline: "Choose between subscription plans or flexible pay-as-you-go credits.",
      color: "from-purple-700 to-indigo-500",
    },
    {
      icon: Shield,
      emoji: "🔒",
      title: "Security",
      tagline: "Your data stays encrypted, GDPR-compliant, and completely secure with us.",
      color: "from-purple-800 to-violet-600",
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
      className="py-20 bg-gray-900 dark:bg-black text-white"
      data-testid="why-lorepic-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl text-white mb-6 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            Why <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Lorepic</span>?
          </h2>
          <p className={`text-xl text-gray-300 max-w-4xl mx-auto ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
          }`}>
            From content creators to enterprise businesses, successful professionals across industries 
            grow and scale with Lorepic's AI-powered creative technology.
          </p>
        </div>
        
        {/* Animated Cards Grid with slide-up effect */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
        }`}>
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            const delayClasses = ["delay-0", "delay-150", "delay-300", "delay-450"];
            
            return (
              <Card
                key={index}
                className={`group bg-gray-800 dark:bg-gray-900 border border-gray-700 hover:border-purple-500 rounded-2xl shadow-xl hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 h-full cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none ${
                  isVisible ? `animate-in fade-in slide-in-from-bottom-4 duration-700 ${delayClasses[index]}` : 'opacity-0 translate-y-4'
                }`}
                data-testid={`card-advantage-${advantage.title.toLowerCase()}`}
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                    <span className="absolute -top-2 -right-2 text-xl bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center border-2 border-gray-700">
                      {advantage.emoji}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {advantage.tagline}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Social Proof Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 bg-gray-800 dark:bg-gray-900 rounded-xl px-8 py-6 border border-gray-700">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full border-2 border-gray-800"></div>
              <div className="w-10 h-10 bg-blue-600 rounded-full border-2 border-gray-800"></div>
              <div className="w-10 h-10 bg-green-600 rounded-full border-2 border-gray-800"></div>
              <div className="w-10 h-10 bg-yellow-600 rounded-full border-2 border-gray-800"></div>
              <div className="w-10 h-10 bg-pink-600 rounded-full border-2 border-gray-800"></div>
            </div>
            <div className="text-left">
              <div className="text-lg text-white font-semibold">50,000+ Creators</div>
              <div className="text-sm text-gray-400">Growing every day</div>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="text-left">
              <div className="text-lg text-white font-semibold">99.9% Uptime</div>
              <div className="text-sm text-gray-400">Always available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}