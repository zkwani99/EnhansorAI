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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import CreditPackCheckout from "@/components/CreditPackCheckout";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeService, setActiveService] = useState('image');
  const [showPayAsYouGo, setShowPayAsYouGo] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Define subscription plans with proper structure
  const subscriptionPlans = {
    starter: {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      monthlyPrice: 12,
      yearlyPrice: 96, // 20% off
      popular: false,
      features: [
        "1,000 images per month",
        "Up to 2K resolution", 
        "All AI services included",
        "Standard processing speed",
        "Email support",
        "No watermarks"
      ],
      cta: "Start Creating",
      ctaLink: "/dashboard"
    },
    creator: {
      name: "Creator", 
      description: "Ideal for content creators and professionals",
      monthlyPrice: 39,
      yearlyPrice: 312, // 20% off
      popular: true,
      features: [
        "5,000 images per month",
        "Up to 4K resolution",
        "Priority processing",
        "Advanced AI models",
        "Batch processing",
        "Priority support",
        "Commercial license",
        "Early access to features"
      ],
      cta: "Go Pro",
      ctaLink: "/dashboard"
    },
    pro: {
      name: "Pro",
      description: "For agencies and high-volume users",
      monthlyPrice: 99,
      yearlyPrice: 792, // 20% off
      popular: false,
      features: [
        "15,000 images per month",
        "Up to 6K resolution",
        "Fastest processing",
        "API access",
        "Team collaboration",
        "White-label options",
        "Dedicated support",
        "Custom integrations"
      ],
      cta: "Scale Up",
      ctaLink: "/dashboard"
    }
  };

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
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 text-sm font-medium ${!isYearly ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className={`ml-3 text-sm font-medium ${isYearly ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge className="ml-3 bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-pulse">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Object.entries(subscriptionPlans).map(([key, plan]: [string, any]) => {
            const isPopular = plan.popular;
            const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const originalPrice = isYearly ? plan.monthlyPrice * 12 : plan.monthlyPrice;
            
            return (
              <Card key={key} className={`relative transition-all duration-300 hover:scale-105 ${
                isPopular 
                  ? 'border-purple-500 dark:border-purple-400 shadow-2xl shadow-purple-500/25 ring-2 ring-purple-500/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:shadow-xl'
              } bg-white dark:bg-black rounded-2xl overflow-hidden`}>
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    <Crown className="inline-block w-4 h-4 mr-1" />
                    MOST POPULAR
                  </div>
                )}
                
                <CardContent className={`p-8 ${isPopular ? 'pt-16' : ''}`}>
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${
                      key === 'starter' ? 'from-purple-400 to-purple-500' :
                      key === 'creator' ? 'from-purple-500 to-purple-600' :
                      'from-purple-600 to-purple-700'
                    } rounded-2xl flex items-center justify-center shadow-lg`}>
                      {key === 'starter' && <Zap className="w-8 h-8 text-white" />}
                      {key === 'creator' && <Sparkles className="w-8 h-8 text-white" />}
                      {key === 'pro' && <Crown className="w-8 h-8 text-white" />}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${currentPrice}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                      </div>
                      {isYearly && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${originalPrice}/year
                          </span>
                          <span className="text-sm text-green-600 dark:text-green-400 ml-2 font-semibold">
                            Save ${originalPrice - currentPrice}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => {
                      if (!isAuthenticated) {
                        redirectToService('dashboard');
                      } else {
                        setLocation('/dashboard');
                      }
                    }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                      isPopular
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  {key === 'pro' && (
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                      Perfect for agencies and businesses
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pay-As-You-Go Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowPayAsYouGo(!showPayAsYouGo)}
              variant="outline"
              className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
            >
              <Zap className="w-4 h-4 mr-2" />
              Pay-As-You-Go Credit Packs
              {showPayAsYouGo ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {showPayAsYouGo && (
            <CreditPacksSection />
          )}
        </div>

        {/* Credits Usage Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How Credits Are Used
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transparent pricing based on what you create. Higher quality outputs use more credits.
            </p>
          </div>

          <TooltipProvider>
            <CreditUsageDisplay />
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
}

// Credit Packs Section Component
function CreditPacksSection() {
  const { toast } = useToast();
  const { data: creditPacks, isLoading } = useQuery({
    queryKey: ['/api/credit-packs'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-600">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-200 dark:bg-purple-700 rounded-2xl mx-auto mb-4"></div>
                <div className="h-6 bg-purple-200 dark:bg-purple-700 rounded mb-2"></div>
                <div className="h-4 bg-purple-200 dark:bg-purple-700 rounded mb-4"></div>
                <div className="h-10 bg-purple-200 dark:bg-purple-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!creditPacks || !Array.isArray(creditPacks)) {
    return (
      <div className="text-center text-purple-600 dark:text-purple-400 py-8">
        <p>Loading credit packs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {creditPacks.map((pack: any) => (
          <Card key={pack.id} className="bg-white dark:bg-black border-purple-200 dark:border-purple-600 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pack.name}</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  ${pack.price}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {pack.credits.toLocaleString()} credits
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                  ${(pack.price / pack.credits).toFixed(3)} per credit
                </p>
              </div>

              <CreditPackCheckout 
                creditPack={pack}
                onClose={() => {}}
                onSuccess={(result) => {
                  toast({
                    title: "Purchase Successful!",
                    description: `Added ${result.creditsAdded} credits to your account.`,
                  });
                }}
              />

              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">No expiration</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Credits never expire</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">All services</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Use across all AI tools</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-600">
        <div className="text-center">
          <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2">
            💡 Perfect for Flexibility
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">No monthly commitment</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">buy only what you need</p>
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
          </div>
        </div>
      </div>
    </div>
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
          const sortedItems = [...items].sort((a: any, b: any) => {
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