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
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about our AI services
          </p>
        </div>
        
        <div className="space-y-6">
          {faqData.map((faq) => {
            const isOpen = openFAQs.includes(faq.id);
            
            return (
              <Card
                key={faq.id}
                className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                data-testid={`card-faq-${faq.id}`}
              >
                <CardContent className="p-6">
                  <button
                    className="w-full text-left flex justify-between items-center"
                    onClick={() => toggleFAQ(faq.id)}
                    data-testid={`button-toggle-faq-${faq.id}`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-4 text-gray-600" data-testid={`content-faq-${faq.id}`}>
                      <p>{faq.answer}</p>
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
