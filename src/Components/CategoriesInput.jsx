import React from 'react';
import { Info, X } from "lucide-react";

export default function CategoriesInput({
  tagsInput,
  onChange,
  onKeyDown,
  categories,
  onRemove,
  error,
  touched,
  onBlur,
  tagMaxChar = 20,
  maxTags = 5,
}) {
  const segments = tagsInput.split(";");
  const currentTag = segments[segments.length - 1] || "";
  const charsLeft = tagMaxChar - currentTag.length;

  return (
    <div>
      <div className='title'>
        <label htmlFor="categories">
          {touched && error && <span className="error">*</span>}
          Categories
        </label>
        <div className="counter">
          <span className='count'>
            ({charsLeft >= 0 ? charsLeft : 0} characters)
          </span>
          <span className="count">
            ({categories.length}/{maxTags})
          </span>
        </div>
      </div>

      <div className="group">
        <input
          type="text"
          id="categories"
          name="categories"
          className='input-text'
          value={tagsInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
        <div className="tooltip">
          <Info size={18} absoluteStrokeWidth />
          <span className="tooltiptext">Separate tags with a semicolon (`;`). Max 5 tags.</span>
        </div>
      </div>

      {categories.length > 0 && (
        <div className='banner-container'>
          {categories.map((category, idx) => (
            <div key={idx} className='banner'>
              {category}
              <button type="button" onClick={() => onRemove(idx)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
