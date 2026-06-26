export function getApiBaseUrl() {
  return '';
}

export function buildApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`;
}

// Explicit API endpoint constants
export const API_ENDPOINTS = {
  ACTIVITIES: '/api/activities/',
  LEADERBOARD: '/api/leaderboard/',
  TEAMS: '/api/teams/',
  USERS: '/api/users/',
  WORKOUTS: '/api/workouts/',
};
