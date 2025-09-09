import { useState, useEffect } from "react";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X, CreditCard } from "lucide-react";

// Initialize Stripe
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  displayPrice: string;
  description?: string;
  isPopular?: boolean;
}

interface CreditPackCheckoutProps {
  creditPack: CreditPack;
  onClose: () => void;
  onSuccess: (result: { creditsAdded: number; packName: string; totalCredits: number; remainingCredits: number }) => void;
}

function CheckoutForm({ creditPack, onClose, onSuccess }: CreditPackCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm purchase on backend and add credits
        const response = await apiRequest("POST", "/api/credits/confirm-purchase", {
          paymentIntentId: paymentIntent.id
        });
        const result = await response.json();

        if (response.ok) {
          onSuccess(result);
          onClose();
        } else {
          throw new Error(result.message || 'Failed to confirm purchase');
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-testid="checkout-modal">
      <Card className="w-full max-w-md mx-4 bg-white dark:bg-black">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Complete Purchase</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              data-testid="button-close-checkout"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Purchase Summary */}
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900 dark:text-white">{creditPack.name}</span>
              <span className="text-lg font-bold text-purple-600">{creditPack.displayPrice}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {creditPack.credits.toLocaleString()} credits
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ${(creditPack.price / creditPack.credits / 100).toFixed(3)} per credit
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <PaymentElement />
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                data-testid="button-cancel-payment"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!stripe || isProcessing}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                data-testid="button-complete-payment"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Pay {creditPack.displayPrice}
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CreditPackCheckout({ creditPack, onClose, onSuccess }: CreditPackCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/credits/purchase", {
          creditPackId: creditPack.id
        });
        const data = await response.json();

        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error(data.message || 'Failed to create payment intent');
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [creditPack.id, onClose, toast]);

  if (isLoading || !clientSecret) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4 bg-white dark:bg-black">
          <CardContent className="p-6 text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">Preparing checkout...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Elements 
      stripe={stripePromise} 
      options={{ 
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#7c3aed',
          }
        }
      }}
    >
      <CheckoutForm creditPack={creditPack} onClose={onClose} onSuccess={onSuccess} />
    </Elements>
  );
}