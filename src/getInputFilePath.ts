import path from "path";
import { cwd } from "process";

export function getInputFilePath() {
  const args = process.argv;

  const inputFileArgName = "if";

  const inputFileArg = args.find((e) => e.startsWith(inputFileArgName));

  if (!inputFileArg) {
    console.log("No input file specified");
    process.exit();
  }

  const splitInputFileArg = inputFileArg.split("=");

  if (splitInputFileArg.length !== 2 || splitInputFileArg[1] === "") {
    console.log("No input file specified");
    process.exit();
  }

  return {
    path: path.join(cwd(), splitInputFileArg[1]),
    fileName: splitInputFileArg[1],
  };
}
