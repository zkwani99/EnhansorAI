import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";

interface CreditBalanceProps {
  className?: string;
  showDetails?: boolean;
}

export default function CreditBalance({ className = "", showDetails = true }: CreditBalanceProps) {
  const { data: userCredits, isLoading } = useQuery({
    queryKey: ['/api/credits/balance'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fallback to mock data while loading or if no data
  const credits = userCredits && typeof userCredits === 'object' && 'totalCredits' in userCredits && 'usedCredits' in userCredits ? {
    remaining: (userCredits as any).totalCredits - (userCredits as any).usedCredits,
    total: (userCredits as any).totalCredits,
    percentage: Math.round(((userCredits as any).usedCredits / (userCredits as any).totalCredits) * 100)
  } : {
    remaining: isLoading ? 0 : 620,
    total: isLoading ? 0 : 1000,
    percentage: isLoading ? 0 : 62
  };

  return (
    <Card className={`border-purple-300 bg-gradient-to-r from-purple-50 to-blue-50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-lg">
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
            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
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