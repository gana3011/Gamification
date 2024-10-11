import React from 'react'
import { useRef, useEffect} from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

const Quest = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
 
  useEffect(()=>{
    onOpen();
  },[onOpen])

  return (
    <div>
       <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Quest;
