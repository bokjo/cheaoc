import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

function rotateMatrix(matrix: string[][]) {
  let n = matrix.length;
  let rotatedMatrix: string[][] = [];
  for (let i = 0; i < n; i++) {
    rotatedMatrix.push([]);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== " ") rotatedMatrix[j][n - 1 - i] = matrix[i][j];
    }
  }
  return rotatedMatrix;
}

async function solution(part1: string[][], part2: string[][]): Promise<string> {
  let result = "";

  let copyOfPart1 = [...part1];

  for (let i = 0; i < part2.length; i++) {
    const amountOfBoxesToMove = parseInt(part2[i][1]);
    const from = parseInt(part2[i][3]);
    const to = parseInt(part2[i][5]);

    for (let j = 0; j < amountOfBoxesToMove; j++) {
      // console.log("\n#############################");
      // console.log("STATE BEFORE: ", copyOfPart1);
      // console.log(
      //   `Moving #${amountOfBoxesToMove} boxes: box ${j} from ${from} to ${to}`
      // );
      const boxToMove = copyOfPart1[from - 1].pop();

      copyOfPart1[to - 1].push(boxToMove!);
      // console.log("STATE AFTER: ", copyOfPart1);
      // console.log("#############################\n");
    }
  }

  // console.log("#############################");
  // console.log("copyOfPart1: ", copyOfPart1);

  copyOfPart1.forEach((row) => {
    result = result + row.pop();
  });

  return result;
}

async function p1() {
  // Test data
  const testData = await readFileLines("./test-data.txt");
  const testIndexOfSeparator = testData.indexOf("");

  const testPart1 = [
    [" ", "D", " "],
    ["N", "C", " "],
    ["Z", "M", "P"],
    ["1", "2", "3"],
  ];

  const rotatedTestPart1 = rotateMatrix(testPart1);

  const testPart2 = testData
    .slice(testIndexOfSeparator + 1, testData.length)
    .map((line) => line.split(" "));

  await logAnyData(rotatedTestPart1);

  await logAnyData(testPart2);

  const startTest = performance.now();
  const testSolution1 = await solution(rotatedTestPart1, testPart2);
  const endTest = performance.now();

  await logSolutionTestResult(1, 1, testSolution1);
  await logPerformanceTiming(startTest, endTest);

  // Solution data
  const data = await readFileLines("./input-data.txt");
  const indexOfSeparator = data.indexOf("");

  const part1 = [
    [" ", " ", " ", "G", "W", " ", " ", "Q", " "],
    ["Z", " ", " ", "Q", "M", " ", "J", "F", " "],
    ["V", " ", " ", "V", "S", "F", "N", "R", " "],
    ["T", " ", " ", "F", "C", "H", "F", "W", "P"],
    ["B", "L", " ", "L", "J", "C", "V", "D", "V"],
    ["J", "V", "F", "N", "T", "T", "C", "Z", "W"],
    ["G", "R", "Q", "H", "Q", "W", "Z", "G", "B"],
    ["R", "J", "S", "Z", "R", "S", "D", "L", "J"],
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ];

  const rotatedPart1 = rotateMatrix(part1);
  const part2 = data
    .slice(indexOfSeparator + 1, data.length)
    .map((line) => line.split(" "));

  await logAnyData(rotatedPart1);

  await logAnyData(part2);

  const start = performance.now();
  const solution1 = await solution(rotatedPart1, part2);
  const end = performance.now();

  await logSolutionResult(1, 1, solution1);
  await logPerformanceTiming(start, end);
  // End of Solution
}

(async () => {
  await p1();
})();
