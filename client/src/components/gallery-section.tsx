import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Image as ImageIcon, Sparkles, Video, FolderOpen, Download, ToggleLeft, ToggleRight, X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("enhanced");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
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

  const filterButtons = [
    { id: "enhanced", label: "Enhanced", icon: ImageIcon, color: "from-purple-600 via-purple-700 to-purple-800" },
    { id: "generated", label: "AI Generated", icon: Sparkles, color: "from-purple-600 via-purple-700 to-purple-800" },
    { id: "videos", label: "AI Videos", icon: Video, color: "from-purple-600 via-purple-700 to-purple-800" },
    { id: "all", label: "All", icon: FolderOpen, color: "from-purple-600 via-purple-700 to-purple-800" },
  ];

  const enhancedImages = [
    {
      id: 1,
      type: "enhanced",
      src: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      beforeSrc: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&brightness=0.7&contrast=0.8",
      alt: "Enhanced vintage portrait photo comparison",
      title: "Portrait Enhancement",
      subtitle: "Before → After",
      tool: "AI Image Enhancer",
      height: "h-64",
      duration: undefined,
      videoSrc: undefined
    },
    {
      id: 2,
      type: "enhanced",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      beforeSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&brightness=0.6&contrast=0.7",
      alt: "Enhanced mountain landscape photo",
      title: "Landscape Enhancement",
      subtitle: "8K Upscaling",
      tool: "AI Image Enhancer",
      height: "h-80",
      duration: undefined,
      videoSrc: undefined
    },
    {
      id: 3,
      type: "enhanced",
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&brightness=0.8&contrast=0.9",
      beforeSrc: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Enhanced product photography",
      title: "Product Enhancement",
      subtitle: "Commercial Ready",
      tool: "AI Image Enhancer",
      height: "h-72",
      duration: undefined,
      videoSrc: undefined
    }
  ];

  const generatedImages = [
    {
      id: 4,
      type: "generated",
      src: "https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "AI generated abstract digital art",
      title: "Abstract Digital Art",
      subtitle: "AI Generated",
      tool: "AI Image Generator",
      height: "h-96",
      duration: undefined,
      videoSrc: undefined
    },
    {
      id: 5,
      type: "generated",
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "AI generated fantasy landscape artwork",
      title: "Fantasy Landscape",
      subtitle: "Magical Scene",
      tool: "AI Image Generator",
      height: "h-64",
      duration: undefined,
      videoSrc: undefined
    },
    {
      id: 6,
      type: "generated",
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "AI generated futuristic cityscape",
      title: "Futuristic Cityscape",
      subtitle: "Text-to-Image AI",
      tool: "AI Image Generator",
      height: "h-80",
      duration: undefined,
      videoSrc: undefined
    }
  ];

  const videoThumbnails = [
    {
      id: 7,
      type: "videos",
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated ocean waves video",
      title: "Ocean Waves",
      subtitle: "Ocean Simulation",
      duration: "4K • 30s",
      tool: "AI Video Generator",
      height: "h-72"
    },
    {
      id: 8,
      type: "videos",
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-down-a-mountain-range-41576-large.mp4",
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated city motion video",
      title: "City Motion",
      subtitle: "Urban Movement",
      duration: "4K • 45s",
      tool: "AI Video Generator",
      height: "h-64"
    },
    {
      id: 9,
      type: "videos",
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-shining-sun-in-the-sky-surrounded-by-moving-clouds-31793-large.mp4",
      src: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated sky motion video",
      title: "Sky Motion",
      subtitle: "Time-lapse",
      duration: "HD • 20s",
      tool: "AI Video Generator",
      height: "h-80"
    },
    {
      id: 10,
      type: "videos",
      videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated forest scene video",
      title: "Forest Scene",
      subtitle: "Nature Scene",
      duration: "4K • 60s",
      tool: "AI Video Generator",
      height: "h-96"
    }
  ];

  // Combine all gallery items for masonry layout
  const allItems = [...enhancedImages, ...generatedImages, ...videoThumbnails];
  
  const getFilteredItems = () => {
    if (activeFilter === "all") return allItems;
    return allItems.filter(item => item.type === activeFilter);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setShowBeforeAfter(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowBeforeAfter(false);
  };

  return (
    <>
      <section ref={sectionRef} id="gallery" className="py-20 bg-gray-900 dark:bg-black relative" data-testid="gallery-section">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl text-white mb-6 ${
              isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'opacity-0 translate-y-4'
            }`}>
              Gallery & <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Examples</span>
            </h2>
            <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${
              isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150' : 'opacity-0 translate-y-4'
            }`}>
              Discover stunning examples of what's possible with our AI-powered creative tools
            </p>
          </div>
          
          {/* Dark theme filter buttons */}
          <div className={`flex flex-wrap justify-center gap-3 mb-16 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300' : 'opacity-0 translate-y-4'
          }`}>
            {filterButtons.map((button) => {
              const IconComponent = button.icon;
              const isActive = activeFilter === button.id;
              return (
                <Button
                  key={button.id}
                  onClick={() => handleFilterChange(button.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-purple-500/50"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:border-purple-500 hover:bg-gray-700 hover:text-white"
                  }`}
                  data-testid={`button-filter-${button.id}`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {button.label}
                </Button>
              );
            })}
          </div>
          
          {/* Dynamic Masonry Gallery Grid */}
          <div className={`columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450' : 'opacity-0 translate-y-4'
          }`}>
            {getFilteredItems().map((item) => (
              <div
                key={item.id}
                className={`group relative bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer break-inside-avoid mb-6 ${item.height}`}
                onClick={() => openModal(item)}
                data-testid={`card-gallery-item-${item.id}`}
              >
                <div className="relative overflow-hidden">
                  {/* Auto-play videos for video items */}
                  {item.type === 'videos' && item.videoSrc ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      poster={item.src}
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Video indicator (even for auto-play videos) */}
                  {item.type === 'videos' && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                        <Play className="text-white w-4 h-4" />
                      </div>
                    </div>
                  )}
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Maximize2 className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-sm text-gray-200 mb-2">{item.subtitle}</p>
                    <div className="flex gap-2 flex-wrap">
                      {item.duration && (
                        <Badge className="bg-purple-600/80 text-white text-xs">
                          {item.duration}
                        </Badge>
                      )}
                      {item.type === 'enhanced' && (
                        <Badge className="bg-blue-600/80 text-white text-xs">
                          Before/After
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover effect border glow */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-500/0 group-hover:ring-purple-500/60 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Preview Modal */}
      <Dialog open={!!selectedItem} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          {selectedItem && (
            <>
              <DialogHeader className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {selectedItem.title}
                    </DialogTitle>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{selectedItem.tool}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    data-testid="button-close-modal"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </DialogHeader>
              
              <div className="px-6">
                {/* Before/After toggle for enhanced images */}
                {selectedItem.type === 'enhanced' && (
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-medium text-gray-700">View:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                      className="flex items-center gap-2"
                      data-testid="button-toggle-before-after"
                    >
                      {showBeforeAfter ? (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          Before
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          After
                        </>
                      )}
                    </Button>
                  </div>
                )}
                
                {/* Image/Video display */}
                <div className="relative bg-white dark:bg-black rounded-lg overflow-hidden mb-6">
                  {selectedItem.type === 'videos' ? (
                    <div className="relative aspect-video">
                      <img
                        src={selectedItem.src}
                        alt={selectedItem.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="text-gray-800 ml-1" size={32} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={selectedItem.type === 'enhanced' && showBeforeAfter ? selectedItem.beforeSrc : selectedItem.src}
                      alt={selectedItem.alt}
                      className="w-full max-h-96 object-contain"
                    />
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="px-3 py-1">
                      {selectedItem.subtitle}
                    </Badge>
                    {selectedItem.duration && (
                      <Badge variant="outline" className="px-3 py-1">
                        {selectedItem.duration}
                      </Badge>
                    )}
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900"
                    data-testid="button-download-item"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}