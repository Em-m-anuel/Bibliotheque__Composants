import React from "react";
import "./Tabs.scss";

/**
 * tabs = [{ key, label, icon?, disabled? }]
 */
const Tabs = ({
  tabs = [],
  activeKey,
  onChange,
  variant = "underline",  // underline | pills | contained
  size = "md",            // sm | md | lg
  fullWidth = false,
  className = ""
}) => {
  return (
    <div className={`tabs tabs--${variant} tabs--${size} ${fullWidth ? "tabs--full" : ""} ${className}`} role="tablist">
      {tabs.map(t => (
        <button
          key={t.key}
          className={`tabs__tab ${activeKey === t.key ? "is-active" : ""}`}
          onClick={() => !t.disabled && onChange?.(t.key)}
          disabled={t.disabled}
          role="tab"
          aria-selected={activeKey === t.key}
        >
          {t.icon && <span className="tabs__icon">{t.icon}</span>}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
