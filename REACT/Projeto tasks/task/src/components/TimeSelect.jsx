import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import InputLabel from './InputLabel';
import InputError from './InputError';

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className='text-left" flex flex-col gap-1'>
      <InputLabel htmlFor={'time'}>Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-[#ECECEC]"
        {...props}
        ref={ref}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {props.error && <InputError errorMessage={props.error.message} />}
    </div>
  );
});

TimeSelect.displayName = 'TimeSelect';

TimeSelect.propTypes = {
  errorMessage: PropTypes.string,
};

export default TimeSelect;
