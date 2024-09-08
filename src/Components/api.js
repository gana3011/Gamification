import axios from "axios";
import { LANGUAGE_VERSIONS } from "../Constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {

  //languagekey
  const languageKey = language;

  //find the name by key i.e, C++ for cpp
  const languageName = Object.keys(LANGUAGE_VERSIONS).find(
    lang => LANGUAGE_VERSIONS[lang].key === languageKey
  );
  
  //version using name
  const langVersion = LANGUAGE_VERSIONS[languageName]?.version;

  const response = await API.post("/execute", {
    language:languageKey,
    version: langVersion,
    files: [
      {
        content: sourceCode,
      },
    ],
    
  },
);
  return response.data;
};
