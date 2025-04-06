const BASE_URL = process.env.REACT_APP_BASE_URL;
const SECRET_TOKEN = process.env.REACT_APP_WEATHER_TOKEN;

export async function fetchWithToken(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: SECRET_TOKEN,
    },
  });
}
