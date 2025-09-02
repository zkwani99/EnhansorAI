import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Image as ImageIcon, Video, Sparkles, Zap, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export default function TemplatesSection() {
  const [filterType, setFilterType] = useState("all");

  const templates = [
    {
      id: 1,
      title: "Realistic Landscape Generator",
      description: "Create stunning photorealistic landscapes with natural lighting and atmospheric effects.",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Image Gen", "HD", "Nature", "Realistic"],
      category: "Photography"
    },
    {
      id: 2,
      title: "Portrait Enhancement Pro",
      description: "Transform portraits with professional retouching, skin smoothing, and lighting correction.",
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "enhancement",
      tags: ["Enhancement", "Portrait", "Professional", "Retouching"],
      category: "Photography"
    },
    {
      id: 3,
      title: "Abstract Art Creator",
      description: "Generate unique abstract artworks with vibrant colors and dynamic compositions.",
      thumbnail: "https://images.unsplash.com/photo-1617791160588-241658c0f566?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Abstract", "Art", "Creative", "Vibrant"],
      category: "Art & Design"
    },
    {
      id: 4,
      title: "Cinematic Video Scenes",
      description: "Create movie-quality video sequences with dramatic lighting and camera movements.",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "video",
      tags: ["Video", "Cinematic", "HD", "Professional"],
      category: "Film & Video"
    },
    {
      id: 5,
      title: "Product Photography Studio",
      description: "Perfect product shots with studio lighting, shadow removal, and background replacement.",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "enhancement",
      tags: ["Product", "Studio", "E-commerce", "Professional"],
      category: "Business"
    },
    {
      id: 6,
      title: "Fantasy Character Generator",
      description: "Design epic fantasy characters with detailed armor, magical effects, and mythical creatures.",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Fantasy", "Character", "Gaming", "Creative"],
      category: "Gaming & Entertainment"
    },
    {
      id: 7,
      title: "Architecture Visualizer",
      description: "Transform architectural plans into photorealistic 3D renderings with perfect lighting.",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Architecture", "3D", "Realistic", "Design"],
      category: "Architecture"
    },
    {
      id: 8,
      title: "Social Media Content Pack",
      description: "Generate engaging social media visuals optimized for different platforms and formats.",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      type: "image",
      tags: ["Social Media", "Marketing", "Branding", "Templates"],
      category: "Marketing"
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
    return "bg-purple-100 text-purple-700";
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-64 h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Templates Library
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Jumpstart your creativity with ready-to-use templates for different AI workflows. 
            Perfect starting points for your next project.
          </p>
          
          {/* Filter dropdown */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by type:</span>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 border-purple-200 focus:border-purple-400 focus:ring-purple-200">
                <SelectValue placeholder="Select template type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Templates</SelectItem>
                <SelectItem value="image">Image Generation</SelectItem>
                <SelectItem value="video">Video Creation</SelectItem>
                <SelectItem value="enhancement">Image Enhancement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {getFilteredTemplates().map((template) => (
            <Card
              key={template.id}
              className="group relative overflow-hidden bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:ring-2 hover:ring-purple-200"
              data-testid={`template-card-${template.id}`}
            >
              <div className="relative">
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Preview button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    className="bg-white/90 text-gray-900 dark:text-white hover:bg-white"
                    data-testid={`button-preview-template-${template.id}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>

                {/* Type badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={`flex items-center gap-1 ${getTypeColor(template.type)}`}>
                    {getTypeIcon(template.type)}
                    {template.type === "enhancement" ? "Enhance" : template.type}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-700 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Category and Use Template button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    {template.category}
                  </span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white shadow-md hover:shadow-lg"
                    data-testid={`button-use-template-${template.id}`}
                  >
                    Use Template
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Templates Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 text-purple-700 border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-800 transition-all duration-200"
            data-testid="button-view-all-templates"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
}