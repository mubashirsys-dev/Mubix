import React from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ theme, toggleTheme }) {
  const isCyber = theme === 'dark';
  
  return (
    <div className={`theme-toggle-wrapper ${isCyber ? 'is-cyber' : 'is-light'}`}>
      <span className="theme-toggle-label">
        {isCyber ? 'CYBER MODE' : 'NORMAL MODE'}
      </span>
      <button 
        className="premium-3d-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle Cyber Mode"
        type="button"
      >
        <div className="toggle-3d-chassis">
          <div className="toggle-symbols">
            <div className="symbol-circle"></div>
            <div className="symbol-line"></div>
          </div>
          
          <div className="toggle-3d-slider">
            <div className="slider-cube-cutout">
              <div className="cube-top-face"></div>
              <div className="cube-side-face"></div>
            </div>
            <div className="slider-main-body"></div>
          </div>
        </div>
      </button>
    </div>
  );
}
