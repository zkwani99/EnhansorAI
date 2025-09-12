import { supabase } from './supabaseClient';

export type AuthUser = {
  id: string;
  email: string;
  user_metadata: {
    avatar_url?: string;
    full_name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
  };
};

export type AuthSession = {
  access_token: string;
  user: AuthUser;
};

/**
 * Sign in with Google using Supabase Auth
 */
export const signInWithGoogle = async (redirectUrl?: string) => {
  const origin = window.location.origin;
  const finalRedirectUrl = redirectUrl || `${origin}/`;
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: finalRedirectUrl,
    },
  });

  if (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }

  return data;
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

/**
 * Get the current session
 */
export const getSession = async (): Promise<AuthSession | null> => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Get session error:', error);
    return null;
  }
  
  if (!session) {
    return null;
  }
  
  return {
    access_token: session.access_token,
    user: session.user as AuthUser,
  };
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Get user error:', error);
    return null;
  }
  
  return user as AuthUser;
};

/**
 * Listen for auth state changes
 */
export const onAuthStateChange = (callback: (session: AuthSession | null) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      callback({
        access_token: session.access_token,
        user: session.user as AuthUser,
      });
    } else {
      callback(null);
    }
  });
};