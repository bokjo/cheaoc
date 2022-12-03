import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

async function solution(data: any): Promise<number> {
  let result = 0;

  const azAZ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i][0].length; j++) {
      if (
        data[i][1].indexOf(data[i][0][j]) !== -1 &&
        data[i][2].indexOf(data[i][0][j]) !== -1
      ) {
        result += azAZ.indexOf(data[i][0][j]) + 1;
        break;
      }
    }
  }

  return result;
}

async function p2() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = [];

  for (let i = 0; i < testData.length; i += 3) {
    testDataParsed.push(testData.slice(i, i + 3));
  }

  await logAnyData(testDataParsed);

  const startTest = performance.now();
  const testSolution1 = await solution(testDataParsed);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution1);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  const parsedData = [];
  for (let i = 0; i < data.length; i += 3) {
    parsedData.push(data.slice(i, i + 3));
  }

  // await logAnyData(parsedData);

  const start = performance.now();
  const solution1 = await solution(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 1, solution1);
  await logPerformanceTiming(start, end);
  // End of Solution
}

(async () => {
  await p2();
})();
