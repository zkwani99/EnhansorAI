import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Info, Sparkles, Camera, Palette, Box, Paintbrush, Film, Image, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function GeneratePage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("realistic");
  const [selectedSize, setSelectedSize] = useState("square");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState("");

  const aiStyles = [
    { id: "realistic", name: "Realistic", description: "Photographic quality", icon: Camera },
    { id: "anime", name: "Anime", description: "Japanese animation style", icon: Sparkles },
    { id: "digital", name: "Digital Art", description: "Modern digital artwork", icon: Palette },
    { id: "3d", name: "3D Render", description: "3D computer graphics", icon: Box },
    { id: "painting", name: "Painting", description: "Traditional art style", icon: Paintbrush },
    { id: "cinematic", name: "Cinematic", description: "Movie-like quality", icon: Film },
    { id: "photographic", name: "Photographic", description: "Professional photography", icon: Camera },
    { id: "artistic", name: "Artistic", description: "Creative interpretation", icon: Image }
  ];

  const imageSizes = [
    { id: "square", name: "Square (1:1)", dimensions: "1024×1024" },
    { id: "portrait", name: "Portrait (3:4)", dimensions: "768×1024" },
    { id: "landscape", name: "Landscape (4:3)", dimensions: "1024×768" }
  ];

  const stylePresets = [
    {
      id: "fantasy",
      name: "Fantasy Landscape",
      description: "Mystical fantasy landscape with magical elements",
      prompt: "mystical fantasy landscape with floating islands, magical forests, and ethereal lighting"
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk City",
      description: "Futuristic neon city with cyberpunk aesthetics",
      prompt: "futuristic cyberpunk city at night with neon lights, flying cars, and towering skyscrapers"
    },
    {
      id: "abstract",
      name: "Abstract Art",
      description: "Colorful abstract patterns and forms",
      prompt: "vibrant abstract art with flowing colors, geometric patterns, and dynamic composition"
    },
    {
      id: "portrait",
      name: "Portrait",
      description: "Professional portrait photography",
      prompt: "professional portrait of a person with dramatic lighting and elegant composition"
    },
    {
      id: "space",
      name: "Space Scene",
      description: "Epic space scenes with planets and stars",
      prompt: "epic space scene with distant planets, nebula clouds, and starry cosmic background"
    },
    {
      id: "nature",
      name: "Nature Scene",
      description: "Serene natural landscapes",
      prompt: "serene natural landscape with mountains, flowing river, and peaceful forest"
    }
  ];

  const handleGenerate = () => {
    console.log("Generating image with:", { prompt, selectedStyle, selectedSize, negativePrompt });
    // This would connect to actual AI image generation API
  };

  const usePreset = (preset: any) => {
    setPrompt(preset.prompt);
  };

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              AI Text-to-Image Generation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Describe an image you'd like to generate and explore different AI styles
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Create Your Image */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Image</h2>
                
                {/* Prompt Input */}
                <div className="space-y-4 mb-8">
                  <label className="block text-sm font-medium text-gray-700">
                    Describe the image you want to generate
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                    data-testid="input-prompt"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  className="w-full bg-gradient-to-r from-primary-purple to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold text-lg mb-8"
                  data-testid="button-generate"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Generate
                </Button>

                {/* AI Style Options */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Style</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {aiStyles.map((style) => {
                      const IconComponent = style.icon;
                      return (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            selectedStyle === style.id
                              ? 'border-primary-purple bg-purple-50 text-primary-purple'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                          data-testid={`style-${style.id}`}
                        >
                          <IconComponent className="w-6 h-6 mx-auto mb-2" />
                          <div className="text-sm font-medium">{style.name}</div>
                          <div className="text-xs text-gray-500">{style.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Image Size Options */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {imageSizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedSize === size.id
                            ? 'border-primary-purple bg-purple-50 text-primary-purple'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        data-testid={`size-${size.id}`}
                      >
                        <div className="font-medium">{size.name}</div>
                        <div className="text-sm text-gray-500">{size.dimensions}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-primary-purple hover:text-purple-700 font-medium mb-4"
                    data-testid="toggle-advanced"
                  >
                    <Info className="w-4 h-4" />
                    Advanced Options
                  </button>
                  
                  {showAdvanced && (
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Negative Prompt (what to avoid)
                        </label>
                        <textarea
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                          placeholder="Describe what you don't want in the image..."
                          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                          data-testid="input-negative-prompt"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Style Presets */}
          <div className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Style Presets</h2>
                <div className="space-y-4">
                  {stylePresets.map((preset) => (
                    <Card key={preset.id} className="border border-gray-200 hover:border-primary-purple transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{preset.name}</h3>
                          <Button
                            onClick={() => usePreset(preset)}
                            size="sm"
                            className="bg-primary-purple hover:bg-purple-600 text-white"
                            data-testid={`preset-${preset.id}`}
                          >
                            Use This
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">{preset.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Pro Tips */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-purple rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Pro Tips</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-purple rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Be specific in your descriptions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-purple rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Include lighting and mood details</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-purple rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Use negative prompts to avoid unwanted elements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-purple rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Try different styles for varied results</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}