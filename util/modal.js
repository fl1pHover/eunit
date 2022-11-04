const {
     Button,
     ModalContent,
     ModalOverlay,
     Modal,
     ModalHeader,
     ModalCloseButton,
     ModalBody,
     ModalFooter,
     Text,
} = require("@chakra-ui/react");

function BasicUsage() {
     const { isOpen, onOpen, onClose } = useDisclosure();
     return (
          <>
               <Button onClick={onOpen}>Open Modal</Button>

               <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader>Modal Title</ModalHeader>
                         <ModalCloseButton />
                         <ModalBody>
                              <Text>Lorem, ipsum.</Text>
                         </ModalBody>

                         <ModalFooter>
                              <Button
                                   colorScheme="blue"
                                   mr={3}
                                   onClick={onClose}
                              >
                                   Close
                              </Button>
                              <Button variant="ghost">Secondary Action</Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     );
}
