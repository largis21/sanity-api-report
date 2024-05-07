import { getInputFilePath } from "./getInputFilePath.js";
import { readFile } from "./readFile.js";
import { generateReports } from "./reports/index.js";

async function main() {
  const { path, fileName } = getInputFilePath();

  const lines = await readFile(path);

  const results = await generateReports(lines, fileName);

  console.log(
    `${results.filter(Boolean).length} successfully generated reports`,
  );
  console.log(`${results.filter((e) => e === false).length} errors`);
}

main();
