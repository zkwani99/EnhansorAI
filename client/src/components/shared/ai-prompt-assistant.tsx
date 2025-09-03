import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Lightbulb, Sparkles, RefreshCw, ArrowRight } from "lucide-react";

interface AIPromptAssistantProps {
  service: "text-to-image" | "text-to-video" | "image-to-video";
  onPromptSelect: (prompt: string) => void;
  className?: string;
}

export function AIPromptAssistant({ service, onPromptSelect, className = "" }: AIPromptAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<Array<{
    prompt: string;
    category: string;
    tags: string[];
  }>>([]);

  const promptSuggestions = {
    "text-to-image": [
      {
        prompt: "A majestic dragon soaring through storm clouds, lightning illuminating its scales, cinematic lighting, hyper-realistic",
        category: "Fantasy",
        tags: ["Epic", "Cinematic"]
      },
      {
        prompt: "Cyberpunk cityscape at night, neon lights reflecting on wet streets, flying cars, futuristic architecture",
        category: "Sci-Fi",
        tags: ["Cyberpunk", "Urban"]
      },
      {
        prompt: "Serene Japanese garden with cherry blossoms, koi pond, traditional wooden bridge, soft morning light",
        category: "Nature",
        tags: ["Peaceful", "Traditional"]
      },
      {
        prompt: "Professional portrait of a confident businesswoman in modern office, natural lighting, corporate style",
        category: "Portrait",
        tags: ["Professional", "Corporate"]
      },
      {
        prompt: "Abstract geometric composition with vibrant gradients, flowing shapes, modern digital art style",
        category: "Abstract",
        tags: ["Modern", "Colorful"]
      },
      {
        prompt: "Cozy coffee shop interior, warm lighting, vintage furniture, people working on laptops, steam rising from cups",
        category: "Lifestyle",
        tags: ["Cozy", "Atmospheric"]
      },
      {
        prompt: "Space station orbiting Earth, detailed sci-fi architecture, stars and nebula in background, realistic",
        category: "Space",
        tags: ["Futuristic", "Epic"]
      },
      {
        prompt: "Luxury sports car on mountain road at sunset, dynamic angle, motion blur, automotive photography",
        category: "Automotive",
        tags: ["Dynamic", "Luxury"]
      }
    ],
    "text-to-video": [
      {
        prompt: "Timelapse of sunrise over a bustling city, golden hour lighting, smooth camera movement",
        category: "Timelapse",
        tags: ["Urban", "Golden Hour"]
      },
      {
        prompt: "Person walking through enchanted forest, magical particles floating in air, cinematic slow motion",
        category: "Fantasy",
        tags: ["Magical", "Cinematic"]
      },
      {
        prompt: "Product showcase: smartphone rotating 360 degrees on white background, professional lighting",
        category: "Product",
        tags: ["Commercial", "Clean"]
      },
      {
        prompt: "Ocean waves crashing against rocky coastline, dramatic sky, seagulls flying overhead",
        category: "Nature",
        tags: ["Dramatic", "Coastal"]
      },
      {
        prompt: "Chef preparing gourmet dish in professional kitchen, close-up shots, steam and sizzling effects",
        category: "Food",
        tags: ["Culinary", "Professional"]
      },
      {
        prompt: "Abstract liquid motion graphics, flowing colors blending together, modern design aesthetic",
        category: "Abstract",
        tags: ["Fluid", "Modern"]
      },
      {
        prompt: "Drone footage flying through mountain valley, epic landscape, smooth aerial movement",
        category: "Aerial",
        tags: ["Epic", "Landscape"]
      },
      {
        prompt: "Neon light trails in dark city street, cars passing by, cyberpunk atmosphere, rain reflections",
        category: "Urban",
        tags: ["Cyberpunk", "Night"]
      }
    ],
    "image-to-video": [
      {
        prompt: "Zoom out slowly revealing the full scene, cinematic movement",
        category: "Camera Movement",
        tags: ["Cinematic", "Reveal"]
      },
      {
        prompt: "Add gentle parallax motion, depth-of-field blur, atmospheric effects",
        category: "Motion Graphics",
        tags: ["Parallax", "Atmospheric"]
      },
      {
        prompt: "Animate with subtle floating particles and light rays",
        category: "Effects",
        tags: ["Magical", "Ambient"]
      },
      {
        prompt: "Pan left to right showcasing the environment, smooth camera work",
        category: "Camera Movement",
        tags: ["Smooth", "Showcase"]
      },
      {
        prompt: "Add wind effects to hair and clothing, natural movement",
        category: "Natural Motion",
        tags: ["Realistic", "Dynamic"]
      },
      {
        prompt: "Rotate 360 degrees around the subject, product showcase style",
        category: "Product Demo",
        tags: ["Commercial", "360°"]
      }
    ]
  };

  const generateRandomSuggestions = () => {
    setIsRefreshing(true);
    const allPrompts = promptSuggestions[service];
    const shuffled = [...allPrompts].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4);
    
    setTimeout(() => {
      setCurrentSuggestions(selected);
      setIsRefreshing(false);
    }, 800); // Add slight delay for better UX
  };

  const handlePromptSelect = (prompt: string) => {
    onPromptSelect(prompt);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && currentSuggestions.length === 0) {
      generateRandomSuggestions();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900 hover:border-purple-400 transition-all duration-300 ${className}`}
          data-testid="button-ai-prompt-assistant"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Need Inspiration?
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-white dark:bg-black">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Prompt Assistant
          </SheetTitle>
          <SheetDescription>
            Get inspired with AI-generated prompt suggestions for your {service === "text-to-image" ? "image" : "video"} creation
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">Suggested Prompts</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={generateRandomSuggestions}
              disabled={isRefreshing}
              className="border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900"
              data-testid="button-refresh-suggestions"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Generating...' : 'New Ideas'}
            </Button>
          </div>

          {isRefreshing ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {currentSuggestions.map((suggestion, index) => (
                <Card 
                  key={index} 
                  className="border-purple-200 dark:border-purple-600 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-md transition-all duration-300 cursor-pointer group bg-white dark:bg-black"
                  onClick={() => handlePromptSelect(suggestion.prompt)}
                  data-testid={`prompt-suggestion-${index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant="secondary" 
                        className="bg-purple-100 text-purple-700 group-hover:bg-purple-200"
                      >
                        {suggestion.category}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      {suggestion.prompt}
                    </p>
                    
                    <div className="flex gap-1 flex-wrap">
                      {suggestion.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-purple-800 mb-1">Pro Tip</h4>
                <p className="text-sm text-purple-700">
                  Click any prompt to auto-fill it, then customize it to match your vision. 
                  The more specific your description, the better your results!
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}