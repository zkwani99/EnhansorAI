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
import { Upload, Play, Download, Share, Lightbulb, Clock, Monitor, Palette, Grid3x3, Eye, Sparkles } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CreditBalance from "@/components/shared/credit-balance";

export default function ImageToVideoPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([5]);
  const [resolution, setResolution] = useState("720p");
  const [style, setStyle] = useState("cinematic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [aiStoryboard, setAiStoryboard] = useState(true);
  const [realTimePreview, setRealTimePreview] = useState(true);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Turn Images Into <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Stunning AI Videos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your image and bring it to life with cinematic AI motion — product ads, reels, animations, and more.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToGenerator}
            className="bg-primary-purple hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            data-testid="button-start-creating"
          >
            Start Creating
          </Button>
        </div>
      </section>

      {/* Credits Section */}
      {isAuthenticated && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <CreditBalance showDetails={true} />
          </div>
        </section>
      )}

      {/* AI Features Section */}
      {isAuthenticated && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* AI Storyboard Toggle */}
              <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Grid3x3 className="w-5 h-5 text-primary-purple" />
                      <span className="font-medium text-gray-900">AI Storyboard</span>
                    </div>
                    <Switch 
                      checked={aiStoryboard} 
                      onCheckedChange={setAiStoryboard}
                      data-testid="switch-ai-storyboard"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Preview scene frames before final video generation
                  </p>
                  {aiStoryboard && (
                    <Badge className="mt-2 bg-primary-purple text-white text-xs">
                      Storyboard Active
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {/* Real-time Preview Toggle */}
              <Card className="border-purple-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary-purple" />
                      <span className="font-medium text-gray-900">Real-time Preview</span>
                    </div>
                    <Switch 
                      checked={realTimePreview} 
                      onCheckedChange={setRealTimePreview}
                      data-testid="switch-real-time-preview"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Watch video clips evolve during generation
                  </p>
                  {realTimePreview && (
                    <Badge className="mt-2 bg-blue-600 text-white text-xs">
                      Live Preview On
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Concierge Mode Card */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">AI Concierge Mode</h3>
                <p className="text-sm opacity-90 mb-4">
                  "Create a travel vlog intro" - Let AI handle your entire video workflow automatically
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
        </section>
      )}

      {/* Generation Flow */}
      <section id="generator" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Generate Your AI Video</h2>
              
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
                </div>

                {/* Duration Selector */}
                <div>
                  <Label className="text-lg font-semibold text-gray-900 mb-4 block flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Duration: {duration[0]}s
                  </Label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    max={10}
                    min={2}
                    step={1}
                    className="w-full"
                    data-testid="slider-duration"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>2s</span>
                    <span>5s</span>
                    <span>10s</span>
                  </div>
                </div>

                {/* Resolution Options */}
                <div>
                  <Label className="text-lg font-semibold text-gray-900 mb-4 block flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Resolution
                  </Label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger className="w-full" data-testid="select-resolution">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="480p">480p (Standard)</SelectItem>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Style Dropdown */}
                <div>
                  <Label className="text-lg font-semibold text-gray-900 mb-4 block flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Style
                  </Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="w-full" data-testid="select-style">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="product-ad">Product Ad</SelectItem>
                      <SelectItem value="reel">Reel</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="realistic">Realistic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !uploadedImage}
                  className="w-full bg-primary-purple hover:bg-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-generate-video"
                >
                  {isGenerating ? "Generating your video..." : "Generate Video"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Preview & Results */}
      {(isGenerating || generatedVideo) && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl border-0 bg-white">
              <CardContent className="p-8 text-center">
                {isGenerating ? (
                  <div className="space-y-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
                    <h3 className="text-xl font-semibold text-gray-900">Generating your video...</h3>
                    <p className="text-gray-600">This may take a few moments. Please don't close this page.</p>
                  </div>
                ) : generatedVideo && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Your Video is Ready!</h3>
                    <div className="bg-gray-900 rounded-xl p-8 max-w-2xl mx-auto">
                      <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-center h-64">
                        <Play className="h-16 w-16 text-white" />
                        <p className="text-white ml-4">Video Preview Player</p>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                        data-testid="button-download"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-semibold"
                        data-testid="button-share"
                      >
                        <Share className="mr-2 h-5 w-5" />
                        Share
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Recent Creations */}
      {isAuthenticated && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Recent Creations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {recentVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
                      <Play className="h-8 w-8 text-gray-500" />
                    </div>
                    <p className="font-medium text-gray-900">{video.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tips Box */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-purple-200 bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Lightbulb className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pro Tips for Better Results</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></span>
                      <span>Keep prompts short & descriptive for best results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></span>
                      <span>Try cinematic or product mode for smooth, professional motion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></span>
                      <span>Higher resolution uses more credits but gives better quality</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}