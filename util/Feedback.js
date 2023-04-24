import urls from '@/constants/api';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { STYLES } from '../styles';
import mergeNames from './mergeNames';

const Feedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [count, setCount] = useState(0);
  const [feedback, setFeedback] = useState({
    title: '',
    message: '',
  });
  const token = getCookie('token');
  const toast = useToast();
  const sendFeedback = async () => {
    if (token) {
      try {
        await axios
          .post(
            `${urls['test']}/user/feedback`,
            {
              message: feedback.message,
              title: feedback.title,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Headers': '*',
              },
            }
          )
          .then((d) => {
            toast({
              title: 'Баярлалаа',
              duration: 3000,
              isClosable: true,
              status: 'success',
            });
            onClose();
          });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <button
        className="py-2 font-semibold border-2 border-gray-200 rounded-md"
        onClick={onOpen}
      >
        Санал хүсэлт
      </button>

      <Modal size={'lg'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Санал хүсэлт</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-2 gap-2 ">
              <div className="flex flex-col gap-1 col-span-full">
                <h1>Гарчиг</h1>
                <input
                  type="text"
                  className={mergeNames(STYLES.input, 'rounded-md')}
                  onChange={(e) => {
                    setFeedback((prev) => ({ ...prev, title: e.target.value }));
                  }}
                />
              </div>
              {/* <div className="flex flex-col gap-1">
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
              </div> */}
              <div className="flex flex-col gap-1 col-span-full">
                <h1>Дэлгэрэнгүй</h1>
                <textarea
                  type="text"
                  className={mergeNames(STYLES.input, 'rounded-md ')}
                  onChange={(e) =>
                    setFeedback((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
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
              onClick={() => sendFeedback()}
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
