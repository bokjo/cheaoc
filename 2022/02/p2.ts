import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

async function solution(data: string[][]): Promise<number> {
  let score = 0;

  const outcomeRules: Record<string, string> = { X: "L", Y: "D", Z: "W" };
  const shapeScore: Record<string, number> = { X: 1, Y: 2, Z: 3 };
  const outcomeScore: Record<string, number> = { L: 0, D: 3, W: 6 };

  const rules: Record<string, Record<string, string>> = {
    // Lose
    X: {
      B: "X", // BX: -1, // lose P-R
      C: "Y", // CY: -1, // lose S-P
      A: "Z", // AZ: -1, // lose R-S
    },
    // Draw
    Y: {
      A: "X", // AX: 0, // draw R-R
      B: "Y", // BY: 0, // draw P-P
      C: "Z", // CZ: 0, // draw S-S
    },
    // Win
    Z: {
      A: "Y", // AY: 1, // win R-P
      B: "Z", // BZ: 1, // win P-S
      C: "X", // CX: 1, // win S-R
    },
  };

  for (let index = 0; index < data.length; index++) {
    const p1 = data[index][0];
    const p2 = data[index][1];

    const roundScore =
      outcomeScore[outcomeRules[p2]] + shapeScore[rules[p2][p1]];

    score += roundScore;
  }

  return score;
}

async function p2() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = testData.map((line) => line.split(" "));

  await logAnyData(testDataParsed);

  const startTest = performance.now();
  const testSolution1 = await solution(testDataParsed);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution1);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  const parsedData = data.map((line) => line.split(" "));

  // await logAnyData(parsedData);

  const start = performance.now();
  const solution1 = await solution(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 1, solution1);
  await logPerformanceTiming(start, end);
}

(async () => {
  await p2();
})();
