import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Image as ImageIcon, Sparkles, Video, FolderOpen, Download, ToggleLeft, ToggleRight, X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("enhanced");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

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
      duration: undefined
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
      duration: undefined
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
      duration: undefined
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
      duration: undefined
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
      duration: undefined
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
      duration: undefined
    }
  ];

  const videoThumbnails = [
    {
      id: 7,
      type: "videos",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated ocean waves video thumbnail",
      title: "Ocean Waves",
      subtitle: "Ocean Simulation",
      duration: "4K • 30s",
      tool: "AI Video Generator",
      height: "h-72"
    },
    {
      id: 8,
      type: "videos",
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated city timelapse video thumbnail",
      title: "City Timelapse",
      subtitle: "Urban Movement",
      duration: "4K • 45s",
      tool: "AI Video Generator",
      height: "h-64"
    },
    {
      id: 9,
      type: "videos",
      src: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated abstract motion video thumbnail",
      title: "Abstract Motion",
      subtitle: "Digital Art",
      duration: "HD • 20s",
      tool: "AI Video Generator",
      height: "h-80"
    },
    {
      id: 10,
      type: "videos",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated nature forest scene video thumbnail",
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
      <section id="gallery" className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-purple-50 dark:from-black dark:via-black dark:to-black relative transition-colors duration-300">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Gallery Showcase
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore stunning examples of our AI-powered transformations across all service categories
            </p>
          </div>
          
          {/* Stylish pill tabs with icons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filterButtons.map((button) => {
              const IconComponent = button.icon;
              const isActive = activeFilter === button.id;
              return (
                <Button
                  key={button.id}
                  onClick={() => handleFilterChange(button.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${button.color} text-white border-transparent shadow-lg`
                      : "bg-white/80 dark:bg-black backdrop-blur-sm text-gray-700 dark:text-gray-200 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                  data-testid={`button-filter-${button.id}`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {button.label}
                </Button>
              );
            })}
          </div>
          
          {/* Masonry Gallery Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {getFilteredItems().map((item) => (
              <div
                key={item.id}
                className={`group relative bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer break-inside-avoid mb-6 ${item.height}`}
                onClick={() => openModal(item)}
                data-testid={`card-gallery-item-${item.id}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Video play button */}
                  {item.type === 'videos' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                        <Play className="text-white ml-1" size={24} />
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
                    {item.duration && (
                      <Badge className="bg-white/20 text-white text-xs">
                        {item.duration}
                      </Badge>
                    )}
                    {item.type === 'enhanced' && (
                      <Badge className="bg-purple-600/80 text-white text-xs">
                        Before/After
                      </Badge>
                    )}
                  </div>
                  
                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-400/0 group-hover:ring-purple-400/50 transition-all duration-300"></div>
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