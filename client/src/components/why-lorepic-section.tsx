import { Card, CardContent } from "@/components/ui/card";
import { Zap, Palette, RotateCcw, Shield } from "lucide-react";

export default function WhyLorepicSection() {
  const advantages = [
    {
      icon: Zap,
      emoji: "⚡",
      title: "Speed",
      tagline: "Lightning-fast AI rendering powered by GPU acceleration.",
      color: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50/50 to-violet-50/50 dark:from-black dark:to-black",
      borderColor: "border-purple-200 dark:border-purple-600 hover:border-purple-400 dark:hover:border-purple-500",
      shadowColor: "hover:shadow-purple-500/20"
    },
    {
      icon: Palette,
      emoji: "🎨",
      title: "Quality",
      tagline: "Crystal-clear images & cinematic-quality videos every time.",
      color: "from-purple-600 to-pink-500",
      bgGradient: "from-purple-50/50 to-pink-50/50 dark:from-black dark:to-black",
      borderColor: "border-purple-200 dark:border-purple-600 hover:border-pink-400 dark:hover:border-pink-500",
      shadowColor: "hover:shadow-pink-500/20"
    },
    {
      icon: RotateCcw,
      emoji: "🔄",
      title: "Flexibility",
      tagline: "Choose between subscription plans or flexible PAYG credits.",
      color: "from-purple-700 to-indigo-500",
      bgGradient: "from-purple-50/50 to-indigo-50/50 dark:from-black dark:to-black",
      borderColor: "border-purple-200 dark:border-purple-600 hover:border-indigo-400 dark:hover:border-indigo-500",
      shadowColor: "hover:shadow-indigo-500/20"
    },
    {
      icon: Shield,
      emoji: "🔒",
      title: "Security",
      tagline: "Your data stays encrypted, GDPR-ready, and safe with us.",
      color: "from-purple-800 to-violet-600",
      bgGradient: "from-purple-50/50 to-violet-50/50 dark:from-black dark:to-black",
      borderColor: "border-purple-200 dark:border-purple-600 hover:border-violet-400 dark:hover:border-violet-500",
      shadowColor: "hover:shadow-violet-500/20"
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
        
        {/* Static Cards Grid - 4 cards on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            
            return (
              <Card
                key={index}
                className={`group bg-gradient-to-br ${advantage.bgGradient} border ${advantage.borderColor} rounded-2xl shadow-lg ${advantage.shadowColor} hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 h-full cursor-pointer`}
                data-testid={`card-advantage-${advantage.title.toLowerCase()}`}
              >
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className={`w-24 h-24 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-4xl">{advantage.emoji}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {advantage.tagline}
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