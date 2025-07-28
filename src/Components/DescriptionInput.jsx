import React from 'react';

export default function DescriptionInput({
  value,
  onChange,
  onBlur,
  touched,
  error,
  maxLength = 420
}) {
  return (
    <div>
      <div className="title">
        <label htmlFor="description">
          {touched && error && <span className="error">*</span>}
          Description
        </label>
        <span className="count">
          ({maxLength - value.length} characters)
        </span>
      </div>
      <textarea
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
