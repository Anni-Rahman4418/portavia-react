import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";

export default function App() {
  // Search lives here so the shared Topbar can drive the Projects table
  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Topbar name="Arnold" search={search} onSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects search={search} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
