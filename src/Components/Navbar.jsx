import React, { useState, useEffect } from 'react';
import styles from "../styles/components/Navbar.module.scss";
import RequestTool from './RequestTool';
import Logo from './Logo';
import NavLinks from './NavLinks';
import  {RequestButton} from './Buttons';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRequestTool = () => {
    setRequestOpen(true);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.className = isDark ? 'light-mode' : 'dark-mode';
  };

    const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  } else {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.touchAction = "";
  }

}, [isMobileMenuOpen]);

  return (
    <div className="container">
      <div className={styles.top}>
        <nav className="nav">
          <div className={styles.navContainer}>
            <Logo isDark={isDark} />
            <div className={styles.hamburger} onClick={openMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
            <div className={`${styles.navOverlay} ${isMobileMenuOpen ? styles.showMobile : ''}`}>
              <div className={styles.navContent}>
                {isMobileMenuOpen && <button className={`btn ${styles.btnCross}`} onClick={() => setMobileMenuOpen(false)}><X size={20} /></button>}
                <NavLinks />
                <div className={styles.panelHeader}>
                  <RequestButton onClick={handleRequestTool} />
                  {requestOpen && 
                    <RequestTool 
                      onClose={() => setRequestOpen(false)}
                      isMobileMenuOpen={isMobileMenuOpen}
                    />}
                  <ThemeToggle 
                    isDark={isDark} 
                    toggleTheme={toggleTheme} 
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
