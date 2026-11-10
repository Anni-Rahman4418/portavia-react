import { useEffect, useRef, useState } from "react";
import { DotsIcon } from "./Icons.jsx";

/**
 * The ⋮ dropdown. Opened with a click (works in Safari, unlike :focus-within),
 * closed by clicking outside, pressing Escape, or picking an action.
 * `openUp` flips it above the button for rows near the bottom of the table.
 */
export default function ActionMenu({ label, onDuplicate, onArchive, onDelete, openUp = false }) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false); // Delete asks twice
  const ref = useRef(null);

  useEffect(() => {
    if (!open) { setConfirming(false); return; }
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const run = (fn) => () => {
    setOpen(false);
    fn?.();
  };

  return (
    <div className="more" ref={ref}>
      <button
        className="sq-btn"
        aria-label={`More actions for ${label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <DotsIcon />
      </button>
      {open && (
        <div className={`dropdown${openUp ? " up" : ""}`} role="menu">
          <button role="menuitem" onClick={run(onDuplicate)}>⧉ Duplicate</button>
          <button role="menuitem" onClick={run(onArchive)}>🗃 Archive</button>
          {confirming ? (
            <button role="menuitem" className="del" onClick={run(onDelete)} autoFocus>🗑 Confirm delete</button>
          ) : (
            <button role="menuitem" className="del" onClick={() => setConfirming(true)}>🗑 Delete</button>
          )}
        </div>
      )}
    </div>
  );
}
