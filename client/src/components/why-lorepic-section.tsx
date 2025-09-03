import { Card, CardContent } from "@/components/ui/card";
import { Zap, Palette, RotateCcw, Shield } from "lucide-react";

export default function WhyLorepicSection() {
  const advantages = [
    {
      icon: Zap,
      title: "Speed",
      description: "Fast GPU-powered results",
      color: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
    },
    {
      icon: Palette,
      title: "Quality", 
      description: "Crisp images & smooth videos",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      icon: RotateCcw,
      title: "Flexibility",
      description: "Subscriptions + PAYG credits",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Your data stays safe. Fully GDPR-ready with encrypted processing.",
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Lorepic?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            From content creators to enterprise businesses, successful professionals across industries grow and scale with Lorepic's AI-powered technology.
          </p>
        </div>
        
        {/* Static Cards Grid - 4 cards side by side on desktop, 2x2 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            
            return (
              <Card
                key={index}
                className={`group bg-gradient-to-br ${advantage.bgGradient} border border-purple-200 dark:border-purple-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full`}
                data-testid={`card-advantage-${advantage.title.toLowerCase()}`}
              >
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className={`w-20 h-20 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white text-3xl" size={36} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}