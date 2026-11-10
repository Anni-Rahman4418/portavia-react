import { useEffect, useState } from "react";
import PerformanceChart from "../components/PerformanceChart.jsx";
import {
  ArrowUpRightIcon, FolderIcon, PencilIcon, DotsIcon, ProjectGlyph, ZoomIcon,
} from "../components/Icons.jsx";
import { stats, chartData, dashboardProjects, blogs, reminder, formatDate } from "../data.js";

// Counts up from 0 to "end" when the card first shows
function CountUp({ end, duration = 1500 }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    // People who prefer less motion just see the final number
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(end); return; }

    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1); // progress: 0 → 1
      const eased = 1 - Math.pow(1 - t, 3);            // starts fast, slows down at the end
      setN(Math.round(end * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame); // clean up if the page is left early
  }, [end, duration]);

  return n;
}

function StatCard({ title, value, change, note }) {
  return (
    <div className="stat panel">
      <div className="stat-head">
        <h3>{title}</h3>
        <a href="#" className="arrow-btn" aria-label={`Open ${title}`} onClick={(e) => e.preventDefault()}>
          <ArrowUpRightIcon />
        </a>
      </div>
      <p className="num"><CountUp end={value} /></p>
      <div className="foot">
        {change && <span className="badge">{change}</span>}
        {note}
      </div>
    </div>
  );
}

function ProjectStatus({ project }) {
  if (project.status === "revision") return <small className="rev">Under Revision</small>;
  if (project.status === "done") return <small className="done">Completed</small>;
  return <small>Due date: {project.due}</small>;
}

export default function Dashboard() {
  return (
    <>
      <section className="stats">
        {stats.map((s) => <StatCard key={s.title} {...s} />)}
      </section>

      <section className="grid-2">
        <div className="panel">
          <div className="card-head">
            <h3>Top Performing Projects</h3>
            <button className="pill-select">01-07 May</button>
          </div>
          <div className="chart">
            <PerformanceChart data={chartData} />
          </div>
        </div>

        <div className="panel">
          <div className="card-head">
            <h3>Projects</h3>
            <button className="outline-btn">+ New</button>
          </div>
          <ul className="proj-list">
            {dashboardProjects.map((p) => (
              <li key={p.name}>
                <span className="p-icon" style={{ background: p.color }}><ProjectGlyph type={p.icon} /></span>
                <div>
                  <b>{p.name}</b>
                  <ProjectStatus project={p} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid-2">
        <div className="panel" style={{ overflow: "hidden" }}>
          <div className="card-head">
            <h3>Blogs</h3>
            <button className="outline-btn">View All</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th><th>Date</th><th>Categories</th><th className="hide-sm">Viewers</th><th className="hide-md">Last Edit</th>
                  <th><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b.id}>
                    <td><div className="title-cell"><FolderIcon />{b.title}</div></td>
                    <td>{formatDate(b.date)}</td>
                    <td>{b.category}</td>
                    <td className="hide-sm">{b.viewers.toLocaleString("en-US")}</td>
                    <td className="hide-md">{formatDate(b.lastEdit)}</td>
                    <td>
                      <div className="actions">
                        <button className="sq-btn" aria-label={`Edit ${b.title}`}><PencilIcon /></button>
                        <button className="sq-btn" aria-label={`More actions for ${b.title}`}><DotsIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel reminder">
          <p className="rem-title">Reminders</p>
          <h4>{reminder.title}</h4>
          <p>Time: {reminder.time}</p>
          <button className="btn-blue"><ZoomIcon />Start With Zoom</button>
        </div>
      </section>
    </>
  );
}
