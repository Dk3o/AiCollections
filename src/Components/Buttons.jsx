import React, { useState, useEffect } from 'react';
import * as Icons from "lucide-react";
import styles from '../styles/components/Buttons.module.scss';

export function ClearTagsButton({ onClick, isExpanded }) {
  return (
    <button
      className={`${styles.btnClearCategories} ${isExpanded ? styles.left : ''}`}
      onClick={onClick}
      aria-label="Clear categories"
    >
      <Icons.X className="clear-icon" size={20} />
    </button>
  );
}

export function ExpandButton({ isExpanded, toggle }) {
  return (
    <button
      onClick={toggle}
      className={isExpanded ? styles.btnPrimaryMinimize : styles.btnPrimaryExpand}
      aria-label={isExpanded ? "Collapse search categories" : "Expand search categories"}
    >
      {isExpanded ? <Icons.Minus size={36} /> : <Icons.Plus size={36} />}
    </button>
  );
}

export function RequestButton({ onClick }) {
  return (
    <div className={styles.request}>
      <a href="#" onClick={onClick}>
        <span>Did we miss any tool?</span>
      </a>
    </div>
  );
}

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <button
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

export function SubmitButtons({ onCancel, isSending }) {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="submit"
        className={`btn ${styles.btnSend}`}
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Send"}
      </button>
      <button
        type="button"
        className={`btn ${styles.btnCancel}`}
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
}