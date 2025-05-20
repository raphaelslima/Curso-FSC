const SidebarButton = ({ children, variant }) => {
  const getvariantClasses = () => {
    <SidebarButton variant="unselected">Início</SidebarButton>;
    if (variant === 'unselected') {
      return 'text-[#35383e]';
    } else {
      return 'bg-[#e6f7f8] text-[#00ad85]';
    }
  };
  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getvariantClasses()}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;
