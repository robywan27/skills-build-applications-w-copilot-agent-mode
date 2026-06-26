export function getApiBaseUrl() {
  return '';
}

export function buildApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}`;
}
