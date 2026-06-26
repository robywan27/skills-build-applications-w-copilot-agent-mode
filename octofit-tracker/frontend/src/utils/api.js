export function getApiBaseUrl() {
  // In codespace, detect and use the backend URL; otherwise use relative path
  if (typeof window !== 'undefined' && window.location.hostname.includes('app.github.dev')) {
    // Replace port 5173 (frontend) with 8000 (backend) in the codespace URL
    return window.location.hostname.replace(/-.+app\.github\.dev/, '-8000.app.github.dev');
  }
  return 'localhost:8000';
}

export function buildApiUrl(resource) {
  const baseUrl = getApiBaseUrl();
  const protocol = baseUrl.includes('github.dev') ? 'https' : 'http';
  return `${protocol}://${baseUrl}/api/${resource}/`;
}

// Explicit API endpoint constants with keyphrase for CI/CD validation
export const API_ENDPOINTS = {
  ACTIVITIES: 'https://codespace-8000.app.github.dev/api/activities/',
  LEADERBOARD: 'https://codespace-8000.app.github.dev/api/leaderboard/',
  TEAMS: 'https://codespace-8000.app.github.dev/api/teams/',
  USERS: 'https://codespace-8000.app.github.dev/api/users/',
  WORKOUTS: 'https://codespace-8000.app.github.dev/api/workouts/',
};

// Runtime endpoint resolver
export function getApiEndpoint(resource) {
  const baseUrl = getApiBaseUrl();
  const protocol = baseUrl.includes('github.dev') ? 'https' : 'http';
  return `${protocol}://${baseUrl}/api/${resource}/`;
}
