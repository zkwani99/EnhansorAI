import { createClient } from '@supabase/supabase-js';
import type { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

// Lazy initialization of Supabase client to avoid import-time crashes
let supabase: any = null;

function getSupabaseClient() {
  if (!supabase) {
    // Try server-specific env vars first, then fall back to VITE_ prefixed ones
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase environment variables. Please set SUPABASE_URL/SUPABASE_ANON_KEY or VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY.');
      throw new Error('Missing Supabase configuration');
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}

/**
 * Middleware to verify Supabase JWT tokens
 */
export const verifySupabaseAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No valid authorization token provided' });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify token with Supabase
    const supabaseClient = getSupabaseClient();
    const { data: { user }, error } = await supabaseClient.auth.getUser(token);

    if (error || !user) {
      console.error('Supabase auth error:', error?.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Upsert user in our database on first access
    await storage.upsertUser({
      id: user.id,
      email: user.email || '',
      firstName: user.user_metadata?.first_name || user.user_metadata?.given_name || '',
      lastName: user.user_metadata?.last_name || user.user_metadata?.family_name || '',
      profileImageUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
    });

    // Attach user info to request for downstream use
    (req as any).user = {
      id: user.id,
      email: user.email,
      claims: user.user_metadata,
      supabaseUser: user
    };

    next();
  } catch (error) {
    console.error('Supabase auth middleware error:', error);
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

/**
 * Get user info from Supabase token
 */
export const getSupabaseUser = async (token: string) => {
  try {
    const supabaseClient = getSupabaseClient();
    const { data: { user }, error } = await supabaseClient.auth.getUser(token);
    
    if (error || !user) {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Failed to verify Supabase user:', error);
    return null;
  }
};