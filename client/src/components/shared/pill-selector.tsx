import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

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
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
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
                        ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white border-purple-600 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900' 
                        : 'bg-white hover:bg-purple-50 border-gray-200 text-gray-700 hover:border-purple-300'
                      }
                      ${isDisabled 
                        ? 'opacity-60 cursor-not-allowed bg-gray-100 text-gray-400' 
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
                    
                    {option.credits && (
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 text-xs ${selected ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'}`}
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
                    {option.credits && (
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