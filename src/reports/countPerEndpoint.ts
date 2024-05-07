import fs from "node:fs/promises";
import path from "path";
import { getOutputFilePath } from "../getOutputFilePath.js";
import { Line } from "../readFile";

type CountPerEndpoint = Record<string, number>;

export async function generateCountPerEndpointReport(
  lines: Line[],
  fileName: string,
): Promise<boolean> {
  try {
    const countPerEndpoint: CountPerEndpoint = {};

    for (const line of lines) {
      const endpoint = line.attributes.sanity.endpoint;
      if (!endpoint) continue;

      if (typeof countPerEndpoint[endpoint] === "number") {
        countPerEndpoint[endpoint]++;
      } else {
        countPerEndpoint[endpoint] = 1;
      }
    }

    let outFile = "endpoint,count\n";

    Object.keys(countPerEndpoint).forEach((key) => {
      outFile += key + "," + countPerEndpoint[key] + "\n";
    });

    await fs.writeFile(
      path.join(getOutputFilePath(), `/${fileName}.count-per-endpoint.csv`),
      outFile,
    );

    return true
  } catch (err) {
    console.error("Error while generating report `countPerEndpoint`: ", err);
    return false;
  }
}
