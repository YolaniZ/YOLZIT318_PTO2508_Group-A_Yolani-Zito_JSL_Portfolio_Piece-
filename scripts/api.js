/**
 * @module api
 * Handles fetching tasks from the remote API.
 */

const API_URL = 'https://jsl-kanban-api.vercel.app/';

/**
 * Fetches tasks from the Kanban API.
 * @returns {Promise<Array>} Resolves with an array of task objects.
 * @throws {Error} If the network request fails or returns a non-OK status.
 */
export async function fetchTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  // API may return { tasks: [...] } or a plain array
  return Array.isArray(data) ? data : (data.tasks || []);
}
