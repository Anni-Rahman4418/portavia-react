# Portavia — React version

Dashboard + Projects pages rebuilt in React (Vite + React Router).

## Run it
```bash
npm install
npm run dev
```
Then open the URL Vite prints (usually http://localhost:5173).

## Structure
```
src/
  main.jsx              entry, wraps the app in BrowserRouter
  App.jsx               layout (sidebar + topbar) and routes: / and /projects
  data.js               all stats, chart values, blogs and projects
  style.css             your original styles, adapted for the components
  components/
    Sidebar.jsx         shared sidebar (same on every page)
    Topbar.jsx          welcome text, search, notification buttons
    PerformanceChart.jsx  SVG chart drawn from data; hover a day to move the tooltip
    ActionMenu.jsx      the ⋮ dropdown (Duplicate / Archive / Delete)
    Icons.jsx           all inline SVG icons
  pages/
    Dashboard.jsx
    Projects.jsx        tabs, search, sort, row select, pagination
```
