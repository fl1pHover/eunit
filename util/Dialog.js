import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

function DialogBox({ btnDialog, dlHeader, dlBody, dlFooter }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <div className="flex cursor-pointer" onClick={onOpen}>
        {btnDialog}
      </div>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{dlHeader}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{dlBody}</AlertDialogBody>
          <AlertDialogFooter>
            <button
              ref={cancelRef}
              className="px-4 py-2 rounded-lg bg-grey/20"
              onClick={onClose}
            >
              Буцах
            </button>

            {dlFooter}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DialogBox;
