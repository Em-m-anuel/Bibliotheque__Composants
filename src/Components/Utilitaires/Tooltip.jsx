import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.scss';

function Tooltip({ 
  text,
  position = 'top',      // top, bottom, left, right, auto
  trigger = 'hover',     // hover, click, focus
  delay = 500,           // délai avant affichage (ms)
  children,              // Pour le contenu additionnel
  disabled = false,      // désactive le tooltip
  className = '',
  maxWidth = 200,        // largeur max du tooltip
  ...props               // Pour les attributs qu'on voudrait rajouter 
}){
  // Savoir si le composant est affiché 
  const [isVisible, setIsVisible] = useState(false);
  // Connaitre la position du composant
  const [tooltipPosition, setTooltipPosition] = useState(position);
  // Timer d'affichage
  const [showTimeout, setShowTimeout] = useState(null);
  // Timer de masquage
  const [hideTimeout, setHideTimeout] = useState(null);
  
  const triggerRef = useRef(null); //L'élément déclencheur 
  const tooltipRef = useRef(null); //La bulle du tooltip

  // Calcule la position optimale du tooltip
  const calculatePosition = () => {
   
    // Petite verification pour savoir si le déclencheur et le tooltip sont accessibles ou si la position n'est pas deja defini 
    if (!triggerRef.current || !tooltipRef.current || position !== 'auto') {
      return position;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect(); //On récupère la position du déclencheur
    const tooltipRect = tooltipRef.current.getBoundingClientRect(); //On récupère les infos de taille et pos du tooltip
    // On récupère les infos de dimensions de l'écran 
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Priorité : top -> bottom -> right -> left
    const positions = ['top', 'bottom', 'right', 'left'];
    //Boucle pour tester dans quelle position le tooltip peut s'afficher sans déborder des limites de l'écran 
    for (const pos of positions) {
      //Booléen utilisé pour verifier si une position prise est bonne ou pas 
      let fits = true;
      
      switch (pos) {
        case 'top':
          // fits reste à true si la position top est validé, dans le cas contraire ça devient false, c'est pareil pour les autres cas
          fits = triggerRect.top - tooltipRect.height - 10 > 0;
          break;
        case 'bottom':
          fits = triggerRect.bottom + tooltipRect.height + 10 < viewport.height;
          break;
        case 'left':
          fits = triggerRect.left - tooltipRect.width - 10 > 0;
          break;
        case 'right':
          fits = triggerRect.right + tooltipRect.width + 10 < viewport.width;
          break;
      }
      // Si la position est validé alors retourne la position 
      if (fits) return pos;
    }
    
    return 'top'; // retourne top par défaut si aucune position n'est validé
  };

  // Gestion de l'affichage
  const showTooltip = () => {
    // Verifie si le tooltip est desactivé ou n'a pas de texte et n'affiche alors rien 
    if (disabled || !text) return;
    
    // Annule le processus de masquage du tooltip s'il est actif
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }

    const timeout = setTimeout(() => {
      setIsVisible(true);
      // Calcul de position après rendu
      //Affiche le composant après un delay time 
      setTimeout(() => {
        setTooltipPosition(calculatePosition());
      }, 0);
    }, delay);
    

    // Les process d'affichage et de masquage du tooltip permettent de garder une trace sur le composant permettant ainsi de pouvoir l'afficher et le desactiver selon les circonstances
    // Process d'affichage du tooltip

    setShowTimeout(timeout);
  };

  // Process de masquage du tooltip, s'il est actif 
  const hideTooltip = () => {
    // Process de masquage du tooltip, s'il est actif on le desactive
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }

    // Fais disparaitre le tooltip apres 100 ms
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 100);
    
    setHideTimeout(timeout);
  };

  // Event handlers selon le trigger
  const getEventHandlers = () => {
    // Ne renvoie rien si le composant est desactivé
    if (disabled) return {};

    // Affiche le composant selon les déclencheurs 
    switch (trigger) {
      case 'click':
        return {
          onClick: () => isVisible ? hideTooltip() : showTooltip()
        };
      
      case 'focus':
        return {
          onFocus: showTooltip,
          onBlur: hideTooltip
        };
      
      default: // hover
        return {
          onMouseEnter: showTooltip,
          onMouseLeave: hideTooltip,
          onFocus: showTooltip,
          onBlur: hideTooltip
        };
    }
  };

  // Cleanup des timeouts
  useEffect(() => {
    return () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [showTimeout, hideTimeout]);

  // Fermeture au clic extérieur (pour trigger="click")
  useEffect(() => {
    if (trigger === 'click' && isVisible) {
      const handleClickOutside = (event) => {
        if (
          triggerRef.current && 
          !triggerRef.current.contains(event.target) &&
          tooltipRef.current &&
          !tooltipRef.current.contains(event.target)
        ) {
          hideTooltip();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [trigger, isVisible]);

  return (
    <div className="tooltip-wrapper" {...props}>
      {/* Élément déclencheur */}
      <div
        ref={triggerRef}
        className="tooltip-trigger"
        {...getEventHandlers()}
        aria-describedby={isVisible ? 'tooltip' : undefined}
      >
        {children}
      </div>

      {/* Tooltip */}
      {isVisible && text && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className={`tooltip tooltip--${tooltipPosition} ${className}`}
          style={{ maxWidth: `${maxWidth}px` }}
        >
          <div className="tooltip__content">
            {text}
          </div>
          <div className="tooltip__arrow" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;