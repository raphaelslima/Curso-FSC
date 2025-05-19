import PropTypes from 'prop-types';

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
    <a href="#" className={`px-6 py-3 ${getvariantClasses()}`}>
      {children}
    </a>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.node,
};

export default SidebarButton;
