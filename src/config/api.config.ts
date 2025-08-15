// API Configuration for different environments

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Determine API URL based on environment
export const API_BASE_URL = (() => {
  // If explicitly set in environment variables, use that
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Production (Netlify) -> Cloudflare Pages API
  if (isProduction) {
    return 'https://tulo-afrika.pages.dev/api';
  }
  
  // Development (local) -> local API or Cloudflare
  if (isDevelopment) {
    // Check if we're running on Cloudflare Pages (has /api routes)
    if (window.location.hostname.includes('pages.dev')) {
      return '/api';
    }
    // Otherwise, use Cloudflare Pages API
    return 'https://tulo-afrika.pages.dev/api';
  }
  
  // Default fallback
  return '/api';
})();

// Log the configuration for debugging
if (isDevelopment) {
  console.log('API Configuration:', {
    isDevelopment,
    isProduction,
    API_BASE_URL,
    hostname: window.location.hostname
  });
}

export default API_BASE_URL;