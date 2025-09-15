import React, { useState } from "react";
import "./Sidebar.scss";

const Sidebar = ({
  items = [],                 // [{ key, label, icon?, href?, badge? }]
  activeKey = null,
  collapsed = false,
  onSelect,
  variant = "dark",           // dark | light | primary
  className = ""
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <aside className={`sidebar sidebar--${variant} ${isCollapsed ? "is-collapsed" : ""} ${className}`}>
      <button className="sidebar__toggle" onClick={() => setIsCollapsed(!isCollapsed)} aria-label="Collapse">
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      <ul className="sidebar__menu">
        {items.map((it) => {
          const isActive = activeKey && it.key === activeKey;
          return (
            <li key={it.key ?? it.label} className={`sidebar__item ${isActive ? "is-active" : ""}`} onClick={() => onSelect?.(it)}>
              {it.icon && <span className="sidebar__icon">{it.icon}</span>}
              {!isCollapsed && <span className="sidebar__label">{it.label}</span>}
              {!isCollapsed && it.badge && <span className="sidebar__badge">{it.badge}</span>}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
