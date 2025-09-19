import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  src: string;
  clips: string;
  duration: string;
  type: string;
  niche: string;
  isVideo?: boolean;
}

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRefs = useRef<Record<string, HTMLDivElement>>({});

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

  // Gallery data organized by categories
  const categories = [
    {
      id: "image-enhancement",
      title: "Image Enhancement",
      items: [
        {
          id: 1,
          title: "Portrait Pro",
          subtitle: "Professional headshot",
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "15 clips",
          duration: "12.5s",
          type: "enhancement",
          niche: "Portrait"
        },
        {
          id: 2,
          title: "Landscape 4K",
          subtitle: "Mountain vista enhancement",
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "8 clips",
          duration: "15.2s", 
          type: "enhancement",
          niche: "Landscape"
        },
        {
          id: 3,
          title: "Product Shot",
          subtitle: "Commercial photography",
          src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "12 clips",
          duration: "8.7s",
          type: "enhancement", 
          niche: "Commercial"
        },
        {
          id: 4,
          title: "Fashion Edit",
          subtitle: "Style enhancement",
          src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "20 clips",
          duration: "18.3s",
          type: "enhancement",
          niche: "Fashion"
        },
        {
          id: 5,
          title: "Architecture",
          subtitle: "Building enhancement",
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "9 clips", 
          duration: "11.1s",
          type: "enhancement",
          niche: "Architecture"
        }
      ]
    },
    {
      id: "text-to-image",
      title: "Text to Image",
      items: [
        {
          id: 6,
          title: "Cyberpunk City",
          subtitle: "Futuristic metropolis",
          src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "25 clips",
          duration: "16.8s",
          type: "text-to-image",
          niche: "Sci-Fi"
        },
        {
          id: 7,
          title: "Fantasy Dragon",
          subtitle: "Mythical creature art",
          src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", 
          clips: "18 clips",
          duration: "14.9s",
          type: "text-to-image",
          niche: "Fantasy"
        },
        {
          id: 8,
          title: "Ocean Sunset",
          subtitle: "Scenic landscape",
          src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "11 clips",
          duration: "13.6s", 
          type: "text-to-image",
          niche: "Nature"
        },
        {
          id: 9,
          title: "Abstract Art",
          subtitle: "Digital painting",
          src: "https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "22 clips",
          duration: "19.2s",
          type: "text-to-image", 
          niche: "Abstract"
        },
        {
          id: 10,
          title: "Space Station",
          subtitle: "Cosmic environment",
          src: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "14 clips",
          duration: "17.4s",
          type: "text-to-image",
          niche: "Space"
        }
      ]
    },
    {
      id: "text-to-video", 
      title: "Text to Video",
      items: [
        {
          id: 11,
          title: "Ocean Waves",
          subtitle: "Relaxing seascape",
          src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "14 clips",
          duration: "16.0s",
          type: "text-to-video",
          niche: "Nature",
          isVideo: true
        },
        {
          id: 12, 
          title: "City Traffic",
          subtitle: "Urban movement",
          src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "11 clips", 
          duration: "13.8s",
          type: "text-to-video",
          niche: "Urban",
          isVideo: true
        },
        {
          id: 13,
          title: "Forest Stream", 
          subtitle: "Peaceful nature",
          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "18 clips",
          duration: "14.9s", 
          type: "text-to-video",
          niche: "Nature",
          isVideo: true
        },
        {
          id: 14,
          title: "Time Lapse Sky",
          subtitle: "Cloud movement",
          src: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", 
          clips: "21 clips",
          duration: "14.3s",
          type: "text-to-video",
          niche: "Timelapse", 
          isVideo: true
        },
        {
          id: 15,
          title: "Dancing Flames",
          subtitle: "Fire animation",
          src: "https://images.unsplash.com/photo-1525184990509-4fd44ed660c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "16 clips", 
          duration: "12.7s",
          type: "text-to-video",
          niche: "Elements",
          isVideo: true
        }
      ]
    },
    {
      id: "image-to-video",
      title: "Image to Video", 
      items: [
        {
          id: 16,
          title: "Portrait Motion",
          subtitle: "Animated headshot",
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "8 clips",
          duration: "11.2s",
          type: "image-to-video", 
          niche: "Portrait",
          isVideo: true
        },
        {
          id: 17,
          title: "Scenery Pan",
          subtitle: "Landscape camera move",
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "12 clips",
          duration: "15.6s", 
          type: "image-to-video",
          niche: "Landscape", 
          isVideo: true
        },
        {
          id: 18,
          title: "Product Spin",
          subtitle: "360° rotation",
          src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "18 clips", 
          duration: "14.9s",
          type: "image-to-video",
          niche: "Commercial",
          isVideo: true
        },
        {
          id: 19,
          title: "Fashion Walk",
          subtitle: "Model animation", 
          src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          clips: "14 clips",
          duration: "13.2s",
          type: "image-to-video",
          niche: "Fashion",
          isVideo: true
        },
        {
          id: 20,
          title: "Architecture Fly",
          subtitle: "Building flyover",
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300", 
          clips: "9 clips",
          duration: "16.8s",
          type: "image-to-video",
          niche: "Architecture",
          isVideo: true
        }
      ]
    }
  ];

  const scroll = (categoryId: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[categoryId];
    if (container) {
      const scrollAmount = 280; // Width of card + gap
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <section 
        ref={sectionRef} 
        id="gallery" 
        className="py-20 bg-gray-900 dark:bg-black relative" 
        data-testid="gallery-section"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl text-white mb-6 ${
              isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
            }`}>
              Gallery & <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Examples</span>
            </h2>
            <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${
              isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
            }`}>
              Discover stunning examples across different niches and use cases
            </p>
          </div>

          {/* Categories with horizontal scrolling */}
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.id} className={`${
                isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
              }`}>
                {/* Category header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <Button 
                    variant="ghost" 
                    className="text-fuchsia-400 hover:text-pink-300 hover:bg-fuchsia-500/10"
                    data-testid={`button-see-all-${category.id}`}
                  >
                    See All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Horizontal scrolling container */}
                <div className="relative">
                  {/* Scroll buttons */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scroll(category.id, 'left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm"
                    data-testid={`button-scroll-left-${category.id}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm" 
                    onClick={() => scroll(category.id, 'right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm"
                    data-testid={`button-scroll-right-${category.id}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  {/* Scrollable cards container */}
                  <div 
                    ref={(el) => {
                      if (el) scrollRefs.current[category.id] = el;
                    }}
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {category.items.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => openModal(item)}
                        className="flex-shrink-0 w-64 bg-gray-800/50 rounded-2xl overflow-hidden cursor-pointer hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 snap-start border border-gray-700/50 hover:border-purple-500/50"
                        data-testid={`card-gallery-${category.id}-${item.id}`}
                      >
                        {/* Image/Video thumbnail */}
                        <div className="relative aspect-video">
                          <img 
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          
                          {/* Video play button overlay */}
                          {(item as GalleryItem).isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="text-gray-800 ml-0.5" size={16} />
                              </div>
                            </div>
                          )}

                          {/* Duration and clips info */}
                          <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                            {item.clips} • {item.duration}
                          </div>
                        </div>

                        {/* Card content */}
                        <div className="p-4">
                          <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-gray-400 text-xs">{item.subtitle}</p>
                          <div className="mt-2">
                            <span className="inline-block bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                              {item.niche}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      <Dialog open={!!selectedItem} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-gray-900 border-gray-700">
          {selectedItem && (
            <>
              <DialogHeader className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-bold text-white">
                      {selectedItem.title}
                    </DialogTitle>
                    <p className="text-gray-400 mt-1">{selectedItem.subtitle}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white"
                    data-testid="button-close-modal"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </DialogHeader>
              
              <div className="px-6 pb-6">
                {/* Preview image */}
                <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                  <div className="relative aspect-video">
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                    {selectedItem.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="text-gray-800 ml-1" size={32} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center gap-4">
                    <span>{selectedItem.clips} • {selectedItem.duration}</span>
                    <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                      {selectedItem.niche}
                    </span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    data-testid="button-try-now"
                  >
                    Try Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </>
  );
}