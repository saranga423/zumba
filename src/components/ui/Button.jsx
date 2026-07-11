export default function Button({
  children,
  href,
  onClick,
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `
    inline-flex
    items-center
    justify-center
    rounded-full
    bg-yellow-400
    text-black
    font-semibold
    hover:bg-yellow-300
    transition
    ${sizes[size]}
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}