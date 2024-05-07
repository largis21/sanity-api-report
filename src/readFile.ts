import fs from "fs";
import readline from "readline";

export type Line =  {
  timestamp: string
  traceId: string
  spanId: string
  severityText: string
  severityNumber: number
  body: {
    //ms
    duration: number,
    insertId: string,
    method: "POST" | "GET" | "PUT" | "DELETE",
    referer: string,
    remoteIp: string
    requestSize: number
    responseSize: number
    status: number,
    url: string,
    userAgent: string,
  },
  attributes: {
    sanity: {
      projectId: string,
      dataset: string,
      domain: string,
      endpoint: string,
      groqQueryIdentifier: string
      apiVersion:string,
      tags: string[],
      studioRequest: boolean,
    },
  },
  resource: {
    service: { name: "Sanity.io" },
    sanity: { type: "http_request", version: "0.0.1" },
  },
};

export function readFile(filePath: string) {
  return new Promise<Line[]>((resolve) => {
    const readStream = fs.createReadStream(filePath);

    console.log("Reading file", filePath);

    const rl = readline.createInterface({
      input: readStream,
    });

    const lines: any[] = [];

    rl.on("line", (line) => lines.push(JSON.parse(line)));

    rl.on("close", () => resolve(lines));
  });
}
