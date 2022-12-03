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
      if (data[i][1].indexOf(data[i][0][j]) !== -1) {
        result += azAZ.indexOf(data[i][0][j]) + 1;
        break;
      }
    }
  }

  return result;
}

async function p1() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = testData.map((line) => {
    const middle = line.length / 2;
    return [line.substring(0, middle), line.substring(middle, line.length)];
  });

  await logAnyData(testDataParsed);

  const startTest = performance.now();
  const testSolution1 = await solution(testDataParsed);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution1);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  const parsedData = data.map((line) => {
    const middle = line.length / 2;
    return [line.substring(0, middle), line.substring(middle, line.length)];
  });

  // await logAnyData(parsedData);

  const start = performance.now();
  const solution1 = await solution(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 1, solution1);
  await logPerformanceTiming(start, end);
  // End of Solution
}

(async () => {
  await p1();
})();
