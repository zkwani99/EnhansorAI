import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  Code, 
  Key, 
  Zap, 
  Globe, 
  Shield, 
  Clock,
  Copy,
  ExternalLink,
  CheckCircle
} from "lucide-react";

export default function APIPage() {
  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/enhance",
      description: "Enhance and restore images with AI",
      credits: "1-3 credits per image"
    },
    {
      method: "POST",
      endpoint: "/api/generate",
      description: "Generate images from text prompts",
      credits: "2-5 credits per image"
    },
    {
      method: "POST",
      endpoint: "/api/video",
      description: "Create videos from text descriptions",
      credits: "5-15 credits per video"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "High Performance",
      description: "Lightning-fast API responses with 99.9% uptime"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with API key authentication"
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Worldwide availability with low-latency endpoints"
    },
    {
      icon: Clock,
      title: "Real-time Processing",
      description: "Get results in seconds, not minutes"
    }
  ];

  const codeExample = `// Install the Lorepic SDK
npm install @lorepic/sdk

// Initialize the client
import { Lorepic } from '@lorepic/sdk';

const client = new Lorepic({
  apiKey: 'your_api_key_here'
});

// Generate an image
const result = await client.generate({
  prompt: 'A futuristic city at sunset',
  style: 'cinematic',
  size: '1024x1024'
});

console.log(result.imageUrl);`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-black dark:via-gray-900 dark:to-purple-900/30 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-2xl">
                <Code className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              Lorepic Developer API
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Integrate AI-powered image enhancement, generation, and video creation directly into your applications with our robust REST API.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                <span>RESTful API</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                <span>OpenAPI Spec</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                <span>SDKs Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column */}
          <div className="space-y-8">
            
            {/* Quick Start */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-purple-600" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">API Base URL</span>
                      <Button size="sm" variant="ghost" data-testid="button-copy-url">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <code className="text-sm text-purple-600 font-mono">
                      https://api.lorepic.com/v1
                    </code>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Get your API key from your dashboard and start making requests:
                    </p>
                    <Link href="/dashboard">
                      <Button className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900">
                        Get API Key
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Endpoints */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge 
                            className={`${endpoint.method === 'POST' ? 'bg-green-600' : 'bg-blue-600'} text-white`}
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm font-mono text-gray-700">
                            {endpoint.endpoint}
                          </code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{endpoint.description}</p>
                      <p className="text-xs text-purple-600 font-medium">{endpoint.credits}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Why Choose Our API?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="text-center p-4">
                        <div className="p-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-lg w-fit mx-auto mb-3">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Code Example */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Code Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{codeExample}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    data-testid="button-copy-code"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="shadow-lg border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  API Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      $0.01
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">per credit used</div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>Image Enhancement: 1-3 credits</div>
                      <div>Image Generation: 2-5 credits</div>
                      <div>Video Creation: 5-15 credits</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-700">No monthly fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-700">Pay only for what you use</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-700">Volume discounts available</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Resources & Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-between" data-testid="button-api-docs">
                    <span>API Documentation</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between" data-testid="button-sdk-docs">
                    <span>SDK Documentation</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between" data-testid="button-postman">
                    <span>Postman Collection</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between" data-testid="button-examples">
                    <span>Code Examples</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Our developer support team is here to help you integrate successfully
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white text-purple-600 hover:bg-gray-100"
                  data-testid="button-contact-support"
                >
                  Contact Developer Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}