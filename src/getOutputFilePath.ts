import path from "path";
import { cwd } from "process";

export function getOutputFilePath() {
  return path.join(cwd(), "/output")
}
