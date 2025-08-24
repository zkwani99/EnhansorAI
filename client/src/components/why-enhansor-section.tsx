import { Card, CardContent } from "@/components/ui/card";
import { Ban, Gem, Zap, DollarSign, Shield, Headphones } from "lucide-react";

export default function WhyEnhansorSection() {
  const advantages = [
    {
      icon: Ban,
      title: "No Watermarks",
      description: "Clean, professional outputs without any branding or watermarks on your generated content.",
      color: "from-green-400 to-green-500"
    },
    {
      icon: Gem,
      title: "HD Quality",
      description: "Stunning high-definition results up to 8K resolution for images and 4K for videos.",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Average processing time of 30 seconds for images and 2 minutes for videos.",
      color: "from-purple-400 to-purple-500"
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Competitive rates starting from $0.10 per image and flexible credit-based system.",
      color: "from-orange-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and automatically deleted after 30 days for complete privacy.",
      color: "from-indigo-400 to-indigo-500"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any questions or technical issues.",
      color: "from-red-400 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Enhansor?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the advantages that make us the preferred choice for AI-powered content creation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            
            return (
              <Card
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                data-testid={`card-advantage-${index}`}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${advantage.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
