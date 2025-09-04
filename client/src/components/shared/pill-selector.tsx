import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Crown, Lock } from "lucide-react";

interface PillOption {
  id: string;
  label: string;
  value: string;
  credits?: number;
  description?: string;
  isAvailable?: boolean;
  isPremium?: boolean;
  planRequired?: string;
}

interface PillSelectorProps {
  title: string;
  icon?: React.ReactNode;
  options: PillOption[];
  selectedValue?: string;
  onSelectionChange: (value: string) => void;
  className?: string;
  allowMultiple?: boolean;
}

export function PillSelector({ 
  title, 
  icon, 
  options, 
  selectedValue, 
  onSelectionChange, 
  className = "",
  allowMultiple = false
}: PillSelectorProps) {
  const { user } = useAuth();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [adminMode, setAdminMode] = useState<string>("payg");
  
  // Listen for admin billing mode changes
  useEffect(() => {
    const handleAdminModeChange = (event: CustomEvent) => {
      setAdminMode(event.detail.mode);
    };

    // Load initial admin settings
    const savedMode = localStorage.getItem('admin-billing-mode');
    if (savedMode) {
      setAdminMode(savedMode);
    }

    window.addEventListener('admin-billing-mode-changed', handleAdminModeChange as EventListener);
    return () => {
      window.removeEventListener('admin-billing-mode-changed', handleAdminModeChange as EventListener);
    };
  }, []);
  
  // Check if user is admin and determine if credits should be shown
  const isAdmin = (user as any)?.email === "zkwani99@gmail.com";
  const shouldShowCredits = isAdmin ? adminMode === "payg" || adminMode === "hybrid" : true;

  const handleSelection = (value: string) => {
    if (allowMultiple) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newValues);
      onSelectionChange(newValues.join(','));
    } else {
      onSelectionChange(value);
    }
  };

  const isSelected = (value: string) => {
    return allowMultiple ? selectedValues.includes(value) : selectedValue === value;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = isSelected(option.value);
          const isDisabled = option.isAvailable === false;
          
          return (
            <TooltipProvider key={option.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => !isDisabled && handleSelection(option.value)}
                    disabled={isDisabled}
                    className={`
                      relative rounded-full px-4 py-2 h-auto transition-all duration-200
                      ${selected 
                        ? 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 hover:bg-purple-700 dark:hover:bg-purple-700 shadow-lg' 
                        : 'bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 border-gray-200 dark:border-purple-600 text-gray-700 dark:text-white hover:border-purple-300 dark:hover:border-purple-500'
                      }
                      ${isDisabled 
                        ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500' 
                        : 'hover:scale-105 hover:shadow-md'
                      }
                    `}
                    data-testid={`pill-${option.id}`}
                  >
                    <span className="font-medium">{option.label}</span>
                    
                    {option.isPremium && (
                      <Crown className="w-3 h-3 ml-1 text-yellow-500" />
                    )}
                    
                    {isDisabled && (
                      <Lock className="w-3 h-3 ml-1" />
                    )}
                    
                    {option.credits && shouldShowCredits && (
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 text-xs ${selected ? 'bg-white/20 text-white' : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'}`}
                      >
                        {option.credits}c
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <p className="font-medium">{option.label}</p>
                    {option.description && (
                      <p className="text-sm text-gray-600">{option.description}</p>
                    )}
                    {option.credits && shouldShowCredits && (
                      <p className="text-sm text-purple-600">{option.credits} credits required</p>
                    )}
                    {isDisabled && option.planRequired && (
                      <p className="text-sm text-amber-600">Available in {option.planRequired} plan or with PAYG credits</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}