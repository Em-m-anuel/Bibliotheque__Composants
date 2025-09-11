// src/Components/FileUpload/FileUpload.jsx
import React from 'react';
import './_fileUpload.scss';

const FileUpload = ({ label, accept, onUpload, className, ...props }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className={`file-upload-container ${className || ''}`} {...props}>
      {label && <span className="file-upload-label">{label}</span>}
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;