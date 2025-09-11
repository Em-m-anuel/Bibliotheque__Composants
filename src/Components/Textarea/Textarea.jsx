// src/Components/Textarea/Textarea.jsx
import React from 'react';
import './_textarea.scss';

const Textarea = ({ label, placeholder, value, onChange, rows, className, ...props }) => {
  const finalClassName = `textarea-field ${className || ''}`.trim();

  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={finalClassName}
        {...props}
      />
    </div>
  );
};

export default Textarea;