import { forwardRef } from 'react';
import InputLabel from './InputLabel';
import InputError from './InputError';
import PropTypes from 'prop-types';

const Input = forwardRef(({ label, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-[#ECECEC]"
        ref={ref}
        {...rest}
      />
      {error && <InputError errorMessage={error.message} />}
    </div>
  );
});

Input.displayName = 'Input';
Input.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.node,
};

export default Input;
