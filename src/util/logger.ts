import { headers } from "next/headers";
import pino from "pino";
import { REQUEST_ID_HEADER, PATH_HEADER } from "./const";
import { loggerOptions } from "./loggerOptions";

const logger = pino(loggerOptions);

export async function getLogger() {
  const header = await headers();
  const reqId = header.get(REQUEST_ID_HEADER) ?? "";
  const path = header.get(PATH_HEADER) ?? "";

  return logger.child({
    reqId,
    path,
  });
}
