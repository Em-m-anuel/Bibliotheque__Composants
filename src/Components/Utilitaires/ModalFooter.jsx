import React from 'react';

// Complement à Modal il constitue la partie du bas qui prends generalement les boutons et autres éléments 

function ModalFooter({ children, className = '', align = 'right', ...props })
{
  // Les differentes positions des boutons ou autres elements, le right n'est pas defini car c'est la position par défaut 
  const alignClass = align === 'center' ? 'justify-content: center' : 
                    align === 'left' ? 'justify-content: flex-start' : 
                    'justify-content: flex-end';

  return (
    <div 
      className={`modal__footer ${className}`} 
      style={{ justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModalFooter;