import { FS } from "./file-system";

export async function readFileContent(filePath: string): Promise<string> {
  const fileSystem = new FS();
  const input = await fileSystem.readFile(filePath);
  return input;
}

export async function readFileLines(filePath: string): Promise<string[]> {
  const input = await readFileContent(filePath);
  return input.split("\n");
}
