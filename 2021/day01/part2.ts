import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

async function solutionFn2(data: number[]): Promise<number> {
  let count = 0;

  for (let index = 2; index < data.length; index++) {
    const previousWindow = data[index - 2] + data[index - 1] + data[index];
    const currentWindow = data[index - 1] + data[index] + data[index + 1];

    if (currentWindow > previousWindow) {
      count++;
    }
  }

  return count;
}

async function part2() {
  // Test data
  const startTest = performance.now();

  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = testData.map((depth) => parseInt(depth, 10));

  await logAnyData(testDataParsed);

  const testSolution = await solutionFn2(testDataParsed);
  const endTest = performance.now();

  await logSolutionTestResult(1, 2, testSolution);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const start = performance.now();

  const data = await readFileLines("./input-data.txt");
  const parsedData = data.map((depth) => parseInt(depth, 10));

  const solution = await solutionFn2(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 2, solution);
  await logPerformanceTiming(start, end);
}

(async () => {
  await part2();
})();
