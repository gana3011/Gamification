import { Box, Menu, MenuButton, MenuItem, Button, MenuList } from '@chakra-ui/react'
import React from 'react'
import {challengeTests} from './testSuite'

const QuestSelector = ({selectedQuest, onQuest}) => {
  const ACTIVE_COLOR = "blue.400";
  return (
    <Box>
      <Menu isLazy>
        <MenuButton as={Button}>
          {selectedQuest} 
        </MenuButton>
        <MenuList>
          {Object.keys(challengeTests).map((key) => (
            <MenuItem key={key} 
            color={
              key === selectedQuest ? ACTIVE_COLOR : ""
            }

            bg={
              key === selectedQuest ? "gray.900" : "transparent"
            }

            _hover={{
              color: ACTIVE_COLOR,
              bg: "gray.900"
            }}

            onClick={() => onQuest(key)} 
            >
              {key}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default QuestSelector;
