import styles from '../styles/components/ThemeToggle.module.scss';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <div className={styles.themeToggle}>
      <button
        className={`${styles.toggleBtn} ${isDark ? styles.btnLight : styles.btnDark}`}
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun /> : <Moon color="#fff" />}
      </button>
    </div>
  );
}
