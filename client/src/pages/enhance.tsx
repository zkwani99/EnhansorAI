import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function EnhancePage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Image <span className="text-[hsl(258,90%,66%)]">Enhancement</span> Service
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Transform your images with AI-powered enhancement technology
          </p>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Welcome to Image Enhancement!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Upload your images and let our AI enhance them with improved resolution, 
              color correction, and detail enhancement.
            </p>
            
            <div className="space-y-4">
              <Button 
                className="bg-[hsl(258,90%,66%)] hover:bg-[hsl(258,90%,60%)] text-white font-semibold py-3 px-8 rounded-lg"
                data-testid="button-upload-image"
              >
                Upload Image to Enhance
              </Button>
            </div>
          </div>

          <Link href="/">
            <Button 
              variant="outline" 
              className="border-[hsl(258,90%,66%)] text-[hsl(258,90%,66%)] hover:bg-[hsl(258,90%,66%)] hover:text-white"
              data-testid="button-back-home"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}