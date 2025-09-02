import { useAuth } from "@/hooks/useAuth";
import CreditBalance from "./credit-balance";
import { SubscriptionOutputsMeter } from "./subscription-outputs-meter";

interface DualMeterSystemProps {
  service: "image-enhancement" | "text-to-image" | "text-to-video" | "image-to-video";
  className?: string;
  showDetails?: boolean;
}

export function DualMeterSystem({ service, className = "", showDetails = true }: DualMeterSystemProps) {
  const { user } = useAuth();
  
  // Determine plan type from user data (with safe property access)
  const planType = (user as any)?.planType || "payg";
  const isPaygPlan = planType === "payg";
  const isSubscriptionPlan = ["basic", "growth", "business"].includes(planType);
  
  // For future hybrid mode support
  const isHybridMode = false; // Set to true when hybrid mode is enabled

  if (isHybridMode) {
    // Hybrid mode: Show both meters side by side with labels
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">PAYG Credits</h3>
            <CreditBalance showDetails={showDetails} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Subscription Usage</h3>
            <SubscriptionOutputsMeter service={service} showDetails={showDetails} />
          </div>
        </div>
      </div>
    );
  }

  if (isSubscriptionPlan) {
    // Subscription plan: Show only subscription outputs meter (full width) with label
    return (
      <div className={`space-y-2 ${className}`}>
        <h3 className="text-sm font-medium text-gray-700">Subscription Usage</h3>
        <SubscriptionOutputsMeter service={service} showDetails={showDetails} />
      </div>
    );
  }

  // PAYG plan (default): Show only credits meter (full width) with label
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700">PAYG Credits</h3>
      <CreditBalance showDetails={showDetails} />
    </div>
  );
}