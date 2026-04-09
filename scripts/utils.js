/**
 * @module utils
 * Shared utility helpers used across modules.
 */

/** Priority sort order */
const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

/**
 * Generates a simple unique ID string.
 * @returns {string}
 */
export function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Returns the column dot colour for a given status.
 * @param {string} status
 * @returns {string} CSS colour value.
 */
export function statusColor(status) {
  const map = {
    'todo': '#49C4E5',
    'doing': '#8471F2',
    'done': '#67E2AE',
  };
  return map[status?.toLowerCase()] || '#828FA3';
}

/**
 * Sorts tasks within a column by priority (High → Medium → Low).
 * @param {Array} tasks
 * @returns {Array} Sorted copy of the tasks array.
 */
export function sortByPriority(tasks) {
  return [...tasks].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.priority] ?? 1;
    const pb = PRIORITY_ORDER[b.priority] ?? 1;
    return pa - pb;
  });
}

/**
 * Groups a flat tasks array by their status field.
 * @param {Array} tasks
 * @returns {Object} Keys are status strings, values are task arrays.
 */
export function groupByStatus(tasks) {
  return tasks.reduce((acc, task) => {
    const key = task.status || 'todo';
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});
}
