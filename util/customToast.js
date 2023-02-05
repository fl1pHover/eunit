import { useToast } from '@chakra-ui/react';
import { TiTick } from 'react-icons/ti';
import { STYLES } from '../styles';
import mergeNames from './mergeNames';

const CustomToast = ({ toastBtn, onclick, toastH, toastP }) => {
  const toast = useToast();

  return (
    <button
      // onClick={toast}
      onClick={() => {
        toast({
          position: 'bottom-center',
          render: () => (
            <div
              className={mergeNames(
                'w-3/4  mx-auto p-2 text-white bg-green-500 shadow-xl rounded-md ',
                STYLES.flexCenter,
                'items-center gap-3',
                'border-b-4 border-green-300'
              )}
            >
              <TiTick className="h-full p-1 text-4xl text-green-500 bg-white rounded-full" />

              <div className="flex flex-col text-[16px] ">
                <p className="font-bold">{toastH} </p>
                <p className=" fon-semibold">{toastP}</p>
              </div>
            </div>
          ),
          duration: 9000,
          isClosable: true,
        }),
          onclick;
      }}
      className="flex items-center gap-1"
    >
      {toastBtn}
    </button>
  );
};

export default CustomToast;
