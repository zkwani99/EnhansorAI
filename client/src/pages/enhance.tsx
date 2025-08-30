import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import CreditBalance from "@/components/shared/credit-balance";
import { FileManager } from "@/components/FileManager";
import { 
  ArrowLeft, 
  Upload, 
  Settings, 
  Sparkles, 
  Clock, 
  Users, 
  Zap,
  FileImage,
  RotateCcw,
  Download,
  Loader2
} from "lucide-react";

export default function EnhancePage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [sharpen, setSharpen] = useState(true);
  const [smartRestore, setSmartRestore] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [intensityLevel, setIntensityLevel] = useState("balanced");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
    if (files.length > 1) {
      setBatchMode(true);
    }
  };

  const handleEnhancement = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Enhancement Complete!",
        description: `Successfully enhanced ${uploadedFiles.length} image${uploadedFiles.length > 1 ? 's' : ''}.`,
      });
    }, 3000);
  };

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
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-purple rounded-2xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              AI Image Enhancement
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your photos with advanced AI-powered enhancement and restoration tools
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Credit Balance */}
        <div className="mb-8">
          <CreditBalance showDetails={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Smart Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-purple" />
                      <span className="font-medium text-gray-900">Smart Restore</span>
                    </div>
                    <Switch 
                      checked={smartRestore} 
                      onCheckedChange={setSmartRestore}
                      data-testid="switch-smart-restore"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    AI-powered restoration for old, scratched, or blurred photos
                  </p>
                  {smartRestore && (
                    <Badge className="mt-2 bg-primary-purple text-white text-xs">
                      Active
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary-purple" />
                      <span className="font-medium text-gray-900">Batch Processing</span>
                    </div>
                    <Switch 
                      checked={batchMode} 
                      onCheckedChange={setBatchMode}
                      data-testid="switch-batch-mode"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Upload and enhance multiple images simultaneously
                  </p>
                  {batchMode && (
                    <Badge className="mt-2 bg-blue-600 text-white text-xs">
                      {uploadedFiles.length} files ready
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary-purple" />
                  Upload Images
                  {batchMode && <Badge variant="outline">Batch Mode</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-purple transition-colors cursor-pointer"
                  data-testid="upload-dropzone"
                >
                  <div className="mb-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium mb-2">
                    {batchMode ? 'Drop multiple images here or click to select' : 'Drag & drop an image here, or click to select'}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Supports JPG, PNG, GIF, WebP • {batchMode ? 'Up to 20 files at once' : 'Single file upload'}
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Uploaded Files ({uploadedFiles.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <FileImage className="w-4 h-4 text-primary-purple" />
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 flex gap-3">
                    <Button
                      onClick={handleEnhancement}
                      disabled={isProcessing}
                      className="flex-1 bg-gradient-to-r from-primary-purple to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                      data-testid="button-enhance-images"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Enhance {batchMode ? 'All Images' : 'Image'}
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setUploadedFiles([])}>
                      Clear
                    </Button>
                  </div>
                )}

                {isProcessing && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {smartRestore ? 'Smart restoration in progress...' : 'Enhancing images...'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 100)}% complete
                      </span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhancement Settings */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary-purple" />
                  Enhancement Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Auto Enhance */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Auto Enhance</span>
                    <Switch 
                      checked={autoEnhance} 
                      onCheckedChange={setAutoEnhance}
                      data-testid="switch-auto-enhance"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Automatically apply optimal enhancements
                  </p>
                </div>

                {/* Enhancement Intensity */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Enhancement Intensity</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={intensityLevel === "subtle" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIntensityLevel("subtle")}
                      className={intensityLevel === "subtle" ? "bg-primary-purple hover:bg-purple-600" : ""}
                      data-testid="button-intensity-subtle"
                    >
                      Subtle
                    </Button>
                    <Button
                      variant={intensityLevel === "balanced" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIntensityLevel("balanced")}
                      className={intensityLevel === "balanced" ? "bg-primary-purple hover:bg-purple-600" : ""}
                      data-testid="button-intensity-balanced"
                    >
                      Balanced
                    </Button>
                    <Button
                      variant={intensityLevel === "maximum" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIntensityLevel("maximum")}
                      className={intensityLevel === "maximum" ? "bg-primary-purple hover:bg-purple-600" : ""}
                      data-testid="button-intensity-maximum"
                    >
                      Maximum
                    </Button>
                  </div>
                </div>

                {/* Enhancement Types */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Enhancement Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">AI Upscaling</p>
                        <p className="text-sm text-gray-500">Increase resolution with AI</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Included
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Sharpen</p>
                        <p className="text-sm text-gray-500">Clarity boost</p>
                      </div>
                      <Switch 
                        checked={sharpen} 
                        onCheckedChange={setSharpen}
                        data-testid="switch-sharpen"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Denoise</p>
                        <p className="text-sm text-gray-500">Noise removal</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Auto
                      </Badge>
                    </div>

                    {smartRestore && (
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <RotateCcw className="w-4 h-4 text-primary-purple" />
                          <span className="font-medium text-primary-purple">Smart Restore Active</span>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Scratch and tear repair</li>
                          <li>• Color correction for faded photos</li>
                          <li>• Blur reduction and focus enhancement</li>
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Background Remover</p>
                        <p className="text-sm text-gray-500">Replace/remove background</p>
                      </div>
                      <Badge variant="outline">Optional</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Face Retouch</p>
                        <p className="text-sm text-gray-500">Skin smoothing, details</p>
                      </div>
                      <Badge variant="outline">Optional</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Concierge Mode */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">AI Concierge Mode</h3>
                <p className="text-sm opacity-90 mb-4">
                  Let AI handle your entire workflow: enhance, generate, and create videos automatically
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

            {/* File Manager Section */}
            <FileManager 
              service="image-enhancement" 
              title="Your Enhanced Images"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}