import { getInputFilePath } from "./getInputFilePath.js";
import { readFile } from "./readFile.js";
import { getOutputFilePath } from "./getOutputFilePath.js";
import fs from "fs/promises";

async function main() {
  const {path, fileName} = getInputFilePath();

  const lines = await readFile(path);

  const csvData = processData(lines);

  const outputFilePath = getOutputFilePath(fileName)

  await fs.writeFile(outputFilePath, csvData);

  console.log(`Wrote output to ${outputFilePath}`)
}

main();

function processData(lines: any[]) {
  const countPerTag: { [key: string]: number } = {};

  for (const line of lines) {
    const tag = line.attributes?.sanity?.tags?.[0];
    if (!tag) continue;

    if (typeof countPerTag[tag] === "number") {
      countPerTag[tag]++;
    } else {
      countPerTag[tag] = 0;
    }
  }

  const queriesSorted: { tag: string; count: number }[] = [];

  const tags = Object.keys(countPerTag);

  for (const tag of tags) {
    const count = countPerTag[tag];

    queriesSorted.push({ tag, count });
  }

  let outFile = "tag,count\n";

  queriesSorted.forEach((aa) => {
    outFile += aa.tag + "," + aa.count + "\n";
  });

  return outFile
}
