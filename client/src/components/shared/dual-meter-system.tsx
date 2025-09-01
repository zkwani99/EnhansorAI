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
    // Hybrid mode: Show both meters side by side
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
        <CreditBalance showDetails={showDetails} />
        <SubscriptionOutputsMeter service={service} showDetails={showDetails} />
      </div>
    );
  }

  if (isSubscriptionPlan) {
    // Subscription plan: Show only subscription outputs meter (full width)
    return (
      <div className={className}>
        <SubscriptionOutputsMeter service={service} showDetails={showDetails} />
      </div>
    );
  }

  // PAYG plan (default): Show only credits meter (full width)
  return (
    <div className={className}>
      <CreditBalance showDetails={showDetails} />
    </div>
  );
}