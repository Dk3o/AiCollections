import React, { useState, useEffect, Suspense } from 'react'
import styles from "../styles/components/Navbar.module.scss"
import Logo from './Logo'
import NavLinks from './NavLinks'
import { RequestButton } from './Buttons'
import ThemeToggle from './ThemeToggle'
import { Menu, X } from 'lucide-react'

// Lazy load RequestTool
const RequestTool = React.lazy(() => import('./RequestTool'))

export default function Navbar() {
  const [requestOpen, setRequestOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleRequestTool = () => {
    setRequestOpen(true)
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.body.className = isDark ? 'light-mode' : 'dark-mode'
  }

  const openMobileMenu = () => {
    setMobileMenuOpen(true)
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className="container">
      <div className={styles.top}>
        <nav className="nav">
          <div className={styles.navContainer}>
            <Logo isDark={isDark} />
            <button className={styles.hamburger} onClick={openMobileMenu} aria-label="Open mobile menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`${styles.navOverlay} ${isMobileMenuOpen ? styles.showMobile : ''}`}>
              <div className={styles.navContent}>
                {isMobileMenuOpen && (
                  <button className={`btn ${styles.btnCross}`} onClick={() => setMobileMenuOpen(false)} aria-label="Close mobile menu">
                    <X size={20} />
                  </button>
                )}
                <NavLinks />
                <div className={styles.panelHeader}>
                  <RequestButton onClick={handleRequestTool} />
                  {requestOpen && (
                    <Suspense fallback={<div>Loading Request Tool...</div>}>
                      <RequestTool onClose={() => setRequestOpen(false)} isMobileMenuOpen={isMobileMenuOpen} />
                    </Suspense>
                  )}
                  <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
