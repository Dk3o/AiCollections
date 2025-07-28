import React from 'react';

export default function IconUploader({ icon, onChange }) {
  return (
    <div>
      <label htmlFor="icon" className='custom-file-label'>
        Upload icon (PNG or SVG)
      </label>
      <div className='file-upload-holder'>
        <input
          type="file"
          id="icon"
          name="icon"
          accept="image/png, image/svg+xml"
          className='file-input'
          onChange={onChange}
        />
        {icon && (
          <div className="icon-preview">
            <img
              src={icon}
              alt="Preview"
              style={{ width: "48px", height: "48px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
