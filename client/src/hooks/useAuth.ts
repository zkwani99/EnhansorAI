import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { onAuthStateChange, type AuthSession } from "@/lib/supabaseAuth";

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Listen for Supabase auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange((session) => {
      setSession(session);
      setIsLoadingSession(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Query backend for user data when authenticated
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    enabled: !!session?.access_token, // Only run when we have a session
  });

  const isLoading = isLoadingSession || isLoadingUser;
  const isAuthenticated = !!session && !!user;

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
  };
}