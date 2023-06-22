import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { STYLES } from "../styles";
import mergeNames from "./mergeNames";

const Alerting = ({
  btn,
  onclick = {},
  bg = "bg-red-500 hover:bg-red-900",
  body,
  isDelete = "",
  title = "Зар",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <button className={mergeNames(STYLES.button, bg)} onClick={onOpen}>
        {btn}
      </button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title} {isDelete.toLowerCase()}
            </AlertDialogHeader>

            <AlertDialogBody>
              {body ?? <p>Та итгэлтэй байна уу?</p>}
              
            </AlertDialogBody>

            <AlertDialogFooter>
              <button
                className={mergeNames(
                  STYLES.button,
                  "bg-gray-300 hover:bg-gray-400 ml-3 px-4 py-2"
                )}
                ref={cancelRef}
                onClick={onClose}
              >
                Цуцлах
              </button>
              <button
                className={mergeNames(
                  STYLES.button,
                  "bg-red-500 hover:bg-red-900 ml-3 px-4 py-2"
                )}
                onClick={() => {
                  onclick();
                  onClose();
                }}
              >
                {isDelete}
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Alerting;
