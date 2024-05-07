import fs from "fs";
import readline from "readline";

export function readFile(filePath: string) {
  return new Promise<unknown[]>((resolve) => {
    const readStream = fs.createReadStream(filePath);

    console.log("Reading file", filePath)

    const rl = readline.createInterface({
      input: readStream,
    });

    const lines: any[] = [];

    rl.on("line", (line) => lines.push(JSON.parse(line)));

    rl.on("close", () => resolve(lines));
  });
}
