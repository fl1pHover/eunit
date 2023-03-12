import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { STYLES } from '../styles';
import mergeNames from './mergeNames';

const Alert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <>
      <button
        className={mergeNames(STYLES.button, 'bg-red-500 hover:bg-red-900')}
        onClick={onOpen}
      >
        Зар устгах
      </button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Зар устгах
            </AlertDialogHeader>

            <AlertDialogBody>Та итгэлтэй байна уу?</AlertDialogBody>

            <AlertDialogFooter>
              <button
                className={mergeNames(
                  STYLES.button,
                  'bg-gray-300 hover:bg-gray-400 ml-3'
                )}
                ref={cancelRef}
                onClick={onClose}
              >
                Цуцлах
              </button>
              <button
                className={mergeNames(
                  STYLES.button,
                  'bg-red-500 hover:bg-red-900 ml-3'
                )}
                onClick={onClose}
              >
                Устгах
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Alert;
