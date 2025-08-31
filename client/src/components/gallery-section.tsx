import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("enhanced");

  const filterButtons = [
    { id: "enhanced", label: "Enhanced Images", color: "bg-primary-blue" },
    { id: "generated", label: "AI Generated", color: "bg-primary-purple" },
    { id: "videos", label: "AI Videos", color: "bg-primary-orange" },
    { id: "all", label: "All", color: "bg-gray-400" },
  ];

  const enhancedImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Enhanced vintage portrait photo comparison",
      title: "Portrait Enhancement",
      subtitle: "Before → After"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Enhanced mountain landscape photo",
      title: "Landscape Enhancement",
      subtitle: "8K Upscaling"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Enhanced product photography",
      title: "Product Enhancement",
      subtitle: "Commercial Ready"
    }
  ];

  const generatedImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "AI generated abstract digital art",
      title: "Abstract Digital Art",
      subtitle: "AI Generated"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "AI generated fantasy landscape artwork",
      title: "Fantasy Landscape",
      subtitle: "Magical Scene"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "AI generated futuristic cityscape",
      title: "Futuristic Cityscape",
      subtitle: "Text-to-Image AI"
    }
  ];

  const videoThumbnails = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated ocean waves video thumbnail",
      title: "Ocean Waves",
      duration: "4K • 30s"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated city timelapse video thumbnail",
      title: "City Timelapse",
      duration: "4K • 45s"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated abstract motion video thumbnail",
      title: "Abstract Motion",
      duration: "HD • 20s"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
      alt: "AI generated nature forest scene video thumbnail",
      title: "Forest Scene",
      duration: "4K • 60s"
    }
  ];

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const getActiveButtonColor = (buttonId: string) => {
    if (activeFilter === buttonId) {
      const button = filterButtons.find(b => b.id === buttonId);
      return button?.color || "bg-gray-400";
    }
    return "bg-gray-200 text-gray-700 hover:bg-gray-300";
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Gallery Showcase
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore stunning examples of our AI-powered transformations across all service categories
          </p>
        </div>
        
        {/* Gallery Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterButtons.map((button) => (
            <Button
              key={button.id}
              onClick={() => handleFilterChange(button.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeFilter === button.id
                  ? "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 hover:text-white"
              }`}
              data-testid={`button-filter-${button.id}`}
            >
              {button.label}
            </Button>
          ))}
        </div>
        
        {/* Enhanced Images Grid */}
        {(activeFilter === "enhanced" || activeFilter === "all") && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Enhanced Images - Before & After</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enhancedImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:ring-2 hover:ring-purple-300"
                  data-testid={`card-enhanced-image-${image.id}`}
                >
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-sm font-medium">{image.title}</div>
                      <div className="text-xs text-gray-200">{image.subtitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* AI Generated Images Grid */}
        {(activeFilter === "generated" || activeFilter === "all") && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">AI Generated Artwork</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:ring-2 hover:ring-purple-300"
                  data-testid={`card-generated-image-${image.id}`}
                >
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-sm font-medium">{image.title}</div>
                      <div className="text-xs text-gray-200">{image.subtitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* AI Video Thumbnails */}
        {(activeFilter === "videos" || activeFilter === "all") && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">AI Generated Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoThumbnails.map((video) => (
                <div
                  key={video.id}
                  className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:ring-2 hover:ring-purple-300"
                  data-testid={`card-video-${video.id}`}
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={video.src}
                      alt={video.alt}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="text-white ml-1" size={24} />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-medium">{video.title}</div>
                      <div className="text-xs text-gray-200">{video.duration}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
