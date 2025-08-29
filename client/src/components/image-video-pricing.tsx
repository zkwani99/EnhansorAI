import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const pricingTiers = [
  {
    id: "free-image-video",
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Try before you buy",
    subtitle: "Perfect for testing the platform",
    isPopular: false,
    isFree: true,
    features: [
      { text: "5 clips (5s each)", included: true },
      { text: "480p resolution", included: true },
      { text: "Watermarked output", included: true },
      { text: "Basic support", included: true },
      { text: "Real-time preview", included: false },
      { text: "AI Storyboard", included: false },
      { text: "Priority support", included: false },
      { text: "AI Concierge Mode", included: false }
    ],
    buttonText: "Start Free",
    buttonVariant: "outline" as const
  },
  {
    id: "starter-image-video",
    name: "Starter",
    price: "$15",
    period: "/month",
    description: "Choose: 240 clips (5s each) or 20 stitched videos (up to 1-minute each)",
    subtitle: "Perfect for hobbyists & creators",
    isPopular: true,
    isFree: false,
    features: [
      { text: "240 clips (5s) OR 20 stitched videos (1-min)", included: true },
      { text: "Up to 720p resolution", included: true },
      { text: "No watermark", included: true },
      { text: "AI Storyboard (basic)", included: true },
      { text: "Real-time preview", included: true },
      { text: "Email support", included: true },
      { text: "Priority support", included: false },
      { text: "AI Concierge Mode", included: false }
    ],
    buttonText: "Upgrade to Starter",
    buttonVariant: "default" as const
  },
  {
    id: "growth-image-video",
    name: "Growth",
    price: "$39",
    period: "/month",
    description: "Choose: 600 clips (5s each) or 25 stitched videos (up to 2-minutes each)",
    subtitle: "Great for freelancers & small teams",
    isPopular: false,
    isFree: false,
    features: [
      { text: "600 clips (5s) OR 25 stitched videos (2-min)", included: true },
      { text: "Up to 1080p resolution", included: true },
      { text: "No watermark", included: true },
      { text: "AI Storyboard (advanced)", included: true },
      { text: "Real-time preview", included: true },
      { text: "Priority support", included: true },
      { text: "Email support", included: true },
      { text: "AI Concierge Mode", included: false }
    ],
    buttonText: "Go Growth",
    buttonVariant: "default" as const
  },
  {
    id: "business-image-video",
    name: "Business",
    price: "$99",
    period: "/month",
    description: "Choose: 1800 clips (5s each) or 50 stitched videos (up to 3-minutes each)",
    subtitle: "Designed for agencies & pros",
    isPopular: false,
    isFree: false,
    features: [
      { text: "1800 clips (5s) OR 50 stitched videos (3-min)", included: true },
      { text: "Up to 1080p resolution", included: true },
      { text: "No watermark", included: true },
      { text: "AI Storyboard (full)", included: true },
      { text: "Real-time preview", included: true },
      { text: "Priority support + onboarding", included: true },
      { text: "AI Concierge Mode", included: true },
      { text: "Email support", included: true }
    ],
    buttonText: "Scale with Business",
    buttonVariant: "default" as const
  }
];

const comparisonFeatures = [
  { name: "Video Generation", free: "5 clips (5s)", starter: "240 clips OR 20 videos", growth: "600 clips OR 25 videos", business: "1800 clips OR 50 videos" },
  { name: "Max Resolution", free: "480p", starter: "720p", growth: "1080p", business: "1080p" },
  { name: "Watermark", free: "Yes", starter: "No", growth: "No", business: "No" },
  { name: "AI Storyboard", free: "×", starter: "Basic", growth: "Advanced", business: "Full" },
  { name: "Real-time Preview", free: "×", starter: "✓", growth: "✓", business: "✓" },
  { name: "Support", free: "Basic", starter: "Email", growth: "Priority", business: "Priority + Onboarding" },
  { name: "AI Concierge Mode", free: "×", starter: "×", growth: "×", business: "✓" }
];

export default function ImageVideoPricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // Add plan selection logic here
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Image-to-Video AI <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your images into stunning videos with our AI-powered platform. Choose the plan that fits your creative needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              onClick={() => setSelectedPlan(tier.id)}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col group ${
                selectedPlan === tier.id 
                  ? "border-2 border-purple-500 ring-2 ring-purple-200 ring-offset-2 transform scale-105" 
                  : tier.isPopular 
                    ? "border-2 border-purple-500 hover:border-purple-600" 
                    : "border border-gray-200 hover:border-purple-300"
              }`}
              data-testid={`card-plan-${tier.id}`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-4 py-1 text-xs font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8 h-full flex flex-col">
                <div className="text-center flex-grow">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  
                  {/* Price */}
                  <div className="text-4xl font-bold text-purple-600 mb-4">
                    {tier.price}
                    <span className="text-lg text-gray-600 font-normal">{tier.period}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-purple-600 font-medium mb-2">{tier.description}</p>
                  <p className="text-gray-600 text-sm mb-6">{tier.subtitle}</p>
                  
                  {/* Features */}
                  <div className="text-left mb-8">
                    <ul className="space-y-3">
                      {tier.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                          ) : (
                            <X className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" size={16} />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* CTA Button */}
                <Button
                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                    tier.isFree 
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300 group-hover:bg-purple-100 group-hover:text-purple-700" 
                      : "bg-purple-600 hover:bg-purple-700 text-white group-hover:scale-105 group-hover:shadow-lg"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(tier.id);
                  }}
                  data-testid={`button-select-plan-${tier.id}`}
                >
                  {tier.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600">
            <h3 className="text-2xl font-bold text-white text-center">Feature Comparison</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Starter
                    <Badge className="ml-2 bg-purple-100 text-purple-800 text-xs">Popular</Badge>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Growth</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{feature.name}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{feature.free}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600 bg-purple-50">{feature.starter}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{feature.growth}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{feature.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-6 bg-gray-50 text-center">
            <p className="text-gray-600 mb-4">Ready to transform your images into stunning videos?</p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 font-semibold rounded-lg"
              data-testid="button-get-started-comparison"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}