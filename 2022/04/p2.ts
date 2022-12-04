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

  for (let i = 0; i < data.length; i++) {
    let [firstElfStart, firstElfEnd, secondElfStart, secondElfEnd] = data[i];

    if (
      (firstElfStart <= secondElfEnd && firstElfStart >= secondElfStart) ||
      (secondElfStart <= firstElfEnd && secondElfStart >= firstElfStart)
    ) {
      result += 1;
    }
  }

  return result;
}

async function p2() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = testData.map((line) => {
    const [firstElfRange, secondElfRange] = line.split(",");
    const [firstElfStart, firstElfEnd] = firstElfRange.split("-");
    const [secondElfStart, secondElfEnd] = secondElfRange.split("-");

    return [
      parseInt(firstElfStart),
      parseInt(firstElfEnd),
      parseInt(secondElfStart),
      parseInt(secondElfEnd),
    ];
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
    const [firstElfRange, secondElfRange] = line.split(",");
    const [firstElfStart, firstElfEnd] = firstElfRange.split("-");
    const [secondElfStart, secondElfEnd] = secondElfRange.split("-");

    return [
      parseInt(firstElfStart),
      parseInt(firstElfEnd),
      parseInt(secondElfStart),
      parseInt(secondElfEnd),
    ];
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
  await p2();
})();
