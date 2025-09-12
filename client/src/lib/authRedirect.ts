import { signInWithGoogle } from './supabaseAuth';

// Helper function to handle authentication redirects for service buttons
export function redirectToService(serviceId: string) {
  // Store the intended destination for post-login redirect
  localStorage.setItem('auth_redirect', `/${serviceId}`);
  // Use the helper to start Google sign-in with proper redirect
  startGoogleSignIn(`/${serviceId}`).catch(error => {
    console.error('Failed to start Google OAuth:', error);
    // Fallback error message
    alert('Unable to start Google sign-in. Please try again.');
  });
}

// Helper function to get redirect path after login
export function getAuthRedirect(): string {
  const redirect = localStorage.getItem('auth_redirect');
  localStorage.removeItem('auth_redirect');
  return redirect || '/';
}

// Helper function to start Google sign-in with custom redirect
export function startGoogleSignIn(customRedirect?: string) {
  const redirect = customRedirect || getAuthRedirect();
  const fullRedirectUrl = `${window.location.origin}${redirect}`;
  
  return signInWithGoogle(fullRedirectUrl);
}