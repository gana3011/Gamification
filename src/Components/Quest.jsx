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

import CodeEditor from './CodeEditor'
import { DESCRIPTIONS } from '../Constants'

const Quest = ({selectedQuest,isCodeEditor,setIsCodeEditor,navigate}) => {


  const { isOpen, onOpen, onClose } = useDisclosure()
 
  useEffect(()=>{
    onOpen();
  },[onOpen])

  const toggleEditor = () =>{
    setIsCodeEditor(true);
    navigate("/editor")
    onClose();
  }

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
          <ModalHeader>{DESCRIPTIONS[selectedQuest].title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <p>{DESCRIPTIONS[selectedQuest].description}</p><br />
          <p><strong>Objective: </strong>{DESCRIPTIONS[selectedQuest].objective}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={toggleEditor} >
              Start
            </Button>
            <Button variant='ghost'  onClick={onClose}>Exit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isCodeEditor && (
        <div>
          <CodeEditor selectedQuest={selectedQuest} />
          </div>
      )}
    </div>
  )
}

export default Quest;
