import { forwardRef } from 'react';
import InputLabel from './InputLabel';

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className='text-left" flex flex-col gap-1'>
      <InputLabel htmlFor={'time'}>Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#ECECEC]"
        {...props}
        ref={ref}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
      {props.error && (
        <p className="text-left text-xs text-red-500">{props.error.message}</p>
      )}
    </div>
  );
});

TimeSelect.displayName = 'TimeSelect';

export default TimeSelect;
