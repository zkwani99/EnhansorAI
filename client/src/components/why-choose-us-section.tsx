import { useEffect, useRef, useState } from "react";
import { Zap, Users, Award, Globe, Shield, Sparkles } from "lucide-react";

export default function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    templates: 0,
    users: 0,
    uptime: 0,
    speed: 0
  });
  
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      id: "templates",
      icon: <Sparkles className="w-12 h-12" />,
      targetCount: 50000,
      suffix: "+",
      label: "AI Templates",
      description: "Professional templates for every creative workflow",
      gradient: "from-purple-500 to-blue-600"
    },
    {
      id: "users",
      icon: <Users className="w-12 h-12" />,
      targetCount: 250000,
      suffix: "+",
      label: "Active Creators",
      description: "Global community of creative professionals",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: "uptime",
      icon: <Shield className="w-12 h-12" />,
      targetCount: 99.9,
      suffix: "%",
      label: "Uptime",
      description: "Enterprise-grade reliability and performance",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: "speed",
      icon: <Zap className="w-12 h-12" />,
      targetCount: 15,
      suffix: "s",
      label: "Avg Speed",
      description: "Industry-leading AI processing speed",
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat) => {
        let currentCount = 0;
        const increment = stat.targetCount / steps;

        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= stat.targetCount) {
            currentCount = stat.targetCount;
            clearInterval(timer);
          }

          setCounts(prev => ({
            ...prev,
            [stat.id]: Math.round(currentCount * 10) / 10
          }));
        }, stepDuration);
      });
    };

    animateCounters();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-900 dark:bg-black text-white relative overflow-hidden"
      data-testid="why-choose-us-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl text-white mb-6">
            Why Choose <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Lorepic</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of thousands of creators worldwide who trust Lorepic for professional AI-powered content creation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="text-center transform transition-all duration-1000 hover:scale-105"
              data-testid={`stat-${stat.id}`}
            >
              {/* Enhanced card with glassmorphism and slide-up animation */}
              <div 
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Icon with gradient background */}
                <div className="flex justify-center mb-6">
                  <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-2xl`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                    <div className="relative text-white">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                
                {/* Animated counter display */}
                <div className="mb-6">
                  <div className="flex items-center justify-center">
                    <span className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {counts[stat.id as keyof typeof counts] || 0}
                    </span>
                    <span className={`text-3xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent ml-1 font-semibold`}>
                      {stat.suffix}
                    </span>
                  </div>
                </div>
                
                {/* Enhanced typography */}
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {stat.label}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {stat.description}
                </p>

                {/* Subtle hover effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced bottom section with awards/certifications */}
        <div className="text-center">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            
            {/* Status indicator */}
            <div 
              className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-4 hover:bg-white/10 transition-all duration-300"
              data-testid="status-indicator"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="text-gray-300 font-medium">Live Status</span>
              </div>
              <div className="h-6 w-px bg-white/20"></div>
              <div className="text-white">
                <span className="font-semibold text-green-400">All Systems Operational</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-300" data-testid="badge-soc2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">SOC2 Certified</span>
              </div>
              
              <div className="h-6 w-px bg-white/20"></div>
              
              <div className="flex items-center space-x-2 text-gray-300" data-testid="badge-cdn">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Global CDN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}