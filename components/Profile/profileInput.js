import mergeNames from '@/util/mergeNames';
import InputIcon from './InputIcon';

const ProfileInput = ({ item }) => {
  return (
    <div
      className={mergeNames('group flex flex-col justify-center items-center')}
    >
      <div
        className={mergeNames(
          'w-[40px] h-[40px] flex flex-row gap-2 items-center justify-center px-2',
          'border rounded-full border-gray-200 ',
          'bg-blue-500 ring-blue-200'
        )}
      >
        {/* <Icon  /> */}
        <InputIcon
          href={item}
          size={18}
          className={mergeNames('text-blue-200', 'transition-all ease-in-out')}
        />
      </div>
    </div>
  );
};

export default ProfileInput;
