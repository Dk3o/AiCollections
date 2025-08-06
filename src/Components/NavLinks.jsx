import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "../styles/components/NavLinks.module.scss"

export default function NavLinks() {
  return (
    <ul>
      <li>
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          Search Ai tools
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? styles.active  : ''}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => isActive ? styles.active  : ''}
        >
          Contact
        </NavLink>
      </li>
            <li>
        <NavLink 
          to="/newsletter" 
          className={({ isActive }) => isActive ? styles.active  : ''}
        >
          Newsletter
        </NavLink>
      </li>
    </ul>
  );
}
