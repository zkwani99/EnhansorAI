import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Upload, Play, Download, Share, Lightbulb, Clock, Monitor, Palette, Grid3x3, Eye, Sparkles, Film, Scissors } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { DualMeterSystem } from "@/components/shared/dual-meter-system";
import { FileManager } from "@/components/FileManager";
import { VideoStitchingModal } from "@/components/VideoStitchingModal";
import { StyleMemoryToggle } from "@/components/shared/style-memory-toggle";
import { AITaskCopilot } from "@/components/shared/ai-task-copilot";
import { AIPromptAssistant } from "@/components/shared/ai-prompt-assistant";
import { CreditCostEstimator } from "@/components/shared/credit-cost-estimator";
import { PillSelector } from "@/components/shared/pill-selector";

export default function ImageToVideoPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [selectedResolution, setSelectedResolution] = useState("720p");
  const [style, setStyle] = useState("cinematic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [aiStoryboard, setAiStoryboard] = useState(true);
  const [realTimePreview, setRealTimePreview] = useState(true);
  const [showStitchingModal, setShowStitchingModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToGenerator = () => {
    const element = document.getElementById('generator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      toast({
        title: "Image required",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to generate videos",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      setGeneratedVideo("/placeholder-video.mp4");
      setIsGenerating(false);
      toast({
        title: "Video generated successfully!",
        description: "Your AI video is ready to download",
      });
    }, 5000);
  };

  const recentVideos = [
    { id: 1, thumbnail: "/placeholder-thumbnail1.jpg", title: "Product Demo" },
    { id: 2, thumbnail: "/placeholder-thumbnail2.jpg", title: "Cinematic Scene" },
    { id: 3, thumbnail: "/placeholder-thumbnail3.jpg", title: "Animation Test" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
        <Navigation />
        {/* Hero Section for logged out users */}
        <section className="relative bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Turn Images Into <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">Stunning AI Videos</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload your image and bring it to life with cinematic AI motion — product ads, reels, animations, and more.
            </p>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/api/login'}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-testid="button-start-creating"
            >
              Sign In to Start Creating
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 dark:from-black dark:to-black transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-black dark:via-black dark:to-black border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()} data-testid="button-back">
              <Upload className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-xl">
                <Film className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Turn Images Into Motion
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Upload an image and transform it into stunning AI-powered video clips. Perfect for product demos, social media, and creative projects.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>3-8 second clips</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>AI-powered motion</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                <span>Multiple styles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Credit Balance */}
        <div className="mb-8">
          <DualMeterSystem service="image-to-video" showDetails={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Section */}
          <div>
            {/* Smart Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="border-purple-200 dark:border-purple-600 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-black dark:to-black">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Grid3x3 className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">AI Storyboard</span>
                    </div>
                    <Switch 
                      checked={aiStoryboard} 
                      onCheckedChange={setAiStoryboard}
                      data-testid="switch-ai-storyboard"
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Preview scene frames before generation
                  </p>
                  {aiStoryboard && (
                    <Badge className="mt-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white text-xs">
                      Storyboard Active
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="border-purple-200 dark:border-purple-600 bg-gradient-to-r from-purple-100 to-purple-50 dark:from-black dark:to-black">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Real-time Preview</span>
                    </div>
                    <Switch 
                      checked={realTimePreview} 
                      onCheckedChange={setRealTimePreview}
                      data-testid="switch-real-time-preview"
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Watch clips evolve during generation
                  </p>
                  {realTimePreview && (
                    <Badge className="mt-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white text-xs">
                      Live Preview On
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Form */}
            <Card className="shadow-lg bg-white dark:bg-black border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Create Your Video</h3>
              
              <div className="space-y-8">
                {/* Image Upload */}
                <div>
                  <Label className="text-lg font-semibold text-gray-900 mb-4 block">Upload Image</Label>
                  <div
                    className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="upload-area"
                  >
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img src={uploadedImage} alt="Uploaded" className="max-h-64 mx-auto rounded-lg shadow-md" />
                        <p className="text-green-600 font-medium">Image uploaded successfully!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-purple-400" />
                        <div>
                          <p className="text-lg font-medium text-gray-900">Drop your image here or click to browse</p>
                          <p className="text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    data-testid="input-file-upload"
                  />
                </div>

                {/* Optional Prompt */}
                <div>
                  <Label htmlFor="prompt" className="text-lg font-semibold text-gray-900 mb-4 block">
                    Optional Prompt
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="e.g., Zoom out on product, cinematic lighting"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-24 resize-none border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    data-testid="textarea-prompt"
                  />
                  
                  {/* AI Prompt Assistant */}
                  <div className="flex justify-center mt-3">
                    <AIPromptAssistant 
                      service="image-to-video"
                      onPromptSelect={(selectedPrompt) => {
                        setPrompt(selectedPrompt);
                        toast({
                          title: "Prompt Applied",
                          description: "AI suggestion has been added to your video prompt!",
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Duration Selector */}
                <div>
                  <PillSelector
                    title="Duration Options"
                    icon={<Clock className="w-4 h-4 text-purple-600" />}
                    options={[
                      { id: "5s", label: "Short Clip (Up to 5s)", value: "5s", credits: 15, description: "Up to 5s, up to 720p resolution", isAvailable: true },
                      { id: "8s", label: "Short Clip (Up to 8s)", value: "8s", credits: 20, description: "Up to 8s, up to 1080p resolution", isAvailable: true }
                    ]}
                    selectedValue={`${selectedDuration}s`}
                    onSelectionChange={(value) => setSelectedDuration(parseInt(value))}
                  />
                </div>

                {/* Resolution Options */}
                <div>
                  <PillSelector
                    title="Resolution Options"
                    icon={<Monitor className="w-4 h-4 text-purple-600" />}
                    options={[
                      { id: "720p", label: "720p (HD)", value: "720p", credits: 15, description: "720p HD resolution", isAvailable: true },
                      { id: "1080p", label: "1080p (Full HD)", value: "1080p", credits: 20, description: "1080p Full HD resolution", isAvailable: true }
                    ]}
                    selectedValue={selectedResolution}
                    onSelectionChange={setSelectedResolution}
                  />
                </div>

                {/* Style Selection */}
                <div>
                  <PillSelector
                    title="Style Options"
                    icon={<Palette className="w-4 h-4 text-purple-600" />}
                    options={[
                      { id: "cinematic", label: "Cinematic", value: "cinematic", credits: 0, description: "Movie-like quality with professional lighting", isAvailable: true },
                      { id: "product-ad", label: "Product Ad", value: "product-ad", credits: 0, description: "Perfect for product showcases", isAvailable: true },
                      { id: "reel", label: "Reel", value: "reel", credits: 0, description: "Social media optimized style", isAvailable: true },
                      { id: "realistic", label: "Realistic", value: "realistic", credits: 0, description: "Natural, photorealistic rendering", isAvailable: true }
                    ]}
                    selectedValue={style}
                    onSelectionChange={setStyle}
                  />
                </div>



                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !uploadedImage}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:bg-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-generate-video"
                >
                  {isGenerating ? "Generating your video..." : "Generate Video"}
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
          
          {/* Features Section */}
          <div className="space-y-6">
            {/* Preview Results */}
            {(isGenerating || generatedVideo) && (
              <Card className="shadow-lg border-purple-200">
                <CardContent className="p-6 text-center">
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                      <h3 className="text-lg font-semibold text-gray-900">Generating...</h3>
                      <p className="text-gray-600 text-sm">Please wait while we create your video</p>
                    </div>
                  ) : generatedVideo && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900">Video Ready!</h3>
                      <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-center h-32">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" data-testid="button-download">
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" data-testid="button-share">
                          <Share className="mr-1 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Style Memory Toggle */}
            <StyleMemoryToggle 
              service="image-to-video"
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
              service="image-to-video"
              currentStep={uploadedImage ? (prompt ? 2 : 1) : 0}
              onStepComplete={(stepId) => {
                console.log('Image-to-video workflow step completed:', stepId);
              }}
            />
            
            {/* Stitched Video Feature */}
            <Card className="shadow-lg bg-purple-600 dark:bg-black text-white border-0 dark:border dark:border-purple-600">
              <CardContent className="p-6 text-center">
                <Film className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 dark:text-white">Create Stitched Videos</h3>
                <p className="text-sm opacity-90 dark:text-gray-300 mb-4 leading-relaxed">
                  Combine multiple video clips into one seamless video. Perfect for storytelling, product showcases, and creative compilations.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Scissors className="w-4 h-4" />
                    <span>Drag & drop to reorder clips</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Up to 3 minutes total duration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Play className="w-4 h-4" />
                    <span>Professional MP4 output</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowStitchingModal(true)}
                  variant="secondary" 
                  className="w-full bg-white dark:bg-purple-600 text-purple-600 dark:text-white hover:bg-gray-100 dark:hover:bg-purple-700 font-semibold py-3"
                  data-testid="button-open-stitching-sidebar"
                >
                  <Film className="mr-2 h-5 w-5" />
                  Open Video Stitcher
                </Button>
              </CardContent>
            </Card>
            
            {/* Pro Tips */}
            <Card className="shadow-lg bg-purple-50 dark:bg-black border-purple-200 dark:border-purple-600">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pro Tips for Better Results</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Keep prompts short & descriptive for best results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Try cinematic or product mode for smooth, professional motion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Higher resolution uses more credits but gives better quality</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


      {/* File Manager Section */}
      {isAuthenticated && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Generated Videos</h2>
              <p className="text-gray-600">Manage your video files and download your creations.</p>
            </div>
            <FileManager 
              service="image-to-video" 
              title=""
              className="w-full"
            />
          </div>
        </section>
      )}


      <Footer />
      
      {/* Video Stitching Modal */}
      <VideoStitchingModal 
        isOpen={showStitchingModal}
        onClose={() => setShowStitchingModal(false)}
      />
    </div>
  );
}