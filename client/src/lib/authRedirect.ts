// Helper function to handle authentication redirects for service buttons
export function redirectToService(serviceId: string) {
  // Store the intended destination for post-login redirect
  localStorage.setItem('auth_redirect', `/${serviceId}`);
  // Redirect to login
  window.location.href = '/api/login';
}

// Helper function to get redirect path after login
export function getAuthRedirect(): string {
  const redirect = localStorage.getItem('auth_redirect');
  localStorage.removeItem('auth_redirect');
  return redirect || '/';
}