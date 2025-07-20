import React, { useState } from 'react'
import {Sun, Moon} from "lucide-react";
import { Link } from 'react-router-dom';
import RequestAiTool from './RequestAiTool';

export default function Navbar() {
    const [requestOpen, isRequestOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const handleRequestAiTool = () => {
        isRequestOpen(true);
    }

    const toggleTheme = () => {
      setIsDark(!isDark);
      document.body.className = isDark ? "light-mode" : "dark-mode"; // optional theme application
    };

  return (
    <header>
        <div className='container'>
            <div className="top">
                <nav className="nav">
                    <div className="hello">
                        <div className="logo">
                            <a href="/">
                                <h1>Ai Collections</h1>
                            </a>
                        </div>
                        <ul>
                            <li>
                            <Link to="/">Search Ai tools</Link>
                            </li>
                            <li>
                            <Link to="/">Contact</Link>
                            </li>
                            <li>
                            <Link to="/">About</Link>
                            </li>
                        </ul>
                        <div className="panel-header">
                            <div className="request">
                                <a href="#" onClick={handleRequestAiTool}>
                                <span>Did we miss any tool?</span>
                                </a>
                                {requestOpen && <RequestAiTool onClose={() => isRequestOpen(false)} /> }
                            </div>
                            <div className="theme">
                                <button 
                                    className={`toggle-btn ${isDark ? "btn-light" : "btn-dark"}`}  
                                    onClick={toggleTheme}
                                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                >
                                    {isDark ? <Sun /> : <Moon color='#fff' />}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        {/* <div className="ads">
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
        </div> */}
        </div>
    </header>
  )
}
