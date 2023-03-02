import mergeNames from '@/util/mergeNames';
import CurrencyInputField from "react-currency-input-field";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
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

export const NumberInput = ({
  onChange = () => {},
  ph = '',
  value = '',
  props,
  className,
}) => {
  // const counterId = React.useRef(0);
  const [isClicked, setIsClicked] = React.useState(false);
  const [counter, setCounter] = React.useState(
    isNaN(parseInt(value)) ? 0 : parseInt(value)
  );

  React.useEffect(() => {
    // console.log(`CALLING UPDATES ${counterId.current++}`, counter);
    onChange(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <div
      className={mergeNames(
        'h-11 m-0 p-0 md:w-2/3 w-full flex items-center justify-between overflow-hidden',
        'rounded-full border-2 border-blue-400 bg-blue-100/10 outline-blue-400',
        'text-black font-medium placeholder-slate-400',
        className
      )}
    >
      {!isClicked ? (
        <button
          className="w-full h-full px-4 py-2 border-none ring-0"
          onClick={() => {
            setIsClicked(true);
          }}
        >
          {counter}
        </button>
      ) : (
        <input
          required
          {...props}
          type={'number'}
          autoFocus={isClicked}
          placeholder={ph}
          defaultValue={counter || ''}
          onChange={(e) => {
            onChange(parseInt(e.target.value));
            setCounter(parseInt(e.target.value));
          }}
          className="w-full h-full px-4 py-2 text-center border-none ring-0 bg-blue-100/50"
        />
      )}
      <div className="flex flex-col m-0 ">
        <button
          className="w-full px-2"
          onClick={() => {
            setIsClicked(false);
            let val;
            setCounter((prev) => {
              val = prev + 1;
              return val;
            });
            onChange(counter);
          }}
        >
          <BiChevronUp className="text-blue-600" />
        </button>
        <button
          className="w-full px-2 "
          onClick={() => {
            setIsClicked(false);
            setCounter((prev) => (prev > 0 ? prev - 1 : prev));
            onChange(counter);
          }}
        >
          <BiChevronDown className="text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export const CurrencyInput = ({
  placeholder = '',
  onChange = () => {},
  value = 0,
}) => {
  return (
    <CurrencyInputField
      // prefix="MNT "
      value={value}
      id="input-example"
      name="input-name"
      decimalsLimit={2}
      placeholder={placeholder}
      intlConfig={{ locale: 'mn-MN', currency: 'MNT' }}
      onValueChange={(value, name) => onChange(value)}
      className="w-full px-4 py-2 font-semibold border-2 rounded-full border-blue-400/70"
    />
  );
};
export const FormattedNumberInput = ({
  placeholder = '',
  onChange = () => {},
  suffix = '',
  value = 0,
}) => {
  return (
    <div className="flex items-center px-4 overflow-hidden font-semibold border-2 rounded-full border-blue-400/70 ">
      <CurrencyInputField
        // prefix="MNT "
        // suffix={suffix}
        value={value}
        id="input-example"
        name="input-name"
        decimalsLimit={2}
        placeholder={placeholder}
        onValueChange={(value, name) => onChange(value)}
        className="w-full py-2 border-none outline-none ring-0"
      />
      {suffix}
    </div>
  );
};
