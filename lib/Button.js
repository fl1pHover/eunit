import mergeNames from '@/util/mergeNames';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { STYLES } from '../styles';

export const LoadingButton = ({ text, onClick }) => {
  const [process, setProcess] = useState(false);

  return (
    <button
      className={mergeNames(
        STYLES.blueButton,
        'p-2 flex justify-center items-center gap-2'
      )}
      onClick={() => {
        setProcess(true), onClick;
      }}
    >
      <AiOutlineLoading3Quarters
        className={mergeNames(process ? 'animate-spin block' : 'hidden')}
      />
      {process ? 'Уншиж байна' : text}
    </button>
  );
};
