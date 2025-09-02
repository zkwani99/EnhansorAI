import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  RefreshCw, 
  CreditCard, 
  Zap, 
  TrendingUp,
  Eye,
  EyeOff 
} from "lucide-react";

type BillingMode = "payg" | "subscription" | "hybrid";

interface TestValues {
  payg: {
    current: number;
    total: number;
  };
  subscription: {
    imageEnhancement: number;
    textToImage: number;
    textToVideo: number;
    imageToVideo: number;
  };
}

interface BillingModeSimulatorProps {
  isVisible?: boolean;
}

export function BillingModeSimulator({ isVisible = false }: BillingModeSimulatorProps) {
  const [mode, setMode] = useState<BillingMode>("payg");
  const [expanded, setExpanded] = useState(false);
  const [testValues, setTestValues] = useState<TestValues>({
    payg: {
      current: 600,
      total: 1000
    },
    subscription: {
      imageEnhancement: 200,
      textToImage: 300,
      textToVideo: 100,
      imageToVideo: 150
    }
  });

  // Store values in localStorage to persist across page navigations
  useEffect(() => {
    const savedMode = localStorage.getItem('admin-billing-mode') as BillingMode;
    const savedValues = localStorage.getItem('admin-test-values');
    
    if (savedMode) {
      setMode(savedMode);
    }
    if (savedValues) {
      setTestValues(JSON.parse(savedValues));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admin-billing-mode', mode);
    localStorage.setItem('admin-test-values', JSON.stringify(testValues));
    
    // Dispatch custom event to update all DualMeterSystem components
    window.dispatchEvent(new CustomEvent('admin-billing-mode-changed', {
      detail: { mode, testValues }
    }));
  }, [mode, testValues]);

  const resetToFull = () => {
    setTestValues({
      payg: {
        current: 1000,
        total: 1000
      },
      subscription: {
        imageEnhancement: 500,
        textToImage: 500,
        textToVideo: 200,
        imageToVideo: 300
      }
    });
  };

  const getModeIcon = (currentMode: BillingMode) => {
    switch (currentMode) {
      case "payg":
        return <CreditCard className="w-4 h-4" />;
      case "subscription":
        return <Zap className="w-4 h-4" />;
      case "hybrid":
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getModeColor = (currentMode: BillingMode) => {
    switch (currentMode) {
      case "payg":
        return "bg-blue-500";
      case "subscription":
        return "bg-green-500";
      case "hybrid":
        return "bg-purple-500";
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="border-2 border-red-200 bg-red-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-600" />
            <span className="text-red-800">Admin: Billing Mode Simulator</span>
            <Badge variant="destructive" className="text-xs">
              TESTING ONLY
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            data-testid="button-toggle-admin-panel"
          >
            {expanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      
      {expanded && (
        <CardContent className="space-y-6">
          {/* Mode Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Billing Mode</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["payg", "subscription", "hybrid"] as BillingMode[]).map((modeOption) => (
                <Button
                  key={modeOption}
                  variant={mode === modeOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMode(modeOption)}
                  className={`flex items-center gap-2 ${
                    mode === modeOption ? getModeColor(modeOption) : ""
                  }`}
                  data-testid={`button-mode-${modeOption}`}
                >
                  {getModeIcon(modeOption)}
                  {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Current: <strong>{mode.toUpperCase()}</strong> mode
            </p>
          </div>

          {/* Test Values */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Test Values</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={resetToFull}
                className="flex items-center gap-1"
                data-testid="button-reset-values"
              >
                <RefreshCw className="w-3 h-3" />
                Reset to 100%
              </Button>
            </div>

            {/* PAYG Values */}
            {(mode === "payg" || mode === "hybrid") && (
              <div className="space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Label className="text-sm font-medium text-blue-800">PAYG Credits</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Current</Label>
                    <Input
                      type="number"
                      value={testValues.payg.current}
                      onChange={(e) => setTestValues(prev => ({
                        ...prev,
                        payg: { ...prev.payg, current: parseInt(e.target.value) || 0 }
                      }))}
                      className="h-8 text-sm"
                      data-testid="input-payg-current"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Total</Label>
                    <Input
                      type="number"
                      value={testValues.payg.total}
                      onChange={(e) => setTestValues(prev => ({
                        ...prev,
                        payg: { ...prev.payg, total: parseInt(e.target.value) || 0 }
                      }))}
                      className="h-8 text-sm"
                      data-testid="input-payg-total"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Values */}
            {(mode === "subscription" || mode === "hybrid") && (
              <div className="space-y-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <Label className="text-sm font-medium text-green-800">Subscription Outputs</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Image Enhancement</Label>
                    <Input
                      type="number"
                      value={testValues.subscription.imageEnhancement}
                      onChange={(e) => setTestValues(prev => ({
                        ...prev,
                        subscription: { ...prev.subscription, imageEnhancement: parseInt(e.target.value) || 0 }
                      }))}
                      className="h-8 text-sm"
                      data-testid="input-sub-image-enhancement"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Text-to-Image</Label>
                    <Input
                      type="number"
                      value={testValues.subscription.textToImage}
                      onChange={(e) => setTestValues(prev => ({
                        ...prev,
                        subscription: { ...prev.subscription, textToImage: parseInt(e.target.value) || 0 }
                      }))}
                      className="h-8 text-sm"
                      data-testid="input-sub-text-to-image"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Text-to-Video</Label>
                    <Input
                      type="number"
                      value={testValues.subscription.textToVideo}
                      onChange={(e) => setTestValues(prev => ({
                        ...prev,
                        subscription: { ...prev.subscription, textToVideo: parseInt(e.target.value) || 0 }
                      }))}
                      className="h-8 text-sm"
                      data-testid="input-sub-text-to-video"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Image-to-Video</Label>
                    <Input
                      type="number"
                      value={testValues.subscription.imageToVideo}
                      onChange={(e) => setTestValues(prev => ({
                        ...prev,
                        subscription: { ...prev.subscription, imageToVideo: parseInt(e.target.value) || 0 }
                      }))}
                      className="h-8 text-sm"
                      data-testid="input-sub-image-to-video"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Current Status */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <Label className="text-sm font-medium">Current Status</Label>
            <div className="text-xs text-gray-600 mt-1">
              {mode === "payg" && (
                <p>PAYG Mode: {testValues.payg.current}/{testValues.payg.total} credits, Credits Required shown</p>
              )}
              {mode === "subscription" && (
                <p>Subscription Mode: Credits Required hidden, Outputs shown per service</p>
              )}
              {mode === "hybrid" && (
                <p>Hybrid Mode: Both meters shown side by side, PAYG logic on left</p>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}