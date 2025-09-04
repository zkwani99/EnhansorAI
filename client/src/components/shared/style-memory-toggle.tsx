import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Palette, Plus, X, Edit3 } from "lucide-react";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useToast } from "@/hooks/use-toast";

interface StyleMemoryToggleProps {
  service: "image-enhance" | "text-to-image" | "text-to-video" | "image-to-video";
  onStyleApplied?: (style: any) => void;
  className?: string;
}

export function StyleMemoryToggle({ service, onStyleApplied, className }: StyleMemoryToggleProps) {
  const { preferences, updatePreferences, isUpdating } = useUserPreferences();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [newBrandColor, setNewBrandColor] = useState("");
  const [newStyle, setNewStyle] = useState("");
  const [editingStyle, setEditingStyle] = useState<string | null>(null);

  const serviceNames = {
    "image-enhance": "Image Enhancement",
    "text-to-image": "Text-to-Image",
    "text-to-video": "Text-to-Video",
    "image-to-video": "Image-to-Video",
  };

  const isEnabled = preferences?.styleMemoryEnabled === 1;
  const savedColors = preferences?.savedBrandColors ? JSON.parse(preferences.savedBrandColors) : [];
  const savedStyles = preferences?.preferredStyles ? JSON.parse(preferences.preferredStyles) : [];

  const handleToggle = (enabled: boolean) => {
    updatePreferences({
      styleMemoryEnabled: enabled ? 1 : 0,
    });
    
    toast({
      title: enabled ? "Style Memory Enabled" : "Style Memory Disabled",
      description: enabled 
        ? `Your style preferences will be remembered for ${serviceNames[service]}`
        : "Style preferences will not be saved",
    });
  };

  const addBrandColor = () => {
    if (!newBrandColor.trim()) return;
    
    const updatedColors = [...savedColors, newBrandColor.trim()];
    updatePreferences({
      savedBrandColors: JSON.stringify(updatedColors),
    });
    setNewBrandColor("");
    
    toast({
      title: "Brand Color Added",
      description: `Color ${newBrandColor} saved to your style memory`,
    });
  };

  const removeBrandColor = (colorToRemove: string) => {
    const updatedColors = savedColors.filter((color: string) => color !== colorToRemove);
    updatePreferences({
      savedBrandColors: JSON.stringify(updatedColors),
    });
    
    toast({
      title: "Brand Color Removed",
      description: "Color removed from your style memory",
    });
  };

  const addStyle = () => {
    if (!newStyle.trim()) return;
    
    const styleData = {
      id: Date.now().toString(),
      name: `Custom Style ${savedStyles.length + 1}`,
      description: newStyle.trim(),
      service,
      createdAt: new Date().toISOString(),
    };
    
    const updatedStyles = [...savedStyles, styleData];
    updatePreferences({
      preferredStyles: JSON.stringify(updatedStyles),
    });
    setNewStyle("");
    
    toast({
      title: "Style Added",
      description: "Custom style saved to your memory",
    });
  };

  const removeStyle = (styleId: string) => {
    const updatedStyles = savedStyles.filter((style: any) => style.id !== styleId);
    updatePreferences({
      preferredStyles: JSON.stringify(updatedStyles),
    });
    
    toast({
      title: "Style Removed",
      description: "Style removed from your memory",
    });
  };

  const applyStyle = (style: any) => {
    if (onStyleApplied) {
      onStyleApplied(style);
    }
    
    toast({
      title: "Style Applied",
      description: `Applied your saved style: ${style.name}`,
    });
  };

  return (
    <Card className={`bg-gradient-to-br from-purple-50 to-purple-100 dark:bg-black border-purple-200 dark:border-purple-600 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-purple-800 dark:text-white">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="text-lg font-semibold">Style Memory</span>
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-800 dark:text-purple-200 dark:border-purple-600">
              {serviceNames[service]}
            </Badge>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={handleToggle}
            disabled={isUpdating}
            data-testid="toggle-style-memory"
          />
        </CardTitle>
      </CardHeader>
      
      {isEnabled && (
        <CardContent className="space-y-4">
          <p className="text-sm text-purple-700 dark:text-gray-300">
            Remember your style preferences and brand colors for consistent results across sessions.
          </p>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-600 dark:text-white dark:hover:bg-purple-800"
            data-testid="button-expand-style-memory"
          >
            {isExpanded ? "Hide Style Library" : "Manage Style Library"}
          </Button>
          
          {isExpanded && (
            <div className="space-y-6 mt-4 p-4 bg-white/50 dark:bg-black/50 rounded-lg border border-purple-200 dark:border-purple-600">
              {/* Brand Colors Section */}
              <div>
                <Label className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2 block">
                  <Palette className="h-4 w-4 inline mr-1" />
                  Brand Colors
                </Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {savedColors.map((color: string, index: number) => (
                    <div key={index} className="flex items-center bg-purple-100 dark:bg-purple-800 rounded-full px-3 py-1 text-sm">
                      <div 
                        className="w-4 h-4 rounded-full mr-2 border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-purple-800 dark:text-purple-200">{color}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBrandColor(color)}
                        className="ml-2 h-5 w-5 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="#FFFFFF or rgb(255,255,255)"
                    value={newBrandColor}
                    onChange={(e) => setNewBrandColor(e.target.value)}
                    className="flex-1"
                    data-testid="input-brand-color"
                  />
                  <Button onClick={addBrandColor} size="sm" disabled={!newBrandColor.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Preferred Styles Section */}
              <div>
                <Label className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2 block">
                  <Edit3 className="h-4 w-4 inline mr-1" />
                  Saved Styles
                </Label>
                <div className="space-y-2 mb-3">
                  {savedStyles
                    .filter((style: any) => style.service === service)
                    .map((style: any) => (
                    <div key={style.id} className="flex items-center justify-between bg-purple-100 dark:bg-purple-800 rounded-lg p-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-800 dark:text-purple-200">{style.name}</h4>
                        <p className="text-sm text-purple-600 dark:text-purple-400 truncate">{style.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => applyStyle(style)}
                          className="text-purple-700 hover:bg-purple-200 dark:text-purple-300 dark:hover:bg-purple-700"
                          data-testid={`button-apply-style-${style.id}`}
                        >
                          Apply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStyle(style.id)}
                          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Describe your preferred style (e.g., 'vibrant colors with soft lighting and minimalist composition')"
                    value={newStyle}
                    onChange={(e) => setNewStyle(e.target.value)}
                    className="w-full"
                    rows={3}
                    data-testid="textarea-new-style"
                  />
                  <Button 
                    onClick={addStyle} 
                    size="sm" 
                    disabled={!newStyle.trim()}
                    className="w-full"
                    data-testid="button-add-style"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Save Style to Memory
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}