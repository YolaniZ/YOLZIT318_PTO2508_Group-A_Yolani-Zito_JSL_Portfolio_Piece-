
# JSLPP Kanban Board Application

A fully functional, responsive Kanban task management application built with modular Vanilla JavaScript.  
The app dynamically fetches tasks from an external API, persists data using localStorage, and provides rich user interactions including task editing, deletion, sidebar control, mobile navigation, and theme toggling.

This project was developed as part of the **JSLPP Portfolio Piece** and is deployed to Netlify.

---

## 🔗 Live Deployment
**Netlify URL:**  
👉(https://kanban-jsl-portfolio.netlify.app)
---

## 🎥 Recorded Presentation (5–10 Minutes)
A live walkthrough demonstrating how the project meets each user story, including code structure and feature implementation.

👉 **Presentation Link:**  
https://YOUR-PUBLIC-RECORDING-LINK

> The presentation showcases task fetching, localStorage persistence, modal editing, sidebar/mobile interaction, and theme toggling.



## ✅ Key Features

### 📡 Data Fetching & Loading States
- Tasks are fetched dynamically from:  
  **https://jsl-kanban-api.vercel.app/**
- Displays a loading message while data is being fetched
- Displays an error message if the API request fails
- Removes all hard-coded task data

---

### 💾 Data Persistence (localStorage)
- Tasks are saved to localStorage after fetching
- All edits and deletions update localStorage immediately
- Tasks persist across page reloads
- Theme preference is also saved and restored on reload

---

### ✏️ Task Editing & Deletion
- Tasks can be edited in a modal
  - Title
  - Description
  - Status (To Do / Doing / Done)
- Changes are reflected immediately on the board and in localStorage
- Tasks can be deleted from within the modal
- A confirmation dialog is shown before deletion

---

### 📂 Sidebar Interaction
- Desktop sidebar can be toggled (show/hide)
- Sidebar contains all required UI elements per Figma design
- State is maintained for better usability

---

### 📱 Mobile Menu (Sidebar)
- Mobile sidebar functions as a slide-down menu
- Accessible via the app logo on smaller screens
- Fully responsive and matches desktop sidebar functionality
- Menu can be closed to restore full task board view

---

### 🌗 Theme Toggle (Dark / Light Mode)
- Switch between dark and light themes
- Toggle available in:
  - Desktop sidebar
  - Mobile menu
- Theme applies to all UI elements ensuring accessibility and readability
- Theme preference persists across sessions

---

### ⭐ Stretch Goal: Task Priority (Optional)
- Tasks support priority levels:
  - High
  - Medium
  - Low
- Priority is visually displayed on task cards
- Priority is:
  - Editable in the modal
  - Stored in localStorage
  - Persisted across reloads
- Tasks are automatically sorted within each status column:
  - **High → Medium → Low**
- Correct order is maintained after refreshing the page

---

## 🧠 Code Quality & Architecture

The application is built using a modular JavaScript architecture to ensure maintainability and scalability.

🙌 Final Notes
This project demonstrates:

Real-world data handling
Persistent state management
Responsive UI design
Clean, maintainable JavaScript architecture
Production-ready deployment

Thank you for reviewing this project.
