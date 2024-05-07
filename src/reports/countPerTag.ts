import fs from "node:fs/promises";
import path from "path";
import { getOutputFilePath } from "../getOutputFilePath.js";
import { Line } from "../readFile";

type CountPerTag = Record<string, number>;

export async function generateCountPerTagReport(
  lines: Line[],
  fileName: string,
): Promise<boolean> {
  try {
    const countPerTag: CountPerTag = {};

    for (const line of lines) {
      const tags = line.attributes.sanity.tags;
      if (!tags || !tags.length) continue;

      for (const tag of tags) {
        if (typeof countPerTag[tag] === "number") {
          countPerTag[tag]++;
        } else {
          countPerTag[tag] = 1;
        }
      }
    }

    let outFile = "tag,count\n";

    Object.keys(countPerTag).forEach((key) => {
      outFile += key + "," + countPerTag[key] + "\n";
    });

    await fs.writeFile(
      path.join(getOutputFilePath(), `/${fileName}.count-per-tag.csv`),
      outFile,
    );

    return true
  } catch (err) {
    console.error("Error while generating report `countPerTag`: ", err);
    return false;
  }
}
