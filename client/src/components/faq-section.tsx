import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { faqData } from "@/lib/data";

export default function FAQSection() {
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);

  const toggleFAQ = (faqId: string) => {
    setOpenFAQs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about our AI services
          </p>
        </div>
        
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openFAQs.includes(faq.id);
            
            return (
              <Card
                key={faq.id}
                className={`bg-white dark:bg-black border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-purple-500 shadow-purple-500/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                }`}
                data-testid={`card-faq-${faq.id}`}
              >
                <CardContent className="p-0">
                  <button
                    className={`w-full text-left flex justify-between items-center p-6 transition-all duration-200 ${
                      isOpen 
                        ? 'bg-purple-50 dark:bg-purple-900/10' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                    onClick={() => toggleFAQ(faq.id)}
                    data-testid={`button-toggle-faq-${faq.id}`}
                  >
                    <h3 className={`text-lg font-bold pr-4 transition-colors duration-200 ${
                      isOpen 
                        ? 'text-purple-700 dark:text-purple-300' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`transform transition-all duration-300 flex-shrink-0 ${
                        isOpen 
                          ? 'rotate-180 text-purple-600 dark:text-purple-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                      size={20}
                    />
                  </button>
                  {isOpen && (
                    <div 
                      className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300" 
                      data-testid={`content-faq-${faq.id}`}
                    >
                      <p className="text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
