import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { UserPreferences } from "@shared/schema";

export function useUserPreferences() {
  const queryClient = useQueryClient();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ['/api/preferences'],
    retry: false,
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: Partial<UserPreferences>) => {
      const response = await fetch('/api/preferences', {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    },
  });

  const resetPreferencesMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/preferences/reset', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to reset preferences');
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    },
  });

  return {
    preferences: preferences as UserPreferences | undefined,
    isLoading,
    updatePreferences: updatePreferencesMutation.mutate,
    resetPreferences: resetPreferencesMutation.mutate,
    isUpdating: updatePreferencesMutation.isPending,
    isResetting: resetPreferencesMutation.isPending,
  };
}