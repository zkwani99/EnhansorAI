import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CreditBalanceProps {
  className?: string;
  showDetails?: boolean;
}

export default function CreditBalance({ className = "", showDetails = true }: CreditBalanceProps) {
  // Mock data - will be replaced with real API calls later
  const credits = {
    remaining: 620,
    total: 1000,
    percentage: 62
  };

  return (
    <Card className={`border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary-purple rounded-lg">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">Credits</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shared across all services: Image Enhancement, AI Generation & Video Creation</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {showDetails && (
                <div className="text-xs text-gray-600">
                  {credits.remaining} of {credits.total} remaining
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-primary-purple">
              {credits.remaining}
            </div>
            {!showDetails && (
              <div className="text-xs text-gray-500">
                /{credits.total}
              </div>
            )}
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-3">
            <Progress value={credits.percentage} className="h-2" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">Usage this month</span>
              <Badge variant="outline" className="text-xs">
                {credits.percentage}%
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}