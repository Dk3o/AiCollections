import React, { useState } from 'react';
import RequestAiTool from './RequestAiTool';
import Logo from './Logo';
import NavLinks from './NavLinks';
import RequestButton from './RequestButton';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleRequestAiTool = () => {
    setRequestOpen(true);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.className = isDark ? 'light-mode' : 'dark-mode';
  };

  return (
    <header>
      <div className="container">
        <div className="top">
          <nav className="nav">
            <div className="hello">
              <Logo isDark={isDark} />
              <NavLinks />
              <div className="panel-header">
                <RequestButton onClick={handleRequestAiTool} />
                {requestOpen && <RequestAiTool onClose={() => setRequestOpen(false)} />}
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
