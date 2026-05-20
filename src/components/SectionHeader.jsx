export function SectionHeader({ eyebrow, id, title, align = "left" }) {
  return (
    <div className={`section-header section-header--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
