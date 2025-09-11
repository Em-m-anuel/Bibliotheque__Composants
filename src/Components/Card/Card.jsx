// src/Components/Card/Card.jsx
import React from 'react';
import './_card.scss';

const Card = ({ header, footer, className, children, ...props }) => {
  return (
    <div className={`card-container ${className || ''}`} {...props}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-content">
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;