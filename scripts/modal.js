/**
 * @module modal
 * Manages all modal dialogs: task detail, edit, add, and delete confirmation.
 */

import { generateId } from './utils.js';

const STATUSES = ['todo', 'doing', 'done'];

/** Currently viewed task reference (used across modal actions) */
let _currentTask = null;
/** Callback to persist changes: fn(updatedTasks) */
let _onSave = null;
/** Full tasks array reference */
let _tasks = [];

/**
 * Initialises the modal module with shared state and save callback.
 * @param {Array} tasks - Reference to the live tasks array.
 * @param {Function} onSave - Called with the updated tasks array after any change.
 */
export function initModals(tasks, onSave) {
  _tasks = tasks;
  _onSave = onSave;
  _bindStaticListeners();
}

/**
 * Updates the internal tasks reference (call after external mutations).
 * @param {Array} tasks
 */
export function setTasks(tasks) {
  _tasks = tasks;
}

/**
 * Opens the task detail modal for the given task.
 * @param {Object} task
 */
export function openTaskModal(task) {
  _currentTask = task;
  _populateTaskModal(task);
  _show('taskModalOverlay');
}

// ── Private helpers ──────────────────────────────────────────────────────────

function _show(id) { document.getElementById(id).classList.remove('hidden'); }
function _hide(id) { document.getElementById(id).classList.add('hidden'); }

function _populateStatusSelects(selectId) {
  const sel = document.getElementById(selectId);
  sel.innerHTML = STATUSES.map(s =>
    `<option value="${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</option>`
  ).join('');
}

function _populateTaskModal(task) {
  document.getElementById('taskModalTitle').textContent = task.title;
  document.getElementById('taskModalDesc').textContent = task.description || '';

  const subtasks = task.subtasks || [];
  document.getElementById('subtasksDone').textContent = subtasks.filter(s => s.isCompleted).length;
  document.getElementById('subtasksTotal').textContent = subtasks.length;

  const list = document.getElementById('subtasksList');
  list.innerHTML = '';
  subtasks.forEach((sub, i) => {
    const li = document.createElement('li');
    li.className = `subtask-item${sub.isCompleted ? ' completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" id="sub_${i}" ${sub.isCompleted ? 'checked' : ''} />
      <label for="sub_${i}"><span>${sub.title}</span></label>
    `;
    li.querySelector('input').addEventListener('change', e => {
      task.subtasks[i].isCompleted = e.target.checked;
      li.classList.toggle('completed', e.target.checked);
      document.getElementById('subtasksDone').textContent =
        task.subtasks.filter(s => s.isCompleted).length;
      _onSave([..._tasks]);
    });
    list.appendChild(li);
  });

  _populateStatusSelects('taskStatusSelect');
  document.getElementById('taskStatusSelect').value = task.status || 'todo';
  document.getElementById('taskDropdown').classList.add('hidden');
}

function _bindStaticListeners() {
  // Close modals on overlay click
  ['taskModalOverlay', 'editModalOverlay', 'addModalOverlay', 'deleteModalOverlay'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target.id === id) _hide(id);
    });
  });

  // Task detail: three-dot menu
  document.getElementById('taskMenuBtn').addEventListener('click', () => {
    document.getElementById('taskDropdown').classList.toggle('hidden');
  });

  // Task detail: save status
  document.getElementById('saveStatusBtn').addEventListener('click', () => {
    if (!_currentTask) return;
    _currentTask.status = document.getElementById('taskStatusSelect').value;
    _onSave([..._tasks]);
    _hide('taskModalOverlay');
  });

  // Task detail: open edit
  document.getElementById('editTaskBtn').addEventListener('click', () => {
    _hide('taskModalOverlay');
    openEditModal(_currentTask);
  });

  // Task detail: open delete confirm
  document.getElementById('deleteTaskBtn').addEventListener('click', () => {
    _hide('taskModalOverlay');
    openDeleteModal(_currentTask);
  });

  // Edit modal: add subtask row
  document.getElementById('addSubtaskBtn').addEventListener('click', () => {
    _appendSubtaskRow('editSubtasksList');
  });

  // Edit modal: save
  document.getElementById('saveEditBtn').addEventListener('click', _saveEdit);

  // Add modal: add subtask row
  document.getElementById('addNewSubtaskBtn').addEventListener('click', () => {
    _appendSubtaskRow('addSubtasksList');
  });

  // Add modal: create task
  document.getElementById('confirmAddTaskBtn').addEventListener('click', _confirmAdd);

  // Delete modal: confirm
  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (!_currentTask) return;
    const idx = _tasks.findIndex(t => t.id === _currentTask.id);
    if (idx !== -1) _tasks.splice(idx, 1);
    _onSave([..._tasks]);
    _hide('deleteModalOverlay');
    _currentTask = null;
  });

  // Delete modal: cancel
  document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
    _hide('deleteModalOverlay');
  });
}

/**
 * Opens the edit modal pre-filled with the given task's data.
 * @param {Object} task
 */
export function openEditModal(task) {
  _currentTask = task;
  document.getElementById('editTitle').value = task.title || '';
  document.getElementById('editDesc').value = task.description || '';

  _populateStatusSelects('editStatus');
  document.getElementById('editStatus').value = task.status || 'todo';
  document.getElementById('editPriority').value = task.priority || 'Medium';

  const list = document.getElementById('editSubtasksList');
  list.innerHTML = '';
  (task.subtasks || []).forEach(sub => _appendSubtaskRow('editSubtasksList', sub.title));

  _show('editModalOverlay');
}

/**
 * Opens the add-task modal.
 */
export function openAddModal() {
  _populateStatusSelects('addStatus');
  document.getElementById('addTitle').value = '';
  document.getElementById('addDesc').value = '';
  document.getElementById('addSubtasksList').innerHTML = '';
  document.getElementById('addPriority').value = 'Medium';
  _show('addModalOverlay');
}

/**
 * Opens the delete confirmation modal for a task.
 * @param {Object} task
 */
export function openDeleteModal(task) {
  _currentTask = task;
  document.getElementById('deleteModalMsg').textContent =
    `Are you sure you want to delete the '${task.title}' task and its subtasks? This action cannot be reversed.`;
  _show('deleteModalOverlay');
}

// ── Internal save handlers ────────────────────────────────────────────────────

function _saveEdit() {
  if (!_currentTask) return;
  const title = document.getElementById('editTitle').value.trim();
  if (!title) { alert('Title is required.'); return; }

  _currentTask.title = title;
  _currentTask.description = document.getElementById('editDesc').value.trim();
  _currentTask.status = document.getElementById('editStatus').value;
  _currentTask.priority = document.getElementById('editPriority').value;
  _currentTask.subtasks = _collectSubtasks('editSubtasksList', _currentTask.subtasks || []);

  _onSave([..._tasks]);
  _hide('editModalOverlay');
}

function _confirmAdd() {
  const title = document.getElementById('addTitle').value.trim();
  if (!title) { alert('Title is required.'); return; }

  const newTask = {
    id: generateId(),
    title,
    description: document.getElementById('addDesc').value.trim(),
    status: document.getElementById('addStatus').value,
    priority: document.getElementById('addPriority').value,
    subtasks: _collectSubtasks('addSubtasksList', []),
  };

  _tasks.push(newTask);
  _onSave([..._tasks]);
  _hide('addModalOverlay');
}

/**
 * Collects subtask titles from an edit list, preserving completion state.
 * @param {string} listId
 * @param {Array} existing - Existing subtasks to match completion state.
 * @returns {Array}
 */
function _collectSubtasks(listId, existing) {
  const rows = document.getElementById(listId).querySelectorAll('.edit-subtask-row input[type="text"]');
  return Array.from(rows).map((input, i) => ({
    title: input.value.trim(),
    isCompleted: existing[i]?.isCompleted || false,
  })).filter(s => s.title);
}

/**
 * Appends a new subtask input row to an edit list.
 * @param {string} listId
 * @param {string} [value=''] - Pre-fill value.
 */
function _appendSubtaskRow(listId, value = '') {
  const list = document.getElementById(listId);
  const li = document.createElement('li');
  li.className = 'edit-subtask-row';
  li.innerHTML = `
    <input type="text" placeholder="e.g. Make coffee" value="${value}" />
    <button class="remove-subtask-btn" aria-label="Remove subtask">&times;</button>
  `;
  li.querySelector('.remove-subtask-btn').addEventListener('click', () => li.remove());
  list.appendChild(li);
}
