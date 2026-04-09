/**
 * @module main
 * Application entry point. Orchestrates data loading, rendering, and module init.
 */

import { fetchTasks } from './api.js';
import { saveTasks, loadTasks } from './storage.js';
import { renderBoard } from './render.js';
import { initModals, openTaskModal, openAddModal, setTasks } from './modal.js';
import { initSidebar } from './sidebar.js';

/** In-memory tasks array shared across modules */
let tasks = [];

/** Board names derived from the task data */
const BOARDS = ['Platform Launch'];
const ACTIVE_BOARD = 'Platform Launch';

// ── Bootstrap ─────────────────────────────────────────────────────────────────

async function init() {
  initSidebar(BOARDS, ACTIVE_BOARD);
  _bindAddTaskButtons();

  const cached = loadTasks();

  if (cached && cached.length > 0) {
    // Use cached data immediately, then silently refresh in background
    tasks = cached;
    _render();
    _refreshFromApi();
  } else {
    // First load — show loading state and fetch
    await _loadFromApi();
  }
}

// ── Data Loading ──────────────────────────────────────────────────────────────

/**
 * Fetches tasks from the API, updates state, and re-renders.
 * Shows loading/error UI states as appropriate.
 */
async function _loadFromApi() {
  _showLoading(true);
  try {
    const fetched = await fetchTasks();
    tasks = _normaliseTasks(fetched);
    saveTasks(tasks);
    _render();
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    _showError(true);
  } finally {
    _showLoading(false);
  }
}

/**
 * Background refresh — updates local storage and re-renders without loading UI.
 */
async function _refreshFromApi() {
  try {
    const fetched = await fetchTasks();
    // Merge: keep local edits for tasks that exist, add new ones from API
    const apiTasks = _normaliseTasks(fetched);
    const localIds = new Set(tasks.map(t => t.id));
    apiTasks.forEach(t => { if (!localIds.has(t.id)) tasks.push(t); });
    saveTasks(tasks);
    _render();
  } catch {
    // Silent fail — we already have cached data displayed
  }
}

/**
 * Ensures every task has the required fields with sensible defaults.
 * @param {Array} raw - Raw tasks from API.
 * @returns {Array}
 */
function _normaliseTasks(raw) {
  return raw.map(t => ({
    id: t.id || t._id || `task_${Math.random().toString(36).slice(2)}`,
    title: t.title || 'Untitled',
    description: t.description || '',
    status: (t.status || 'todo').toLowerCase(),
    priority: t.priority || 'Medium',
    subtasks: (t.subtasks || []).map(s => ({
      title: s.title || '',
      isCompleted: s.isCompleted || false,
    })),
  }));
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function _render() {
  _showLoading(false);
  _showError(false);
  initModals(tasks, _handleSave);
  renderBoard(tasks, openTaskModal);
}

// ── Save Handler ──────────────────────────────────────────────────────────────

/**
 * Called by modal module whenever tasks are mutated.
 * Persists to local storage and re-renders the board.
 * @param {Array} updated
 */
function _handleSave(updated) {
  tasks = updated;
  setTasks(tasks);
  saveTasks(tasks);
  renderBoard(tasks, openTaskModal);
}

// ── UI State Helpers ──────────────────────────────────────────────────────────

function _showLoading(show) {
  document.getElementById('loadingState').classList.toggle('hidden', !show);
}

function _showError(show) {
  document.getElementById('errorState').classList.toggle('hidden', !show);
  if (show) {
    document.getElementById('retryBtn').onclick = () => {
      _showError(false);
      _loadFromApi();
    };
  }
}

// ── Add Task Buttons ──────────────────────────────────────────────────────────

function _bindAddTaskButtons() {
  document.getElementById('addTaskBtn').addEventListener('click', openAddModal);
  document.getElementById('mobileAddTaskBtn').addEventListener('click', openAddModal);
}

// ── Start ─────────────────────────────────────────────────────────────────────

init();
