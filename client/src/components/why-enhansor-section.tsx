import { useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Upload, Eye, Settings, Code, Cloud, Palette, Image, Video } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

export default function WhyEnhansorSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const advantages = [
    {
      icon: Upload,
      title: "Batch Processing",
      description: "Upload multiple images at once and process them simultaneously. Save time with our efficient batch processing system designed for professionals.",
      tags: ["Up to 50 images", "Queue Management"]
    },
    {
      icon: Eye,
      title: "Real-time Preview",
      description: "See your enhancements instantly with our real-time preview system. Compare before and after results side-by-side as you adjust settings.",
      tags: ["Instant Preview", "Side-by-side"]
    },
    {
      icon: Settings,
      title: "Advanced Controls",
      description: "Fine-tune every aspect of your enhancement with professional-grade controls. From noise reduction to sharpening intensity.",
      tags: ["Custom Settings", "Pro Controls"]
    },
    {
      icon: Code,
      title: "API Integration",
      description: "Integrate our AI enhancement directly into your workflow or application with our robust REST API and comprehensive documentation.",
      tags: ["REST API", "SDKs Available"]
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Your enhanced images are securely stored in the cloud with easy access and sharing options. Download anytime, anywhere.",
      tags: ["Secure Storage", "Easy Sharing"]
    },
    {
      icon: Palette,
      title: "Creative AI Engine",
      description: "Generate stunning original artwork from text descriptions. Our advanced AI understands context, style, and artistic nuance.",
      tags: ["Text-to-Image", "Multiple Styles"]
    },
    {
      icon: Image,
      title: "Style Transfer",
      description: "Transform images with artistic styles from photorealistic to anime, oil painting to digital art. Express your creative vision effortlessly.",
      tags: ["Studio Quality", "AI Upscaling"]
    },
    {
      icon: Video,
      title: "AI Video Rendering",
      description: "Generate cinematic-quality short videos directly from text, optimized for social media & marketing. Create engaging video content in seconds.",
      tags: ["Text-to-Video", "HD Quality"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Enhansor?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl">
            From content creators to enterprise businesses, successful professionals across industries grow and scale with Enhansor's AI-powered image enhancement technology.
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative px-4 sm:px-12">
          {/* Left Arrow - Hidden on mobile */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white border-gray-300 hover:bg-gray-50 z-10 shadow-sm hidden sm:flex items-center justify-center"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </Button>
          
          {/* Right Arrow - Hidden on mobile */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white border-gray-300 hover:bg-gray-50 z-10 shadow-sm hidden sm:flex items-center justify-center"
            data-testid="button-carousel-next"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </Button>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-6">
              {advantages.map((advantage, index) => {
                const IconComponent = advantage.icon;
                
                return (
                  <div key={index} className="flex-none w-72 sm:w-80">
                    <Card
                      className="bg-white rounded-2xl border-2 border-primary-blue shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
                      data-testid={`card-advantage-${index}`}
                    >
                      <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
                            <IconComponent className="text-white" size={18} />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{advantage.title}</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 flex-1 leading-relaxed">
                          {advantage.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {advantage.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8 text-lg">
            Ready to experience the difference? Start with our free tier and upgrade as you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-primary-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-try-free-now"
            >
              ⚡ Try Free Now
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-primary-blue hover:text-primary-blue transition-colors"
              data-testid="button-view-all-features"
            >
              View All Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
