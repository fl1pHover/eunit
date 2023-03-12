import mergeNames from '@/util/mergeNames';
import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { STYLES } from '../styles';
import Tip from './Tip';

export const LoadingButton = ({ text, onClick, blue, isLoading }) => {
  const [process, setProcess] = useState(false);

  return isLoading ? (
    <Spinner />
  ) : (
    <div
      className={mergeNames(
        blue ? (STYLES.blueButton, 'p-2 ') : '',
        'flex justify-center items-center gap-2'
      )}
      onClick={() => {
        setProcess(true), onClick;
      }}
    >
      <AiOutlineLoading3Quarters
        className={mergeNames(process ? 'animate-spin block' : 'hidden')}
      />
      {process ? 'Уншиж байна' : text}
    </div>
  );
};

export const DButton = ({ onClick }) => {
  return (
    <Tip lbl="Устгах">
      <button
        className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full md:w-8 md:h-8"
        // onClick={onClick}
      >
        <BsFillTrashFill size={16} className="text-white" />
      </button>
    </Tip>
  );
};

export const ImageCount = ({ onClick, children }) => (
  <Tip lbl="Зурагны тоо">
    <button
      className="flex items-center justify-center w-10 h-6 gap-1 text-white bg-gray-600 rounded-full md:w-10 md:h-8"
      onClick={onClick}
    >
      <HiOutlinePhotograph size={16} />
      <p className="text-sm"> {children} </p>
    </button>
  </Tip>
);
