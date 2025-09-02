import { useEffect, useRef, useState } from "react";
import { Sparkles, Palette, Video, Link, CreditCard, Users } from "lucide-react";

export default function WhatMakesUsDifferentSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const features = [
    {
      icon: Sparkles,
      title: "Smart Photo Enhancement",
      description: "Upscale, restore, and stylize in bulk or individually.",
      delay: "delay-0"
    },
    {
      icon: Palette,
      title: "Next-Level Image Generation",
      description: "Brand-aligned styles, editable outputs, and real-world ready AI art.",
      delay: "delay-100"
    },
    {
      icon: Video,
      title: "AI Video from Text",
      description: "Storyboard-first, voiceover sync, and social media templates built-in.",
      delay: "delay-200"
    },
    {
      icon: Link,
      title: "Connected Workflow",
      description: "Start with a photo, generate matching visuals, and finish with a promo video — all in one app.",
      delay: "delay-300"
    },
    {
      icon: CreditCard,
      title: "Flexible Credit System",
      description: "One pool of credits for all services, use them however you want.",
      delay: "delay-400"
    },
    {
      icon: Users,
      title: "Made for Teams",
      description: "Collaborate, share credits, and build together.",
      delay: "delay-500"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      data-testid="section-what-makes-us-different"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Makes Us Different
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the power of integrated AI creativity with features designed for professionals who demand excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div
                key={index}
                className={`text-center group ${
                  isVisible 
                    ? `animate-in fade-in slide-in-from-bottom-4 duration-700 ${feature.delay}` 
                    : 'opacity-0 translate-y-4'
                }`}
                data-testid={`feature-${index}`}
              >
                {/* Icon Container */}
                <div className="relative mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-purple-700 group-hover:to-purple-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}