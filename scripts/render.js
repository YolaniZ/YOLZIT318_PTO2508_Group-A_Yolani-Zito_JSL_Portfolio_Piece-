/**
 * @module render
 * Responsible for rendering columns and task cards onto the board.
 */

import { sortByPriority, statusColor } from './utils.js';

/** Ordered list of columns to display */
const COLUMNS = [
  { id: 'todo', label: 'Todo' },
  { id: 'doing', label: 'Doing' },
  { id: 'done', label: 'Done' },
];

/**
 * Renders all board columns and their task cards.
 * @param {Array} tasks - Full tasks array.
 * @param {Function} onTaskClick - Callback invoked with a task object when a card is clicked.
 */
export function renderBoard(tasks, onTaskClick) {
  const board = document.getElementById('board');
  board.innerHTML = '';

  COLUMNS.forEach(col => {
    const colTasks = sortByPriority(tasks.filter(t => (t.status || 'todo') === col.id));
    board.appendChild(createColumn(col, colTasks, onTaskClick));
  });

  // "+ New Column" placeholder
  const addCol = document.createElement('button');
  addCol.className = 'add-column-btn';
  addCol.textContent = '+ New Column';
  board.appendChild(addCol);
}

/**
 * Creates a column DOM element with its task cards.
 * @param {{id: string, label: string}} col
 * @param {Array} tasks
 * @param {Function} onTaskClick
 * @returns {HTMLElement}
 */
function createColumn(col, tasks, onTaskClick) {
  const wrapper = document.createElement('div');
  wrapper.className = 'column';

  const header = document.createElement('div');
  header.className = 'column-header';

  const dot = document.createElement('span');
  dot.className = 'column-dot';
  dot.style.background = statusColor(col.id);

  const title = document.createElement('span');
  title.className = 'column-title';
  title.textContent = `${col.label} (${tasks.length})`;

  header.appendChild(dot);
  header.appendChild(title);
  wrapper.appendChild(header);

  tasks.forEach(task => {
    wrapper.appendChild(createTaskCard(task, onTaskClick));
  });

  return wrapper;
}

/**
 * Creates a single task card DOM element.
 * @param {Object} task
 * @param {Function} onTaskClick
 * @returns {HTMLElement}
 */
function createTaskCard(task, onTaskClick) {
  const card = document.createElement('div');
  card.className = 'task-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Task: ${task.title}`);

  // Priority badge (stretch goal)
  if (task.priority) {
    const badge = document.createElement('span');
    badge.className = `priority-badge priority-${task.priority}`;
    badge.textContent = task.priority;
    card.appendChild(badge);
  }

  const titleEl = document.createElement('h3');
  titleEl.className = 'task-card-title';
  titleEl.textContent = task.title;
  card.appendChild(titleEl);

  const subtasks = task.subtasks || [];
  const done = subtasks.filter(s => s.isCompleted).length;
  const subtaskEl = document.createElement('p');
  subtaskEl.className = 'task-card-subtasks';
  subtaskEl.textContent = `${done} of ${subtasks.length} subtasks`;
  card.appendChild(subtaskEl);

  card.addEventListener('click', () => onTaskClick(task));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') onTaskClick(task); });

  return card;
}
