import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <div className="theme">
      <button
        className={`toggle-btn ${isDark ? 'btn-light' : 'btn-dark'}`}
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun /> : <Moon color="#fff" />}
      </button>
    </div>
  );
}
