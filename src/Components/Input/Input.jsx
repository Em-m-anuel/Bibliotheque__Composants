// src/Components/Input/Input.jsx
import React from 'react';
import './_input.scss';

const Input = ({ label, type, placeholder, value, onChange, error, className, ...props }) => {
  const finalClassName = `input-field ${className || ''} ${error ? 'input-field--error' : ''}`.trim();

  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={finalClassName}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;