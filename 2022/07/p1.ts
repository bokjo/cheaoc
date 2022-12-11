import { readFileLines } from "../../utils/file-helper";
import {
  logAnyData,
  logPerformanceTiming,
  logSolutionResult,
  logSolutionTestResult,
} from "../../utils/output";

import { performance } from "perf_hooks";

async function solution(data: string[][]): Promise<number> {
  let result = 0;
  const ROOT_DIR = "/";
  let PREVIOUS_DIR: string[] = [];
  let CURRENT_DIR = ROOT_DIR;
  const GO_TO_PREVIOUS_DIR = "..";
  const COMMAND_INPUT = "$";
  const DIR_INPUT = "dir";
  const SIZE_LIMIT = 100000;
  const CHANGE_DIR_COMMAND = "cd";
  const LIST_DIR_COMMAND = "ls";

  let fsTree: any = {};

  for (let line of data) {
    switch (line[0]) {
      case COMMAND_INPUT:
        if (line[1] === CHANGE_DIR_COMMAND) {
          if (line[2] === GO_TO_PREVIOUS_DIR) {
            PREVIOUS_DIR.pop();
            CURRENT_DIR = PREVIOUS_DIR.at(-1)!;
          } else {
            CURRENT_DIR = line[2];
            PREVIOUS_DIR.push(CURRENT_DIR);
            if (!fsTree[CURRENT_DIR]) {
              fsTree[CURRENT_DIR] = {
                dirs: [],
                files: [],
                sizeFiles: 0,
                sizeTotal: 0,
              };
            }
          }
        } else if (line[1] === LIST_DIR_COMMAND) {
          continue;
        }
        break;
      case DIR_INPUT:
        fsTree[CURRENT_DIR].dirs.push(line[1]);
        break;
      default:
        const size = parseInt(line[0]);

        fsTree[CURRENT_DIR].files.push(line[1]);
        fsTree[CURRENT_DIR].sizeFiles += size;

        break;
    }
  }

  for (let dir of Object.keys(fsTree)) {
    for (let childDir of fsTree[dir].dirs) {
      if (fsTree[childDir].dirs.length === 0) {
        fsTree[dir].sizeTotal += fsTree[childDir].sizeFiles;
      } else {
        // recursive function here?!?
        fsTree[dir].sizeTotal += fsTree[childDir].sizeFiles;
      }
    }
    fsTree[dir].sizeTotal += fsTree[dir].sizeFiles;
  }

  console.log("#".repeat(50));
  console.log(fsTree);
  console.log("#".repeat(50));

  for (let dir of Object.keys(fsTree)) {
    if (fsTree[dir].sizeTotal < SIZE_LIMIT) {
      result += fsTree[dir].sizeTotal;
    }
  }

  return result;
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

  const start = performance.now();
  const solution1 = await solution(parsedData);
  const end = performance.now();

  await logSolutionResult(1, 1, solution1);
  await logPerformanceTiming(start, end);
}

(async () => {
  await p1();
})();
