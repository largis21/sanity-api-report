import fs from "node:fs/promises";
import { Line } from "../readFile.js";
import { generateCountPerTagReport } from "./countPerTag.js";
import { getOutputFilePath } from "../getOutputFilePath.js";
import { generateCountPerEndpointReport } from "./countPerEndpoint.js";
import { generateDataPerUrlReport } from "./countPerUrl.js";

export async function generateReports(lines: Line[], fileName: string) {
  try {
    await fs.mkdir(getOutputFilePath());
  } catch (e) { }

  const results = await Promise.all([
    generateCountPerTagReport(lines, fileName),
    generateCountPerEndpointReport(lines, fileName),
    generateDataPerUrlReport(lines, fileName),
  ]);

  return results;
}
