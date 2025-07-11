import { tv } from 'tailwind-variants';
import PropTypes from 'prop-types';

const Button = ({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: 'flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-70',
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        secondary: 'bg-transparent text-[#333333]',
        ghost: 'bg-transparent text-brand-dark-gray',
      },
      size: {
        larger: 'py-8 text-sm',
        small: 'py-1 text-xs',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  });

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'ghost', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'larger']),
  className: PropTypes.string,
};

export default Button;
