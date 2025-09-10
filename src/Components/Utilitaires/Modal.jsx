import React, { useEffect, useRef } from 'react';
import './Modal.scss';

function Modal({ 
  isOpen = false,
  onClose, 
  title,
  children, //Contenu additionnel pour enrichier le composant 
  size = 'md',           // sm, md, lg, xl, full
  closable = true,       // affiche le bouton X
  closeOnOverlay = true, // ferme en cliquant sur l'overlay
  closeOnEscape = true,  // ferme avec la touche Échap
  className = '',
  ...props //Pour tous les autres attributs qu'on voudrait ajouter
}){


  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // Fermeture avec la touche Échap
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus management - focus le modal quand il s'ouvre
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup au démontage du composant
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Ferme le modal si on clique en dehors
  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === overlayRef.current) {
      onClose?.();
    }
  };

  // Ne rien rendre si le modal n'est pas ouvert
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div 
        className={`modal modal--${size} ${className}`}
        ref={modalRef}
        tabIndex={-1}
        {...props}
      >
        {/* Header avec titre et bouton fermer */}
        {(title || closable) && (
          <div className="modal__header">
            {title && (
              <h2 className="modal__title" id="modal-title">
                {title}
              </h2>
            )}
            
            {closable && (
              <button 
                className="modal__close"
                onClick={onClose}
                aria-label="Fermer le modal"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Contenu du modal */}
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;