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
import { Button } from 'flowbite-react';

const CustomModal = ({
  children,
  header,
  btnClose = <></>,
  btnClose2,
  btnOpen,
  alert,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>{btnOpen}</Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={'4xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter className="gap-2">
            <div onClick={(onClose, alert)}>
              <button className="px-4 py-2 text-white bg-green-400 rounded-full">
                {btnClose}
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-white bg-blue-500 rounded-full"
            >
              {btnClose2}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
