import { tv } from 'tailwind-variants';
import PropTypes from 'prop-types';

const SidebarButton = ({ children, color }) => {
  const sidebarButton = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      color: {
        unselected: 'text-brand-dark-blue',
        selected: 'bg-[#e6f7f8] text-[#00ad85]',
      },
    },
    defaultVariants: {
      color: 'unselected',
    },
  });

  return (
    <a href="#" className={sidebarButton({ color })}>
      {children}
    </a>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'unselected']),
};

export default SidebarButton;
