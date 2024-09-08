import { executeCode } from "./api";

export const challengeTests = {
  'print-attack': [
    {
      input: '',
      expectedOutput: ['a', 't', 't', 'a', 'c', 'k'],
      description: 'Test Case 1'
    },
    {
      input: '',
      expectedOutput: ['a', 't', 't', 'a', 'c', 'k'],
      description: 'Test Case 2'
    }
  ],

  'reverse-spell' : [
    {
      input: "",
      expectedOutput: ["firebolt"],
      description: "Test Case 1"
    }
  ],

  'sort-ingredients' : [
    {
    input: "",
    expectedOutput : ["dragon scale", "eagle nose", "rabbit ear"],
    description : "Test Case 1",
    }
  ]
};

const runTests = async (code, language, challengeId) => {
  const tests = challengeTests[challengeId];
  const results = [];

  for (let test of tests) {
    try {
      const { run: result } = await executeCode(language, code);
      const output = result.output.trim().split('\n');
      
      const passed = JSON.stringify(output) === JSON.stringify(test.expectedOutput);
      results.push({
        passed: passed,
        description: test.description,
        output: output,
        expected: test.expectedOutput
      });
    } catch (error) {
      results.push({
        passed: false,
        description: test.description,
        error: error.message
      });
    }
  }

  return results;
};

export const validateSolution = async (code, language, challengeId) => {
  const testResults = await runTests(code, language, challengeId);
  const allTestsPassed = testResults.every(result => result.passed);

  return {
    success: allTestsPassed,
    message: allTestsPassed 
      ? "Congratulations! All tests passed. You've completed the quest!" 
      : "Some tests failed. Keep trying!",
    testResults: testResults
  };
};