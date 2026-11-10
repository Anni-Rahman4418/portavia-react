import { useMemo, useState } from "react";
import ActionMenu from "../components/ActionMenu.jsx";
import { FolderIcon, PencilIcon, PlusIcon, SortIcon, FilterIcon } from "../components/Icons.jsx";
import { projects as initialProjects, formatDate } from "../data.js";

const TABS = ["All", "Draft", "Archived", "Featured", "Published"];

function matchesTab(project, tab) {
  if (tab === "All") return true;
  if (tab === "Featured") return project.featured;
  return project.status === tab.toLowerCase();
}

// Page numbers with "…" gaps, e.g. 1 2 3 … 20
function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

// Unset: a "Yes | No" pill whose halves are clickable. Once chosen, the whole pill becomes
// Yes (blue) or No (pink); clicking it again flips the choice.
function FeaturedToggle({ project, onChange }) {
  const f = project.featured;
  if (f === null) {
    return (
      <div className="tag unset" role="group" aria-label={`Featured for ${project.title}`}>
        <button className="yes" onClick={() => onChange(true)}>Yes</button>
        <span aria-hidden="true">/</span>
        <button className="no" onClick={() => onChange(false)}>No</button>
      </div>
    );
  }
  return (
    <button
      className={`tag feat-tag ${f ? "yes" : "no"}`}
      aria-label={`Featured: ${f ? "Yes" : "No"}. Click to change`}
      onClick={() => onChange(!f)}
    >
      {f ? "Yes" : "No"}
    </button>
  );
}

export default function Projects({ search }) {
  const [projects, setProjects] = useState(() => initialProjects.map((p) => ({ ...p, featured: null }))); // nothing chosen yet
  const [tab, setTab] = useState("All");
  const [newestFirst, setNewestFirst] = useState(true);
  const [selectedId, setSelectedId] = useState(null); // nothing highlighted until hovered/clicked
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Filter by tab + search, then sort by date
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects
      .filter((p) => matchesTab(p, tab))
      .filter((p) => !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .sort((a, b) => (newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [projects, tab, search, newestFirst]);

  const totalPages = Math.max(1, Math.ceil(visible.length / perPage));
  const current = Math.min(page, totalPages);
  const rows = visible.slice((current - 1) * perPage, current * perPage);

  // --- row actions ---
  const duplicate = (project) => {
    const copy = { ...project, id: Date.now(), title: `${project.title} (copy)`, status: "draft" };
    setProjects((list) => {
      const i = list.findIndex((p) => p.id === project.id);
      return [...list.slice(0, i + 1), copy, ...list.slice(i + 1)];
    });
  };
  const archive = (project) =>
    setProjects((list) => list.map((p) => (p.id === project.id ? { ...p, status: "archived" } : p)));
  const setFeatured = (project, featured) =>
    setProjects((list) => list.map((p) => (p.id === project.id ? { ...p, featured } : p)));
  const remove = (project) =>
    setProjects((list) => list.filter((p) => p.id !== project.id));

  const changeTab = (t) => { setTab(t); setPage(1); };

  const from = visible.length === 0 ? 0 : (current - 1) * perPage + 1;
  const to = Math.min(current * perPage, visible.length);

  return (
    <>
      <section className="toolbar panel">
        <div className="tabs" role="group" aria-label="Filter projects">
          {TABS.map((t) => (
            <button
              key={t}
              className={t === tab ? "active" : ""}
              aria-pressed={t === tab}
              onClick={() => changeTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="btn-dark"><PlusIcon />Add Project</button>
        <button
          className="round-btn"
          aria-label={newestFirst ? "Sort oldest first" : "Sort newest first"}
          title={newestFirst ? "Newest first" : "Oldest first"}
          onClick={() => setNewestFirst((v) => !v)}
        >
          <SortIcon />
        </button>
        {/* TODO: open a filter panel (category, client) */}
        <button className="round-btn" aria-label="Filter"><FilterIcon /></button>
      </section>

      <section className="panel table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th><th>Featured</th><th className="hide-xxs">Date</th><th className="hide-xs">Categories</th>
                <th className="hide-sm">Clients</th><th className="hide-sm">Viewers</th><th className="hide-md">Last Edit</th>
                <th><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="empty">
                    No projects match this view. Try another tab or clear the search.
                  </td>
                </tr>
              )}
              {rows.map((p, i) => (
                <tr
                  key={p.id}
                  className={p.id === selectedId ? "selected" : ""}
                  onClick={() => setSelectedId(p.id)}
                >
                  <td><div className="title-cell"><FolderIcon />{p.title}</div></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <FeaturedToggle project={p} onChange={(v) => setFeatured(p, v)} />
                  </td>
                  <td className="hide-xxs">{formatDate(p.date)}</td>
                  <td className="hide-xs">{p.category}</td>
                  <td className="hide-sm">{p.client}</td>
                  <td className="hide-sm">
                    {p.viewers}{" "}
                    <span className={p.trend} aria-label={p.trend === "up" ? "rising" : "falling"}>
                      {p.trend === "up" ? "↑" : "↓"}
                    </span>
                  </td>
                  <td className="hide-md">{formatDate(p.lastEdit)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="actions">
                      <button className="sq-btn" aria-label={`Edit ${p.title}`}><PencilIcon /></button>
                      <ActionMenu
                        label={p.title}
                        openUp={rows.length > 3 && i >= rows.length - 2}
                        onDuplicate={() => duplicate(p)}
                        onArchive={() => archive(p)}
                        onDelete={() => remove(p)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span><b>{from}–{to}</b> of {visible.length} projects</span>

          <nav className="pages" aria-label="Pagination">
            <button className="prev" aria-label="Previous page" disabled={current === 1} onClick={() => setPage(current - 1)}>‹</button>
            {pageList(current, totalPages).map((n, i) =>
              n === "…" ? (
                <span key={`gap-${i}`}>···</span>
              ) : (
                <button
                  key={n}
                  className={n === current ? "current" : ""}
                  aria-current={n === current ? "page" : undefined}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              )
            )}
            <button className="next" aria-label="Next page" disabled={current === totalPages} onClick={() => setPage(current + 1)}>›</button>
          </nav>

          <label className="per-page">
            <span className="sr-only">Projects per page</span>
            <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>
      </section>
    </>
  );
}
