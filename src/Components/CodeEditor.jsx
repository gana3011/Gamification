import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, HStack } from "@chakra-ui/react";
import LanguageSelector from "./LanguageSelector";
import { BOILERPLATE } from "../Constants";
import Output from "./Output";
import QuestSelector from "./QuestSelector";

const CodeEditor = () => {

  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("c");
  const [selectedQuest, setSelectedQuest] = useState("print-attack");
 
  const editorRef = useRef();

  const handleChange = (value) => {
    setValue(value);
  };

  const handleMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(BOILERPLATE[language]);
  };

  const onQuest = (quest) => {
    setSelectedQuest(quest)
  }
  
  useEffect(() => {
    setValue(BOILERPLATE[selectedQuest][language])
  }, [selectedQuest, language]);
 
  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <QuestSelector selectedQuest={selectedQuest} onQuest={onQuest} />
          <Editor
            height="70vh"
            language={language}
            defaultValue={BOILERPLATE[language]}
            theme="vs-dark"
            value={value}
            onChange={handleChange}
            onMount={handleMount}
          />
        </Box>
        <Output editorRef = {editorRef} language = {language} selectedQuest={selectedQuest}/>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
