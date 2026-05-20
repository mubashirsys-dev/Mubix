export function NeoButton({
  children,
  className = "",
  download,
  href,
  icon: Icon,
  onClick,
  target,
  rel,
  variant = "primary",
}) {
  const classes = `neo-button neo-button--${variant} ${className}`.trim();

  if (href) {
    return (
      <a
        className={classes}
        download={download}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {Icon ? <Icon aria-hidden="true" size={18} /> : null}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type="button">
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      <span>{children}</span>
    </button>
  );
}
