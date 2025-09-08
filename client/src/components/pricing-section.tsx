import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, X, Image, Palette, Video, Info, Zap, Sparkles, Crown, Building2, HelpCircle, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { pricingPlans } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { redirectToService } from "@/lib/authRedirect";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

type ServiceKey = 'image' | 'ai' | 'video' | 'imageVideo';

export default function PricingSection() {
  const [activeService, setActiveService] = useState<ServiceKey>('ai'); // Start with Text-to-Image AI as shown in the image
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);
  const [imageVideoSelections, setImageVideoSelections] = useState<{[planId: string]: 'clips' | 'videos' | null}>({});
  const [expandedFeatures, setExpandedFeatures] = useState<{[planId: string]: boolean}>({});
  const [expandedComparison, setExpandedComparison] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  
  const handleSelectPlan = (planId: string) => {
    // For imageVideo service, check if user has selected an option first (except for free plan)
    if (activeService === 'imageVideo' && !planId.includes('free') && !imageVideoSelections[planId]) {
      toast({
        title: "Please select an option",
        description: "Choose between clips or videos before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setSelectedPlan(planId);
    // Store plan selection for post-auth processing
    localStorage.setItem('selected_plan', planId);
    localStorage.setItem('selected_service', activeService);
    
    // Store imageVideo selection if applicable
    if (activeService === 'imageVideo' && imageVideoSelections[planId]) {
      localStorage.setItem('selected_imageVideo_option', imageVideoSelections[planId]);
    }
    
    // Redirect based on service type
    const serviceRoutes = {
      'image': 'enhance',
      'ai': 'generate', 
      'video': 'video',
      'imageVideo': 'image-to-video'
    } as const;
    
    // Check authentication status before navigating
    if (isAuthenticated) {
      // User is logged in, navigate directly to the service page
      navigate(`/${serviceRoutes[activeService]}`);
    } else {
      // User not logged in, redirect to auth flow
      redirectToService(serviceRoutes[activeService]);
    }
  };

  const handleImageVideoSelection = (planId: string, option: 'clips' | 'videos') => {
    setImageVideoSelections(prev => ({
      ...prev,
      [planId]: prev[planId] === option ? null : option
    }));
  };

  const toggleFeatures = (planId: string) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  const toggleComparison = () => {
    setExpandedComparison(!expandedComparison);
  };

  const calculatePrice = (monthlyPrice: string) => {
    if (monthlyPrice === 'Free' || monthlyPrice === 'Custom') return monthlyPrice;
    const price = parseFloat(monthlyPrice.replace('$', ''));
    return isYearly ? `$${(price * 12 * 0.8).toFixed(0)}` : monthlyPrice;
  };

  const getPeriod = () => {
    return isYearly ? '/year' : '/month';
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
      'video': 'video',
      'imageVideo': 'image-to-video'
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
      case "imageVideo":
        return <Video className="text-white text-2xl" size={32} />;
      default:
        return <Image className="text-white text-2xl" size={32} />;
    }
  };

  const getServiceColors = (service: string) => {
    // All services now use dark gradient purple color scheme
    return {
      iconBg: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800",
      headerBg: "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 dark:bg-black",
      button: "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-gray-900",
      border: "border-purple-600",
      popular: "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800",
      tabActive: "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white border-2 border-purple-500",
      tabInactive: "bg-white text-gray-700 hover:bg-gray-100 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-900 border-2 border-purple-500 dark:border-purple-400"
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
    },
    {
      key: 'imageVideo' as ServiceKey,
      name: 'Image-to-Video AI',
      icon: Video
    }
  ];

  // Get the current service data
  const currentServiceData = (pricingPlans as any)[activeService];
  const colors = getServiceColors(activeService);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-white to-purple-50 dark:from-black dark:to-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Choose a plan that fits your needs. Scale as you grow with flexible AI-powered services.
          </p>
          
          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg font-medium ${!isYearly ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`}>Monthly</span>
            <Switch 
              checked={isYearly} 
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className={`text-lg font-medium ${isYearly ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`}>Yearly</span>
            {isYearly && (
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 ml-2">
                Save 20%
              </Badge>
            )}
          </div>
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{currentServiceData?.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{currentServiceData?.description}</p>
          </div>
          
          {/* Pricing Plans Grid */}
          <div className="grid gap-6 mb-12 items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {currentServiceData?.plans?.map((plan: any, index: number) => (
              <Card
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col group ${
                  selectedPlan === plan.id 
                    ? `border-2 ${colors.border} relative transform scale-105` 
                    : plan.isPopular 
                      ? `border-2 ${colors.border} relative hover:border-purple-400` 
                      : 'border border-gray-200 hover:border-purple-300'
                }`}
                data-testid={`card-plan-${plan.id}`}
              >
                {(plan.isPopular || plan.name === 'Growth') && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${colors.popular} text-white px-4 py-1 text-xs font-medium ${plan.name === 'Growth' ? '' : 'flex items-center gap-1'}`}>
                      {plan.name !== 'Growth' && <Check size={12} />}
                      {plan.name === 'Growth' ? 'Recommended' : 'Most Popular'}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Content area that grows */}
                  <div className="text-center flex-grow">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent mb-2">
                      {calculatePrice(plan.price)}
                      <span className="text-lg text-gray-600 dark:text-gray-300 font-normal">{getPeriod()}</span>
                    </div>
                    {(plan as any).pricePerImage && (
                      <div className="text-sm text-gray-800 dark:text-gray-200 mb-6">
                        {(plan as any).pricePerImage}
                      </div>
                    )}
                    
                    {/* Features List - moved lower with more spacing */}
                    <div className="mt-6">
                      <div className="mb-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatures(plan.id)}
                          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 p-0 h-auto font-medium"
                        >
                          {expandedFeatures[plan.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          See all features
                        </Button>
                      </div>
                      {expandedFeatures[plan.id] && (
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 text-left animate-in slide-in-from-top-2 duration-200">
                        {plan.features?.map((feature: any, featureIndex: number) => {
                          
                          return (
                            <li key={featureIndex} className="flex items-start">
                              {activeService === 'imageVideo' && (feature as any).options ? (
                                <span className="mr-2 mt-0.5"></span>
                              ) : feature.included ? (
                                <Check className="text-purple-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                              ) : (
                                <span className="text-gray-600 dark:text-gray-400 mr-2 text-sm mt-0.5">—</span>
                              )}
                              <span className="flex items-center gap-1">
                                {activeService === 'imageVideo' && (feature as any).options ? (
                                  <div className="w-full">
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">{feature.text}</div>
                                    <div className="grid grid-cols-1 gap-2">
                                      {(feature as any).options.map((option: any, optionIndex: number) => {
                                        const isSelected = imageVideoSelections[plan.id] === option.id;
                                        return (
                                          <button
                                            key={optionIndex}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleImageVideoSelection(plan.id, option.id);
                                            }}
                                            className={`relative p-3 rounded-lg border text-left text-sm transition-all duration-200 hover:shadow-md ${
                                              isSelected 
                                                ? 'border-purple-600 bg-purple-50 text-purple-900' 
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-25'
                                            }`}
                                            data-testid={`option-${plan.id}-${option.id}`}
                                          >
                                            <div className="flex items-center justify-between">
                                              <span className="font-medium">{option.text}</span>
                                              {isSelected && (
                                                <Check className="text-purple-600 flex-shrink-0" size={16} />
                                              )}
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ) : activeService === 'imageVideo' && feature.text.includes('\n') ? (
                                  <div className="whitespace-pre-line">{feature.text}</div>
                                ) : (feature as any).bold ? (
                                  <span className="font-bold">{feature.text}</span>
                                ) : (
                                  feature.text
                                )}
                                {feature.tooltip && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="text-gray-600 dark:text-gray-400 cursor-help" size={14} />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">{feature.tooltip}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </span>
                            </li>
                          );
                        })}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  {/* CTA Button - always at bottom outside content div */}
                  <div className="mt-8">
                    {(() => {
                      const isImageVideoService = activeService === 'imageVideo';
                      const isPaidPlan = !plan.isFree;
                      const hasSelection = imageVideoSelections[plan.id];
                      const isDisabled = isImageVideoService && isPaidPlan && !hasSelection;
                      
                      return (
                        <Button
                          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                            plan.isFree 
                              ? "bg-gray-200 text-gray-700 hover:bg-gray-300 group-hover:bg-gray-400 group-hover:text-white" 
                              : isDisabled
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : `${colors.button} text-white group-hover:scale-105 group-hover:shadow-lg`
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPlan(plan.id);
                          }}
                          disabled={isDisabled}
                          data-testid={`button-select-plan-${plan.id}`}
                        >
                          {plan.buttonText}
                        </Button>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Feature Comparison Table */}
          <div className="mb-6 text-center">
            <Button
              variant="outline"
              onClick={toggleComparison}
              className="flex items-center gap-2 px-6 py-3 rounded-full border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20"
            >
              {expandedComparison ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              Expand full comparison
            </Button>
          </div>
          {expandedComparison && (
          <Card className="bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden animate-in slide-in-from-top-4 duration-300 border dark:border-purple-600">
            <div className={`${colors.headerBg} text-white text-center py-4`}>
              <h4 className="text-lg font-semibold">{currentServiceData?.title} Feature Comparison</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-50 dark:bg-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 dark:text-gray-200 uppercase tracking-wider">Feature</th>
                    {currentServiceData?.plans?.map((plan: any) => (
                      <th key={plan.id} className="px-6 py-3 text-center text-xs font-medium text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-purple-50 dark:bg-black divide-y divide-purple-200 dark:divide-purple-600">
                  {currentServiceData?.comparisonFeatures?.map((feature: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-purple-50 dark:bg-black' : 'bg-purple-100 dark:bg-black border-l-2 dark:border-l-purple-600'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {feature.name}
                      </td>
                      {feature.values?.map((value: any, valueIndex: number) => (
                        <td key={valueIndex} className={`px-6 py-4 text-sm text-gray-800 dark:text-gray-200 text-center ${
                          feature.name === 'Video Generation' && activeService === 'imageVideo' 
                            ? 'whitespace-pre-line min-h-[80px] align-top' 
                            : 'whitespace-nowrap'
                        }`}>
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="text-purple-500 mx-auto" size={16} />
                            ) : (
                              <span className="text-gray-600 dark:text-gray-400 mx-auto text-sm">—</span>
                            )
                          ) : value === '✓' ? (
                            <Check className="text-purple-500 mx-auto" size={16} />
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
          )}
        </div>

        {/* Flexible Pay-As-You-Go Credits Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:bg-black dark:from-black dark:via-black dark:to-black dark:border dark:border-purple-500 rounded-3xl p-8 mb-12">
            <div className="text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Flexible Pay-As-You-Go Credits
              </h2>
              <p className="text-lg text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6">
                Buy credits once, use them anywhere. Enhance photos, generate art, or create videos—your creativity, your control.
              </p>
              <a 
                href="#credits-breakdown"
                className="inline-flex items-center gap-2 text-lg font-medium text-purple-200 hover:text-white hover:bg-purple-500/20 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer group border border-purple-300/30 hover:border-purple-200/50"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('credits-breakdown')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                See how credits are used →
              </a>
            </div>
          </div>

          {/* Credits Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Starter Pack */}
            <Card className="bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 hover:border-purple-300">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Starter Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">$9</span>
                    <span className="text-gray-700 dark:text-gray-300 ml-1">one-time</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">200 credits</div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">$0.045 per credit</p>
                </div>
                <div className="mt-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg">
                    Buy Starter Pack
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creator Pack */}
            <Card className="bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-purple-300 ring-2 ring-purple-100 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  BEST VALUE
                </span>
              </div>
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Creator Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">$25</span>
                    <span className="text-gray-700 dark:text-gray-300 ml-1">one-time</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">800 credits</div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">$0.03125 per credit</p>
                </div>
                <div className="mt-auto">
                  <Button className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white font-medium py-2 rounded-lg">
                    Buy Creator Pack
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pro Pack */}
            <Card className="bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 hover:border-purple-300">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pro Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">$75</span>
                    <span className="text-gray-700 dark:text-gray-300 ml-1">one-time</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">3,000 credits</div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">$0.025 per credit</p>
                </div>
                <div className="mt-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg">
                    Buy Pro Pack
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Pack */}
            <Card className="bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 hover:border-purple-300">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Enterprise Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">$199</span>
                    <span className="text-gray-700 dark:text-gray-300 ml-1">one-time</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">10,000 credits</div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">$0.0199 per credit</p>
                </div>
                <div className="mt-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg">
                    Buy Enterprise Pack
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How Credits Are Used Section - Moved directly under credit packs */}
          <div id="credits-breakdown" className="mt-16 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How Credits Are Used
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See exactly how your credits work—clear, simple, and flexible.
              </p>
            </div>

            <CreditUsageDisplay />
          </div>

          {/* Features List */}
          <Card className="bg-white dark:bg-black border border-gray-200 dark:border-purple-500 rounded-2xl mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Use credits across all services</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">(Enhance, Generate, Create)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">No expiration for credits</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">(lifetime until used)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Access to premium features</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">(4K outputs, batch processing, real-time preview, commercial licensing)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Scale up anytime</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">by buying more packs</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">Perfect add-on</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">for subscription users who need extra runs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}

// Credit Usage Display Component
function CreditUsageDisplay() {
  const { data: pricing, isLoading, error } = useQuery({
    queryKey: ['/api/credits/pricing'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-200 rounded-2xl mx-auto mb-4"></div>
                <div className="h-6 bg-purple-200 rounded mb-2"></div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex justify-between">
                    <div className="h-4 bg-purple-200 rounded w-24"></div>
                    <div className="h-4 bg-purple-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !pricing) {
    return (
      <div className="text-center text-purple-600 py-8">
        <p>Error loading credit pricing. Please try again later.</p>
      </div>
    );
  }

  // Group pricing by service
  const groupedPricing = Array.isArray(pricing) ? pricing.reduce((acc: any, item: any) => {
    if (!acc[item.service]) {
      acc[item.service] = [];
    }
    acc[item.service].push(item);
    return acc;
  }, {}) : {};

  const serviceConfig = {
    image: {
      title: 'Image Enhancement',
      icon: Image,
      color: 'from-purple-400 to-purple-500',
      bgColor: 'bg-white dark:bg-black',
      borderColor: 'border-purple-200 dark:border-purple-500',
      badgeColor: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200 dark:bg-gradient-to-r dark:from-purple-900/50 dark:to-purple-800/50 dark:text-purple-200 dark:border-purple-600',
      titleColor: 'bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent',
    },
    'text-to-image': {
      title: 'Text-to-Image AI',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-white dark:bg-black',
      borderColor: 'border-purple-200 dark:border-purple-500',
      badgeColor: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200 dark:bg-gradient-to-r dark:from-purple-900/50 dark:to-purple-800/50 dark:text-purple-200 dark:border-purple-600',
      titleColor: 'bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent',
    },
    'text-to-video': {
      title: 'Text-to-Video AI',
      icon: Video,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-white dark:bg-black',
      borderColor: 'border-purple-200 dark:border-purple-500',
      badgeColor: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200 dark:bg-gradient-to-r dark:from-purple-900/50 dark:to-purple-800/50 dark:text-purple-200 dark:border-purple-600',
      titleColor: 'bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent',
    },
    'image-to-video': {
      title: 'Image-to-Video AI',
      icon: Video,
      color: 'from-purple-700 to-purple-800',
      bgColor: 'bg-white dark:bg-black',
      borderColor: 'border-purple-200 dark:border-purple-500',
      badgeColor: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200 dark:bg-gradient-to-r dark:from-purple-900/50 dark:to-purple-800/50 dark:text-purple-200 dark:border-purple-600',
      titleColor: 'bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent',
    },
  };

  // Define the order of services to maintain consistent display
  const serviceOrder = ['image', 'text-to-image', 'text-to-video', 'image-to-video'];
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {serviceOrder.map((service) => {
        const items = groupedPricing[service];
        if (!items) return null;
        
        // Sort items to ensure proper order within each service
        const sortedItems = [...items].sort((a, b) => {
          // Special items (plans-included, notes) should appear at the bottom
          const aIsSpecial = a.tier === '1-plans-included' || a.tier === 'plans-included' || a.tier === 'note';
          const bIsSpecial = b.tier === '1-plans-included' || b.tier === 'plans-included' || b.tier === 'note';
          
          if (aIsSpecial && !bIsSpecial) return 1;  // a goes to bottom
          if (!aIsSpecial && bIsSpecial) return -1; // b goes to bottom
          
          // For non-special items, sort by credit count (low to high)
          if (!aIsSpecial && !bIsSpecial) {
            return a.credits - b.credits;
          }
          
          return a.tier.localeCompare(b.tier);
        });
        
        const config = serviceConfig[service as keyof typeof serviceConfig];
        if (!config) return null;

        const IconComponent = config.icon;

        return (
          <Card key={service} className={`${config.bgColor} ${config.borderColor} border rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm`}>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-lg font-bold ${config.titleColor} dark:text-white`}>{config.title}</h3>
              </div>

              <div className="space-y-3">
                {sortedItems.map((item: any) => {
                  // Special handling for plan inclusions and notes
                  if (item.tier === 'plans-included' || item.tier === '1-plans-included' || item.tier === 'note') {
                    return (
                      <div key={item.tier} className="py-3 px-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200 dark:border-purple-600">
                        <span className="text-sm font-medium text-purple-800 dark:text-purple-200 whitespace-pre-line">{item.displayName}</span>
                      </div>
                    );
                  }

                  // Special handling for stitched videos (0 credits)
                  if (item.credits === 0 && service === 'image-to-video' && item.tier.includes('stitched')) {
                    return (
                      <Tooltip key={item.tier}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-help">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.displayName}</span>
                            <Badge className="bg-green-100 text-green-700 border-green-300 font-semibold shadow-sm">
                              Included
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-purple-600 text-white border-purple-700 shadow-lg">
                          <p>Included in subscription plan</p>
                          {item.description && <p className="text-purple-100 text-xs mt-1">{item.description}</p>}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  // Regular credit-based items
                  return (
                    <Tooltip key={item.tier}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 transition-all duration-200 cursor-help border border-transparent hover:border-purple-200 dark:hover:border-purple-600">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.displayName}</span>
                          <Badge className={`${config.badgeColor} font-semibold shadow-sm px-3 py-1 rounded-full`}>
                            {item.credits} credit{item.credits > 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-600 text-white border-purple-700 shadow-lg">
                        <p>Costs {item.credits} credit{item.credits > 1 ? 's' : ''} per {service === 'text-to-video' || service === 'image-to-video' ? 'video' : 'image'}</p>
                        {item.description && <p className="text-purple-100 text-xs mt-1">{item.description}</p>}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
        })}
      </div>
      
      {/* Bottom Note */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
          💡 <strong>Credits can be used across all services.</strong> The higher the resolution or duration, the more credits required.
        </p>
      </div>
    </div>
  );
}
