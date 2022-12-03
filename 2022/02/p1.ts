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

  const shapeScore: Record<string, number> = { X: 1, Y: 2, Z: 3 };
  const outcomeScore: Record<string, number> = { L: 0, D: 3, W: 6 };
  const rules: Record<string, string> = {
    // DRAW
    AX: "D", // AX: 0, // draw R-R
    BY: "D", // BY: 0, // draw P-P
    CZ: "D", // CZ: 0, // draw S-S

    // WIN
    AY: "W", // AY: 1, // win R-P
    BZ: "W", // BZ: 1, // win P-S
    CX: "W", // CX: 1, // win S-R

    // LOSE
    BX: "L", // BX: -1, // lose P-R
    CY: "L", // CY: -1, // lose S-P
    AZ: "L", // AZ: -1, // lose R-S
  };

  for (let index = 0; index < data.length; index++) {
    const p1 = data[index][0];
    const p2 = data[index][1];
    const key = `${p1}${p2}`;

    const roundScore = outcomeScore[rules[key]] + shapeScore[p2];
    score += roundScore;
  }

  return score;
}

async function p1() {
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
  await p1();
})();
