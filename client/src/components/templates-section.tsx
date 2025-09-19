import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Image as ImageIcon, Video, Sparkles, Zap, Eye, Star, Layers } from "lucide-react";
import { useScrollBackground } from "@/hooks/useScrollBackground";

export default function TemplatesSection() {
  const [filterType, setFilterType] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Scroll-triggered background effect
  const backgroundRef = useScrollBackground({
    sectionId: "templates",
    threshold: 0.6,
    rootMargin: "0px 0px -30% 0px"
  });
  
  // Combined ref callback to handle both visibility and background effects
  const combinedRef = (element: HTMLElement | null) => {
    if (sectionRef.current !== element) {
      (sectionRef as any).current = element;
    }
    if (backgroundRef.current !== element) {
      (backgroundRef as any).current = element;
    }
  };

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

  const filterButtons = [
    { id: "all", label: "All Templates", icon: Layers },
    { id: "image", label: "Image Gen", icon: ImageIcon },
    { id: "enhancement", label: "Enhancement", icon: Sparkles },
    { id: "video", label: "Video", icon: Video }
  ];

  const templates = [
    {
      id: 1,
      title: "Realistic Landscape Generator",
      description: "Create stunning photorealistic landscapes with natural lighting and atmospheric effects.",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Image Gen", "HD", "Nature", "Realistic"],
      category: "Photography",
      popular: true,
      rating: 4.8
    },
    {
      id: 2,
      title: "Portrait Enhancement Pro",
      description: "Transform portraits with professional retouching, skin smoothing, and lighting correction.",
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "enhancement",
      tags: ["Enhancement", "Portrait", "Professional", "Retouching"],
      category: "Photography",
      popular: false,
      rating: 4.6
    },
    {
      id: 3,
      title: "Abstract Art Creator",
      description: "Generate unique abstract artworks with vibrant colors and dynamic compositions.",
      thumbnail: "https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Abstract", "Art", "Creative", "Vibrant"],
      category: "Art & Design",
      popular: true,
      rating: 4.9
    },
    {
      id: 4,
      title: "Cinematic Video Scenes",
      description: "Create movie-quality video sequences with dramatic lighting and camera movements.",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "video",
      tags: ["Video", "Cinematic", "HD", "Professional"],
      category: "Film & Video",
      popular: true,
      rating: 4.7
    },
    {
      id: 5,
      title: "Product Photography Studio",
      description: "Perfect product shots with studio lighting, shadow removal, and background replacement.",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "enhancement",
      tags: ["Product", "Studio", "E-commerce", "Professional"],
      category: "Business",
      popular: false,
      rating: 4.5
    },
    {
      id: 6,
      title: "Fantasy Character Generator",
      description: "Design epic fantasy characters with detailed armor, magical effects, and mythical creatures.",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Fantasy", "Character", "Gaming", "Creative"],
      category: "Gaming & Entertainment",
      popular: false,
      rating: 4.4
    },
    {
      id: 7,
      title: "Architecture Visualizer",
      description: "Transform architectural plans into photorealistic 3D renderings with perfect lighting.",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Architecture", "3D", "Realistic", "Design"],
      category: "Architecture",
      popular: false,
      rating: 4.6
    },
    {
      id: 8,
      title: "Social Media Content Pack",
      description: "Generate engaging social media visuals optimized for different platforms and formats.",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Social Media", "Marketing", "Branding", "Templates"],
      category: "Marketing",
      popular: true,
      rating: 4.8
    }
  ];

  const getFilteredTemplates = () => {
    if (filterType === "all") return templates;
    return templates.filter(template => template.type === filterType);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "enhancement":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    // All types now use unified purple color scheme
    return "bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-600 dark:text-pink-300";
  };

  return (
    <section ref={combinedRef} className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 templates-header">
          <h2 className={`text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 force-contrast ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
          }`}>
            AI Template <span className="bg-gradient-to-b from-fuchsia-500 to-purple-700 bg-clip-text text-transparent">Library</span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto force-contrast ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
          }`}>
            Jumpstart your creativity with professionally crafted templates. 
            Perfect starting points for every AI workflow and project type.
          </p>
        </div>

        {/* Filter buttons */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
        }`}>
          {filterButtons.map((button) => {
            const IconComponent = button.icon;
            const isActive = filterType === button.id;
            return (
              <Button
                key={button.id}
                onClick={() => setFilterType(button.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-b from-fuchsia-500 to-purple-700 text-white border-transparent shadow-fuchsia-500/30"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-fuchsia-300 dark:hover:border-purple-600 hover:bg-fuchsia-50 dark:hover:bg-gray-700"
                }`}
                data-testid={`filter-${button.id}`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {button.label}
              </Button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450' : 'opacity-0 translate-y-4'
        }`}>
          {getFilteredTemplates().map((template) => (
            <Card
              key={template.id}
              className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-fuchsia-300 dark:hover:border-purple-600 hover:shadow-2xl hover:shadow-fuchsia-500/10 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full"
              data-testid={`template-card-${template.id}`}
            >
              <div className="relative">
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Enhanced overlay with multiple gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Popular badge */}
                {template.popular && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-yellow-500 text-black font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                {/* Type badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 dark:bg-black/90 text-gray-700 dark:text-gray-300">
                    {getTypeIcon(template.type)}
                    <span className="ml-1 capitalize">
                      {template.type === "enhancement" ? "Enhance" : template.type}
                    </span>
                  </Badge>
                </div>

                {/* Enhanced preview overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95">
                  <Button
                    size="lg"
                    className="bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 shadow-xl mb-3"
                    data-testid={`button-preview-template-${template.id}`}
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Preview Template
                  </Button>
                  
                  {/* Rating stars */}
                  <div className="flex items-center text-white">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(template.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-purple-400 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Enhanced tags with better styling */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs px-3 py-1 border-fuchsia-200 dark:border-purple-800 text-fuchsia-600 dark:text-purple-300 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-3 py-1 text-gray-500">
                      +{template.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Category */}
                <div className="mb-4 flex-grow">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    {template.category}
                  </span>
                </div>

                {/* Use Template button at bottom */}
                <Button
                  className="w-full bg-gradient-to-b from-fuchsia-500 to-purple-700 hover:from-fuchsia-600 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-auto"
                  data-testid={`button-use-template-${template.id}`}
                >
                  Use Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center">
          <div className="bg-gradient-to-b from-fuchsia-50 to-purple-50 dark:from-fuchsia-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-fuchsia-200 dark:border-purple-800">
            <h3 className="text-2xl text-gray-900 dark:text-white mb-4">
              🎨 Ready to Create Something Amazing?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Browse our full collection of templates and start creating professional-quality content in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-b from-fuchsia-500 to-purple-700 hover:from-fuchsia-600 hover:to-purple-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                data-testid="button-browse-all-templates"
              >
                <Layers className="w-5 h-5 mr-2" />
                Browse All Templates
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-4 rounded-xl transition-all duration-300"
                data-testid="button-create-custom"
              >
                Create From Scratch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}