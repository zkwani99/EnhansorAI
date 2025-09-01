import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap, Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface CreditCostEstimatorProps {
  service: "image-enhancement" | "text-to-image" | "text-to-video" | "image-to-video";
  selectedResolution?: string;
  selectedDuration?: number; // for video services
  selectedSize?: string; // for image services
  selectedUpscaling?: string; // for image enhancement
  className?: string;
}

export function CreditCostEstimator({ 
  service, 
  selectedResolution = "1080p", 
  selectedDuration = 5, 
  selectedSize = "square",
  selectedUpscaling = "2x",
  className = "" 
}: CreditCostEstimatorProps) {
  const { user } = useAuth();

  // Determine if user is on subscription plan
  const planType = (user as any)?.planType || "payg";
  const isSubscriptionPlan = ["basic", "growth", "business"].includes(planType);

  // Hide credit cost estimator for subscription users
  if (isSubscriptionPlan) {
    return null;
  }

  // Calculate credits based on exact pricing structure from homepage
  const estimatedCost = useMemo(() => {
    switch (service) {
      case "image-enhancement":
        // Based on upscaling level - EXACT HOMEPAGE PRICING:
        // 2× Upscale = 1 credit
        // Up to 4× HD Upscaling = 2 credits
        // Up to 6× Upscaling = 3 credits
        // Up to 6× Ultra-HD Upscaling = 4 credits
        if (selectedUpscaling === "6x-ultra") {
          return 4; // 6× Ultra-HD
        } else if (selectedUpscaling === "6x") {
          return 3; // 6× Upscaling
        } else if (selectedUpscaling === "4x-hd") {
          return 2; // 4× HD Upscaling
        } else if (selectedUpscaling === "2x") {
          return 1; // 2× Upscale
        } else {
          return 1; // Default to 2× pricing
        }

      case "text-to-image":
        // Based on resolution - EXACT HOMEPAGE PRICING:
        // 512px = 1 credit
        // 1K = 2 credits
        // 2K = 3 credits
        // 4K = 4 credits
        if (selectedResolution === "4k") {
          return 4; // 4K
        } else if (selectedResolution === "2k") {
          return 3; // 2K
        } else if (selectedResolution === "1k") {
          return 2; // 1K
        } else if (selectedResolution === "512px") {
          return 1; // 512px
        } else {
          return 1; // Default to 512px pricing
        }

      case "text-to-video":
        // Based on resolution for 5 seconds - EXACT HOMEPAGE PRICING:
        // 5 seconds at 480p resolution = 10 credits
        // 5 seconds at 720p resolution = 15 credits
        // 5 seconds at 1080p resolution = 20 credits
        let baseCredits = 10; // 480p default
        if (selectedResolution === "1080p") {
          baseCredits = 20;
        } else if (selectedResolution === "720p") {
          baseCredits = 15;
        } else if (selectedResolution === "480p") {
          baseCredits = 10;
        }
        // Scale by duration (5s is the base)
        return Math.ceil(baseCredits * (selectedDuration / 5));

      case "image-to-video":
        // Based on resolution and duration - EXACT HOMEPAGE PRICING:
        // Short Clip (Up to 5s, up to 720p resolution) = 15 credits
        // Short Clip (Up to 8s, up to 1080p resolution) = 20 credits
        // Scale proportionally with duration
        let baseCreditsImageVideo = 15; // 720p base
        if (selectedResolution === "1080p") {
          baseCreditsImageVideo = 20; // 1080p base (for 8s)
          // Scale from 8s base for 1080p
          return Math.ceil(baseCreditsImageVideo * (selectedDuration / 8));
        } else {
          // 720p and other resolutions scale from 5s base
          return Math.ceil(baseCreditsImageVideo * (selectedDuration / 5));
        }

      default:
        return 1;
    }
  }, [service, selectedResolution, selectedDuration, selectedUpscaling]);

  const getServiceDisplayName = () => {
    switch (service) {
      case "image-enhancement": return "Enhancement";
      case "text-to-image": return "Generation";
      case "text-to-video": return "Video Generation";
      case "image-to-video": return "Video Creation";
      default: return "Processing";
    }
  };

  const getDetailsText = () => {
    const parts = [];
    
    if (selectedResolution) {
      parts.push(`${selectedResolution}`);
    }
    
    if (service === "text-to-video" || service === "image-to-video") {
      parts.push(`${selectedDuration}s`);
    } else if (selectedSize) {
      const sizeMap: Record<string, string> = {
        "square": "1:1",
        "portrait": "3:4",
        "landscape": "4:3"
      };
      parts.push(sizeMap[selectedSize] || selectedSize);
    }
    
    return parts.join(" • ");
  };

  return (
    <Card className={`border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 ${className}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Credits Needed</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3 h-3 text-purple-500 cursor-help" data-testid="info-credit-cost" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Credit cost is calculated based on your selected options: resolution, duration (for videos), and enhancement settings. Higher settings require more processing power and use more credits.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="text-right">
            <Badge 
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-semibold"
              data-testid="credit-cost-badge"
            >
              {estimatedCost} credits
            </Badge>
            {getDetailsText() && (
              <p className="text-xs text-purple-600 mt-1">
                {getDetailsText()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}