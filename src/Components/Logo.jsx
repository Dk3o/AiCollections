import React from 'react';
import LogoLight from '../assets/Logo-light.svg';
import LogoDark from '../assets/Logo-dark.svg';

export default function Logo({ isDark }) {
  return (
    <div className="logo">
      <a href="/">
        <h1>
          <img src={isDark ? LogoLight : LogoDark} alt="Logo" />
        </h1>
      </a>
    </div>
  );
}
