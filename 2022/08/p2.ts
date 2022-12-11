import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

// walk the grid up, down, left and right and multiply visibility score until equal or greater value is found
function getVisibilityScore(
  matrix: number[][],
  row: number,
  col: number
): number {
  const gridWidth = matrix[0].length;
  const gridHeight = matrix.length;

  const value = matrix[row][col];

  let score = 0;
  let leftDistance = 0;
  let rightDistance = 0;
  let upDistance = 0;
  let downDistance = 0;

  // left
  for (let x = col - 1; x >= 0; x--) {
    leftDistance++;
    if (matrix[row][x] >= value) {
      break;
    }
  }

  // right
  for (let x = col + 1; x < gridWidth; x++) {
    rightDistance++;
    if (matrix[row][x] >= value) {
      break;
    }
  }

  // up
  for (let y = row - 1; y >= 0; y--) {
    upDistance++;
    if (matrix[y][col] >= value) {
      break;
    }
  }

  // down
  for (let y = row + 1; y < gridHeight; y++) {
    downDistance++;
    if (matrix[y][col] >= value) {
      break;
    }
  }

  score = leftDistance * rightDistance * upDistance * downDistance;

  return score;
}

async function solution(matrix: number[][]): Promise<number> {
  let result = 0;

  const gridWidth = matrix[0].length;
  const gridHeight = matrix.length;

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const score = getVisibilityScore(matrix, row, col);

      if (score > result) {
        result = score;
      }
    }
  }

  return result;
}

async function day() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testDataParsed = testData.map((line) =>
    line.split("").map((element) => parseInt(element))
  );

  await logAnyData(testDataParsed);

  const startTest = performance.now();
  const testSolution = await solution(testDataParsed);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  const parsedData = data.map((line) =>
    line.split("").map((element) => parseInt(element))
  );

  const start = performance.now();
  const realSolution = await solution(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 1, realSolution);
  await logPerformanceTiming(start, end);
}

(async () => {
  await day();
})();
