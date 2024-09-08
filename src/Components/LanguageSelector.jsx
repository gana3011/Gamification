import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../Constants";

const LanguageSelector = ({language, onSelect}) => {
  
  const ACTIVE_COLOR = "blue.400";
  const selectedLanguage = Object.keys(LANGUAGE_VERSIONS).find(
    lang => LANGUAGE_VERSIONS[lang].key === language);

  return (
    <Box>
      <Menu isLazy>
        <MenuButton as={Button}>
          {selectedLanguage} ({LANGUAGE_VERSIONS[selectedLanguage].version})
        </MenuButton>
        <MenuList>
          {Object.entries(LANGUAGE_VERSIONS).map(([lang, { key, version }]) => (
            <MenuItem key={key} 
            color={
              lang === selectedLanguage ? ACTIVE_COLOR : ""
            }

            bg={
              lang === selectedLanguage ? "gray.900" : "transparent"
            }

            _hover={{
              color: ACTIVE_COLOR,
              bg: "gray.900"
            }}

            onClick={() => onSelect(key)} 
            >
              {lang} ({version})
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
