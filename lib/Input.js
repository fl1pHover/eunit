import mergeNames from '@/util/mergeNames';

const Input = ({
  onChange = () => {},
  ph = '',
  value = '',
  props,
  type,
  className,
}) => {
  return (
    <input
      {...props}
      placeholder={ph}
      type={type}
      defaultValue={value}
      // onChange={(e) => onChange(e.target.value)}
      onChange={onChange}
      className={mergeNames(
        'px-4 py-2 md:w-2/3 w-full flex items-center justify-between',
        'rounded-full border-2 border-blue-400 bg-blue-100/10 outline-blue-400',
        'text-black font-medium placeholder-slate-400',
        className
      )}
      required
    />
  );
};

export default Input;
