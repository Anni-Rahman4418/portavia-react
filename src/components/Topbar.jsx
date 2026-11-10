import { SearchIcon, BellIcon, MailIcon } from "./Icons.jsx";

export default function Topbar({ name, search, onSearch }) {
  return (
    <header className="topbar panel">
      <div className="avatar" />
      <div className="welcome">
        <h2>👋 Welcome, {name}</h2>
        <p>Your Personal Dashboard Overview</p>
      </div>

      <label className="search">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search"
          aria-label="Search projects"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </label>

      <button className="icon-btn" aria-label="Notifications (unread)">
        <span className="dot" />
        <BellIcon />
      </button>
      <button className="icon-btn" aria-label="Messages (unread)">
        <span className="dot" />
        <MailIcon />
      </button>
    </header>
  );
}
