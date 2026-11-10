// Inline SVG icons used across the app. Decorative, so hidden from screen readers.
const base = { "aria-hidden": true, focusable: "false" };

export const DashboardIcon = () => (
  <svg {...base} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
    <path d="M3 18a9 9 0 0 1 18 0z" fill="currentColor" stroke="none" />
    <path d="M12 18l4-6" stroke="#fff" />
  </svg>
);
export const FolderOpenIcon = () => (
  <svg {...base} viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v2H6l-3 8z" /><path d="M6 11h16l-3 8H3z" />
  </svg>
);
export const MediaIcon = () => (
  <svg {...base} viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9" />
    <path d="M14.3 8l5.7 9.9M9.7 8h11.5M7.4 12l5.7-9.9M9.7 16L4 6.1M14.3 16H2.8M16.6 12l-5.7 9.9" />
  </svg>
);
export const ChatIcon = () => (
  <svg {...base} viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M3 4h18v13H8l-5 4z" /><path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
export const ClientsIcon = () => (
  <svg {...base} viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
    <circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M22 21a7 7 0 0 0-14 0" />
  </svg>
);
export const SettingsIcon = () => (
  <svg {...base} viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
  </svg>
);
export const HelpIcon = () => (
  <svg {...base} viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" />
  </svg>
);
export const LogoutIcon = () => (
  <svg {...base} viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4H4v16h6M14 8l4 4-4 4M18 12H9" />
  </svg>
);
export const BoltIcon = () => (
  <svg {...base} width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M14 2L4 14h7l-1 8 10-12h-7z" /></svg>
);
export const DownloadIcon = () => (
  <svg {...base} width="16" height="16" viewBox="0 0 24 24" fill="#191a2c">
    <path d="M11 3h2v8l3-3 1.4 1.4L12 14.8 6.6 9.4 8 8l3 3z" /><path d="M3 13h5l2 3h4l2-3h5v8H3z" />
  </svg>
);
export const SearchIcon = () => (
  <svg {...base} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8c93" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" />
  </svg>
);
export const BellIcon = () => (
  <svg {...base} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4" />
  </svg>
);
export const MailIcon = () => (
  <svg {...base} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c1c1e" strokeWidth="1.8" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 6l9 7 9-7" />
  </svg>
);
export const ArrowUpRightIcon = () => (
  <svg {...base} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c1c1e" strokeWidth="2.2" strokeLinecap="round">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);
export const FolderIcon = () => (
  <svg {...base} className="folder" viewBox="0 0 20 18" fill="currentColor">
    <rect x="2" width="16" height="2" rx="1" opacity=".7" /><rect x="1" y="3" width="18" height="2" rx="1" opacity=".85" />
    <rect y="6" width="20" height="12" rx="2" />
  </svg>
);
export const PencilIcon = () => (
  <svg {...base} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1c1c1e" strokeWidth="2"><path d="M16 3l5 5L8 21H3v-5z" /></svg>
);
export const DotsIcon = () => (
  <svg {...base} width="13" height="13" viewBox="0 0 24 24" fill="#555">
    <circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" />
  </svg>
);
export const PlusIcon = () => (
  <svg {...base} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 4v16M4 12h16" /></svg>
);
export const SortIcon = () => (
  <svg {...base} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round">
    <path d="M3 6h11M3 12h8M3 18h6M18 6v13M15 16l3 3 3-3" />
  </svg>
);
export const FilterIcon = () => (
  <svg {...base} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round"><path d="M3 7h18M6 12h12M10 17h4" /></svg>
);
export const ZoomIcon = () => (
  <svg {...base} width="20" height="14" viewBox="0 0 26 16" fill="#fff"><rect y="1" width="17" height="14" rx="2" /><path d="M19 6l7-4v12l-7-4z" /></svg>
);

// Small round icons in the dashboard project list
export function ProjectGlyph({ type }) {
  if (type === "layers")
    return <svg {...base} width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 3h12l-6 7H2zM10 14h12l-6 7H4z" /></svg>;
  if (type === "arc")
    return <svg {...base} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4"><path d="M12 5a7 7 0 1 1-6.5 4.4" /></svg>;
  return <svg {...base} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4"><circle cx="12" cy="12" r="7" /></svg>;
}
