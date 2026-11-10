import { NavLink, Link } from "react-router-dom";
import {
  BoltIcon, DashboardIcon, FolderOpenIcon, MediaIcon, ChatIcon, ClientsIcon,
  SettingsIcon, HelpIcon, LogoutIcon, DownloadIcon,
} from "./Icons.jsx";

const menu = [
  { to: "/", label: "Dashboard", Icon: DashboardIcon, end: true },
  { to: "/projects", label: "Projects", Icon: FolderOpenIcon },
  { href: "#", label: "Media", Icon: MediaIcon },
  { href: "#", label: "Testimonials", Icon: ChatIcon },
  { href: "#", label: "Clients", Icon: ClientsIcon },
];

const general = [
  { href: "#", label: "Settings", Icon: SettingsIcon },
  { href: "#", label: "Help", Icon: HelpIcon },
  { href: "#", label: "Logout", Icon: LogoutIcon },
];

function NavItem({ item }) {
  const { to, href, label, Icon, end } = item;
  // Real routes get NavLink (adds the "active" class automatically)
  if (to) {
    return (
      <NavLink to={to} end={end}>
        <Icon />
        {label}
      </NavLink>
    );
  }
  // Placeholder pages that don't exist yet
  return (
    <a href={href} onClick={(e) => e.preventDefault()}>
      <Icon />
      {label}
    </a>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar panel">
      {/* 252 x 84 header that holds the 131 x 36 logo */}
      <div className="sidebar-head">
        <Link to="/" className="logo">
          <span className="logo-icon"><BoltIcon /></span>
          Portavia
        </Link>
      </div>

      <p className="menu-title">MENU</p>
      <nav className="nav" aria-label="Main">
        {menu.map((item) => <NavItem key={item.label} item={item} />)}
      </nav>

      <p className="menu-title general">GENERAL</p>
      <nav className="nav" aria-label="General">
        {general.map((item) => <NavItem key={item.label} item={item} />)}
      </nav>

      <div className="download-card">
        <div className="icon-circle"><DownloadIcon /></div>
        <h4><b>Download</b> Our Mobile App</h4>
        <p>Get easy in another way!</p>
        <button className="btn-blue">Download</button>
      </div>
    </aside>
  );
}
