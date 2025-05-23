const Button = ({ children, variant, ...rest }) => {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-[#00Adb5] text-white';
    }
    if (variant === 'secundary') {
      return 'bg-transparent text-[#333333]';
    }
  };
  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-70 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
