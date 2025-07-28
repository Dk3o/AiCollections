import React from 'react';

export default function ToolNameInput({ value, onChange, error, touched, onBlur }) {
  return (
    <div>
      <label htmlFor="tool-name">
        {touched && error && <span className="error">*</span>}
        Tool name
      </label>
      <input
        type="text"
        id="tool-name"
        name="toolName"
        className='input-text'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
