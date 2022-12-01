export async function logAnyData(data: any): Promise<void> {
  console.log("##### TEST DATA #####");
  console.log(data);
  console.log("##### END OF TEST DATA #####\n");
}

export async function logSolutionTestResult(
  day: number,
  part: number,
  result: any
): Promise<void> {
  console.log(`##### Day ${day} - part ${part} test result #####`);
  console.log("Result: ", result);
  console.log(`##### END OF Day ${day} - part ${part} test solution #####\n`);
}

export async function logSolutionResult(
  day: number,
  part: number,
  result: any
): Promise<void> {
  console.log(`##### Day ${day} - part ${part} solution #####`);
  console.log("Result: ", result);
  console.log(`##### END OF Day ${day} - part ${part} solution #####\n`);
}

export async function logPerformanceTiming(
  start: number,
  end: number
): Promise<void> {
  const took = (((end - start) * 1000) | 0) / 1000;
  console.log(`Start time: ${start.toFixed(4)}`);
  console.log(`End time: ${end.toFixed(4)}`);
  console.log(`Took: ${took} ms\n`);
}
