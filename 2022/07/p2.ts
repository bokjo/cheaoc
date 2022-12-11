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

async function p2() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = testData.map((depth) => parseInt(depth, 10));

  await logAnyData(testDataParsed);

  const startTest = performance.now();
  const testSolution1 = await solution(testDataParsed);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution1);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  const parsedData = data.map((depth) => parseInt(depth, 10));

  const start = performance.now();
  const solution1 = await solution(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 1, solution1);
  await logPerformanceTiming(start, end);
}

(async () => {
  await p2();
})();
