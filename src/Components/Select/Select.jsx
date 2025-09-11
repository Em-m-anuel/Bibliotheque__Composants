import React from 'react';
import './_select.scss';

const Select = ({ label, options, value, onChange, className, ...props }) => {
  const finalClassName = `select-field ${className || ''}`.trim();

  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={finalClassName}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;