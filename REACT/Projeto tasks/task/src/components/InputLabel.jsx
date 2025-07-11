import PropTypes from 'prop-types';

const InputLabel = ({ children, ...rest }) => {
  return (
    <label
      className="text-left text-sm font-semibold text-brand-dark-blue"
      {...rest}
    >
      {children}
    </label>
  );
};

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputLabel;
