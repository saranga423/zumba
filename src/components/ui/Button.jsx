const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

// TODO(design-tokens): raw hex values stand in for the real @theme tokens
// (cream / hibiscus / mango / plum / lime) — swap once confirmed against
// globals.css.
const variants = {
  primary:
    "bg-[#C8F03C] text-[#2B1330] hover:bg-[#DFFA6E] focus-visible:ring-[#C8F03C]",
  secondary:
    "bg-[#E23F73] text-[#FAF4E9] hover:bg-[#FF5A8C] focus-visible:ring-[#E23F73]",
  outline:
    "bg-transparent text-[#FAF4E9] border border-[#FAF4E9]/25 hover:border-[#C8F03C]/60 hover:text-[#C8F03C] focus-visible:ring-[#C8F03C]",
  ghost:
    "bg-transparent text-[#2B1330] hover:bg-[#2B1330]/5 focus-visible:ring-[#2B1330]",
  // Brand-locked green, not a palette token — WhatsApp is a recognizable
  // external brand mark, so this intentionally breaks from hibiscus/mango/lime.
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1FBF5C] focus-visible:ring-[#25D366]",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) {
  const classes = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-full
    font-[Bricolage_Grotesque]
    font-bold
    tracking-wide
    transition-all
    duration-200
    ease-out
    hover:-translate-y-0.5
    active:translate-y-0
    active:scale-[0.98]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#2B1330]
    disabled:opacity-50
    disabled:pointer-events-none
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}