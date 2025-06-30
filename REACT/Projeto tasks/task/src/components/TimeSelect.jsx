import InputLabel from './InputLabel';

const TimeSelect = (props) => {
  return (
    <div className='text-left" flex flex-col gap-1'>
      <InputLabel htmlFor={'time'}>Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#ECECEC]"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="night">Noite</option>
      </select>
    </div>
  );
};

export default TimeSelect;
