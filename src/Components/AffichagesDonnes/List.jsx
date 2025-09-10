import React from "react";
import "./List.scss";

/**
 * items: [
 *  { id, label, description?, icon?, avatarSrc?, right?, active? }
 * ]
 */
const List = ({
  items = [],
  variant = "plain",     // plain | bordered | striped
  dense = false,
  className = ""
}) => {
  return (
    <ul className={`list list--${variant} ${dense ? "list--dense" : ""} ${className}`}>
      {items.map((it) => (
        <li key={it.id ?? it.label} className={`list__item ${it.active ? "is-active" : ""}`}>
          {it.icon && <span className="list__icon">{it.icon}</span>}
          {it.avatarSrc && (
            <img className="list__avatar" src={it.avatarSrc} alt="" />
          )}
          <div className="list__content">
            <div className="list__label">{it.label}</div>
            {it.description && <div className="list__desc">{it.description}</div>}
          </div>
          {it.right && <div className="list__right">{it.right}</div>}
        </li>
      ))}
    </ul>
  );
};

export default List;
