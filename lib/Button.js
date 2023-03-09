import mergeNames from '@/util/mergeNames';
import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { STYLES } from '../styles';

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
