import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Rocket, ArrowRight, Shield, Zap, Users, CheckCircle, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

export default function FinalCTASection() {
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

  const handleTryFree = () => {
    // Check authentication status before navigating
    if (isAuthenticated) {
      // User is logged in, navigate to dashboard
      navigate('/dashboard');
    } else {
      // User not logged in, redirect to auth flow
      window.location.href = '/api/login';
    }
  };

  const handleComparePlans = () => {
    navigate('/pricing');
  };

  const stats = [
    { icon: Users, number: "50K+", label: "Active Creators" },
    { icon: Zap, number: "1M+", label: "AI Generations" },
    { icon: Star, number: "4.8/5", label: "User Rating" }
  ];

  const trustPoints = [
    { icon: Shield, text: "Enterprise-grade security" },
    { icon: Zap, text: "Lightning-fast AI processing" },
    { icon: CheckCircle, text: "30-day money-back guarantee" }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white dark:bg-black">
      {/* Background decorations for visual interest */}
      <div className="absolute inset-0 opacity-50 dark:opacity-100"></div>
      
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Content */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl lg:text-7xl font-semibold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-fuchsia-400 bg-clip-text text-transparent">
              Creative Process?
            </span>
          </h2>
          <p className={`text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
          }`}>
            Join thousands of creators who are already using AI to produce stunning content faster than ever before. Start your journey today with <span className="text-gray-900 dark:text-white font-semibold">free credits</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
          }`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <Button
                size="lg"
                onClick={handleTryFree}
                className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-10 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-w-[280px]"
                data-testid="button-final-try-free"
              >
                <Rocket className="mr-3" size={24} />
                Start Creating for Free
              </Button>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={handleComparePlans}
              className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 border-2 border-gray-300 dark:border-white/30 hover:border-gray-400 dark:hover:border-white/50 px-10 py-6 rounded-2xl text-xl font-semibold backdrop-blur-sm transition-all duration-300 min-w-[280px]"
              data-testid="button-final-compare-plans"
            >
              View All Plans
              <ArrowRight className="ml-3" size={24} />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450' : 'opacity-0 translate-y-4'
        }`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="inline-flex items-center justify-center p-4 bg-gray-100 dark:bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
                <stat.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Points */}
        <div className={`relative ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500' : 'opacity-0 translate-y-4'
        }`}>
          <div className="bg-gray-50 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center justify-center md:justify-start" data-testid={`trust-point-${index}`}>
                  <div className="flex items-center justify-center p-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 rounded-xl mr-4">
                    <point.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{point.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final message */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            No credit card required • Cancel anytime • Join 50,000+ creators worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
