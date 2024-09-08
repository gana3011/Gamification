import { Box, Text, Button, useToast } from "@chakra-ui/react";
import React , {useEffect} from "react";
import { executeCode } from "./api";
import { useState } from "react";
import { validateSolution } from "./testSuite";

const Output = ({editorRef,language, selectedQuest}) => {

    const toast = useToast();
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [activeTab, setActiveTab] = useState("output");

    useEffect(() => {
      setOutput(null);
      setTestResults(null);
      setActiveTab("output");
    }, [language]);

    const runCode = async () =>{
      const sourceCode = editorRef.current.getValue();
      if(!sourceCode)
        return;
      try {
        setIsLoading(true);
        const {run:result} = await executeCode(language, sourceCode);
        setOutput(result.output.split("\n"));
        result.stderr ? setIsError(true) : setIsError(false);
        setActiveTab("output");
      } 
      catch (error) {
        toast({
          title:"An error occured",
          description: error.message || "unable to run code",
          status:"error",
          duration:6000
        });
      }
      finally{
        setIsLoading(false);
      }
    } 
    
    const runTests = async() =>{
      const code = editorRef.current.getValue();
      try {
        setIsLoading(true);
        const result = await validateSolution(code, language, selectedQuest);
        setTestResults(result);
        setActiveTab("testResults");
        if (result.success) {
          toast({
            title: "Challenge Completed!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Challenge Failed",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
      }
      } catch (error) {
      }
      finally{
        setIsLoading(false);
      }

  }

  return (
    <Box w="50%">
      <Button variant="outline" colorScheme="green" mb={4}  isLoading={isLoading} onClick={runCode}>
        Run Code
      </Button>
      <Box
        height="70vh"
        p={2}
        color={
          isError ? "red.400" : ""
        }
        border="1px solid"
        borderRadius={4}
        borderColor= {
          isError ? "red.500" : "333"
        }
      >
        {activeTab === "output" && (output ? output.map(
          (line,i) => <Text key={i}>{line}</Text>
        ) : "Click Run Code to execute")}

        {activeTab === "testResults" && (testResults && (
        <Box p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Test Results:
          </Text>
          {testResults.testResults.map((result, index) => (
            <Box key={index} mb={2}>
              <Text color={result.passed ? "green.500" : "red.500"}>
                {result.description}: {result.passed ? "Passed" : "Failed"}
              </Text>
              {!result.passed && (
                <Text fontSize="sm" color="gray.500">
                  Expected: {JSON.stringify(result.expected)}
                  <br />
                  Got: {JSON.stringify(result.output)}
                  {result.message}
                </Text>
              )}
            </Box>
          ))}
          <Text color={testResults.success ? "green.500" : "red.500"}>{testResults.message}</Text>
        </Box>
       ))}

      </Box>
      <Button variant="outline" colorScheme="blue" mt={4}  isLoading={isLoading} onClick={runTests}>
        Submit
      </Button>
    </Box>
  );
};

export default Output;
