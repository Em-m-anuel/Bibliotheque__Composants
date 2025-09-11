import React from 'react';
import './_button.scss';

const Button = ({ label, onClick, variant, disabled, loading, className, ...props }) => {
  // Construire la chaîne de classes CSS finale en incluant les props.
  const finalClassName = `btn ${variant ? `btn--${variant}` : ''} ${className || ''}`.trim();

  return (
    <button
      className={finalClassName}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Afficher "Chargement..." si la prop 'loading' est vraie, sinon afficher le label */}
      {loading ? 'Chargement...' : label}
    </button>
  );
};

export default Button;