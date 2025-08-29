import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, X, Image, Palette, Video, Info, Zap, Sparkles, Crown, Building2, HelpCircle, Calendar } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { redirectToService } from "@/lib/authRedirect";
import { useQuery } from "@tanstack/react-query";

type ServiceKey = 'image' | 'ai' | 'video' | 'imageVideo';

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
      'video': 'video',
      'imageVideo': 'image-to-video'
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
          <div className={`grid gap-6 mb-12 items-stretch ${
            activeService === 'video' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center max-w-5xl mx-auto' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {currentServiceData?.plans?.map((plan: any, index: number) => (
              <Card
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col group ${
                  selectedPlan === plan.id 
                    ? `border-2 ${colors.border} ring-2 ring-offset-2 ${colors.border.replace('border-', 'ring-')} relative transform scale-105` 
                    : plan.isPopular 
                      ? `border-2 ${colors.border} relative hover:border-purple-400` 
                      : 'border border-gray-200 hover:border-purple-300'
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
                    {/* Show image count for AI service plans between name and price */}
                    {activeService === 'ai' && !plan.isFree && plan.features?.[0]?.text?.includes('images per month') && (
                      <div className="text-sm text-gray-600 mb-2 font-medium">
                        {plan.features[0].text}
                      </div>
                    )}
                    {/* Show clip count for video service plans between name and price */}
                    {activeService === 'video' && plan.features?.[0]?.text?.includes('clips per month') && (
                      <div className="text-sm text-gray-600 mb-2 font-medium">
                        {plan.features[0].text}
                      </div>
                    )}
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
                      <ul className="space-y-3 text-sm text-gray-600 text-left">
                        {plan.features?.map((feature: any, featureIndex: number) => {
                          // Skip first feature for AI service paid plans as it's shown above the price
                          if (activeService === 'ai' && !plan.isFree && featureIndex === 0 && feature.text?.includes('images per month')) {
                            return null;
                          }
                          // Skip first feature for video service plans as it's shown above the price
                          if (activeService === 'video' && featureIndex === 0 && feature.text?.includes('clips per month')) {
                            return null;
                          }
                          
                          return (
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
                          );
                        })}
                      </ul>
                    </div>
                    
                    {/* CTA Button - always at bottom */}
                    <div className="mt-auto">
                      <Button
                        className={`w-full ${
                          plan.isFree 
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300 group-hover:bg-gray-400 group-hover:text-white" 
                            : `${colors.button} text-white group-hover:scale-105 group-hover:shadow-lg`
                        } py-3 rounded-lg font-semibold transition-all duration-300`}
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

        {/* Flexible Pay-As-You-Go Credits Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 rounded-3xl p-8 mb-12">
            <div className="text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Flexible Pay-As-You-Go Credits
              </h2>
              <p className="text-lg text-purple-100 max-w-4xl mx-auto leading-relaxed">
                No commitments. Just buy credits when you need them—use them across all services: Image Enhancement, Text-to-Image, and Text-to-Video. Perfect for occasional creators or those testing the platform.
              </p>
            </div>
          </div>

          {/* Credits Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Starter Pack */}
            <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 hover:border-purple-300">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Starter Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">$9</span>
                    <span className="text-gray-500 ml-1">one-time</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-700 mb-4">100 credits</div>
                  <p className="text-sm text-gray-500">$0.09 per credit</p>
                </div>
                <div className="mt-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg">
                    Buy Starter Pack
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creator Pack */}
            <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-purple-300 ring-2 ring-purple-100 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  BEST VALUE
                </span>
              </div>
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Creator Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">$25</span>
                    <span className="text-gray-500 ml-1">one-time</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-700 mb-4">300 credits</div>
                  <p className="text-sm text-gray-500">$0.08 per credit</p>
                </div>
                <div className="mt-auto">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 rounded-lg">
                    Buy Creator Pack
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pro Pack */}
            <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 hover:border-purple-300">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Pack</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">$75</span>
                    <span className="text-gray-500 ml-1">one-time</span>
                  </div>
                  <div className="text-2xl font-semibold text-gray-700 mb-4">1,000 credits</div>
                  <p className="text-sm text-gray-500">$0.075 per credit</p>
                </div>
                <div className="mt-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg">
                    Buy Pro Pack
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Pack */}
            <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 hover:border-purple-300">
              <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise Pack</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-purple-600">Custom</span>
                    <span className="text-gray-500 ml-1">pricing</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-4">Unlimited credits</div>
                  <p className="text-sm text-gray-500">Volume discounts</p>
                </div>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-2 rounded-lg">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How Credits Are Used Section - Moved directly under credit packs */}
          <div className="mt-16 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How Credits Are Used
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Transparent pricing for every service tier. Credits are deducted based on the quality and resolution you choose.
              </p>
            </div>

            <CreditUsageDisplay />
          </div>

          {/* Features List */}
          <Card className="bg-gray-50 border border-gray-200 rounded-2xl mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Use credits across all services</p>
                    <p className="text-sm text-gray-600">(Enhance, Generate, Create)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">No expiration for credits</p>
                    <p className="text-sm text-gray-600">(lifetime until used)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Access to premium features</p>
                    <p className="text-sm text-gray-600">(4K outputs, batch processing, real-time preview, commercial licensing)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Scale up anytime</p>
                    <p className="text-sm text-gray-600">by buying more packs</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Perfect add-on</p>
                    <p className="text-sm text-gray-600">for subscription users who need extra runs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decision Helper Box */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <HelpCircle className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">Not sure what's right for you?</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white rounded-xl p-6 border border-purple-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Choose Subscriptions if...</h4>
                    <p className="text-sm text-gray-600">
                      you need steady, monthly usage at a lower cost per credit.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-purple-200">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Choose PAYG if...</h4>
                    <p className="text-sm text-gray-600">
                      you want total flexibility and only need occasional credits.
                    </p>
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
  const groupedPricing = pricing.reduce((acc: any, item: any) => {
    if (!acc[item.service]) {
      acc[item.service] = [];
    }
    acc[item.service].push(item);
    return acc;
  }, {});

  const serviceConfig = {
    image: {
      title: 'Image Enhancement',
      icon: Image,
      color: 'from-purple-400 to-purple-500', // Lighter purple
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    },
    'text-to-image': {
      title: 'Text-to-Image AI',
      icon: Palette,
      color: 'from-purple-500 to-purple-600', // Medium purple
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    },
    'text-to-video': {
      title: 'Text-to-Video AI',
      icon: Video,
      color: 'from-purple-600 to-purple-700', // Darker purple
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-400',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(groupedPricing).map(([service, items]: [string, any[]]) => {
        const config = serviceConfig[service as keyof typeof serviceConfig];
        if (!config) return null;

        const IconComponent = config.icon;

        return (
          <Card key={service} className={`${config.bgColor} ${config.borderColor} border-2 hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{config.title}</h3>
              </div>

              <div className="space-y-3">
                {items.map((item: any) => (
                  <Tooltip key={item.tier}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-white/80 transition-all duration-200 cursor-help">
                        <span className="text-sm font-medium text-gray-700">{item.displayName}</span>
                        <Badge className={`${config.badgeColor} font-semibold shadow-sm`}>
                          {item.credits} credit{item.credits > 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-purple-600 text-white border-purple-700 shadow-lg">
                      <p>Costs {item.credits} credit{item.credits > 1 ? 's' : ''} per {service === 'text-to-video' ? 'video' : 'image'}</p>
                      {item.description && <p className="text-purple-100 text-xs mt-1">{item.description}</p>}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
