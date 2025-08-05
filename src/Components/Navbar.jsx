import React, { useState } from 'react';
import styles from "../styles/components/Navbar.module.scss";
import RequestTool from './RequestTool';
import Logo from './Logo';
import NavLinks from './NavLinks';
import  {RequestButton} from './Buttons';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleRequestTool = () => {
    setRequestOpen(true);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.className = isDark ? 'light-mode' : 'dark-mode';
  };

  return (
    <div className="container">
      <div className={styles.top}>
        <nav className="nav">
          <div className={styles.navContainer}>
            <Logo isDark={isDark} />
            <NavLinks />
            <div className={styles.panelHeader}>
              <RequestButton onClick={handleRequestTool} />
              {requestOpen && <RequestTool onClose={() => setRequestOpen(false)} />}
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
