import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

async function solutionFn1(data: number[]): Promise<number> {
  let max = 0;
  let maxCurrent = 0;
  const perElf = [];

  for (let index = 0; index < data.length; index++) {
    if (!Number.isNaN(data[index])) {
      maxCurrent += data[index];

      if (index == data.length - 1) {
        perElf.push(maxCurrent);
      }
    } else if (Number.isNaN(data[index]) || index == data.length - 1) {
      perElf.push(maxCurrent);
      maxCurrent = 0; // reset, next elf...
    }
  }
  // console.log(perElf);
  perElf.sort((a, b) => b - a);
  // console.log(perElf);

  return perElf.slice(0, 3).reduce((acc, curr) => acc + curr, 0);
}

async function p2() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = testData.map((depth) => parseInt(depth, 10));

  await logAnyData(testDataParsed);

  const startTest = performance.now();
  const testSolution1 = await solutionFn1(testDataParsed);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution1);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  const parsedData = data.map((depth) => parseInt(depth, 10));

  const start = performance.now();
  const solution1 = await solutionFn1(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 1, solution1);
  await logPerformanceTiming(start, end);
}

(async () => {
  await p2();
})();
