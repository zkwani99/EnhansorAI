import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { DualMeterSystem } from "@/components/shared/dual-meter-system";
import { FileManager } from "@/components/FileManager";
import { StyleMemoryToggle } from "@/components/shared/style-memory-toggle";
import { AITaskCopilot } from "@/components/shared/ai-task-copilot";
import { AIPromptAssistant } from "@/components/shared/ai-prompt-assistant";
import { CreditCostEstimator } from "@/components/shared/credit-cost-estimator";
import { PillSelector } from "@/components/shared/pill-selector";
import { 
  ArrowLeft, 
  Play, 
  Download, 
  RotateCcw, 
  Loader2, 
  Video,
  Sparkles,
  Clock,
  Palette,
  FileVideo,
  Eye,
  Grid3x3,
  Zap,
  Monitor
} from "lucide-react";

export default function VideoPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([5]);
  const [style, setStyle] = useState("cinematic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [aiStoryboard, setAiStoryboard] = useState(true);
  const [realTimePreview, setRealTimePreview] = useState(true);
  const [storyboardFrames, setStoryboardFrames] = useState<string[]>([]);
  const [showStoryboard, setShowStoryboard] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("720p");
  const [selectedDuration, setSelectedDuration] = useState("5s");

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

  const videoStyles = [
    { value: "cinematic", label: "Cinematic", description: "Movie-like quality with professional lighting" },
    { value: "anime", label: "Anime", description: "Japanese animation style" },
    { value: "3d", label: "3D Render", description: "3D computer graphics" },
    { value: "abstract", label: "Abstract", description: "Artistic and creative interpretation" }
  ];

  // Simulate video generation API call
  const generateVideo = async () => {
    setIsGenerating(true);
    setShowResult(false);
    setStoryboardFrames([]);
    setShowStoryboard(false);
    
    try {
      if (aiStoryboard) {
        // Step 1: Generate AI Storyboard
        toast({
          title: "Creating Storyboard...",
          description: "AI is analyzing your prompt and creating scene frames.",
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockFrames = [
          "https://via.placeholder.com/400x300/9333ea/ffffff?text=Scene+1",
          "https://via.placeholder.com/400x300/7c3aed/ffffff?text=Scene+2",
          "https://via.placeholder.com/400x300/6d28d9/ffffff?text=Scene+3"
        ];
        
        setStoryboardFrames(mockFrames);
        setShowStoryboard(true);
        
        // Wait for user to see storyboard
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      if (realTimePreview && !aiStoryboard) {
        // Show real-time preview frames during generation
        toast({
          title: "Generating Preview...",
          description: "Creating real-time preview frames as video is being generated.",
        });
      }
      
      // Step 2: Generate final video
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Placeholder video URL (you can replace with actual API call later)
      const sampleVideoUrl = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
      setGeneratedVideo(sampleVideoUrl);
      setShowResult(true);
      
      toast({
        title: "Video Generated!",
        description: "Your AI video has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a text description for your video.",
        variant: "destructive",
      });
      return;
    }
    generateVideo();
  };

  const handleDownload = () => {
    if (generatedVideo) {
      const link = document.createElement('a');
      link.href = generatedVideo;
      link.download = `lorepic-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setGeneratedVideo(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-2xl">
                <Video className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              Bring Your Words to Life
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate short AI-powered video clips from text in seconds. Transform your imagination into stunning visual stories.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 or 10 second clips</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>AI-powered</span>
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
          <DualMeterSystem service="text-to-video" showDetails={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Section */}
          <div>
            {/* Smart Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Grid3x3 className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">AI Storyboard</span>
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
                    <Badge className="mt-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white text-xs">
                      Storyboard Active
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-r from-purple-100 to-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">Real-time Preview</span>
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
                    <Badge className="mt-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white text-xs">
                      Live Preview On
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>
            <Card className="bg-white dark:bg-black shadow-lg border-0 dark:shadow-gray-900/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <Video className="w-6 h-6 text-purple-600" />
                  Create Your Video
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Text Prompt */}
                  <div>
                    <Label htmlFor="prompt" className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3 block">
                      Describe your video
                    </Label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="A majestic eagle soaring through mountain clouds at sunset..."
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                      data-testid="input-video-prompt"
                      disabled={isGenerating}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Be specific about actions, objects, and visual style for best results.
                    </p>
                    
                    {/* AI Prompt Assistant */}
                    <div className="flex justify-center mt-3">
                      <AIPromptAssistant 
                        service="text-to-video"
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

                  {/* Duration Selection */}
                  <div>
                    <PillSelector
                      title="Duration Options"
                      icon={<Clock className="w-4 h-4 text-purple-600" />}
                      options={[
                        { id: "5s", label: "5s", value: "5s", credits: 10, description: "5 second video", isAvailable: true },
                        { id: "10s", label: "10s", value: "10s", credits: 20, description: "10 second video", isAvailable: true }
                      ]}
                      selectedValue={selectedDuration}
                      onSelectionChange={(value) => {
                        setSelectedDuration(value);
                        setDuration([parseInt(value)]);
                      }}
                    />
                  </div>

                  {/* Style Selection */}
                  <div>
                    <Label className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3 block">
                      Video Style
                    </Label>
                    <Select value={style} onValueChange={setStyle} disabled={isGenerating}>
                      <SelectTrigger className="w-full border-purple-300 focus:border-purple-500" data-testid="select-style">
                        <SelectValue placeholder="Choose a style" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoStyles.map((styleOption) => (
                          <SelectItem key={styleOption.value} value={styleOption.value}>
                            <div>
                              <div className="font-medium">{styleOption.label}</div>
                              <div className="text-sm text-gray-500">{styleOption.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Resolution & Duration Options */}
                  <div className="mb-6 space-y-4">
                    <PillSelector
                      title="Resolution Options"
                      icon={<Monitor className="w-4 h-4 text-purple-600" />}
                      options={[
                        { id: "480p", label: "480p", value: "480p", credits: 10, description: "5 seconds at 480p resolution", isAvailable: true },
                        { id: "720p", label: "720p (HD)", value: "720p", credits: 15, description: "5 seconds at 720p resolution", isAvailable: true },
                        { id: "1080p", label: "1080p (Full HD)", value: "1080p", credits: 20, description: "5 seconds at 1080p resolution", isAvailable: true }
                      ]}
                      selectedValue={selectedResolution}
                      onSelectionChange={setSelectedResolution}
                    />

                  </div>


                  {/* Generate Button */}
                  <Button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    data-testid="button-generate-video"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Video...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Generate Video
                      </>
                    )}
                  </Button>
                </form>

                {/* AI Storyboard Display */}
                {showStoryboard && storyboardFrames.length > 0 && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center justify-center gap-2">
                        <Grid3x3 className="w-5 h-5 text-purple-600" />
                        AI Storyboard Preview
                      </h3>
                      <p className="text-sm text-gray-600">Review the scene frames before final video generation</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {storyboardFrames.map((frame, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={frame} 
                            alt={`Storyboard frame ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg shadow-md"
                          />
                          <Badge className="absolute bottom-2 left-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white text-xs">
                            Scene {index + 1}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Storyboard looks good! Proceeding with video generation...</p>
                    </div>
                  </div>
                )}

                {/* Processing State */}
                {isGenerating && (
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mb-4">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {showStoryboard ? 'Generating final video...' : 'Creating your video...'}
                    </h3>
                    <p className="text-gray-600">
                      {aiStoryboard && !showStoryboard ? 'Analyzing prompt and creating storyboard...' : 
                       realTimePreview && !aiStoryboard ? 'Generating with real-time preview...' :
                       'This may take a few moments. Please don\'t close this page.'}
                    </p>
                    
                    <div className="mt-4 bg-gray-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <div>
            {showResult && generatedVideo ? (
              <Card className="bg-white dark:bg-black shadow-lg border-0 dark:shadow-gray-900/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    Your Generated Video
                  </h2>

                  {/* Video Player */}
                  <div className="mb-6">
                    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                      <video 
                        controls 
                        className="w-full h-auto"
                        data-testid="generated-video"
                      >
                        <source src={generatedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleDownload}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      data-testid="button-download-video"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Video
                    </Button>
                    
                    <Button
                      onClick={handleTryAgain}
                      variant="outline"
                      className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
                      data-testid="button-try-again"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </div>

                  {/* Video Info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-2 font-medium">{duration[0]}s</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Style:</span>
                        <span className="ml-2 font-medium capitalize">{style}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : !isGenerating ? (
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Ready to Create</h3>
                  <p className="text-gray-600">
                    Enter your text prompt and click generate to create your AI video.
                  </p>
                </CardContent>
              </Card>
            ) : null}

            {/* Style Memory Toggle */}
            <StyleMemoryToggle 
              service="text-to-video"
              onStyleApplied={(style) => {
                setPrompt(prev => `${prev} ${style.description}`.trim());
                toast({
                  title: "Style Applied",
                  description: `Applied your saved style: ${style.name}`,
                });
              }}
              className="mt-6"
            />

            {/* AI Task Copilot */}
            <AITaskCopilot 
              service="text-to-video"
              currentStep={prompt ? (showStoryboard ? 2 : 1) : 0}
              onStepComplete={(stepId) => {
                console.log('Video workflow step completed:', stepId);
              }}
              className="mt-6"
            />

            {/* AI Concierge Mode */}
            <Card className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
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
        </div>

        {/* File Manager Section */}
        <div className="mt-12">
          <FileManager 
            service="text-to-video" 
            title="Your Generated Videos"
            className="w-full"
          />
        </div>

        {/* Tips Section */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pro Tips for Better Videos</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Describe specific actions and movements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Include camera angles and lighting details</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Keep prompts concise but descriptive</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Experiment with different styles for varied results</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}