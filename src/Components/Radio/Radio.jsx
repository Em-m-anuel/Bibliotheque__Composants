// src/Components/Radio/Radio.jsx
import React from 'react';
import './_radio.scss';

const Radio = ({ label, checked, onChange, className, ...props }) => {
  const finalClassName = `radio-container ${className || ''}`.trim();

  return (
    <label className={finalClassName}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {label && <span className="radio-label">{label}</span>}
    </label>
  );
};

export default Radio;