import React, { useState } from "react"
import TextArray from "./Components/TextArray"
import CodeEditor from "./Components/CodeEditor";
import { Box} from "@chakra-ui/react";
import Map from "./Components/Map";


function App() {

  const [isCodeEditor, setIsCodeEditor] = useState(false);

  const onEnd = () =>{
    setIsCodeEditor(true);
  }
  
  return(
  // <Box>
  //  {!isCodeEditor ? (<TextArray onEnd={onEnd} />) : (<CodeEditor />)
  //  }
  // </Box>
  <Map />
  );


}

export default App;
