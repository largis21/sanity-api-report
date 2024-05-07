import fs from "node:fs/promises";
import path from "path";
import { getOutputFilePath } from "../getOutputFilePath.js";
import { Line } from "../readFile";

// const GROQ_ENDPOINT_REGEXP =
//   /https:\/\/.*?\.apicdn\.sanity\.io\/.*?\/data\/query/;
const GROQ_ENDPOINT_REGEXP = /query/;
/**
 * Urls for querying with groq are emitted
 */
export async function generateDataPerUrlReport(
  lines: Line[],
  fileName: string,
): Promise<boolean> {
  try {
    const dataPerUrl: Record<string, { count: number; bandwidth: number }> = {};

    for (const line of lines) {
      const url = line.body.url;
      if (!url) continue;
      if (GROQ_ENDPOINT_REGEXP.test(url)) continue;

      if (typeof dataPerUrl[url] !== "undefined") {
        dataPerUrl[url].count++;
        dataPerUrl[url].bandwidth += line.body.responseSize;
      } else {
        dataPerUrl[url] = { count: 1, bandwidth: line.body.responseSize };
      }
    }

    let outFile = "url,count,bandwidth\n";

    Object.keys(dataPerUrl).forEach((key) => {
      outFile += `${key.replace(/,/g, ".")},${dataPerUrl[key].count},${dataPerUrl[key].bandwidth}\n`;
    });

    await fs.writeFile(
      path.join(getOutputFilePath(), `/${fileName}.data-per-url.csv`),
      outFile,
    );

    return true;
  } catch (err) {
    console.error("Error while generating report `DataPerUrl`: ", err);
    return false;
  }
}
