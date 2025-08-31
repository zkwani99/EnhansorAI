import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp, Bot, CheckCircle, Circle, ArrowRight, Lightbulb, Target, Zap } from "lucide-react";
import { useUserPreferences } from "@/hooks/useUserPreferences";

interface TaskStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  optional?: boolean;
  tips?: string[];
}

interface AITaskCopilotProps {
  service: "image-enhance" | "text-to-image" | "text-to-video" | "image-to-video";
  currentStep?: number;
  onStepComplete?: (stepId: string) => void;
  className?: string;
}

const serviceWorkflows = {
  "image-enhance": {
    title: "Image Enhancement Workflow",
    steps: [
      {
        id: "upload",
        title: "Upload Your Image",
        description: "Select or drag and drop an image to enhance",
        completed: false,
        tips: ["Use high-quality source images for best results", "JPEG, PNG, and WebP formats are supported", "Images up to 10MB are accepted"]
      },
      {
        id: "settings",
        title: "Configure Enhancement Settings",
        description: "Choose enhancement type and adjust quality settings",
        completed: false,
        tips: ["Higher quality settings use more credits", "Preview mode helps you see changes before processing", "Consider your intended use (web, print, etc.)"]
      },
      {
        id: "preview",
        title: "Preview Results",
        description: "Review the enhanced image before finalizing",
        completed: false,
        optional: true,
        tips: ["Compare before/after views", "Check image details and sharpness", "Ensure colors look natural"]
      },
      {
        id: "process",
        title: "Process Enhancement",
        description: "Generate your enhanced image",
        completed: false,
        tips: ["Processing time depends on image size and quality settings", "You can continue using other services while processing", "Enhanced images are saved to your gallery"]
      }
    ]
  },
  "text-to-image": {
    title: "Text-to-Image Creation Workflow",
    steps: [
      {
        id: "prompt",
        title: "Write Your Prompt",
        description: "Describe the image you want to create in detail",
        completed: false,
        tips: ["Be specific about style, colors, and composition", "Include details about lighting and mood", "Use Style Memory to maintain consistent preferences"]
      },
      {
        id: "style",
        title: "Select Art Style",
        description: "Choose from realistic, artistic, or specialized styles",
        completed: false,
        tips: ["Realistic works best for photographs and portraits", "Artistic styles add creative interpretation", "Experiment with different styles for variety"]
      },
      {
        id: "settings",
        title: "Configure Image Settings",
        description: "Set size, aspect ratio, and advanced options",
        completed: false,
        tips: ["Square images work well for social media", "Portrait orientation is great for people and tall subjects", "Landscape format suits wide scenes and backgrounds"]
      },
      {
        id: "generate",
        title: "Generate Your Image",
        description: "Create your AI-generated artwork",
        completed: false,
        tips: ["Generation typically takes 30-60 seconds", "Real-time preview shows progress", "Multiple variations are often generated"]
      }
    ]
  },
  "text-to-video": {
    title: "Text-to-Video Creation Workflow",
    steps: [
      {
        id: "concept",
        title: "Define Your Video Concept",
        description: "Describe the video scene and action you want",
        completed: false,
        tips: ["Include movement and action in your description", "Specify camera angles and transitions", "Consider the story you want to tell"]
      },
      {
        id: "storyboard",
        title: "Plan Your Storyboard",
        description: "Break down your video into key scenes",
        completed: false,
        optional: true,
        tips: ["AI Storyboard can help visualize scenes", "Plan smooth transitions between shots", "Consider pacing and timing"]
      },
      {
        id: "parameters",
        title: "Set Video Parameters",
        description: "Choose duration, resolution, and style preferences",
        completed: false,
        tips: ["Longer videos use more credits", "4K resolution provides highest quality", "Cinematic style works well for most content"]
      },
      {
        id: "generate",
        title: "Generate Your Video",
        description: "Create your AI video with selected settings",
        completed: false,
        tips: ["Video generation takes 2-5 minutes depending on length", "Higher resolutions take longer to process", "Preview frames show generation progress"]
      }
    ]
  },
  "image-to-video": {
    title: "Image-to-Video Animation Workflow",
    steps: [
      {
        id: "source",
        title: "Upload Source Image",
        description: "Select the image you want to animate",
        completed: false,
        tips: ["Clear, well-lit images work best", "Consider the focal point for animation", "Images with good contrast are easier to animate"]
      },
      {
        id: "animation",
        title: "Define Animation Style",
        description: "Describe how you want the image to move",
        completed: false,
        tips: ["Specify natural movements (wind, water, breathing)", "Avoid complex multi-directional movements", "Keep animations subtle for best results"]
      },
      {
        id: "parameters",
        title: "Configure Video Settings",
        description: "Set duration, resolution, and animation strength",
        completed: false,
        tips: ["Start with shorter durations for testing", "Medium animation strength usually works best", "Higher resolutions show more detail"]
      },
      {
        id: "generate",
        title: "Animate Your Image",
        description: "Create your animated video from the static image",
        completed: false,
        tips: ["Animation processing takes 3-7 minutes", "Preview helps you see the animation progress", "Results are saved as MP4 files"]
      }
    ]
  }
};

export function AITaskCopilot({ service, currentStep = 0, onStepComplete, className }: AITaskCopilotProps) {
  const { preferences, updatePreferences } = useUserPreferences();
  const [isExpanded, setIsExpanded] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const workflow = serviceWorkflows[service];
  const isEnabled = preferences?.showCopilot === 1;
  const copilotLevel = preferences?.copilotLevel || "beginner";

  const handleToggle = (enabled: boolean) => {
    updatePreferences({
      showCopilot: enabled ? 1 : 0,
    });
  };

  const handleStepComplete = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepId);
    setCompletedSteps(newCompleted);
    
    if (onStepComplete) {
      onStepComplete(stepId);
    }
  };

  const handleLevelChange = (level: string) => {
    updatePreferences({
      copilotLevel: level,
    });
  };

  const progressPercentage = (completedSteps.size / workflow.steps.length) * 100;

  if (!isEnabled) {
    return (
      <Card className={`bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20 border-blue-200 dark:border-blue-700 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-blue-800 dark:text-blue-200">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-semibold">AI Task Copilot</span>
            </div>
            <Switch
              checked={false}
              onCheckedChange={handleToggle}
              data-testid="toggle-ai-copilot"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Enable AI Task Copilot to get step-by-step guidance and tips for better results.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20 border-blue-200 dark:border-blue-700 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-blue-800 dark:text-blue-200">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-semibold">AI Task Copilot</span>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-600">
              {workflow.title}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-700 hover:bg-blue-200 dark:text-blue-300 dark:hover:bg-blue-800"
              data-testid="button-toggle-copilot-view"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Switch
              checked={true}
              onCheckedChange={handleToggle}
              data-testid="toggle-ai-copilot-enabled"
            />
          </div>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Progress Overview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700 dark:text-blue-300">Progress</span>
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                {completedSteps.size} of {workflow.steps.length} steps
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Experience Level Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-700 dark:text-blue-300">Guidance Level:</span>
            <div className="flex space-x-1">
              {["beginner", "intermediate", "expert"].map((level) => (
                <Button
                  key={level}
                  variant={copilotLevel === level ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleLevelChange(level)}
                  className="capitalize text-xs"
                  data-testid={`button-level-${level}`}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-3">
            {workflow.steps.map((step, index) => {
              const isCompleted = completedSteps.has(step.id);
              const isCurrent = index === currentStep;
              const showTips = copilotLevel === "beginner" || (copilotLevel === "intermediate" && !isCompleted);

              return (
                <div 
                  key={step.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isCurrent 
                      ? "bg-blue-100 dark:bg-blue-800/30 border-blue-300 dark:border-blue-600" 
                      : isCompleted
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-white/50 dark:bg-black/20 border-blue-200 dark:border-blue-700"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${isCompleted ? "text-green-800 dark:text-green-200" : "text-blue-800 dark:text-blue-200"}`}>
                          {step.title}
                          {"optional" in step && step.optional && (
                            <Badge variant="outline" className="ml-2 text-xs">Optional</Badge>
                          )}
                          {isCurrent && (
                            <Badge className="ml-2 text-xs bg-blue-600">Current</Badge>
                          )}
                        </h4>
                        
                        {!isCompleted && isCurrent && (
                          <Button
                            size="sm"
                            onClick={() => handleStepComplete(step.id)}
                            className="text-xs"
                            data-testid={`button-complete-step-${step.id}`}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                      
                      <p className={`text-sm ${isCompleted ? "text-green-700 dark:text-green-300" : "text-blue-700 dark:text-blue-300"}`}>
                        {step.description}
                      </p>
                      
                      {showTips && step.tips && step.tips.length > 0 && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3 mt-2">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Tips:</h5>
                              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                                {step.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start space-x-1">
                                    <span className="text-yellow-600">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {progressPercentage === 100 && (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 dark:text-green-200 font-medium">
                Workflow Complete! 🎉
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Great job following the recommended workflow steps.
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}