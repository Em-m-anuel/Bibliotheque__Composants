import React from "react";
import "./Breadcrumbs.scss";

const Breadcrumbs = ({
  items = [],             // [{ label, href? }] 
  separator = "/",
  maxItems = null,        // e.g. 4 -> "Home / … / Section / Page" le max d'objets qu'afficher le breadcrumbs
  className = ""
}) => {

  // Fonction qui gère l'affichage du breadcrumb
  const data = (() => {
    // Si maxItems n'existe pas ou alors la taille de items est inf à max alors on retourne items sans modifs 
    if (!maxItems || items.length <= maxItems) return items;
    // Recupère le premier et dernier objet de la liste et crée une liste condensée qui respecte la longueur max
    const first = items[0];
    const last  = items[items.length - 1];
    const middle = { label: "…", href: null, ellipsis: true };
    return [first, middle, ...items.slice(- (maxItems - 2))];
  })();

  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
      {data.map((it, i) => (
        <span key={`${it.label}-${i}`} className={`breadcrumbs__item ${it.ellipsis ? "is-ellipsis" : ""}`}>
          {it.href ? <a href={it.href}>{it.label}</a> : it.label}
          {i < data.length - 1 && <span className="breadcrumbs__separator">{separator}</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
