export function BrutalCard({ children, className = "", tone = "white" }) {
  return <article className={`brutal-card brutal-card--${tone} ${className}`}>{children}</article>;
}
