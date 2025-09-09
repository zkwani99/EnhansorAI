import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, CreditCard, Crown } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface SubscriptionPlan {
  planType: 'basic' | 'growth' | 'business';
  service: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limits: {
    imageEnhance?: number;
    textToImage?: number;
    textToVideo?: number;
    imageToVideo?: number;
  };
  isPopular?: boolean;
}

interface SubscriptionCheckoutFormProps {
  plan: SubscriptionPlan;
  billingPeriod: 'monthly' | 'yearly';
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function SubscriptionCheckoutForm({ plan, billingPeriod, clientSecret, onSuccess, onError }: SubscriptionCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/dashboard',
        },
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (err: any) {
      onError(err.message || 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const savings = billingPeriod === 'yearly' ? (plan.monthlyPrice * 12 - plan.yearlyPrice) : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
          {plan.isPopular && (
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          )}
        </div>
        
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-bold text-white">${price}</span>
          <span className="text-gray-400 ml-1">/{billingPeriod}</span>
          {savings > 0 && (
            <Badge variant="secondary" className="ml-3 bg-green-600/20 text-green-400 border-green-600/30">
              Save ${savings}
            </Badge>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {plan.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-300">
              <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <PaymentElement />
      </div>

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        data-testid="button-submit-subscription"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Subscribe to {plan.name}
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        You can cancel your subscription at any time. 
        {billingPeriod === 'yearly' && ' Annual plans are billed yearly.'}
      </p>
    </form>
  );
}

interface SubscriptionCheckoutProps {
  plan: SubscriptionPlan;
  billingPeriod: 'monthly' | 'yearly';
  triggerButton?: React.ReactNode;
  onSuccess?: () => void;
}

export function SubscriptionCheckout({ plan, billingPeriod, triggerButton, onSuccess }: SubscriptionCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const initiateSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/subscription/create-stripe-subscription", {
        planType: plan.planType,
        billingPeriod,
        service: plan.service,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription');
      }

      setClientSecret(data.clientSecret);
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to initialize subscription. Please try again.",
        variant: "destructive",
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = async () => {
    toast({
      title: "Subscription Active!",
      description: `Welcome to ${plan.name}! Your subscription is now active.`,
    });
    setIsOpen(false);
    setClientSecret("");
    onSuccess?.();
    // Refresh the page to update user's subscription status
    window.location.reload();
  };

  const handleError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !clientSecret) {
      initiateSubscription();
    }
    if (!open) {
      setClientSecret("");
    }
  };

  const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            data-testid={`button-subscribe-${plan.planType}`}
          >
            <Crown className="w-4 h-4 mr-2" />
            Subscribe to {plan.name}
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Subscribe to {plan.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete your subscription to access premium features
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            <p className="text-gray-400">Setting up your subscription...</p>
          </div>
        ) : clientSecret ? (
          <Elements 
            stripe={stripePromise} 
            options={{ 
              clientSecret,
              appearance: {
                theme: 'night',
                variables: {
                  colorPrimary: '#8b5cf6',
                  colorBackground: '#1f2937',
                  colorText: '#ffffff',
                  borderRadius: '8px',
                }
              }
            }}
          >
            <SubscriptionCheckoutForm
              plan={plan}
              billingPeriod={billingPeriod}
              clientSecret={clientSecret}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </Elements>
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-400">Failed to initialize payment. Please try again.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionCheckout;