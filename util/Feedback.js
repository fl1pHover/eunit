import React from 'react';
import CustomModal from './CustomModal';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import mergeNames from './mergeNames';
import { STYLES } from '../styles';
import { useState } from 'react';

const Feedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [count, setCount] = useState(0);
  return (
    // <CustomModal
    //   isOpen={isOpen}
    //   onClose={onClose}
    //   onOpen={onOpen}
    //   btnOpen={<>Дараах</>}
    //   btnClose={'asd'}
    //   btnClose2="Буцах"
    //   header="Баталгаажуулах хэсэг"
    //   btnOpen="Санал хүсэлт"
    // >
    //   Feedback
    // </CustomModal>
    <>
      <button onClick={onOpen}>Open Modal</button>

      <Modal size={'lg'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Санал хүсэлт</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <h1>Нэр</h1>
                <input
                  type="text"
                  className={mergeNames(STYLES.input, 'rounded-md')}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1>Утас</h1>
                <input
                  type="text"
                  pattern="[0-9]*"
                  onChange={(e) => setCount(e.target.value.length)}
                  className={mergeNames(STYLES.input, 'rounded-md')}
                />
                <p className="text-xs text-red-400">
                  {count != 0 && 'Утасны дугаар буруу байна'}
                </p>
              </div>
              <div className="flex flex-col gap-1 col-span-full">
                <h1>Дэлгэрэнгүй</h1>
                <textarea
                  type="text"
                  className={mergeNames(STYLES.input, 'rounded-md ')}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-between w-full gap-2">
            <button
              onClick={onClose}
              className={mergeNames(
                'p-2 px-3 rounded-md bg-white border-2 border-gray-400 font-bold text-gray-500'
              )}
            >
              Буцах
            </button>
            <button
              className={mergeNames(STYLES.blueButton, 'p-2 px-3 rounded-md')}
            >
              Илгээх
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Feedback;
