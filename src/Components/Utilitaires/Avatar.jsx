import React from "react";
import "./Avatar.scss";

const Avatar = ({
  src,
  alt = "avatar",
  size = "md",            // sm | md | lg | xl
  shape = "circle",       // circle | square
  status = null,          // online | away | busy | offline | null
  bordered = true,
  className = "",
}) => {
  return (
    <span className={`avatar avatar--${size} avatar--${shape} ${bordered ? "avatar--bordered" : ""} ${status ? `avatar--${status}` : ""} ${className}`}>
      <img className="avatar__img" src={src} alt={alt} />
      {status && <span className="avatar__status" aria-hidden="true" />}
    </span>
  );
};

export default Avatar;
