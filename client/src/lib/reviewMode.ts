// Review mode utility for Paddle compliance
// This allows temporary disabling of authentication for public access

export const enableReviewMode = () => {
  localStorage.setItem('review_mode', 'true');
  console.log('Review mode enabled - authentication disabled for public access');
};

export const disableReviewMode = () => {
  localStorage.removeItem('review_mode');
  console.log('Review mode disabled - authentication restored');
};

export const isReviewMode = () => {
  return import.meta.env.VITE_REVIEW_MODE === 'true' || localStorage.getItem('review_mode') === 'true';
};

export const getReviewModeStatus = () => {
  const envMode = import.meta.env.VITE_REVIEW_MODE === 'true';
  const localMode = localStorage.getItem('review_mode') === 'true';
  
  return {
    enabled: envMode || localMode,
    source: envMode ? 'environment' : localMode ? 'local' : 'disabled'
  };
};

// Auto-enable review mode for Paddle review (temporary)
// This can be easily toggled by commenting/uncommenting this line
enableReviewMode();