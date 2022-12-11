import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

async function solution(data: number[]): Promise<number> {
  let result = 0;

  return result;
}

async function day() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = testData.map((line) => parseInt(line));

  await logAnyData(testDataParsed);

  const startTest = performance.now();
  const testSolution = await solution(testDataParsed);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  const parsedData = data.map((line) => parseInt(line));

  const start = performance.now();
  const realSolution = await solution(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 1, realSolution);
  await logPerformanceTiming(start, end);
}

(async () => {
  await day();
})();
