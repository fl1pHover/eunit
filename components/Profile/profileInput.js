import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import InputIcon from './InputIcon';

// Account deer ashiglasan input
const ProfileInput = ({ ph = '', props, type, className, item }) => {
  return (
    <div
      className={mergeNames(
        STYLES.flexCenter,
        'group  flex-col h-[40px] w-full  relative'
      )}
    >
      <input
        {...props}
        
        placeholder={ph}
        type={type}
       
        // onChange={(e) => onChange(e.target.value)}
        className={mergeNames(
          'px-4 cursor-not-allowed  py-2 w-full h-full disabled:focus flex items-center justify-between absolute top-0 left-0',
          STYLES.input,
          className
        )}
        required
      />
      <div
        className={mergeNames(
          'w-[40px] h-[40px] pointer-events-none flex flex-row gap-2 items-center justify-center px-2 absolute right-0 top-0',
          'rounded-r-[30px]',
          'bg-blue-500 ring-blue-200'
        )}
      >
        {/* <Icon  /> */}
        <InputIcon
          href={item}
          size={18}
          className={mergeNames('text-blue-200')}
        />
      </div>
    </div>
  );
};
export default ProfileInput;
