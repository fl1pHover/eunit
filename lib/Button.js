import mergeNames from '@/util/mergeNames';
import { Spinner } from '@chakra-ui/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaTrashRestoreAlt } from 'react-icons/fa';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { STYLES } from '../styles';
import Tip from './Tip';

export const LoadingButton = ({ text, onClick, blue, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <div
      className={mergeNames(
        blue ? (STYLES.blueButton, 'p-2 ') : '',
        'flex justify-center items-center gap-2'
      )}
      onClick={() => {
        onClick;
      }}
    >
      <AiOutlineLoading3Quarters
        className={mergeNames(isLoading ? 'animate-spin block' : 'hidden')}
      />
      {isLoading ? 'Уншиж байна' : text}
    </div>
  );
};

export const DButton = ({ onClick, isDelete }) => {
  return !isDelete ? (
    <Tip lbl="Устгах">
      <button
        className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full md:w-8 md:h-8"
        // onClick={onClick}
      >
        <BsFillTrashFill size={16} className="text-white" />
      </button>
    </Tip>
  ) : (
    <Tip lbl="Сэргээх">
      <button
        className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full md:w-8 md:h-8"
        // onClick={onClick}
      >
        <FaTrashRestoreAlt size={16} className="text-white" /> Устгах
      </button>
    </Tip>
  );
};

export const ImageCount = ({ onClick, children }) => (
  <Tip lbl="Зурагны тоо">
    <button
      className="flex items-center justify-center w-10 h-6 gap-1 my-auto text-white rounded-full bg-gray-600/80 backdrop-blur-sm md:w-12"
      onClick={onClick}
    >
      <HiOutlinePhotograph size={16} />
      <p className="text-xs"> {children} </p>
    </button>
  </Tip>
);
