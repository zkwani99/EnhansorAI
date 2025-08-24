import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Upload, Settings } from "lucide-react";

export default function EnhancePage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [sharpen, setSharpen] = useState(true);
  const [intensityLevel, setIntensityLevel] = useState("balanced");

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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(258,90%,66%)] mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mb-4 text-gray-600 hover:text-gray-900"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <span className="text-blue-500">✨</span>
              AI Image Enhancement
            </h1>
            <p className="text-gray-600 text-lg">
              Transform your photos with advanced AI-powered enhancement tools
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Upload Images</h2>
                </div>
                
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  data-testid="upload-dropzone"
                >
                  <div className="mb-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium mb-2">
                    Drag & drop images here, or click to select
                  </p>
                  <p className="text-gray-500 text-sm">
                    Supports JPG, PNG, GIF, WebP • Multiple files allowed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhancement Settings */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Enhancement Settings</h2>
                </div>

                {/* Auto Enhance */}
                <div className="mb-6">
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
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Enhancement Intensity</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={intensityLevel === "subtle" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIntensityLevel("subtle")}
                      className={intensityLevel === "subtle" ? "bg-gray-600" : ""}
                      data-testid="button-intensity-subtle"
                    >
                      Subtle
                    </Button>
                    <Button
                      variant={intensityLevel === "balanced" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIntensityLevel("balanced")}
                      className={intensityLevel === "balanced" ? "bg-blue-600" : ""}
                      data-testid="button-intensity-balanced"
                    >
                      Balanced
                    </Button>
                    <Button
                      variant={intensityLevel === "maximum" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIntensityLevel("maximum")}
                      className={intensityLevel === "maximum" ? "bg-gray-600" : ""}
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
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">AI Upscaling</p>
                          <p className="text-sm text-gray-500">Increase resolution with AI</p>
                        </div>
                      </div>
                    </div>

                    <div>
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
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Denoise</p>
                          <p className="text-sm text-gray-500">Noise removal</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Photo Restore</p>
                          <p className="text-sm text-gray-500">Old/damaged photo fix</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Background Remover</p>
                          <p className="text-sm text-gray-500">Replace/remove background</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Face Retouch</p>
                          <p className="text-sm text-gray-500">Skin smoothing, details</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}