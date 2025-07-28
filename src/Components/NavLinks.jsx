import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLinks() {
  return (
    <ul>
      <li><Link to="/">Search Ai tools</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  );
}
