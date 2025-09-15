import React, { useState, useEffect } from 'react';
import './Alert.scss';

function Alert({ 
  message, // texte 
  type = 'info',          // success, warning, error, info - il s'agit de couleurs définies dans le scss
  closable = false,       // affiche le bouton X
  onClose,               // callback quand on ferme
  autoClose = false,     // definit si l'alerte doit se fermer automatiquement
  autoCloseDelay = 3000, // délai avant fermeture auto (ms)
  className = '',
  children,              // permet d’afficher un contenu plus complexe à l’intérieur (par ex. un texte + un lien)
  ...props  //c'est pour tout ce qu'on rajoutera plus tard si besoin 
}) {
  // Il definit la visibilité de l'alerte
  const [isVisible, setIsVisible] = useState(true);

  // fonction qui prends en charge la fermeture de l'alerte
  const handleClose = () => {
    setIsVisible(false);
    // Au cas où il y aurait une fonction à executer à la fermeture du composant
    if (onClose) {
      onClose();
    }
  };


  // Fermeture automatique de l'alerte
  useEffect(() => {

    if (autoClose && autoCloseDelay > 0) {
      // Si les conditions sont réunis ont initialise un timer avec la valeur autoCloseDelay execute handleClose
      const timer = setTimeout(() => {handleClose()}, autoCloseDelay);
      // Remet le timer à 0 
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);//On definit les dependances, le useEffect ne se lancera qu'à chaque rendu du composant ou quand autoClose ou autoCloseDelay changeront


  // Icônes selon le type
  const getIcon = () => {
    const icons = {
      success: '✓',
      warning: '⚠',
      error: '✕',
      info: 'ⓘ'
    };
    return icons[type] || icons.info;
  };

  // Si l'alerte est fermé, n'affiche rien
  if (!isVisible) {
    return null;
  }
  
  
  return (
    <div 
      className={`alert alert--${type} ${className}`}
      role="alert"
      {...props}
    >
      <div className="alert__icon">
        {getIcon()}
      </div>
      
      <div className="alert__content">
        {/* On affiche le texte ou contenu */}
        {children ? children : <span className="alert__message">{message}</span>}
      </div>
      
      {closable && (
        <button 
          className="alert__close"
          onClick={handleClose}
          aria-label="Fermer l'alerte"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;