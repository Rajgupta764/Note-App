// src/api.js

const BASE_URL = 'https://note-app-2-59kl.onrender.com/api';

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Try to get error message from response body
    let errorMessage = 'API request failed';
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // If response is not JSON or error parsing it, keep default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
