import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = ({
  logo = null,
  links = [],                      // [{label, href, active?}]
  actions = null,                  // ReactNode (boutons, avatar…)
  search = null,                   // { value, onChange, onSubmit, placeholder }
  sticky = false,
  transparent = false,
  variant = "dark",                // dark | light | primary
  className = ""
}) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`navbar navbar--${variant} ${transparent ? "navbar--transparent" : ""} ${sticky ? "navbar--sticky" : ""} ${className}`}>
      <div className="navbar__inner container">
        <div className="navbar__brand">
          {logo}
        </div>

        <button className="navbar__toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          ☰
        </button>

        <nav className={`navbar__nav ${open ? "is-open" : ""}`}>
          <ul className="navbar__links">
            {links.map((l, i) => (
              <li key={i} className={`navbar__item ${l.active ? "is-active" : ""}`}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          {search && (
            <form
              className="navbar__search"
              onSubmit={(e) => { e.preventDefault(); search.onSubmit?.(); }}
            >
              <input
                type="search"
                value={search.value}
                onChange={(e) => search.onChange?.(e.target.value)}
                placeholder={search.placeholder ?? "Rechercher..."}
              />
            </form>
          )}

          {actions && <div className="navbar__actions">{actions}</div>}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
