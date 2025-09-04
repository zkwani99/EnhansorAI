import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

interface SubscriptionOutputsMeterProps {
  service: "image-enhancement" | "text-to-image" | "text-to-video" | "image-to-video";
  className?: string;
  showDetails?: boolean;
}

export function SubscriptionOutputsMeter({ 
  service, 
  className = "", 
  showDetails = true 
}: SubscriptionOutputsMeterProps) {
  const { user } = useAuth();
  const [adminTestValues, setAdminTestValues] = useState<any>(null);
  
  const { data: userOutputs, isLoading } = useQuery({
    queryKey: ['/api/subscription/outputs'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Listen for admin billing mode changes
  useEffect(() => {
    const handleAdminModeChange = (event: CustomEvent) => {
      setAdminTestValues(event.detail.testValues);
    };

    // Load initial admin settings
    const savedValues = localStorage.getItem('admin-test-values');
    if (savedValues) {
      setAdminTestValues(JSON.parse(savedValues));
    }

    window.addEventListener('admin-billing-mode-changed', handleAdminModeChange as EventListener);
    return () => {
      window.removeEventListener('admin-billing-mode-changed', handleAdminModeChange as EventListener);
    };
  }, []);

  // Check if user is admin
  const isAdmin = (user as any)?.email === "zkwani99@gmail.com";

  // Service-specific data mapping
  const getServiceData = () => {
    // Use admin test values if admin, otherwise use real data
    if (isAdmin && adminTestValues) {
      const testValues = adminTestValues.subscription;
      switch (service) {
        case "image-enhancement":
          return {
            remaining: testValues.imageEnhancement,
            total: 500, // Mock total for testing
            percentage: Math.round(((500 - testValues.imageEnhancement) / 500) * 100),
            label: "enhancements"
          };
        case "text-to-image":
          return {
            remaining: testValues.textToImage,
            total: 500,
            percentage: Math.round(((500 - testValues.textToImage) / 500) * 100),
            label: "images"
          };
        case "text-to-video":
          return {
            remaining: testValues.textToVideo,
            total: 200,
            percentage: Math.round(((200 - testValues.textToVideo) / 200) * 100),
            label: "videos"
          };
        case "image-to-video":
          return {
            remaining: testValues.imageToVideo,
            total: 300,
            percentage: Math.round(((300 - testValues.imageToVideo) / 300) * 100),
            label: "videos"
          };
      }
    }
    
    if (!userOutputs || typeof userOutputs !== 'object') {
      return { remaining: 0, total: 0, percentage: 0, label: "outputs" };
    }

    const outputs = userOutputs as any;
    
    switch (service) {
      case "image-enhancement":
        return {
          remaining: Math.max(0, (outputs.imageEnhanceLimit || 0) - (outputs.imageEnhanceUsed || 0)),
          total: outputs.imageEnhanceLimit || 0,
          percentage: outputs.imageEnhanceLimit > 0 
            ? Math.round(((outputs.imageEnhanceUsed || 0) / outputs.imageEnhanceLimit) * 100)
            : 0,
          label: "enhancements"
        };
      case "text-to-image":
        return {
          remaining: Math.max(0, (outputs.textToImageLimit || 0) - (outputs.textToImageUsed || 0)),
          total: outputs.textToImageLimit || 0,
          percentage: outputs.textToImageLimit > 0 
            ? Math.round(((outputs.textToImageUsed || 0) / outputs.textToImageLimit) * 100)
            : 0,
          label: "images"
        };
      case "text-to-video":
        return {
          remaining: Math.max(0, (outputs.textToVideoLimit || 0) - (outputs.textToVideoUsed || 0)),
          total: outputs.textToVideoLimit || 0,
          percentage: outputs.textToVideoLimit > 0 
            ? Math.round(((outputs.textToVideoUsed || 0) / outputs.textToVideoLimit) * 100)
            : 0,
          label: "videos"
        };
      case "image-to-video":
        return {
          remaining: Math.max(0, (outputs.imageToVideoLimit || 0) - (outputs.imageToVideoUsed || 0)),
          total: outputs.imageToVideoLimit || 0,
          percentage: outputs.imageToVideoLimit > 0 
            ? Math.round(((outputs.imageToVideoUsed || 0) / outputs.imageToVideoLimit) * 100)
            : 0,
          label: "videos"
        };
      default:
        return { remaining: 0, total: 0, percentage: 0, label: "outputs" };
    }
  };

  const serviceData = getServiceData();

  return (
    <Card className={`border-purple-300 bg-gradient-to-r from-purple-50 to-purple-100 dark:bg-black dark:border-purple-600 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-lg">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Subscription Outputs</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Monthly {serviceData.label} included in your subscription plan</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {showDetails && (
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {serviceData.remaining} of {serviceData.total} {serviceData.label} remaining this month
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
              {serviceData.remaining}
            </div>
            {!showDetails && (
              <div className="text-xs text-gray-500 dark:text-gray-300">
                /{serviceData.total}
              </div>
            )}
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-3">
            <Progress value={serviceData.percentage} className="h-2" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-300">Usage this month</span>
              <Badge variant="outline" className="text-xs">
                {serviceData.percentage}%
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}