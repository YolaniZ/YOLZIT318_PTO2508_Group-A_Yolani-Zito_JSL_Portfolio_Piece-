
🗂️ JSL Portfolio Piece – Kanban Task Management App (JSLPP)
📌 Project Overview
This project is a Kanban Task Management Application developed as part of the JSL Portfolio Piece (JSLPP).
The application allows users to manage tasks across multiple status columns, supports data persistence through local storage, and includes dynamic UI features such as task editing, deletion, a responsive sidebar, and a light/dark theme toggle.
The application is fully deployed on Netlify, responsive across devices, and built using clean, modular, and well‑documented JavaScript code.

The presentation demonstrates:

How the application meets the user stories
Core features and functionality
Code structure and logic
Local storage usage
Deployment process

✅ Features & Functionality
🚀 Deployment & Hosting

Application deployed using Netlify
Project structured according to best deployment practices
Live version tested to ensure all features function correctly

🔄 Initial Data Fetching & Loading State

Tasks are dynamically fetched from the API:
https://jsl-kanban-api.vercel.app/

All hard‑coded task data removed
Loading indicator displayed while tasks are fetched
Error message shown if data fetching fails

💾 Data Persistence (Local Storage)

Fetched tasks stored in local storage
Tasks persist across page reloads
On app startup, tasks load from local storage into their respective columns:

To Do
Doing
Done

✏️ Task Editing & Deletion

Tasks can be edited via a modal:

Title
Description
Status

Changes are reflected immediately on the board
Updates are saved to local storage
Tasks can be deleted via the modal with a confirmation prompt
Deleted tasks are removed from both the UI and storage

📂 Sidebar Interaction

Sidebar implemented according to the Figma design
Sidebar is toggleable for improved usability
Responsive behavior adapts to different screen sizes

📱 Mobile Sidebar (Menu)

Mobile sidebar functions as a top‑screen menu
Accessible from the app logo
Matches desktop sidebar design and features
Includes the theme toggle
Can be closed to allow an unobstructed task view

🌗 Theme Toggle (Dark / Light Mode)

Users can switch between dark and light themes
Toggle available in both:

Desktop sidebar
Mobile menu

Theme updates apply instantly across the app
Selected theme persists across sessions
Dark mode styled for readability, contrast, and accessibility

⭐ Stretch Goal – Task Priority (Optional)

Tasks support priority levels:

High
Medium
Low

Priority is:

Visually displayed on task cards
Editable when creating or editing tasks
Saved in local storage

Tasks are automatically sorted within each column by priority:
High → Medium → Low
Correct ordering persists after page reloads

🧠 Code Quality & Maintainability

Code split into reusable, focused modules:

Task rendering
Local storage management
Modal handling
UI and state management

Clear and descriptive variable and function names
Major functions and modules documented using JSDoc
Codebase structured for scalability and ease of maintenance

🛠️ Technologies Used

HTML5
CSS3
JavaScript (ES6+)
Fetch API
Local Storage API
Netlify (Deployment)

✅ Expected Outcome Achieved
✔ Dynamic API‑driven task management
✔ Local storage persistence
✔ Task editing and deletion
✔ Responsive sidebar and mobile menu
✔ Light/Dark theme toggle
✔ Netlify deployment with custom URL
✔ Clean, modular, documented code

📎 Submission Links

GitHub Repository:
👉 https://github.com/YolaniZ/YOLZIT318_PTO2508_Group-A_Yolani-Zito_JSL_Portfolio_Piece-


Live Application:
👉 (https://kanban-jsl-portfolio.netlify.app)


Presentation Video:
👉  https://www.veed.io/view/4bfc1622-67ac-43f5-9d67-b52372cad1e7?source=Homepage&panel=referrals