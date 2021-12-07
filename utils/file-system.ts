import * as fs from "fs";

export class FS {
  async readFile(name: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(name, { encoding: "utf8" }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  async writeFile(name: string, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(name, data, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
