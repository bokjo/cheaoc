import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

function hasDuplicates(string: string): boolean {
  const chars = string.split("");
  const uniqueChars = new Set(chars);
  return uniqueChars.size !== chars.length;
}

async function solution(data: string): Promise<number> {
  let result = 0;

  for (let i = 14; i < data.length; i++) {
    const subString = data.substring(i - 14, i);

    if (hasDuplicates(subString)) {
      continue;
    } else {
      result = i;
      break;
    }
  }

  return result;
}

async function p2() {
  // Test data
  const testData = await readFileLines("./test-data.txt");

  await logAnyData(testData);

  const startTest = performance.now();
  const testSolution1 = await solution(testData[0]);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution1);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  // const parsedData = data.map((depth) => parseInt(depth, 10));

  await logAnyData(data);

  const start = performance.now();
  const solution1 = await solution(data[0]);
  const end = performance.now();

  await logSolutionResult(1, 1, solution1);
  await logPerformanceTiming(start, end);
}

(async () => {
  await p2();
})();
