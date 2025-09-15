import React from 'react';
import './Badge.scss';

function Badge ({ 
  text, 
  status = 'neutral', // success, warning, error, info, neutral - couleurs definis dans le scss 
  className = '',
  ...props //Utilise au cas où on voudrait y ajouter d'autres attributs 
}){
  return (
    <span 
      className={`badge badge--${status} ${className}`}
      {...props}
    >
      {text}
    </span>
  );
};

export default Badge;