import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, X, Image, Palette, Video, Info } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { redirectToService } from "@/lib/authRedirect";

type ServiceKey = 'image' | 'ai' | 'video';

export default function PricingSection() {
  const [activeService, setActiveService] = useState<ServiceKey>('ai'); // Start with Text-to-Image AI as shown in the image
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Store plan selection for post-auth processing
    localStorage.setItem('selected_plan', planId);
    localStorage.setItem('selected_service', activeService);
    
    // Redirect based on service type
    const serviceRoutes = {
      'image': 'enhance',
      'ai': 'generate', 
      'video': 'video'
    } as const;
    
    redirectToService(serviceRoutes[activeService]);
  };

  const handleSelectCredit = (creditOption: any) => {
    setSelectedCredit(creditOption.credits);
    // Store credit selection for post-auth processing
    localStorage.setItem('selected_credits', creditOption.credits);
    localStorage.setItem('selected_price', creditOption.price);
    localStorage.setItem('selected_service', activeService);
    
    // Redirect based on service type
    const serviceRoutes = {
      'image': 'enhance',
      'ai': 'generate', 
      'video': 'video'
    } as const;
    
    redirectToService(serviceRoutes[activeService]);
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "image":
        return <Image className="text-white text-2xl" size={32} />;
      case "ai":
        return <Palette className="text-white text-2xl" size={32} />;
      case "video":
        return <Video className="text-white text-2xl" size={32} />;
      default:
        return <Image className="text-white text-2xl" size={32} />;
    }
  };

  const getServiceColors = (service: string) => {
    // All services now use purple color scheme
    return {
      iconBg: "bg-gradient-to-br from-primary-purple to-purple-400",
      headerBg: "bg-primary-purple",
      button: "bg-primary-purple hover:bg-purple-600",
      border: "border-primary-purple",
      popular: "bg-primary-purple",
      tabActive: "bg-primary-purple text-white",
      tabInactive: "bg-gray-200 text-gray-700 hover:bg-gray-300"
    };
  };

  const serviceTabs = [
    {
      key: 'image' as ServiceKey,
      name: 'Image Enhancement',
      icon: Image
    },
    {
      key: 'ai' as ServiceKey,
      name: 'Text-to-Image AI',
      icon: Palette
    },
    {
      key: 'video' as ServiceKey,
      name: 'Text-to-Video AI',
      icon: Video
    }
  ];

  // Get the current service data
  const currentServiceData = (pricingPlans as any)[activeService];
  const colors = getServiceColors(activeService);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a plan that fits your needs. Scale as you grow with flexible AI-powered services.
          </p>
        </div>
        
        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {serviceTabs.map((tab) => {
            const IconComponent = tab.icon;
            const tabColors = getServiceColors(tab.key);
            const isActive = activeService === tab.key;
            
            return (
              <Button
                key={tab.key}
                onClick={() => setActiveService(tab.key)}
                className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  isActive ? tabColors.tabActive : tabColors.tabInactive
                }`}
                data-testid={`button-service-tab-${tab.key}`}
              >
                <IconComponent size={20} />
                {tab.name}
              </Button>
            );
          })}
        </div>
        
        {/* Current Service Content */}
        <div>
          {/* Service Description */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-xl mb-4`}>
              {getServiceIcon(activeService)}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentServiceData?.title}</h3>
            <p className="text-gray-600">{currentServiceData?.description}</p>
          </div>
          
          {/* Pricing Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 items-stretch">
            {currentServiceData?.plans?.map((plan: any, index: number) => (
              <Card
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col ${
                  selectedPlan === plan.id 
                    ? `border-2 ${colors.border} ring-2 ring-offset-2 ${colors.border.replace('border-', 'ring-')} relative transform scale-105` 
                    : plan.isPopular 
                      ? `border-2 ${colors.border} relative` 
                      : 'border border-gray-200'
                }`}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${colors.popular} text-white px-4 py-1 text-xs font-medium`}>
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="text-center flex-grow">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-primary-purple mb-2">
                      {plan.price}
                      <span className="text-lg text-gray-600 font-normal">{plan.period}</span>
                    </div>
                    {(plan as any).pricePerImage && (
                      <div className="text-sm text-gray-500 mb-6">
                        {(plan as any).pricePerImage}
                      </div>
                    )}
                    
                    {/* Features List - moved lower with more spacing */}
                    <div className="mt-6 mb-8">
                      {(plan.id === 'payg-ai' || plan.id === 'payg-image') && (plan as any).creditOptions ? (
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600 text-left">
                            {plan.features?.map((feature: any, featureIndex: number) => (
                              <li key={featureIndex} className="flex items-center">
                                <Check className="text-green-500 mr-2" size={14} />
                                <span className="flex items-center gap-1">
                                  {feature.text}
                                  {feature.tooltip && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="text-gray-400 cursor-help" size={14} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="max-w-xs">{feature.tooltip}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <ul className="space-y-3 text-sm text-gray-600 text-left">
                          {plan.features?.map((feature: any, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-center">
                              {feature.included ? (
                                <Check className="text-green-500 mr-2" size={16} />
                              ) : (
                                <span className="text-gray-400 mr-2 text-sm">—</span>
                              )}
                              <span className="flex items-center gap-1">
                                {feature.text}
                                {feature.tooltip && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="text-gray-400 cursor-help" size={14} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">{feature.tooltip}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    {/* PAYG Bundle Selection - moved to bottom */}
                    {(plan.id === 'payg-ai' || plan.id === 'payg-image') && (plan as any).creditOptions && (
                      <div className="mb-6">
                        <div className="text-sm text-gray-700 font-medium mb-4">Choose your bundle:</div>
                        <div className="space-y-2 text-sm">
                          {(plan as any).creditOptions.map((option: any, optionIndex: number) => (
                            <Button
                              key={optionIndex}
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectCredit(option);
                              }}
                              className={`w-full flex justify-between items-center p-3 h-auto transition-all duration-200 ${
                                selectedCredit === option.credits 
                                  ? `${colors.button} text-white border-current` 
                                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                              }`}
                              data-testid={`button-credit-${optionIndex}`}
                            >
                              <span className="font-medium">{option.credits}</span>
                              <span className="font-bold">{option.price}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* CTA Button - always at bottom */}
                    <div className="mt-auto">
                      <Button
                        className={`w-full ${
                          plan.isFree 
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                            : `${colors.button} text-white`
                        } py-2 rounded-lg font-medium transition-colors`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlan(plan.id);
                        }}
                        data-testid={`button-select-plan-${plan.id}`}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Feature Comparison Table */}
          <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`${colors.headerBg} text-white text-center py-4`}>
              <h4 className="text-lg font-semibold">{currentServiceData?.title} Feature Comparison</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    {currentServiceData?.plans?.map((plan: any) => (
                      <th key={plan.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentServiceData?.comparisonFeatures?.map((feature: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feature.name}
                      </td>
                      {feature.values?.map((value: any, valueIndex: number) => (
                        <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="text-green-500 mx-auto" size={16} />
                            ) : (
                              <span className="text-gray-400 mx-auto text-sm">—</span>
                            )
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
