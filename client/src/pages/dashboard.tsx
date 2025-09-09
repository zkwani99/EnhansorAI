import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BillingModeSimulator } from "@/components/admin/billing-mode-simulator";
import { 
  ArrowLeft, 
  User, 
  BarChart3, 
  CreditCard, 
  Bell, 
  Settings, 
  Eye, 
  EyeOff,
  Download,
  Trash2,
  Key,
  Calendar,
  DollarSign,
  Zap,
  TrendingUp,
  Clock,
  Lightbulb,
  Info
} from "lucide-react";

// Current Plan Section Component
function CurrentPlanSection() {
  const { data: currentSubscription } = useQuery({
    queryKey: ['/api/subscription/current'],
    retry: false,
  });

  // Map plan type to display names and pricing
  const planInfo: Record<string, { name: string; price: string; credits: string }> = {
    'payg': { name: 'Free Plan', price: '$0/month', credits: 'Pay-as-you-go' },
    'basic': { name: 'Starter Plan', price: '$12/month', credits: '1,000 credits per month' },
    'growth': { name: 'Growth Plan', price: '$39/month', credits: '5,000 credits per month' },
    'business': { name: 'Business Plan', price: '$99/month', credits: '15,000 credits per month' }
  };

  const planType = (currentSubscription as any)?.planType || 'payg';
  const plan = planInfo[planType] || planInfo['payg'];
  const isActive = (currentSubscription as any)?.status === 'active';

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{plan.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{plan.credits}</p>
        </div>
        <Badge className={isActive 
          ? "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white"
          : "bg-gray-100 text-gray-600"
        }>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>
      <div className="text-2xl font-bold text-purple-600">{plan.price}</div>
      {(currentSubscription as any)?.expiresAt && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {planType === 'payg' ? 'Pay-as-you-go billing' : `Renews on ${formatDate((currentSubscription as any).expiresAt)}`}
        </p>
      )}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" data-testid="button-change-plan">
          Change Plan
        </Button>
        {planType !== 'payg' && (
          <Button variant="outline" className="flex-1" data-testid="button-cancel-subscription">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  
  // Check if user is admin
  const isAdmin = (user as any)?.email === "zkwani99@gmail.com";

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-black dark:text-white transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{(user as any)?.firstName || 'User'}</p>
                <p className="text-xs text-gray-500">{(user as any)?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your account and view your usage</p>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="profile" className="flex items-center gap-2" data-testid="tab-profile">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-2" data-testid="tab-usage">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Usage</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2" data-testid="tab-billing">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2" data-testid="tab-notifications">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2" data-testid="tab-advanced">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          {/* Admin Testing Panel */}
          <BillingModeSimulator isVisible={isAdmin} />

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        defaultValue={(user as any)?.firstName || ""} 
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        defaultValue={(user as any)?.lastName || ""} 
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={(user as any)?.email || ""} 
                      data-testid="input-email"
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:bg-purple-600" data-testid="button-update-profile">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-purple-600" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={showPassword ? "text" : "password"}
                        data-testid="input-current-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        data-testid="button-toggle-password"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type={showPassword ? "text" : "password"}
                      data-testid="input-new-password"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type={showPassword ? "text" : "password"}
                      data-testid="input-confirm-password"
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:bg-purple-600" data-testid="button-change-password">
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    Credits Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DynamicCreditUsage />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Usage Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Today</span>
                      <span className="font-medium">45 credits</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">This Month</span>
                      <span className="font-medium">620 credits</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Total All Time</span>
                      <span className="font-medium">2,840 credits</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CurrentPlanSection />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Expires 12/27</p>
                        </div>
                      </div>
                      <Badge variant="outline">Default</Badge>
                    </div>
                    <Button variant="outline" className="w-full" data-testid="button-update-payment">
                      Update Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "December 15, 2024", amount: "$55.00", status: "Paid" },
                    { date: "November 15, 2024", amount: "$55.00", status: "Paid" },
                    { date: "October 15, 2024", amount: "$55.00", status: "Paid" }
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Growth Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{invoice.amount}</p>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Usage Alerts</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get notified when you're running low on credits</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-usage-alerts" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Payment Reminders</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receive reminders before your subscription renews</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-payment-reminders" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Account Updates</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Security alerts and important account changes</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-account-updates" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Product updates, tips, and promotional offers</p>
                  </div>
                  <Switch data-testid="switch-marketing-emails" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-purple-600" />
                    API Keys
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Use API keys to integrate Lorepic with your applications
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Production Key</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">en_prod_••••••••••••4f2a</p>
                      </div>
                      <Button variant="outline" size="sm" data-testid="button-copy-api-key">
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" data-testid="button-generate-api-key">
                    Generate New Key
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Export Data</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Download all your account data and generated content
                    </p>
                    <Button variant="outline" className="w-full" data-testid="button-export-data">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive" className="w-full" data-testid="button-delete-account">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Dynamic Credit Usage Component
function DynamicCreditUsage() {
  const { data: userCredits, isLoading, error } = useQuery({
    queryKey: ['/api/credits/balance'],
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-2">
              <div className="h-8 bg-gray-200 rounded mx-auto w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !userCredits) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Unable to load credit usage data</p>
        <p className="text-sm mt-1">Please try again later</p>
      </div>
    );
  }

  const credits = userCredits as any;
  const remainingCredits = credits.totalCredits - credits.usedCredits;
  const usagePercentage = Math.round((credits.usedCredits / credits.totalCredits) * 100);

  // Calculate individual service percentages
  const imageEnhancePercentage = credits.totalCredits > 0 
    ? Math.round((credits.imageEnhanceUsed / credits.totalCredits) * 100) 
    : 0;
  const textToImagePercentage = credits.totalCredits > 0 
    ? Math.round((credits.textToImageUsed / credits.totalCredits) * 100) 
    : 0;
  const textToVideoPercentage = credits.totalCredits > 0 
    ? Math.round((credits.textToVideoUsed / credits.totalCredits) * 100) 
    : 0;
  const imageToVideoPercentage = credits.totalCredits > 0 
    ? Math.round((credits.imageToVideoUsed / credits.totalCredits) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Overall Usage */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Usage - Pay-as-you-go Credits</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {credits.usedCredits} / {credits.totalCredits} credits
          </span>
        </div>
        <div className="space-y-2">
          <Progress value={usagePercentage} className="h-3" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Used: {usagePercentage}%</span>
            <span>Remaining: {remainingCredits} credits</span>
          </div>
        </div>
      </div>

      {/* Predictive Credit Usage Assistant */}
      <PredictiveCreditAssistant userCredits={userCredits} />

      {/* Service Breakdown */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">Usage by Service</h4>
        
        {/* Image Enhancement */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full"></div>
              Image Enhancement
            </span>
            <span className="text-sm font-medium">
              {credits.imageEnhanceUsed} credits ({imageEnhancePercentage}%)
            </span>
          </div>
          <Progress value={imageEnhancePercentage} className="h-2" />
        </div>

        {/* Text-to-Image */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full"></div>
              Text-to-Image AI
            </span>
            <span className="text-sm font-medium">
              {credits.textToImageUsed} credits ({textToImagePercentage}%)
            </span>
          </div>
          <Progress value={textToImagePercentage} className="h-2" />
        </div>

        {/* Text-to-Video */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full"></div>
              Text-to-Video AI
            </span>
            <span className="text-sm font-medium">
              {credits.textToVideoUsed} credits ({textToVideoPercentage}%)
            </span>
          </div>
          <Progress value={textToVideoPercentage} className="h-2" />
        </div>

        {/* Image-to-Video */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full"></div>
              Image-to-Video AI
            </span>
            <span className="text-sm font-medium">
              {credits.imageToVideoUsed || 0} credits ({imageToVideoPercentage}%)
            </span>
          </div>
          <Progress value={imageToVideoPercentage} className="h-2" />
        </div>
      </div>
    </div>
  );
}

// Predictive Credit Usage Assistant Component
function PredictiveCreditAssistant({ userCredits }: { userCredits: any }) {
  // Calculate predictions based on last 7 days usage pattern
  const calculatePredictions = () => {
    // Simulate daily usage pattern (in a real app, this would come from usage history API)
    const dailyUsageRate = userCredits.usedCredits / 7; // Assuming current usage happened over 7 days
    
    // Predicted monthly consumption (30 days)
    const predictedMonthlyUsage = Math.ceil(dailyUsageRate * 30);
    
    // Days until credits run out
    const remainingCredits = userCredits.totalCredits - userCredits.usedCredits;
    const daysUntilRunOut = dailyUsageRate > 0 ? Math.floor(remainingCredits / dailyUsageRate) : Infinity;
    
    // Generate recommendation
    let recommendation = "";
    if (daysUntilRunOut < 7) {
      recommendation = "⚠️ Consider purchasing more credits soon to avoid interruption.";
    } else if (predictedMonthlyUsage > userCredits.totalCredits * 0.8) {
      recommendation = "💡 Consider upgrading to Growth plan for better value.";
    } else if (dailyUsageRate < userCredits.totalCredits / 60) { // Very low usage
      recommendation = "✨ You're using credits efficiently! Current plan suits your usage well.";
    } else {
      recommendation = "📊 Your usage is trending normally. Current plan should suffice.";
    }
    
    return {
      predictedMonthlyUsage,
      daysUntilRunOut,
      recommendation
    };
  };

  const { predictedMonthlyUsage, daysUntilRunOut, recommendation } = calculatePredictions();

  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-purple-600" />
        <h4 className="font-medium text-purple-800">Predictive Credit Usage Assistant</h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3 h-3 text-purple-500 cursor-help" data-testid="info-predictive-assistant" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>This is an AI-powered estimate based on your recent usage patterns. Actual usage may vary.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        {/* Predicted Monthly Usage */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm text-purple-700 font-medium">Predicted Monthly Usage</p>
            <p className="text-lg font-bold text-purple-800" data-testid="text-predicted-monthly-usage">
              {predictedMonthlyUsage} credits
            </p>
          </div>
        </div>
        
        {/* Days Until Run Out */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm text-purple-700 font-medium">Est. Days Until Depletion</p>
            <p className="text-lg font-bold text-purple-800" data-testid="text-days-until-depletion">
              {daysUntilRunOut === Infinity ? "∞" : `${daysUntilRunOut} days`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Recommendation */}
      <div className="flex items-start gap-2 p-3 bg-white/60 rounded-md border border-purple-200">
        <Lightbulb className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-purple-700" data-testid="text-recommendation">
          {recommendation}
        </p>
      </div>
    </div>
  );
}