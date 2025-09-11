// src/Components/Checkbox/Checkbox.jsx
import React from 'react';
import './_checkbox.scss';

const Checkbox = ({ label, checked, onChange, className, ...props }) => {
  const finalClassName = `checkbox-container ${className || ''}`.trim();

  return (
    <label className={finalClassName}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};

export default Checkbox;