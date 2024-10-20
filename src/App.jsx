import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import TextArray from "./Components/TextArray"
import CodeEditor from "./Components/CodeEditor";
import { Box} from "@chakra-ui/react";
import Map from "./Components/Map";



function App() {

  const [isCodeEditor, setIsCodeEditor] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState("print-attack");
  const navigate = useNavigate();

  const onEnd = () =>{
    setIsCodeEditor(true);
  }
  
  return(
  // <Box>
  //  {!isCodeEditor ? (<TextArray onEnd={onEnd} />) : (<CodeEditor selectedQuest={selectedQuest} setSelectedQuest = {setSelectedQuest}/>)
  //  }
  // </Box>
  // <Map />
  // <Map selectedQuest={selectedQuest} setSelectedQuest = {setSelectedQuest} isCodeEditor={isCodeEditor} setIsCodeEditor={setIsCodeEditor}/>
  // <Quest />
    <Routes>
      <Route path="/" element={<Map selectedQuest={selectedQuest} setSelectedQuest = {setSelectedQuest} isCodeEditor={isCodeEditor} setIsCodeEditor={setIsCodeEditor} navigate={navigate} /> } />
      <Route path="/editor" element={<CodeEditor selectedQuest={selectedQuest} />} />
    </Routes>
  );


}

export default App;
