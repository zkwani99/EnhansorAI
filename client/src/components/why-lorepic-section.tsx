import { Card, CardContent } from "@/components/ui/card";
import { Zap, Palette, RotateCcw } from "lucide-react";

export default function WhyLorepicSection() {
  const advantages = [
    {
      icon: Zap,
      title: "Speed",
      description: "Fast GPU-powered results",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Palette,
      title: "Quality", 
      description: "Crisp images & smooth videos",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: RotateCcw,
      title: "Flexibility",
      description: "Subscriptions + PAYG credits",
      color: "from-blue-500 to-cyan-500"
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
        
        {/* Static Cards Grid - 3 cards side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            
            return (
              <Card
                key={index}
                className="group bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-200 dark:border-purple-600 h-full"
                data-testid={`card-advantage-${advantage.title.toLowerCase()}`}
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
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