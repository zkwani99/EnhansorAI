import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CreditCostEstimatorProps {
  service: "image-enhancement" | "text-to-image" | "text-to-video" | "image-to-video";
  selectedResolution?: string;
  selectedDuration?: number; // for video services
  selectedSize?: string; // for image services
  className?: string;
}

interface CreditConfig {
  service: string;
  baseCost: number;
  resolutionMultipliers: Record<string, number>;
  durationMultipliers?: Record<string, number>;
  sizeMultipliers?: Record<string, number>;
}

export function CreditCostEstimator({ 
  service, 
  selectedResolution = "1080p", 
  selectedDuration = 5, 
  selectedSize = "square",
  className = "" 
}: CreditCostEstimatorProps) {
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Fetch credit configuration from backend
  const { data: creditConfig, isLoading } = useQuery<CreditConfig[]>({
    queryKey: ['/api/credits/config'],
    retry: false,
  });

  useEffect(() => {
    if (!creditConfig) return;

    const serviceConfig = creditConfig.find(config => config.service === service);
    if (!serviceConfig) return;

    let cost = serviceConfig.baseCost;

    // Apply resolution multiplier
    if (selectedResolution && serviceConfig.resolutionMultipliers[selectedResolution]) {
      cost *= serviceConfig.resolutionMultipliers[selectedResolution];
    }

    // Apply duration multiplier for video services
    if ((service === "text-to-video" || service === "image-to-video") && selectedDuration) {
      const durationKey = selectedDuration <= 5 ? "short" : selectedDuration <= 15 ? "medium" : "long";
      if (serviceConfig.durationMultipliers?.[durationKey]) {
        cost *= serviceConfig.durationMultipliers[durationKey];
      }
      // Also multiply by actual duration
      cost = Math.ceil(cost * (selectedDuration / 5));
    }

    // Apply size multiplier for image services
    if ((service === "image-enhancement" || service === "text-to-image") && selectedSize) {
      if (serviceConfig.sizeMultipliers?.[selectedSize]) {
        cost *= serviceConfig.sizeMultipliers[selectedSize];
      }
    }

    setEstimatedCost(Math.ceil(cost));
  }, [creditConfig, service, selectedResolution, selectedDuration, selectedSize]);

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    );
  }

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