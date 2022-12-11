import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

async function solution(matrix: number[][]): Promise<number> {
  let result = 0;

  const gridWidth = matrix[0].length;
  const gridHeight = matrix.length;

  const visibilityGrid = new Array(gridHeight)
    .fill([])
    .map(() => new Array(gridWidth).fill(false));

  // left to right view
  for (let y = 0; y < gridHeight; y++) {
    let max = -1;
    for (let x = 0; x < gridWidth; x++) {
      if (matrix[y][x] > max) {
        max = matrix[y][x];
        visibilityGrid[y][x] = true;
      }
    }
  }

  // right to left view
  for (let y = 0; y < gridHeight; y++) {
    let max = -1;
    for (let x = gridWidth - 1; x >= 0; x--) {
      if (matrix[y][x] > max) {
        max = matrix[y][x];
        visibilityGrid[y][x] = true;
      }
    }
  }

  // top to bottom view
  for (let x = 0; x < gridWidth; x++) {
    let max = -1;
    for (let y = 0; y < gridHeight; y++) {
      if (matrix[y][x] > max) {
        max = matrix[y][x];
        visibilityGrid[y][x] = true;
      }
    }
  }

  // bottom to top view
  for (let x = 0; x < gridWidth; x++) {
    let max = -1;
    for (let y = gridHeight - 1; y >= 0; y--) {
      if (matrix[y][x] > max) {
        max = matrix[y][x];
        visibilityGrid[y][x] = true;
      }
    }
  }

  result = visibilityGrid.flatMap((row) => row.filter((el) => el)).length;

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
