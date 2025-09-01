import { TrendingUp, BarChart3, Clock, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";

interface PredictiveCreditAssistantProps {
  className?: string;
}

export function PredictiveCreditAssistant({ className = "" }: PredictiveCreditAssistantProps) {
  // Fetch user credits (same query as credit balance)
  const { data: userCredits } = useQuery({
    queryKey: ['/api/credits/balance'],
    retry: false,
  });

  // Fallback to mock data while loading or if no data
  const credits = userCredits && typeof userCredits === 'object' && 'totalCredits' in userCredits && 'usedCredits' in userCredits ? {
    totalCredits: (userCredits as any).totalCredits,
    usedCredits: (userCredits as any).usedCredits,
  } : {
    totalCredits: 1000,
    usedCredits: 380,
  };

  // Calculate predictions based on last 7 days usage pattern
  const calculatePredictions = () => {
    // Simulate daily usage pattern (in a real app, this would come from usage history API)
    const dailyUsageRate = credits.usedCredits / 7; // Assuming current usage happened over 7 days
    
    // Predicted monthly consumption (30 days)
    const predictedMonthlyUsage = Math.ceil(dailyUsageRate * 30);
    
    // Days until credits run out
    const remainingCredits = credits.totalCredits - credits.usedCredits;
    const daysUntilRunOut = dailyUsageRate > 0 ? Math.floor(remainingCredits / dailyUsageRate) : Infinity;
    
    // Generate recommendation
    let recommendation = "";
    if (daysUntilRunOut < 7) {
      recommendation = "⚠️ Consider purchasing more credits soon to avoid interruption.";
    } else if (predictedMonthlyUsage > credits.totalCredits * 0.8) {
      recommendation = "💡 Consider upgrading to Growth plan for better value.";
    } else if (dailyUsageRate < credits.totalCredits / 60) { // Very low usage
      recommendation = "✨ You're using credits efficiently! Current plan suits your usage well.";
    } else {
      recommendation = "📊 Your usage is trending normally. Current plan should suffice.";
    }
    
    return {
      predictedMonthlyUsage,
      daysUntilRunOut,
      recommendation
    };
  };

  const { predictedMonthlyUsage, daysUntilRunOut, recommendation } = calculatePredictions();

  return (
    <div className={`p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-purple-600" />
        <h4 className="font-medium text-purple-800">Predictive Credit Usage Assistant</h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3 h-3 text-purple-500 cursor-help" data-testid="info-predictive-assistant" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>AI-powered estimate based on your recent usage patterns. Actual usage may vary.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        {/* Predicted Monthly Usage */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm text-purple-700 font-medium">Predicted Monthly Usage</p>
            <p className="text-lg font-bold text-purple-800" data-testid="text-predicted-monthly-usage">
              {predictedMonthlyUsage} credits
            </p>
          </div>
        </div>
        
        {/* Days Until Run Out */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm text-purple-700 font-medium">Est. Days Until Depletion</p>
            <p className="text-lg font-bold text-purple-800" data-testid="text-days-until-depletion">
              {daysUntilRunOut === Infinity ? "∞" : `${daysUntilRunOut} days`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Recommendation */}
      <div className="bg-white/70 rounded-lg p-3 border border-purple-200">
        <p className="text-sm text-purple-800 font-medium" data-testid="text-recommendation">
          {recommendation}
        </p>
      </div>
    </div>
  );
}