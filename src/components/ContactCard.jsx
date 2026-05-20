export function ContactCard({ icon: Icon, label, value, href, external }) {
  const content = (
    <>
      <div className="contact-card-icon">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div className="contact-card-body">
        <span className="contact-card-label">{label}</span>
        <span className="contact-card-value">{value}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        className="contact-card"
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
        {external && <span className="external-indicator" aria-hidden="true">↗</span>}
      </a>
    );
  }

  return <div className="contact-card">{content}</div>;
}
