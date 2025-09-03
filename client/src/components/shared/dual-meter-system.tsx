import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import CreditBalance from "./credit-balance";
import { SubscriptionOutputsMeter } from "./subscription-outputs-meter";

interface DualMeterSystemProps {
  service: "image-enhancement" | "text-to-image" | "text-to-video" | "image-to-video";
  className?: string;
  showDetails?: boolean;
}

export function DualMeterSystem({ service, className = "", showDetails = true }: DualMeterSystemProps) {
  const { user } = useAuth();
  const [adminMode, setAdminMode] = useState<string>("payg");
  const [adminTestValues, setAdminTestValues] = useState<any>(null);
  
  // Listen for admin billing mode changes
  useEffect(() => {
    const handleAdminModeChange = (event: CustomEvent) => {
      setAdminMode(event.detail.mode);
      setAdminTestValues(event.detail.testValues);
    };

    // Load initial admin settings
    const savedMode = localStorage.getItem('admin-billing-mode');
    const savedValues = localStorage.getItem('admin-test-values');
    if (savedMode) {
      setAdminMode(savedMode);
    }
    if (savedValues) {
      setAdminTestValues(JSON.parse(savedValues));
    }

    window.addEventListener('admin-billing-mode-changed', handleAdminModeChange as EventListener);
    return () => {
      window.removeEventListener('admin-billing-mode-changed', handleAdminModeChange as EventListener);
    };
  }, []);
  
  // Check if user is admin (for now, check by email - in production this would be a role)
  const isAdmin = (user as any)?.email === "zkwani99@gmail.com";
  
  // Determine plan type - use admin override if admin is logged in, otherwise use user data
  let planType, isPaygPlan, isSubscriptionPlan, isHybridMode;
  
  if (isAdmin && adminMode) {
    // Admin override mode
    planType = adminMode;
    isPaygPlan = adminMode === "payg";
    isSubscriptionPlan = adminMode === "subscription";
    isHybridMode = adminMode === "hybrid";
  } else {
    // Normal user mode
    planType = (user as any)?.planType || "payg";
    isPaygPlan = planType === "payg";
    isSubscriptionPlan = ["basic", "growth", "business"].includes(planType);
    isHybridMode = false;
  }

  if (isHybridMode) {
    // Hybrid mode: Show both meters side by side with labels
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PAYG Credits</h3>
            <CreditBalance showDetails={showDetails} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subscription Usage</h3>
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
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Subscription Usage</h3>
        <SubscriptionOutputsMeter service={service} showDetails={showDetails} />
      </div>
    );
  }

  // PAYG plan (default): Show only credits meter (full width) with label
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">PAYG Credits</h3>
      <CreditBalance showDetails={showDetails} />
    </div>
  );
}