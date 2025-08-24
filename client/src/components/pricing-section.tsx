import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Image, Palette, Video } from "lucide-react";
import { pricingPlans } from "@/lib/data";

export default function PricingSection() {
  const handleSelectPlan = (planId: string) => {
    console.log("Selected plan:", planId);
    // TODO: Implement plan selection logic
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
    switch (service) {
      case "image":
        return {
          iconBg: "bg-gradient-to-br from-primary-blue to-blue-400",
          headerBg: "bg-primary-blue",
          button: "bg-primary-blue hover:bg-blue-600",
          border: "border-primary-blue",
          popular: "bg-primary-blue"
        };
      case "ai":
        return {
          iconBg: "bg-gradient-to-br from-primary-purple to-purple-400",
          headerBg: "bg-primary-purple",
          button: "bg-primary-purple hover:bg-purple-600",
          border: "border-primary-purple",
          popular: "bg-primary-purple"
        };
      case "video":
        return {
          iconBg: "bg-gradient-to-br from-primary-orange to-orange-400",
          headerBg: "bg-primary-orange",
          button: "bg-primary-orange hover:bg-orange-600",
          border: "border-primary-orange",
          popular: "bg-primary-orange"
        };
      default:
        return {
          iconBg: "bg-gray-400",
          headerBg: "bg-gray-400",
          button: "bg-gray-400",
          border: "border-gray-400",
          popular: "bg-gray-400"
        };
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include access to our full suite of AI services.
          </p>
        </div>
        
        {Object.entries(pricingPlans).map(([serviceKey, serviceData]) => {
          const colors = getServiceColors(serviceKey);
          
          return (
            <div key={serviceKey} className="mb-20">
              <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-xl mb-4`}>
                  {getServiceIcon(serviceKey)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{serviceData.title}</h3>
                <p className="text-gray-600">{serviceData.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                {serviceData.plans.map((plan, index) => (
                  <Card
                    key={plan.id}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                      plan.isPopular ? `border-2 ${colors.border} relative` : 'border border-gray-200'
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
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h4>
                        <div className="text-3xl font-bold text-gray-900 mb-4">
                          {plan.price}
                          <span className="text-lg text-gray-600 font-normal">{plan.period}</span>
                        </div>
                        <ul className="space-y-3 mb-6 text-sm text-gray-600">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center">
                              {feature.included ? (
                                <Check className="text-green-500 mr-2" size={16} />
                              ) : (
                                <X className="text-red-500 mr-2" size={16} />
                              )}
                              {feature.text}
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full ${
                            plan.isFree 
                              ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                              : `${colors.button} text-white`
                          } py-2 rounded-lg font-medium transition-colors`}
                          onClick={() => handleSelectPlan(plan.id)}
                          data-testid={`button-select-plan-${plan.id}`}
                        >
                          {plan.buttonText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Feature Comparison Table */}
              <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`${colors.headerBg} text-white text-center py-4`}>
                  <h4 className="text-lg font-semibold">{serviceData.title} Feature Comparison</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                        {serviceData.plans.map((plan) => (
                          <th key={plan.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {serviceData.comparisonFeatures.map((feature, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {feature.name}
                          </td>
                          {feature.values.map((value, valueIndex) => (
                            <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                              {typeof value === 'boolean' ? (
                                value ? (
                                  <Check className="text-green-500 mx-auto" size={16} />
                                ) : (
                                  <X className="text-red-500 mx-auto" size={16} />
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
          );
        })}
      </div>
    </section>
  );
}
