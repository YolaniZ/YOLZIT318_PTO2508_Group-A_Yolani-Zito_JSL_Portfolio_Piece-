# Kanban App — JSL Portfolio Piece

A fully functional Kanban task management app built with vanilla JavaScript (ES modules), HTML, and CSS.

## Live Demo

🔗 [Deployed App](https://kanban-jsl-portfolio.netlify.app)

## Presentation

🎥 [Recorded Presentation](#) *(replace with your video link)*

## Features

- Fetches tasks dynamically from the [JSL Kanban API](https://jsl-kanban-api.vercel.app/)
- Loading and error states during data fetch
- Local storage persistence across page reloads
- Task editing (title, description, status, subtasks, priority)
- Task deletion with confirmation dialog
- Subtask completion tracking
- Priority system: High / Medium / Low with visual badges and column sorting
- Collapsible desktop sidebar
- Mobile-responsive menu accessible from the header logo
- Dark / Light theme toggle (persisted in local storage)
- Modular, JSDoc-documented codebase

## Project Structure

```
├── index.html
├── styles.css
├── netlify.toml
├── assets/          # SVG icons and logos
└── scripts/
    ├── main.js      # Entry point & orchestration
    ├── api.js       # API fetching
    ├── storage.js   # Local storage helpers
    ├── render.js    # Board & card rendering
    ├── modal.js     # All modal dialogs
    ├── sidebar.js   # Sidebar & theme toggle
    └── utils.js     # Shared utilities
```

## Running Locally

No build step required — open `index.html` directly in a browser, or serve with any static file server:

```bash
npx serve .
```

## Deployment

Deployed via Netlify. The `netlify.toml` sets the publish directory to the project root.
