import { useEffect, useRef, useState } from "react";
import { Zap, Users, Clock, TrendingUp } from "lucide-react";

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
      icon: <TrendingUp className="w-12 h-12" />,
      targetCount: 10000,
      suffix: "+",
      label: "AI Templates",
      description: "Ready-to-use templates for every creative need"
    },
    {
      id: "users",
      icon: <Users className="w-12 h-12" />,
      targetCount: 50000,
      suffix: "+",
      label: "Happy Users",
      description: "Creators worldwide trust Lorepic daily"
    },
    {
      id: "uptime",
      icon: <Zap className="w-12 h-12" />,
      targetCount: 99.9,
      suffix: "%",
      label: "Uptime",
      description: "Reliable service you can count on"
    },
    {
      id: "speed",
      icon: <Clock className="w-12 h-12" />,
      targetCount: 30,
      suffix: "s",
      label: "Avg Speed",
      description: "Lightning-fast AI processing"
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
      className="py-20 bg-black dark:bg-gray-900 text-white"
      data-testid="why-choose-us-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-white mb-6">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of creators who trust Lorepic for their AI-powered creative needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`text-center transform transition-all duration-700 delay-${index * 100}`}
              style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
              }}
              data-testid={`stat-${stat.id}`}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-600 rounded-full text-white">
                  {stat.icon}
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-5xl lg:text-6xl font-bold text-white">
                  {counts[stat.id as keyof typeof counts] || 0}
                </span>
                <span className="text-2xl text-purple-400 ml-1">
                  {stat.suffix}
                </span>
              </div>
              
              <h3 className="text-xl text-white mb-2">
                {stat.label}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-gray-800 rounded-2xl px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Live Status</span>
            </div>
            <div className="h-6 w-px bg-gray-700"></div>
            <div className="text-white">
              <span className="font-semibold">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}