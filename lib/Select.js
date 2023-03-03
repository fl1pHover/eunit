import mergeNames from '@/util/mergeNames';
import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { CgChevronDown } from 'react-icons/cg';

const Select = ({
  width = '',
  onToggle = () => {},
  label = 'SelectBox',
  data = [],
  Item = () => <></>,
}) => {
  const [show, setShow] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div
      className={mergeNames(
        'relative flex justify-center',
        // ' w-full',
        'mx-auto',
        width === 'long' ? 'md:w-2/3 w-5/6' : 'md:w-1/3 w-full'
      )}
    >
      <button
        onClick={() => {
          setShow((prev) => !prev);
          onToggle();
        }}
        className={mergeNames(
          // width === 'long' ? 'md:w-2/3 w-5/6' : 'md:w-1/3 w-full',
          'w-full',
          'rounded-full border-2 border-blue-400 px-4 py-2 flex items-center justify-between'
        )}
      >
        <p className="font-medium text-black">{value != '' ? value : label}</p>
        <CgChevronDown
          size={20}
          className={mergeNames(
            'text-blue-500 transition-all ease-in-out',
            show && 'rotate-180'
          )}
        />
      </button>
      {show && (
        <div
          className={mergeNames(
            'z-[50] absolute max-h-[40vh] overflow-y-scroll mt-12 rounded-md overflow-hidden flex flex-col w-full border'
          )}
        >
          {data?.map((props, key) => {
            const isActive = selectedIdx === key;
            return (
              <Item
                id={props.id}
                key={key}
                data={props.value}
                onClick={() => {
                  setShow(false);
                  setSelectedIdx(key);
                  setValue(props.value);
                }}
                className={mergeNames(
                  isActive ? ' bg-blue-100' : 'bg-white',
                  'px-4 py-1 hover:bg-blue-400 hover:text-white text-slate-700 flex items-center justify-between text-left'
                )}
              >
                {isActive && <BiCheck className="text-blue-500" />}
              </Item>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
