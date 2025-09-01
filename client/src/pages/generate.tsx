import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { DualMeterSystem } from "@/components/shared/dual-meter-system";
import { FileManager } from "@/components/FileManager";
import { StyleMemoryToggle } from "@/components/shared/style-memory-toggle";
import { AITaskCopilot } from "@/components/shared/ai-task-copilot";
import { AIPromptAssistant } from "@/components/shared/ai-prompt-assistant";
import { CreditCostEstimator } from "@/components/shared/credit-cost-estimator";
import { SocialExport } from "@/components/shared/social-export";
import { PillSelector } from "@/components/shared/pill-selector";
import { ArrowLeft, Info, Sparkles, Camera, Palette, Box, Paintbrush, Film, Image, Zap, Brain, Eye, Clock, Loader2, Monitor, RectangleHorizontal } from "lucide-react";
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
  const [styleMemory, setStyleMemory] = useState(false);
  const [realTimePreview, setRealTimePreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentPreview, setCurrentPreview] = useState(0);
  const [selectedResolution, setSelectedResolution] = useState("1k");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1");

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
    setIsGenerating(true);
    
    if (realTimePreview) {
      // Simulate real-time preview generation
      const mockPreviews = [
        "https://via.placeholder.com/300x300/9333ea/ffffff?text=Preview+1",
        "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Preview+2",
        "https://via.placeholder.com/300x300/6d28d9/ffffff?text=Preview+3"
      ];
      
      let previewIndex = 0;
      const interval = setInterval(() => {
        if (previewIndex < mockPreviews.length) {
          setPreviewImages(prev => [...prev, mockPreviews[previewIndex]]);
          setCurrentPreview(previewIndex);
          previewIndex++;
        } else {
          clearInterval(interval);
          setIsGenerating(false);
          toast({
            title: "Image Generated!",
            description: "Your AI image has been successfully created.",
          });
        }
      }, 1500);
    } else {
      // Regular generation without preview
      setTimeout(() => {
        setIsGenerating(false);
        toast({
          title: "Image Generated!",
          description: "Your AI image has been successfully created.",
        });
      }, 3000);
    }
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
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
        {/* Credit Balance */}
        <div className="mb-8">
          <DualMeterSystem service="text-to-image" showDetails={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Create Your Image */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Smart Features */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="border-purple-200 bg-gradient-to-r from-purple-100 to-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900">Real-time Preview</span>
                    </div>
                    <Switch 
                      checked={realTimePreview} 
                      onCheckedChange={setRealTimePreview}
                      data-testid="switch-real-time-preview"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    See evolving previews before final render
                  </p>
                  {realTimePreview && (
                    <Badge className="mt-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white text-xs">
                      Live Preview On
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>
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
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                    data-testid="input-prompt"
                  />
                  
                  {/* AI Prompt Assistant */}
                  <div className="flex justify-center">
                    <AIPromptAssistant 
                      service="text-to-image"
                      onPromptSelect={(selectedPrompt) => {
                        setPrompt(selectedPrompt);
                        toast({
                          title: "Prompt Applied",
                          description: "AI suggestion has been added to your prompt!",
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Resolution & Aspect Ratio Options */}
                <div className="mb-6 space-y-4">
                  <PillSelector
                    title="Resolution Options"
                    icon={<Monitor className="w-4 h-4 text-purple-600" />}
                    options={[
                      { id: "512px", label: "512px", value: "512px", credits: 3, description: "512×512 resolution", isAvailable: true },
                      { id: "1k", label: "1K", value: "1k", credits: 5, description: "1024×1024 resolution", isAvailable: true },
                      { id: "2k", label: "2K", value: "2k", credits: 10, description: "1536×1536 resolution", isAvailable: true },
                      { id: "4k", label: "4K", value: "4k", credits: 20, description: "2048×2048 resolution", isAvailable: false, isPremium: true, planRequired: "Growth/Business" }
                    ]}
                    selectedValue={selectedResolution}
                    onSelectionChange={setSelectedResolution}
                  />

                  <PillSelector
                    title="Aspect Ratio Options"
                    icon={<RectangleHorizontal className="w-4 h-4 text-purple-600" />}
                    options={[
                      { id: "1:1", label: "1:1", value: "1:1", credits: 0, description: "Square format", isAvailable: true },
                      { id: "16:9", label: "16:9", value: "16:9", credits: 2, description: "Widescreen format", isAvailable: true },
                      { id: "9:16", label: "9:16", value: "9:16", credits: 2, description: "Portrait format", isAvailable: true }
                    ]}
                    selectedValue={selectedAspectRatio}
                    onSelectionChange={setSelectedAspectRatio}
                  />
                </div>

                {/* Credit Cost Estimator */}
                <div className="mb-4">
                  <CreditCostEstimator 
                    service="text-to-image"
                    selectedSize={selectedSize}
                    selectedResolution={selectedResolution}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white py-3 rounded-lg font-semibold text-lg mb-8"
                  data-testid="button-generate"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Generate
                    </>
                  )}
                </Button>

                {/* Real-time Preview Section */}
                {isGenerating && realTimePreview && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Real-time Preview</h3>
                      <p className="text-sm text-gray-600">Watch your image evolve as AI creates it</p>
                    </div>
                    
                    {previewImages.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="relative">
                            <img 
                              src={previewImages[currentPreview]} 
                              alt={`Preview ${currentPreview + 1}`}
                              className="w-64 h-64 object-cover rounded-lg shadow-md"
                            />
                            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white">
                              Step {currentPreview + 1}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Refining details... {Math.min((currentPreview + 1) * 33, 100)}%
                          </span>
                          <div className="flex gap-1">
                            {previewImages.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index <= currentPreview ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <Progress value={Math.min((currentPreview + 1) * 33, 100)} className="h-2" />
                      </div>
                    )}
                  </div>
                )}

                {styleMemory && (
                  <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-purple-600">Style Memory Active</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Remembered brand colors: Purple, Blue gradients</p>
                      <p>• Preferred style: Clean, modern, professional</p>
                      <p>• Subject focus: Technology, SaaS, minimalist</p>
                    </div>
                  </div>
                )}

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
                              ? 'border-purple-600 bg-purple-50 text-purple-600'
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
                            ? 'border-purple-600 bg-purple-50 text-purple-600'
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
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-4"
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
                          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  Style Presets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stylePresets.map((preset) => (
                    <Card key={preset.id} className="border border-gray-200 hover:border-purple-600 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{preset.name}</h3>
                          <Button
                            onClick={() => usePreset(preset)}
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:bg-purple-600 text-white"
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

            {/* Style Memory Toggle */}
            <StyleMemoryToggle 
              service="text-to-image"
              onStyleApplied={(style) => {
                setPrompt(prev => prev ? `${prev} ${style.description}`.trim() : style.description);
                toast({
                  title: "Style Applied",
                  description: `Applied your saved style: ${style.name}`,
                });
              }}
            />

            {/* AI Task Copilot */}
            <AITaskCopilot 
              service="text-to-image"
              currentStep={prompt ? (selectedStyle ? 2 : 1) : 0}
              onStepComplete={(stepId) => {
                console.log('Text-to-image workflow step completed:', stepId);
              }}
            />

            {/* AI Concierge Mode */}
            <Card className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white border-0">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">AI Concierge Mode</h3>
                <p className="text-sm opacity-90 mb-4">
                  "Create a coffee shop promo package" - Let AI handle the entire workflow automatically
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white text-purple-600 hover:bg-gray-100"
                  data-testid="button-ai-concierge"
                >
                  Try AI Concierge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* File Manager Section */}
        <div className="mt-12">
          <FileManager 
            service="text-to-image" 
            title="Your Generated Images"
            className="w-full"
          />
        </div>

        {/* Bottom Section - Pro Tips */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Pro Tips</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Be specific in your descriptions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Include lighting and mood details</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Use negative prompts to avoid unwanted elements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mt-2 flex-shrink-0"></div>
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