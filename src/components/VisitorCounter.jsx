import { useState, useEffect } from "react";
import "./VisitorCounter.css";

export function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (window.hasIncrementedVisitorCount) {
      const fetchCurrentCount = async () => {
        try {
          const response = await fetch("https://api.counterapi.dev/v1/mubixin/visits");
          if (!response.ok) throw new Error("Failed to fetch");
          const data = await response.json();
          if (isMounted) {
            setCount(data.count);
            localStorage.setItem("mubix_backup_count", String(data.count));
          }
        } catch (err) {
          console.warn("Visitor counter API fetch failed, using local backup:", err);
          if (isMounted) {
            const backupCount = parseInt(localStorage.getItem("mubix_backup_count") || "348", 10);
            setCount(backupCount);
          }
        }
      };
      fetchCurrentCount();
      return () => {
        isMounted = false;
      };
    }

    const fetchCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem("mubix_portfolio_visited");
        let url = "https://api.counterapi.dev/v1/mubixin/visits";
        
        if (!hasVisited) {
          url = "https://api.counterapi.dev/v1/mubixin/visits/up";
          sessionStorage.setItem("mubix_portfolio_visited", "true");
        }

        window.hasIncrementedVisitorCount = true;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        if (isMounted) {
          setCount(data.count);
          localStorage.setItem("mubix_backup_count", String(data.count));
        }
      } catch (err) {
        console.warn("Visitor counter API blocked/failed, using local fallback:", err);
        if (isMounted) {
          let backupCount = parseInt(localStorage.getItem("mubix_backup_count") || "348", 10);
          const hasVisited = sessionStorage.getItem("mubix_portfolio_visited");
          if (!hasVisited) {
            backupCount += 1;
            sessionStorage.setItem("mubix_portfolio_visited", "true");
            localStorage.setItem("mubix_backup_count", String(backupCount));
          }
          setCount(backupCount);
        }
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
    };
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
