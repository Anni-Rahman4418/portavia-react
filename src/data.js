// All page content lives here, so the components only handle layout.

export const stats = [
  { title: "Total Projects", value: 104, change: "+3", note: "Increased from last month" },
  { title: "Pending Projects", value: 12, note: "Projects in discussion" },
  { title: "Total Visits", value: 1087, change: "+670", note: "Increased from last month" },
  { title: "Total Clients", value: 370, change: "+12", note: "Increased from last month" },
];

// Hours worked per day, 01–07 May 2025
export const chartData = {
  days: ["01", "02", "03", "04", "05", "06", "07"],
  fullDates: ["01 May 2025", "02 May 2025", "03 May 2025", "04 May 2025", "05 May 2025", "06 May 2025", "07 May 2025"],
  thisMonth: [3, 2.5, 6, 5.5, 8.5, 8, 9.8],
  lastMonth: [1, 1.8, 3, 2.5, 8.2, 6.5, 6.4],
};

export const dashboardProjects = [
  { name: "App Redesign - Solaria", color: "#2b87f6", icon: "layers", status: "due", due: "15/11/2026" },
  { name: "Branding - NovaTech", color: "#ef3b3b", icon: "ring", status: "due", due: "22/11/2026" },
  { name: "Marketing - Starlight", color: "#22b14c", icon: "ring", status: "due", due: "01/12/2026" },
  { name: "Mobile App - FutureNet", color: "#d4189b", icon: "ring", status: "revision" },
  { name: "Social Media - OmniCorp", color: "#f6a85c", icon: "layers", status: "revision" },
  { name: "eCommerce Site - ZythCo", color: "#191a2c", icon: "arc", status: "done" },
  { name: "Backend Upgrade - TitanTech", color: "#a5e52e", icon: "layers", status: "done" },
];

export const blogs = [
  { id: 1, title: "Best 5 Top Designs in 2025", date: "2025-09-19", category: "Design", viewers: 1670, lastEdit: "2025-12-11" },
  { id: 2, title: "Innovative User Interfaces", date: "2025-10-12", category: "UX Design", viewers: 2300, lastEdit: "2026-01-15" },
  { id: 3, title: "Sustainable Product Design", date: "2025-11-05", category: "Environment", viewers: 1950, lastEdit: "2026-02-20" },
  { id: 4, title: "Augmented Reality in Design", date: "2025-12-22", category: "AR/VR", viewers: 2750, lastEdit: "2026-03-30" },
];

export const reminder = {
  title: "Meeting with EvoGroup Company",
  time: "02:00 PM - 04:00 PM",
};

// status: "published" | "draft" | "archived"
export const projects = [
  { id: 1, title: "Malaka Law Firm Landing Page", featured: true, status: "published", date: "2025-09-19", category: "Web Design", client: "Dribbble", viewers: 1976, trend: "up", lastEdit: "2025-12-11" },
  { id: 2, title: "GreenTech App Prototype", featured: true, status: "published", date: "2025-10-22", category: "Mobile App", client: "Behance", viewers: 1026, trend: "down", lastEdit: "2026-01-15" },
  { id: 3, title: "E-Commerce Site Revamp", featured: true, status: "draft", date: "2025-11-05", category: "Web Development", client: "Figma", viewers: 809, trend: "up", lastEdit: "2026-02-20" },
  { id: 4, title: "Health Tracker Dashboard", featured: false, status: "published", date: "2025-08-30", category: "UI/UX Design", client: "Dribbble", viewers: 987, trend: "down", lastEdit: "2026-01-05" },
  { id: 5, title: "Travel Booking App", featured: true, status: "draft", date: "2025-09-12", category: "Mobile Design", client: "Behance", viewers: 203, trend: "up", lastEdit: "2026-01-28" },
  { id: 6, title: "Social Media Interface", featured: false, status: "published", date: "2025-10-15", category: "Web Design", client: "Figma", viewers: 3790, trend: "up", lastEdit: "2026-02-05" },
  { id: 7, title: "Recipe Sharing Platform", featured: true, status: "published", date: "2025-11-01", category: "Web Development", client: "Dribbble", viewers: 589, trend: "down", lastEdit: "2026-02-28" },
  { id: 8, title: "Online Learning Portal", featured: false, status: "published", date: "2025-09-20", category: "E-Learning", client: "Behance", viewers: 7899, trend: "up", lastEdit: "2026-03-18" },
  { id: 9, title: "Fitness Tracker App", featured: true, status: "draft", date: "2025-12-15", category: "Mobile UI", client: "Figma", viewers: 400, trend: "up", lastEdit: "2026-04-30" },
  { id: 10, title: "Event Management Tool", featured: false, status: "archived", date: "2025-10-10", category: "Web Application", client: "Dribbble", viewers: 1021, trend: "down", lastEdit: "2026-02-22" },
  { id: 11, title: "Project Tracking Software", featured: false, status: "archived", date: "2025-05-01", category: "Mobile Application", client: "Behance", viewers: 1045, trend: "down", lastEdit: "2025-08-15" },
  { id: 12, title: "Customer Relationship Manager", featured: false, status: "published", date: "2024-12-12", category: "Web Application", client: "Dribbble", viewers: 1098, trend: "down", lastEdit: "2025-06-30" },
];

// "2025-09-19" -> "19/09/2025"
export function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
