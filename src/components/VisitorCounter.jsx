import { useState, useEffect } from "react";
import "./VisitorCounter.css";

export function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // We use counterapi.dev which is free and reliable
    const fetchCount = async () => {
      try {
        const response = await fetch("https://api.counterapi.dev/v1/mubixin/visits/up");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        console.error("Visitor counter error:", err);
        setError(true);
      }
    };

    fetchCount();
  }, []);

  const displayCount = count !== null ? String(count).padStart(6, "0") : "------";

  return (
    <div className="visitor-counter-container" aria-label="Live Visitor Counter">
      <div className="visitor-counter-card">
        <div className="vc-border-line">━━━━━━━━━━━━</div>
        <div className="vc-title">
          <span className="pulse-dot-green"></span>
          VISITORS
        </div>
        <div className="vc-number">{error ? "ERR00R" : displayCount}</div>
        <div className="vc-border-line">━━━━━━━━━━━━</div>
      </div>
    </div>
  );
}
