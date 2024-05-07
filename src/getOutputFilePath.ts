import path from "path";
import { cwd } from "process";

export function getOutputFilePath(fileName: string) {
  return path.join(cwd(), "/output/", fileName)
}
