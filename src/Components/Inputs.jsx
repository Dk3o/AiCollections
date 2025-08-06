import React from 'react';
import * as Icons from "lucide-react";
import { aiData } from "../data/AiData";
import styles from "../styles/components/Inputs.module.scss";

export function SearchInput({ searchValue, searchCount, handleChange, handleClear }) {
  return (
    <div className={styles.inputWithIcon}>
      <input
        id="search"
        className={styles.searchInput}
        type="text"
        placeholder={`Search among ${aiData.length} tools...`}
        value={searchValue}
        onChange={handleChange}
      />
      {searchCount > 0 ? (
        <button className={styles.btnClear} onClick={handleClear}>
          <Icons.X className="clear-icon" size={20} />
        </button>
      ) : (
        <Icons.Search className={styles.searchIcon} size={24} />
      )}
    </div>
  );
}

export function CategoriesInput({
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
      <div className={styles.top}>
        <label htmlFor="categories">
          {touched && error && <span className={styles.error}>*</span>}
          Categories
        </label>
        <div className={styles.counter}>
          <span className={styles.count}>
            ({charsLeft >= 0 ? charsLeft : 0} characters)
          </span>
          <span className={styles.count}>
            ({categories.length}/{maxTags})
          </span>
        </div>
      </div>

      <div className={styles.group}>
        <input
          type="text"
          id="categories"
          name="categories"
          className={styles.inputText}
          value={tagsInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
        <div className={styles.tooltip}>
          <Icons.Info size={18} absoluteStrokeWidth />
          <span className={styles.tooltiptext}>Add category with a semicolon (`;`) at the end or press enter.</span>
        </div>
      </div>

      {categories.length > 0 && (
        <div className={styles.badgeContainer}>
          {categories.map((category, idx) => (
            <div key={idx} className={styles.badge}>
              {category}
              <button type="button" onClick={() => onRemove(idx)}>
                <Icons.X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DescriptionInput({
  value,
  onChange,
  onBlur,
  touched,
  error,
  maxLength = 420
}) {
  return (
    <div>
      <div className={styles.top}>
        <label htmlFor="description">
          {touched && error && <span className={styles.error}>*</span>}
          Description
        </label>
        <div className={styles.counter}>
          <span className={styles.count}>
            ({maxLength - value.length} characters)
          </span>
        </div>
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

export function ToolNameInput({ value, onChange, error, touched, onBlur }) {
  return (
    <div>
      <label htmlFor="tool-name">
        {touched && error && <span className={styles.error}>*</span>}
        Tool name
      </label>
      <input
        type="text"
        id="tool-name"
        name="toolName"
        className={styles.inputText}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}