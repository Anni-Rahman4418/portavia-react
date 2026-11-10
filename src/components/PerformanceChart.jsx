import { useEffect, useState } from "react";

// Chart geometry (matches the original SVG)
const X0 = 70, STEP = 85, Y_ZERO = 175, PX_PER_HOUR = 16;
const xAt = (i) => X0 + i * STEP;
const yAt = (h) => Y_ZERO - h * PX_PER_HOUR;

// Smooth curve through points (Catmull-Rom converted to cubic Bézier)
function smoothPath(points) {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const hours = (h) => `${h} ${h === 1 ? "Hour" : "Hours"}`;

export default function PerformanceChart({ data }) {
  const [active, setActive] = useState(2); // 03 May selected by default
  const [auto, setAuto] = useState(true); // steps through the days until the user interacts

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % data.days.length), 2200);
    return () => clearInterval(id);
  }, [auto, data.days.length]);

  const select = (i) => { setAuto(false); setActive(i); };

  const thisPts = data.thisMonth.map((h, i) => [xAt(i), yAt(h)]);
  const lastPts = data.lastMonth.map((h, i) => [xAt(i), yAt(h)]);
  const linePath = smoothPath(thisPts);
  const lastX = xAt(data.days.length - 1);
  const areaPath = `${linePath} L${lastX},${Y_ZERO} L${X0},${Y_ZERO} Z`;

  const ax = xAt(active);
  // Tooltip sits above the marker; if a point is too high (> 6h) it would be covered,
  // so the tooltip moves beside the marker instead.
  const high = Math.max(data.thisMonth[active], data.lastMonth[active]) > 6;
  const tipX = high
    ? (ax + 152 > 610 ? ax - 152 : ax + 12)
    : Math.min(Math.max(ax - 70, 40), 460);
  const tipY = high ? 60 : 0;

  return (
    <svg viewBox="0 -14 620 232" role="img" aria-label="Hours worked per day, this month compared with last month">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b87f6" stopOpacity=".35" />
          <stop offset="1" stopColor="#2b87f6" stopOpacity=".03" />
        </linearGradient>
        <clipPath id="chartReveal">
          <rect className="chart-reveal" x="0" y="-14" width="620" height="232" />
        </clipPath>
        <filter id="chartShadow"><feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity=".12" /></filter>
      </defs>

      {/* grid lines + y labels (0h–10h) */}
      {[0, 2, 4, 6, 8, 10].map((h) => (
        <g key={h}>
          <line x1="40" x2="600" y1={yAt(h)} y2={yAt(h)} stroke="#cfd1d7" strokeDasharray="2 4" />
          <text x="0" y={yAt(h) + 4} fontSize="11" fill="#1c1c1e">{h}h</text>
        </g>
      ))}

      {/* this month (blue) and last month (red dashed) */}
      <g clipPath="url(#chartReveal)">
        <path d={areaPath} fill="url(#chartFill)" />
        <path d={linePath} fill="none" stroke="var(--blue)" strokeWidth="2" />
        <path d={smoothPath(lastPts)} fill="none" stroke="var(--red)" strokeWidth="2" strokeDasharray="6 5" />
      </g>

      {/* marker for the selected day (slides between days) */}
      <g className="chart-fade">
        <g className="chart-slide" style={{ transform: `translate(${ax}px, 0px)` }}>
          <line x1="0" x2="0" y1="40" y2="190" stroke="#8a8c93" strokeDasharray="3 3" />
          <circle className="chart-slide" cx="0" cy="0" r="4.5" fill="var(--blue)" stroke="#fff" strokeWidth="2"
            style={{ transform: `translate(0px, ${yAt(data.thisMonth[active])}px)` }} />
          <circle className="chart-slide" cx="0" cy="0" r="4.5" fill="var(--red)" stroke="#fff" strokeWidth="2"
            style={{ transform: `translate(0px, ${yAt(data.lastMonth[active])}px)` }} />
        </g>
      </g>

      {/* tooltip */}
      <g className="chart-slide" style={{ transform: `translate(${tipX}px, ${tipY}px)` }} fontSize="10">
        <rect x="0" y="-12" width="140" height="56" rx="6" fill="#fff" filter="url(#chartShadow)" />
        <text x="10" y="4" fill="#1c1c1e" fontWeight="500">{data.fullDates[active]}</text>
        <rect x="10" y="12" width="2" height="11" fill="var(--blue)" />
        <text x="16" y="21" fill="#9a9ca3">This Month</text>
        <text x="130" y="21" textAnchor="end" fontWeight="600" fill="#1c1c1e">{hours(data.thisMonth[active])}</text>
        <rect x="10" y="28" width="2" height="11" fill="var(--red)" />
        <text x="16" y="37" fill="#9a9ca3">Last Month</text>
        <text x="130" y="37" textAnchor="end" fontWeight="600" fill="#1c1c1e">{hours(data.lastMonth[active])}</text>
      </g>

      {/* day labels — hover or click to move the marker */}
      {data.days.map((day, i) => {
        const x = xAt(i);
        const isActive = i === active;
        return (
          <g
            key={day}
            className="chart-day"
            onMouseEnter={() => select(i)}
            onClick={() => select(i)}
          >
            <rect x={x - 42} y="0" width="84" height="214" fill="transparent" />
            {isActive && <rect x={x - 17} y="190" width="34" height="22" rx="11" fill="var(--blue)" />}
            <text x={x} y="205" fontSize="11" textAnchor="middle" fill={isActive ? "#fff" : "#1c1c1e"}>{day}</text>
          </g>
        );
      })}
    </svg>
  );
}
