import { useEffect, useState } from "react";
import { resume } from "../data/resume.js";

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 400);
    const t2 = setTimeout(() => setShowBar(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!showBar) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(id); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(id);
  }, [showBar]);

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setFadeOut(true), 300);
      const t2 = setTimeout(() => onComplete(), 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress, onComplete]);

  return (
    <div className={`loader ${fadeOut ? "loader--fade" : ""}`}>
      {/* Brutalist grid background */}
      <div className="loader-bg" aria-hidden="true" />

      <div className="loader-card">
        {/* Logo image */}
        <div className="loader-logo-wrap">
          <img
            src={resume.logoUrl}
            alt="MUBIX Logo"
            className="loader-logo-img"
          />
        </div>

        {/* Text */}
        <div className={`loader-text ${showText ? "loader-text--visible" : ""}`}>
          <h1 className="loader-brand">MUBIX.IN</h1>
          <p className="loader-name">Mohammed Mubashir</p>
        </div>

        {/* Progress */}
        <div className={`loader-bar-wrap ${showBar ? "loader-bar-wrap--visible" : ""}`}>
          <div className="loader-bar-track">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="loader-bar-pct">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
