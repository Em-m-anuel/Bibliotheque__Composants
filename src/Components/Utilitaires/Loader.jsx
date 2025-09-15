import React from 'react';
import './Loader.scss';

function Loader({ 
  size = 'md',        // sm, md, lg 
  className = '',     
  color = 'primary',  // primary, secondary, white 
  text = '',          // texte optionnel sous le loader
  ...props //Utilise au cas où on voudrait y ajouter d'autres attributs 
})
{
  return (
    <div className={`loader-container ${className}`} {...props}> 
      <div className={`loader loader--${size} loader--${color}`}>
        <div className="loader__spinner"></div>
      </div>
      {text && <span className="loader__text">{text}</span>}
    </div>
  );
};

export default Loader;