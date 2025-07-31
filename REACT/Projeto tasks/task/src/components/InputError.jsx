import PropTypes from 'prop-types';

const InputError = ({ errorMessage }) => {
  return <p className="text-left text-xs text-red-500">{errorMessage}</p>;
};

InputError.propTypes = {
  children: PropTypes.node,
};

export default InputError;
