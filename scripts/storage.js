/**
 * @module storage
 * Handles all local storage operations for tasks and app state.
 */

const TASKS_KEY = 'kanban_tasks';
const THEME_KEY = 'kanban_theme';

/**
 * Saves the tasks array to local storage.
 * @param {Array} tasks - Array of task objects to persist.
 */
export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Loads tasks from local storage.
 * @returns {Array|null} Parsed tasks array, or null if none stored.
 */
export function loadTasks() {
  const raw = localStorage.getItem(TASKS_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Saves the current theme preference.
 * @param {'light'|'dark'} theme
 */
export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Loads the saved theme preference.
 * @returns {'light'|'dark'} Saved theme, defaults to 'light'.
 */
export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}
