/**
 * @module sidebar
 * Manages sidebar visibility, board list rendering, and theme toggling.
 */

import { saveTheme, loadTheme } from './storage.js';

/**
 * Initialises sidebar interactions and theme toggle.
 * @param {string[]} boards - List of board names to display.
 * @param {string} activeBoard - Currently active board name.
 */
export function initSidebar(boards, activeBoard) {
  _renderBoardLists(boards, activeBoard);
  _initTheme();
  _bindSidebarToggle();
  _bindMobileMenu();
}

// ── Board Lists ───────────────────────────────────────────────────────────────

/**
 * Renders board name buttons in both desktop and mobile sidebar lists.
 * @param {string[]} boards
 * @param {string} activeBoard
 */
function _renderBoardLists(boards, activeBoard) {
  const count = boards.length;
  document.getElementById('boardCount').textContent = count;
  document.getElementById('mobileBoardCount').textContent = count;

  ['boardsList', 'mobileBoardsList'].forEach(listId => {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    boards.forEach(name => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.innerHTML = `<img src="assets/icon-board.svg" alt="" aria-hidden="true" />${name}`;
      if (name === activeBoard) btn.classList.add('active');
      li.appendChild(btn);
      list.appendChild(li);
    });
  });
}

// ── Theme ─────────────────────────────────────────────────────────────────────

function _initTheme() {
  const saved = loadTheme();
  _applyTheme(saved);
  document.getElementById('themeToggle').checked = saved === 'dark';
  document.getElementById('mobileThemeToggle').checked = saved === 'dark';

  document.getElementById('themeToggle').addEventListener('change', e => {
    const theme = e.target.checked ? 'dark' : 'light';
    _applyTheme(theme);
    document.getElementById('mobileThemeToggle').checked = e.target.checked;
  });

  document.getElementById('mobileThemeToggle').addEventListener('change', e => {
    const theme = e.target.checked ? 'dark' : 'light';
    _applyTheme(theme);
    document.getElementById('themeToggle').checked = e.target.checked;
  });
}

/**
 * Applies a theme to the document root and persists it.
 * @param {'light'|'dark'} theme
 */
function _applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  saveTheme(theme);
}

// ── Sidebar Toggle ────────────────────────────────────────────────────────────

function _bindSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  const showBtn = document.getElementById('showSidebarBtn');

  document.getElementById('hideSidebarBtn').addEventListener('click', () => {
    sidebar.classList.add('hidden');
    showBtn.classList.add('visible');
  });

  showBtn.addEventListener('click', () => {
    sidebar.classList.remove('hidden');
    showBtn.classList.remove('visible');
  });
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────

function _bindMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  const openBtn = document.getElementById('mobileMenuBtn');

  function openMenu() {
    menu.classList.add('active');
    overlay.classList.add('active');
    menu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    menu.setAttribute('aria-hidden', 'true');
  }

  openBtn.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
}
